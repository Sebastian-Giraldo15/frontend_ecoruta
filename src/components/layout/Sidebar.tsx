import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon,
  UserIcon,
  UsersIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ArrowPathIcon,
  ChartBarIcon,
  GiftIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  ArrowsRightLeftIcon,
  ClockIcon,
  MapIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { classNames } from '../../utils';
import { useAuth } from '../../context/AuthContext';
import type { SidebarItem } from '../../types/navigation.types';
import { 
  adminLinks, 
  clientLinks, 
  companyLinks, 
  commonLinks 
} from '../../constants/navigation';

// Props del componente
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mapeo de strings de íconos a componentes de Heroicons
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'dashboard': HomeIcon,
    'home': HomeIcon,
    'user': UserIcon,
    'users': UsersIcon,
    'building': BuildingOfficeIcon,
    'map-pin': MapPinIcon,
    'recycle': ArrowPathIcon,
    'chart-bar': ChartBarIcon,
    'gift': GiftIcon,
    'truck': TruckIcon,
    'clipboard-list': ClipboardDocumentListIcon,
    'exchange': ArrowsRightLeftIcon,
    'history': ClockIcon,
    'map': MapIcon,
    'bell': BellIcon
  };
  
  const IconComponent = iconMap[iconName] || HomeIcon;
  return <IconComponent className="h-5 w-5" />;
};

/**
 * Componente Sidebar para dashboards
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Navegación según rol de usuario
  const getSidebarItems = (): SidebarItem[] => {
    if (!user) return [];

    let items: SidebarItem[] = [];

    switch (user.rol) {
      case 'administrador':
        items = [...adminLinks];
        break;
      case 'usuario':
        items = [...clientLinks];
        break;
      case 'empresa_recolectora':
        items = [...companyLinks];
        break;
      default:
        return [];
    }

    // Agregar enlaces comunes para todos los usuarios
    return [...items, ...commonLinks];
  };

  const sidebarItems = getSidebarItems();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const getTitleByUserRole = () => {
    switch (user?.rol) {
      case 'usuario':
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
      {/* Overlay para todas las pantallas */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-40"
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
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'flex flex-col w-64'
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
                {user?.nombre?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.nombre} {user?.apellido}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {getTitleByUserRole()}
              </p>
            </div>
          </div>
          
          {/* Puntos para clientes */}
          {user?.rol === 'usuario' && user.puntos_acumulados !== undefined && (
            <div className="mt-3 flex items-center justify-center bg-eco-50 rounded-lg p-2">
              <span className="text-eco-600 text-sm font-medium">
                {user.puntos_acumulados} puntos EcoRuta
              </span>
              <span className="ml-1 text-eco-500">🌟</span>
            </div>
          )}
        </div>

        {/* Navegación estática sin scroll */}
        <nav className="flex-1 px-4 py-4 space-y-2">
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
              <span className="mr-3">{getIconComponent(item.icon)}</span>
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
