import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Bars3Icon, UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

/**
 * Layout principal para dashboards con sidebar
 */
export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header superior fijo */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Botón menú - ahora visible en todas las pantallas */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-eco-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            {/* Logo/título centrado */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-eco-500 to-ocean-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-gray-900">EcoRuta</span>
            </div>
            
            {/* Barra de navegación derecha */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-500">
                <BellIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.nombre} {user?.apellido}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Contenido principal sin espacios excesivos */}
      <div className="w-full">
        {/* Contenido de la página con margen superior para el header fijo */}
        <main className="px-2 py-0 md:px-4 lg:px-6 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
