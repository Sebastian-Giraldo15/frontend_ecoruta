import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { Button, Input, Select, Textarea, Card, CardBody } from '../../components/common';
import { useAuth } from '../../context/AuthContext';

interface TipoResiduoAPI {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  activo: boolean;
}

interface LocalidadAPI {
  id: number;
  nombre: string;
  departamento: string;
  activa: boolean;
}

interface EmpresaAPI {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  activa: boolean;
}

interface FormData {
  tipo_residuo: string;
  cantidad: number;
  direccion: string;
  telefono: string;
  observaciones: string;
  fecha_programada?: string;
  es_programada: boolean;
  frecuencia?: string;
}

export const RequestCollection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    tipo_residuo: '',
    cantidad: 0,
    direccion: '',
    telefono: '',
    observaciones: '',
    es_programada: false,
    frecuencia: ''
  });

  const [tiposResiduos, setTiposResiduos] = useState<TipoResiduoAPI[]>([]);
  const [localidades, setLocalidades] = useState<LocalidadAPI[]>([]);
  const [empresas, setEmpresas] = useState<EmpresaAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar datos de la API
  const loadData = async () => {
    try {
      setLoadingData(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Cargar tipos de residuos, localidades y empresas en paralelo
      const [tiposResponse, localidadesResponse, empresasResponse] = await Promise.all([
        fetch('/api/tipos-residuos/', { headers }),
        fetch('/api/localidades/', { headers }),
        fetch('/api/empresas/', { headers })
      ]);

      if (!tiposResponse.ok || !localidadesResponse.ok || !empresasResponse.ok) {
        throw new Error('Error al cargar datos de referencia');
      }

      const [tiposData, localidadesData, empresasData] = await Promise.all([
        tiposResponse.json(),
        localidadesResponse.json(),
        empresasResponse.json()
      ]);

      setTiposResiduos(tiposData.results || []);
      setLocalidades(localidadesData.results || []);
      setEmpresas(empresasData.results || []);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
      console.error('Error loading data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Preparar opciones para los selects
  const wasteTypes = tiposResiduos.map(tipo => ({
    value: tipo.id.toString(),
    label: tipo.nombre
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Usuario no autenticado');
      return;
    }

    // Validar campos requeridos
    if (!formData.tipo_residuo) {
      alert('Tipo de residuo es requerido');
      return;
    }
    if (!formData.direccion) {
      alert('Dirección es requerida');
      return;
    }
    if (formData.cantidad <= 0) {
      alert('Cantidad debe ser mayor a 0');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }

      // Preparar datos para envío
      const dataToSend = {
        usuario: user.id, // ID del usuario autenticado
        empresa: empresas[0]?.id || 1, // Usar la primera empresa disponible
        tipo_residuo: Number(formData.tipo_residuo),
        cantidad: Number(formData.cantidad),
        direccion: formData.direccion,
        telefono: formData.telefono,
        observaciones: formData.observaciones,
        es_programada: formData.es_programada,
        ...(formData.es_programada && formData.fecha_programada && {
          fecha_programada: formData.fecha_programada
        }),
        ...(formData.es_programada && formData.frecuencia && {
          frecuencia: formData.frecuencia
        })
      };

      console.log('Enviando solicitud:', dataToSend);

      const response = await fetch('/api/solicitudes/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const result = await response.json();
      console.log('Solicitud creada exitosamente:', result);
      
      alert('¡Solicitud creada exitosamente!');
      navigate('/client/requests');

    } catch (error: any) {
      console.error('Error creando solicitud:', error);
      setError(error.message);
      alert(`Error al crear solicitud: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : 
              type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  if (loadingData) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-gray-500">Cargando formulario...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error: {error}</p>
        <button 
          onClick={loadData} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Solicitar Recolección</h1>
          <p className="mt-1 text-sm text-gray-500">
            Programa la recolección de tus residuos reciclables
          </p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de Residuo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ScaleIcon className="h-4 w-4 inline mr-1" />
                  Tipo de Residuo *
                </label>
                <Select
                  name="tipo_residuo"
                  value={formData.tipo_residuo}
                  onChange={handleInputChange}
                  options={[
                    { value: '', label: 'Selecciona un tipo de residuo' },
                    ...wasteTypes
                  ]}
                  required
                />
              </div>

              {/* Cantidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad estimada (kg) *
                </label>
                <Input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad || ''}
                  onChange={handleInputChange}
                  placeholder="Ejemplo: 5.5"
                  step="0.1"
                  min="0.1"
                  required
                />
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="h-4 w-4 inline mr-1" />
                  Dirección de recolección *
                </label>
                <Input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Calle, número, detalles de ubicación"
                  required
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono de contacto
                </label>
                <Input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Número de contacto"
                />
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones
                </label>
                <Textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  placeholder="Información adicional sobre la recolección"
                  rows={3}
                />
              </div>

              {/* Programación */}
              <div className="border-t pt-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="es_programada"
                    checked={formData.es_programada}
                    onChange={(e) => handleCheckboxChange('es_programada', e.target.checked)}
                    className="h-4 w-4 text-eco-600 focus:ring-eco-500 border-gray-300 rounded"
                  />
                  <label htmlFor="es_programada" className="ml-2 block text-sm text-gray-700">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />
                    Programar recolección
                  </label>
                </div>

                {formData.es_programada && (
                  <div className="space-y-4 ml-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha programada
                      </label>
                      <Input
                        type="datetime-local"
                        name="fecha_programada"
                        value={formData.fecha_programada || ''}
                        onChange={handleInputChange}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frecuencia
                      </label>
                      <Select
                        name="frecuencia"
                        value={formData.frecuencia || ''}
                        onChange={handleInputChange}
                        options={[
                          { value: '', label: 'Sin frecuencia específica' },
                          { value: 'semanal', label: 'Semanal' },
                          { value: 'quincenal', label: 'Quincenal' },
                          { value: 'mensual', label: 'Mensual' }
                        ]}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex space-x-4 pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/client')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="flex-1"
                >
                  {loading ? 'Creando...' : 'Crear Solicitud'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default RequestCollection;
