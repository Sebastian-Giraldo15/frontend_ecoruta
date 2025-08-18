import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../types';
import { LoadingPage } from './common';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: UserType;
}

/**
 * Componente para proteger rutas que requieren autenticación
 * y opcionalmente un tipo específico de usuario
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
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

  // Verificar tipo de usuario si es requerido
  if (requiredUserType && user?.tipo_usuario !== requiredUserType) {
    // Redirigir al dashboard correcto según el tipo de usuario
    let redirectPath = '/';
    if (user) {
      switch (user.tipo_usuario) {
        case 'cliente':
          redirectPath = '/client/dashboard';
          break;
        case 'empresa_recolectora':
          redirectPath = '/company/dashboard';
          break;
        case 'administrador':
          redirectPath = '/admin/dashboard';
          break;
      }
    }
    return <Navigate to={redirectPath} replace />;
  }

  // Renderizar el componente hijo si todo está bien
  return <>{children}</>;
};

export default ProtectedRoute;
