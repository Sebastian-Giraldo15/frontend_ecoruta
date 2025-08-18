// NOTA: Este archivo necesita ser revisado y ajustado según los tipos finales de la API
// Temporalmente comentado para permitir la compilación del proyecto

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/common';

export const Notificaciones = () => {
  const [loading] = useState(false);

  useEffect(() => {
    // TODO: Implementar carga de notificaciones cuando la API esté lista
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notificaciones</h1>
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        Esta funcionalidad está en desarrollo. Será habilitada próximamente.
      </div>
    </div>
  );
};

export default Notificaciones;
