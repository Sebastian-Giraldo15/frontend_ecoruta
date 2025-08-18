import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from './common';

/**
 * Componente que redirije al dashboard apropiado según el rol del usuario
 */
export const DashboardRedirect: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Rediriger según el rol del usuario
  switch (user.rol) {
    case 'administrador':
      return <Navigate to="/admin" replace />;
    case 'usuario':
      return <Navigate to="/client" replace />;
    case 'empresa_recolectora':
      return <Navigate to="/company" replace />;
    default:
      return <Navigate to="/client" replace />;
  }
};
