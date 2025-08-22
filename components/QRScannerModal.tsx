import React, { useEffect, useRef } from 'react';
import { QRIcon } from './Icons';

interface QRScannerModalProps {
    onClose: () => void;
    onScanSuccess: (decodedText: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onClose, onScanSuccess }) => {
    const scannerRef = useRef<any | null>(null);

    useEffect(() => {
        // Safety check to ensure the library is loaded from the CDN
        if (typeof window.Html5QrcodeScanner === 'undefined') {
            console.error("Html5QrcodeScanner library is not loaded.");
            // Optionally, display an error message to the user here
            return;
        }

        const scanner = new window.Html5QrcodeScanner(
            'qr-reader', 
            { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                supportedScanTypes: [0] // SCAN_TYPE_CAMERA
            },
            /* verbose= */ false
        );
        scannerRef.current = scanner;

        const handleSuccess = (decodedText: string, decodedResult: any) => {
            onScanSuccess(decodedText);
        };

        const handleError = (errorMessage: string) => {
            // This callback is called frequently, so we can ignore most errors.
            // console.warn(`QR scan error: ${errorMessage}`);
        };

        scanner.render(handleSuccess, handleError);

        // Cleanup function to stop the scanner when the component unmounts
        return () => {
            if (scannerRef.current && typeof scannerRef.current.clear === 'function') {
                scannerRef.current.clear().catch((error: any) => {
                    // This can fail if the scanner is already stopped. We can ignore the error.
                    console.warn("QRScannerModal: failed to clear scanner on unmount.", error);
                });
            }
        };
    }, [onScanSuccess]);

    return (
         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4 transform transition-all" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center justify-center mb-5">
                    <div className="bg-gray-800 p-4 rounded-full">
                        <QRIcon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mt-4 mb-2">Escanear Código QR</h2>
                    <p className="text-gray-500 text-center">Apunte la cámara al código QR del pasajero.</p>
                </div>
                
                <div id="qr-reader" className="w-full rounded-lg overflow-hidden border-4 border-gray-300"></div>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRScannerModal;