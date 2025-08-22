import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';
import type { Report, Passenger, Driver } from '../types';
import { mockApi } from '../App';
import { DownloadIcon, SpinnerIcon, LogIcon, UsersIcon, TruckIcon, PlusIcon, TrashIcon, PencilIcon, QRIcon } from './Icons';

// --- QR Code Modal Component ---
const QRCodeModal: React.FC<{ passenger: Passenger; onClose: () => void }> = ({ passenger, onClose }) => {
    const qrRef = useRef<HTMLCanvasElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [qrError, setQrError] = useState(false);

    useEffect(() => {
        if (qrRef.current && passenger.id) {
            // Crear un objeto con información completa del pasajero para el QR
            const passengerData = {
                id: passenger.id,
                cedula: passenger.nroCedula,
                nombre: passenger.nombreCompleto,
                gerencia: passenger.gerencia,
                timestamp: new Date().toISOString()
            };
            
            // Usar la librería qrcode importada correctamente
            QRCode.toCanvas(qrRef.current, JSON.stringify(passengerData), { 
                width: 256, 
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            }).catch((error) => {
                console.error("QR Code Generation Error:", error);
                setQrError(true);
            });
        }
    }, [passenger.id, passenger.nroCedula, passenger.nombreCompleto, passenger.gerencia]);

    const handlePrint = () => {
        const printContents = modalContentRef.current?.innerHTML;
        const originalContents = document.body.innerHTML;
        if (printContents) {
            document.body.innerHTML = `<html><head><title>Credencial</title></head><body>${printContents}</body></html>`;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload(); // Reload to restore event listeners
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm m-4 transform transition-all text-center" onClick={(e) => e.stopPropagation()}>
                <div ref={modalContentRef}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Credencial de Pasajero</h2>
                    <p className="text-gray-600 mb-1 font-semibold">{passenger.nombreCompleto}</p>
                    <p className="text-gray-500 mb-1">C.I: {passenger.nroCedula}</p>
                    <p className="text-gray-500 mb-1">Gerencia: {passenger.gerencia}</p>
                    <p className="text-gray-400 mb-4 text-xs">ID: {passenger.id}</p>
                    <div className="flex justify-center my-4 h-[256px] w-[256px] mx-auto">
                        {qrError 
                            ? <div className="text-red-500 bg-red-100 flex items-center justify-center w-full h-full rounded-lg">Error al generar QR</div>
                            : <canvas ref={qrRef} />
                        }
                    </div>
                    <p className="text-sm text-gray-500">Presente este código QR al conductor para registrar su viaje de forma rápida.</p>
                </div>
                 <div className="mt-6 flex gap-4 print:hidden">
                    <button onClick={onClose} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition">Cerrar</button>
                    <button onClick={handlePrint} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">Imprimir</button>
                </div>
            </div>
        </div>
    );
};


const AdminView: React.FC = () => {
    const [view, setView] = useState<'reports' | 'passengers' | 'drivers'>('reports');
    const [reports, setReports] = useState<Report[]>([]);
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [qrModalPassenger, setQrModalPassenger] = useState<Passenger | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [reportsData, passengersData, driversData] = await Promise.all([
                    mockApi.getReports(),
                    mockApi.getPassengers(),
                    mockApi.getDrivers()
                ]);
                setReports(reportsData);
                setPassengers(passengersData);
                setDrivers(driversData);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);



     const handleDownloadReport = (reportToDownload: Report) => {
        setIsSending(true);
        const { conductor, unidad, ruta, fecha, periodo, hora, area, pasajeros } = reportToDownload;
        const reportDate = new Date(fecha);
        const pdfFileName = `Reporte_${conductor.replace(/ /g, '_')}_${reportDate.toISOString().split('T')[0]}.pdf`;

        try {
            const doc = new jsPDF();
        
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('REPORTE DE VIAJES DIARIOS', 105, 20, { align: 'center' });
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('PDVSA - PETROBOSCAN', 105, 28, { align: 'center'});
        
            const startY = 35;
            doc.setFillColor(229, 231, 235);
            doc.rect(15, startY, 60, 7, 'F');
            doc.setFontSize(10);
            doc.text('AREA', 45, startY + 5, { align: 'center' });
            doc.rect(15, startY, 60, 14);
            doc.text(area, 45, startY + 12, { align: 'center' });
        
            const mainInfoY = startY + 18;
            doc.rect(15, mainInfoY, 180, 24);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(`CONDUCTOR: ${conductor}`, 17, mainInfoY + 6);
            doc.text(`UNIDAD: ${unidad}`, 150, mainInfoY + 6);
            doc.line(15, mainInfoY + 9, 195, mainInfoY + 9);
        
            const dateY = mainInfoY + 13;
            doc.setFontSize(8);
            doc.text('DIA', 21, dateY);
            doc.text('MES', 31, dateY);
            doc.text('AÑO', 41, dateY);
            doc.text('HORA:', 53, dateY);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(reportDate.getDate().toString(), 21, dateY + 7, { align: 'center' });
            doc.text((reportDate.getMonth() + 1).toString(), 31, dateY + 7, { align: 'center' });
            doc.text(reportDate.getFullYear().toString().slice(-2), 41, dateY + 7, { align: 'center' });
            doc.text(hora, 56, dateY + 7);
        
            doc.setFontSize(10);
            doc.text('AM:', 120, dateY);
            doc.text('PM:', 150, dateY);
            doc.setFont('helvetica', 'bold');
            doc.text(periodo === 'AM' ? 'X' : '', 128, dateY);
            doc.text(periodo === 'PM' ? 'X' : '', 158, dateY);
            doc.text(ruta, 105, dateY + 7, { align: 'center' });
        
            doc.line(26, dateY - 4, 26, mainInfoY + 24);
            doc.line(36, dateY - 4, 36, mainInfoY + 24);
            doc.line(48, dateY - 4, 48, mainInfoY + 24);
        
            const tableBody = pasajeros.slice(0, 20).map((p, index) => [
                index + 1, p.passenger.nombreCompleto, p.passenger.nroCedula, p.passenger.gerencia, p.hora
            ]);
            for (let i = pasajeros.length; i < 20; i++) {
                tableBody.push([i + 1, '', '', '', '']);
            }
        
            (doc as any).autoTable({
                startY: mainInfoY + 25,
                head: [['N°', 'Nombre y Apellido', 'Cédula', 'Gerencia', 'Hora']],
                body: tableBody,
                theme: 'grid',
                headStyles: { fillColor: [229, 231, 235], textColor: [25, 25, 25], fontStyle: 'bold', halign: 'center' },
                styles: { font: 'helvetica', fontSize: 9, cellPadding: 2, },
                columnStyles: {
                    0: { cellWidth: 10, halign: 'center' }, 1: { cellWidth: 60 }, 2: { cellWidth: 30 }, 3: { cellWidth: 'auto' }, 4: { cellWidth: 20, halign: 'center' },
                },
            });
        
            const finalY = (doc as any).lastAutoTable.finalY + 5;
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text('VERIFICADO POR CONTRATISTA', 17, finalY);
            doc.text('VERIFICADO POR CLIENTE', 110, finalY);
            doc.setFont('helvetica', 'normal');
            doc.text('NOMBRE: LEOBALDO MORAN', 17, finalY + 5);
            doc.text('CI: 12.380.111', 17, finalY + 10);
            doc.text('CARGO: SUPERVISOR DE OPERACIONES', 17, finalY + 15);
            doc.text('NOMBRE: POR DEFINIR', 110, finalY + 5);
            doc.text('CI: N/A', 110, finalY + 10);
            doc.text('CARGO: POR DEFINIR', 110, finalY + 15);
            doc.text('FIRMA:', 17, finalY + 25);
            doc.text('FIRMA:', 110, finalY + 25);
            doc.line(30, finalY + 25, 80, finalY + 25);
            doc.line(123, finalY + 25, 173, finalY + 25);
            
            doc.save(pdfFileName);
            console.log('PDF descargado exitosamente.');
        
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            console.error('Error al generar el PDF:', error);
        } finally {
            setIsSending(false);
        }
    };

    const TabButton: React.FC<{ activeView: string, targetView: string, label: string, icon: React.ReactNode, onClick: () => void }> = 
    ({ activeView, targetView, label, icon, onClick }) => {
        const isActive = activeView === targetView;
        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-3 px-4 py-3 font-bold rounded-lg transition-all duration-300 ${
                    isActive
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
                {icon}
                {label}
            </button>
        );
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center p-20"><SpinnerIcon className="w-12 h-12 text-red-600" /></div>;
        }

        switch(view) {
            case 'reports': return <ReportsManagement reports={reports} onDownload={handleDownloadReport} isSending={isSending} />;
            case 'passengers': return <DataManagement<Passenger> 
                title="Pasajeros" 
                data={passengers} 
                columns={['id', 'nombreCompleto', 'nroCedula', 'gerencia']} 
                api={{ add: mockApi.addPassenger, delete: mockApi.deletePassenger, get: mockApi.getPassengers, update: mockApi.updatePassenger }} 
                onUpdate={setPassengers} 
                formFields={['nombreCompleto', 'nroCedula', 'gerencia']}
                onGenerateQR={setQrModalPassenger} 
            />;
            case 'drivers': return <DataManagement<Driver> title="Conductores" data={drivers} columns={['nombreCompleto', 'unidad']} api={{ add: mockApi.addDriver, delete: mockApi.deleteDriver, get: mockApi.getDrivers, update: mockApi.updateDriver }} onUpdate={setDrivers} formFields={['nombreCompleto', 'unidad']} />;
            default: return null;
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Panel de Administración</h2>
            <div className="flex items-center gap-4 p-2 bg-gray-200 rounded-xl">
                 <TabButton activeView={view} targetView="reports" label="Reportes" icon={<LogIcon className="w-6 h-6"/>} onClick={() => setView('reports')} />
                 <TabButton activeView={view} targetView="passengers" label="Pasajeros" icon={<UsersIcon className="w-6 h-6"/>} onClick={() => setView('passengers')} />
                 <TabButton activeView={view} targetView="drivers" label="Conductores" icon={<TruckIcon className="w-6 h-6"/>} onClick={() => setView('drivers')} />
            </div>
            <div>
                {renderContent()}
            </div>
            {qrModalPassenger && <QRCodeModal passenger={qrModalPassenger} onClose={() => setQrModalPassenger(null)} />}
        </div>
    );
};

const ReportsManagement: React.FC<{ reports: Report[], onDownload: (r: Report) => void, isSending: boolean }> = ({ reports, onDownload, isSending }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {reports.length === 0 ? (
            <div className="text-center p-12">
                <LogIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold">No hay reportes para mostrar.</h3>
                <p className="text-gray-500">Los reportes enviados por los conductores aparecerán aquí.</p>
            </div>
        ) : (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruta</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pasajeros</th>
                        <th className="relative px-6 py-4"><span className="sr-only">Descargar</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(report.fecha).toLocaleDateString('es-VE')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.ruta}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.conductor}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center font-bold">{report.pasajeros.length}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onDownload(report)} disabled={isSending} className="text-blue-600 hover:text-blue-800 transition-transform duration-200 hover:scale-125 disabled:text-gray-400 disabled:cursor-wait" title="Descargar PDF">
                                    {isSending ? <SpinnerIcon className="w-6 h-6" /> : <DownloadIcon className="w-6 h-6" />}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);


interface DataManagementProps<T extends { id: string }> {
    title: string;
    data: T[];
    columns: (keyof T)[];
    api: {
        add: (item: Omit<T, 'id'>) => Promise<T>;
        delete: (id: string) => Promise<void>;
        get: () => Promise<T[]>;
        update: (id: string, item: Partial<T>) => Promise<T>;
    };
    onUpdate: (data: T[]) => void;
    showToast?: (message: string, type?: 'success' | 'error') => void;
    formFields: string[];
    onGenerateQR?: (item: T) => void;
}
const DataManagement = <T extends { id: string }>({ title, data, columns, api, onUpdate, showToast = () => {}, formFields, onGenerateQR }: DataManagementProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    
    const isEditing = editingId !== null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({});
        setEditingId(null);
    };

    const handleEditClick = (item: T) => {
        setEditingId(item.id);
        setFormData(item);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formFields.some(field => !(formData as any)[field] || String((formData as any)[field]).trim() === '')) {
            showToast('Por favor, complete todos los campos.', 'error');
            return;
        }
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await api.update(editingId!, formData);
                showToast(`${title.slice(0, -1)} actualizado con éxito.`, 'success');
            } else {
                await api.add(formData as Omit<T, 'id'>);
                showToast(`${title.slice(0, -1)} añadido con éxito.`, 'success');
            }
            const updatedData = await api.get();
            onUpdate(updatedData);
            resetForm();
        } catch (error) {
            showToast(`Error al guardar ${title.slice(0, -1)}.`, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm(`¿Está seguro de que desea eliminar este ${title.slice(0, -1)}?`)) {
            try {
                await api.delete(id);
                const updatedData = await api.get();
                onUpdate(updatedData);
                showToast(`${title.slice(0, -1)} eliminado con éxito.`, 'success');
            } catch (error) {
                showToast(`Error al eliminar ${title.slice(0, -1)}.`, 'error');
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map(col => <th key={String(col)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{String(col).replace(/([A-Z])/g, ' $1').toUpperCase()}</th>)}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map(item => (
                            <tr key={item.id}>
                                {columns.map(col => <td key={String(col)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{String(item[col])}</td>)}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center gap-4">
                                    {onGenerateQR && <button onClick={() => onGenerateQR(item)} className="text-gray-600 hover:text-black transition-transform duration-200 hover:scale-125" title="Generar QR"><QRIcon className="w-5 h-5"/></button>}
                                    <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:text-blue-800 transition-transform duration-200 hover:scale-125" title="Editar"><PencilIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-transform duration-200 hover:scale-125" title="Eliminar"><TrashIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="lg:col-span-1">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
                    <h3 className="text-lg font-bold">{isEditing ? `Editar ${title.slice(0, -1)}` : `Añadir Nuevo ${title.slice(0, -1)}`}</h3>
                    {formFields.map(field => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}</label>
                            <input
                                type="text"
                                name={field}
                                value={(formData as any)[field] || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                    ))}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                         {isEditing && (
                            <button type="button" onClick={resetForm} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all duration-200">
                                Cancelar
                            </button>
                        )}
                        <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-red-300">
                            {isSubmitting ? <SpinnerIcon className="w-5 h-5" /> : (isEditing ? null : <PlusIcon className="w-5 h-5" />)}
                            {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Añadir')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminView;