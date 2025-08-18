import React from 'react';

/**
 * Componente de utilidades de desarrollo para limpiar datos de autenticación
 */
export const AuthDebugUtils: React.FC = () => {
  const clearAuthData = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    console.log('Datos de autenticación limpiados');
    window.location.reload();
  };

  const showAuthData = () => {
    console.log('=== DATOS DE AUTENTICACIÓN ===');
    console.log('access_token:', localStorage.getItem('access_token'));
    console.log('refresh_token:', localStorage.getItem('refresh_token'));
    console.log('user:', localStorage.getItem('user'));
  };

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      zIndex: 9999,
      background: '#f0f0f0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '12px'
    }}>
      <h4>Debug Auth</h4>
      <button onClick={clearAuthData} style={{ marginRight: '5px', padding: '5px' }}>
        Limpiar Auth
      </button>
      <button onClick={showAuthData} style={{ padding: '5px' }}>
        Ver Auth
      </button>
    </div>
  );
};
