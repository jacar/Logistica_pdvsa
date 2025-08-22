import React, { useState } from 'react';
import type { Passenger, Report, Driver, User } from './types';
import { PASSENGER_DATABASE, DRIVER_DATABASE } from './data/mockData';
import Header from './components/Header';
import { ErrorIcon, PdvsaLogo, LockClosedIcon, SpinnerIcon } from './components/Icons';
import AdminView from './components/AdminView';
import DriverView from './components/DriverView';
import HomeView from './components/HomeView';
import DriverSelectionView from './components/DriverSelectionView';

// --- Mock API Service ---
// Simulates a backend for storing data and handling authentication.
const mockApi = {
  reports: [] as Report[],
  passengers: [...PASSENGER_DATABASE] as Passenger[],
  drivers: [...DRIVER_DATABASE] as Driver[],

  login: async (user: string, pass: string): Promise<User> => {
    await new Promise(res => setTimeout(res, 600)); 
    // Admin check ONLY
    if (user === 'petroboscan' && pass === 'petroboscan2025') {
      return { id: 'admin', name: 'Administrador', role: 'admin' };
    }
    throw new Error('Usuario o contraseña incorrectos.');
  },

  getReports: async (): Promise<Report[]> => {
    await new Promise(res => setTimeout(res, 300));
    return [...mockApi.reports].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  },

  submitReport: async (report: Report): Promise<Report> => {
    await new Promise(res => setTimeout(res, 300));
    const newReportWithId = { ...report, id: `rep_${Date.now()}`};
    mockApi.reports.unshift(newReportWithId);
    return newReportWithId;
  },

  getPassengers: async (): Promise<Passenger[]> => {
      await new Promise(res => setTimeout(res, 200));
      return [...mockApi.passengers];
  },
  addPassenger: async (passenger: Omit<Passenger, 'id'>): Promise<Passenger> => {
      await new Promise(res => setTimeout(res, 400));
      // Generar un ID único combinando timestamp y cédula
      const timestamp = Date.now();
      const uniqueId = `P${timestamp}_${passenger.nroCedula}`;
      const newPassenger = { ...passenger, id: uniqueId };
      mockApi.passengers.push(newPassenger);
      return newPassenger;
  },
  deletePassenger: async (id: string): Promise<void> => {
      await new Promise(res => setTimeout(res, 400));
      mockApi.passengers = mockApi.passengers.filter(p => p.id !== id);
  },
  findPassengerByCedula: async (cedula: string): Promise<Passenger | undefined> => {
      await new Promise(res => setTimeout(res, 100));
      return mockApi.passengers.find(p => p.nroCedula === cedula);
  },
  findPassengerById: async (id: string): Promise<Passenger | undefined> => {
      await new Promise(res => setTimeout(res, 100));
      return mockApi.passengers.find(p => p.id === id);
  },

  getDrivers: async (): Promise<Driver[]> => {
      await new Promise(res => setTimeout(res, 200));
      return [...mockApi.drivers];
  },
  addDriver: async (driver: Omit<Driver, 'id'>): Promise<Driver> => {
      await new Promise(res => setTimeout(res, 400));
      const newDriver = { ...driver, id: `drv_${Date.now()}` };
      mockApi.drivers.push(newDriver);
      return newDriver;
  },
  deleteDriver: async (id: string): Promise<void> => {
      await new Promise(res => setTimeout(res, 400));
      mockApi.drivers = mockApi.drivers.filter(d => d.id !== id);
  },
  updatePassenger: async (id: string, passengerData: Partial<Passenger>): Promise<Passenger> => {
      await new Promise(res => setTimeout(res, 400));
      const index = mockApi.passengers.findIndex(p => p.id === id);
      if (index === -1) throw new Error("Passenger not found");
      const updated = { ...mockApi.passengers[index], ...passengerData };
      mockApi.passengers[index] = updated;
      return updated;
  },
  updateDriver: async (id: string, driverData: Partial<Driver>): Promise<Driver> => {
      await new Promise(res => setTimeout(res, 400));
      const index = mockApi.drivers.findIndex(d => d.id === id);
      if (index === -1) throw new Error("Driver not found");
      const updated = { ...mockApi.drivers[index], ...driverData };
      mockApi.drivers[index] = updated;
      return updated;
  }
};

export { mockApi };


// --- Login Component (For Admin only) ---

const LoginView: React.FC<{ onLogin: (user: User) => void; onBackToHome: () => void; }> = ({ onLogin, onBackToHome }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await mockApi.login(username, password);
            onLogin(user);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-sm mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                    <div className="flex flex-col items-center mb-6">
                        <PdvsaLogo className="w-16 h-16 mb-3"/>
                        <h1 className="text-2xl font-bold text-gray-800">Acceso Administrador</h1>
                        <p className="text-gray-500">Ingrese sus credenciales</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                   <LockClosedIcon className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
                               <ErrorIcon className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || !username || !password}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 disabled:bg-red-300 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <SpinnerIcon className="w-5 h-5" /> : null}
                                {isLoading ? 'Verificando...' : 'Ingresar'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <button onClick={onBackToHome} className="text-sm text-gray-600 hover:text-red-600 font-medium transition-colors">
                        &larr; Volver a la página principal
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

type View = 'home' | 'login' | 'driverSelection' | 'loggedIn';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const handleLoginSuccess = (user: User) => {
        setCurrentUser(user);
        setView('loggedIn');
    };

    const handleDriverSelect = (driver: Driver) => {
        const user: User = {
            id: driver.id,
            name: driver.nombreCompleto,
            role: 'driver',
            details: driver,
        };
        setCurrentUser(user);
        setView('loggedIn');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('home');
    };

    const renderView = () => {
        switch (view) {
            case 'home':
                return <HomeView 
                    onNavigateToAdminLogin={() => setView('login')} 
                    onNavigateToDriverSelection={() => setView('driverSelection')}
                />;
            
            case 'login':
                return <LoginView onLogin={handleLoginSuccess} onBackToHome={() => setView('home')} />;
            
            case 'driverSelection':
                return <DriverSelectionView onDriverSelect={handleDriverSelect} onBackToHome={() => setView('home')} />;

            case 'loggedIn':
                if (currentUser) {
                    return (
                        <div className="min-h-screen bg-gray-100 font-sans">
                            <Header 
                                user={currentUser}
                                onLogout={handleLogout}
                            />
                            <main className="container mx-auto p-4 md:p-8">
                               {currentUser.role === 'admin' && <AdminView />}
                               {currentUser.role === 'driver' && currentUser.details && <DriverView driver={currentUser.details} />}
                            </main>
                        </div>
                    );
                }
                // Fallback if state is inconsistent
                setView('login');
                return null;

            default:
                setView('home');
                return null;
        }
    };
    
    return renderView();
};

export default App;
