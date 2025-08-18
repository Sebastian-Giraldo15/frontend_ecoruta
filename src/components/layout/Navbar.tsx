import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon, 
  CogIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common';
import { classNames } from '../../utils';

/**
 * Componente Navbar responsivo con navegación por tipo de usuario
 */
export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Navegación según tipo de usuario
  const getNavigationItems = () => {
    if (!isAuthenticated || !user) {
      return [
        { name: 'Inicio', href: '/', icon: '🏠' },
        { name: 'Nosotros', href: '/about', icon: '🌱' },
        { name: 'Servicios', href: '/services', icon: '♻️' },
        { name: 'Contacto', href: '/contact', icon: '📞' },
      ];
    }

    switch (user.rol) {
      case 'usuario':
        return [
          { name: 'Dashboard', href: '/client/dashboard', icon: '📊' },
          { name: 'Solicitar Recolección', href: '/client/request', icon: '📋' },
          { name: 'Mis Solicitudes', href: '/client/requests', icon: '📝' },
          { name: 'Recompensas', href: '/client/rewards', icon: '🎁' },
          { name: 'Intercambios', href: '/client/exchanges', icon: '🔄' },
        ];
      case 'empresa_recolectora':
        return [
          { name: 'Dashboard', href: '/company/dashboard', icon: '📊' },
          { name: 'Solicitudes', href: '/company/requests', icon: '📋' },
          { name: 'Rutas', href: '/company/routes', icon: '🗺️' },
          { name: 'Historial', href: '/company/history', icon: '📚' },
        ];
      case 'administrador':
        return [
          { name: 'Panel Admin', href: '/admin/dashboard', icon: '⚙️' },
          { name: 'Usuarios', href: '/admin/users', icon: '👥' },
          { name: 'Empresas', href: '/admin/companies', icon: '🏢' },
          { name: 'Recompensas', href: '/admin/rewards', icon: '🎁' },
          { name: 'Reportes', href: '/admin/reports', icon: '📈' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href || 
           (href !== '/' && location.pathname.startsWith(href));
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y navegación principal */}
          <div className="flex">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-eco-500 to-ocean-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-gradient">EcoRuta</span>
              </motion.div>
            </Link>

            {/* Navegación desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200',
                    isActiveRoute(item.href)
                      ? 'border-eco-500 text-eco-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Acciones de usuario */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* Puntos del usuario (solo para clientes) */}
                {user.rol === 'usuario' && user.puntos_acumulados !== undefined && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-eco-50 rounded-full">
                    <span className="text-eco-600 text-sm font-medium">
                      {user.puntos_acumulados} puntos
                    </span>
                    <span className="text-eco-500">🌟</span>
                  </div>
                )}

                {/* Dropdown de perfil */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 text-sm rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-500"
                  >
                    <UserCircleIcon className="h-8 w-8" />
                    <span className="text-gray-700 font-medium">
                      {user.nombre} {user.apellido}
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <UserCircleIcon className="mr-3 h-4 w-4" />
                            Mi Perfil
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <CogIcon className="mr-3 h-4 w-4" />
                            Configuración
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              /* Botones de login/registro */
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-eco-500"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white border-t border-gray-200"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200',
                    isActiveRoute(item.href)
                      ? 'bg-eco-50 border-eco-500 text-eco-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Sección de usuario móvil */}
            {isAuthenticated && user ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.nombre} {user.apellido}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Configuración
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200 space-y-1 px-4">
                <Link
                  to="/login"
                  className="block w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="secondary" fullWidth>
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link
                  to="/register"
                  className="block w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="primary" fullWidth>
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
