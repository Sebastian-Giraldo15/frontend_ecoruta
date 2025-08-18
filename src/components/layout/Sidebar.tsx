import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { classNames } from '../../utils';
import { useAuth } from '../../context/AuthContext';

// Tipos para elementos de navegación del sidebar
interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente Sidebar para dashboards
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Navegación según tipo de usuario
  const getSidebarItems = (): SidebarItem[] => {
    if (!user) return [];

    switch (user.tipo_usuario) {
      case 'cliente':
        return [
          { name: 'Dashboard', href: '/client/dashboard', icon: '📊' },
          { name: 'Solicitar Recolección', href: '/client/request', icon: '📋' },
          { name: 'Mis Solicitudes', href: '/client/requests', icon: '📝' },
          { name: 'Recompensas', href: '/client/rewards', icon: '🎁' },
          { name: 'Intercambios', href: '/client/exchanges', icon: '🔄' },
          { name: 'Mi Perfil', href: '/client/profile', icon: '👤' },
        ];
      case 'empresa_recolectora':
        return [
          { name: 'Dashboard', href: '/company/dashboard', icon: '📊' },
          { name: 'Solicitudes Asignadas', href: '/company/requests', icon: '📋' },
          { name: 'Planificar Rutas', href: '/company/routes', icon: '🗺️' },
          { name: 'Historial', href: '/company/history', icon: '📚' },
          { name: 'Mi Empresa', href: '/company/profile', icon: '🏢' },
        ];
      case 'administrador':
        return [
          { name: 'Panel General', href: '/admin/dashboard', icon: '⚙️' },
          { name: 'Gestión de Usuarios', href: '/admin/users', icon: '👥' },
          { name: 'Gestión de Empresas', href: '/admin/companies', icon: '🏢' },
          { name: 'Gestión de Recompensas', href: '/admin/rewards', icon: '🎁' },
          { name: 'Reportes y Estadísticas', href: '/admin/reports', icon: '📈' },
          { name: 'Configuración', href: '/admin/settings', icon: '⚙️' },
        ];
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  const isActiveRoute = (href: string) => {
    return location.pathname === href || 
           (href !== '/' && location.pathname.startsWith(href));
  };

  const getTitleByUserType = () => {
    switch (user?.tipo_usuario) {
      case 'cliente':
        return 'Panel de Cliente';
      case 'empresa_recolectora':
        return 'Panel de Empresa';
      case 'administrador':
        return 'Panel de Administrador';
      default:
        return 'Panel';
    }
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={classNames(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0',
          'md:flex md:flex-col md:w-64'
        )}
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-eco-600 to-ocean-600">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-eco-600 font-bold text-lg">E</span>
            </div>
            <span className="text-white font-bold text-lg">EcoRuta</span>
          </Link>
          
          {/* Botón cerrar para móvil */}
          <button
            onClick={onClose}
            className="md:hidden text-white hover:bg-white hover:bg-opacity-20 rounded-md p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Información del usuario */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-eco-400 to-ocean-400 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.first_name || user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {getTitleByUserType()}
              </p>
            </div>
          </div>
          
          {/* Puntos para clientes */}
          {user?.tipo_usuario === 'cliente' && user.puntos !== undefined && (
            <div className="mt-3 flex items-center justify-center bg-eco-50 rounded-lg p-2">
              <span className="text-eco-600 text-sm font-medium">
                {user.puntos} puntos EcoRuta
              </span>
              <span className="ml-1 text-eco-500">🌟</span>
            </div>
          )}
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={classNames(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                isActiveRoute(item.href)
                  ? 'bg-eco-100 text-eco-900 border-r-2 border-eco-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span
                  className={classNames(
                    'ml-3 inline-block py-0.5 px-2 text-xs rounded-full',
                    isActiveRoute(item.href)
                      ? 'bg-eco-200 text-eco-800'
                      : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer del sidebar */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>EcoRuta © 2024</p>
            <p>Versión 1.0.0</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
