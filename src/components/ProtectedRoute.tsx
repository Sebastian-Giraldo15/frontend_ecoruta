import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ProtectedRouteProps, UserRole } from '../types/navigation.types';
import { LoadingPage } from './common';

const roleRoutes: Record<UserRole, string> = {
  administrador: '/admin',
  usuario: '/client',
  empresa_recolectora: '/company'
};

/**
 * Componente para proteger rutas que requieren autenticación
 * y opcionalmente un rol específico de usuario
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingPage message="Verificando permisos..." />;
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar rol de usuario si es requerido
  if (requiredRole && user?.rol !== requiredRole) {
    const redirectPath = user?.rol ? roleRoutes[user.rol] : '/client';
    return <Navigate to={redirectPath} replace />;
  }

  // Renderizar el componente hijo si todo está bien
  return <>{children}</>;
};

export default ProtectedRoute;
