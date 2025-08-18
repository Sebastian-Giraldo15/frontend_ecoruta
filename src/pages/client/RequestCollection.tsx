import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { Button, Input, Select, Textarea, Card, CardBody } from '../../components/common';
import { CollectionRequestFormData } from '../../types';
import { useApi } from '../../hooks';

export const RequestCollection: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CollectionRequestFormData>({
    tipo_residuo: '',
    descripcion: '',
    peso_estimado: 0,
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    fecha_programada: '',
  });

  const { postData, loading, error } = useApi('/solicitudes/');
  const { data: tiposResiduos, loading: loadingTipos, fetchData: fetchTipos } = useApi<{results: any[]}>('/tipos-residuos/');
  const { data: localidades, loading: loadingLocalidades, fetchData: fetchLocalidades } = useApi<{results: any[]}>('/localidades/');
  const { data: empresas, loading: loadingEmpresas, fetchData: fetchEmpresas } = useApi<{results: any[]}>('/empresas/');

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('=== CARGANDO DATOS ===');
        await Promise.all([
          fetchTipos(),
          fetchLocalidades(),
          fetchEmpresas()
        ]);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };
    
    loadData();
  }, []);

  // Debug de datos
  useEffect(() => {
    console.log('=== DEBUG DATOS ===');
    console.log('tiposResiduos:', tiposResiduos);
    console.log('loadingTipos:', loadingTipos);
    console.log('localidades:', localidades);
    console.log('loadingLocalidades:', loadingLocalidades);
  }, [tiposResiduos, localidades, loadingTipos, loadingLocalidades]);

  const wasteTypes = tiposResiduos?.results?.map(tipo => ({
    value: tipo.id.toString(),
    label: tipo.nombre
  })) || [];

  const localities = localidades?.results?.map(localidad => ({
    value: localidad.id.toString(),
    label: localidad.nombre
  })) || [];

  console.log('=== OPCIONES PREPARADAS ===');
  console.log('wasteTypes:', wasteTypes);
  console.log('localities:', localities);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== ENVIANDO SOLICITUD ===');
    console.log('FormData:', formData);
    
    // Validar campos requeridos
    if (!formData.tipo_residuo) {
      console.error('Tipo de residuo es requerido');
      return;
    }
    if (!formData.direccion) {
      console.error('Dirección es requerida');
      return;
    }
    if (!formData.ciudad) {
      console.error('Ciudad es requerida');
      return;
    }
    if (formData.peso_estimado <= 0) {
      console.error('Peso estimado debe ser mayor a 0');
      return;
    }
    
    // Preparar datos para envío - convertir a los tipos que espera el backend
    const dataToSend: any = {
      usuario: 1, // ID del usuario autenticado (deberías obtenerlo del contexto de auth)
      empresa: empresas?.results?.[0]?.id || 1, // Usar la primera empresa disponible o 1 por defecto
      tipo_residuo: Number(formData.tipo_residuo), // Convertir a ID numérico
      descripcion: formData.descripcion,
      peso_estimado: Number(formData.peso_estimado),
      direccion: formData.direccion,
      localidad: Number(formData.ciudad), // Convertir ciudad a localidad_id
      codigo_postal: formData.codigo_postal
    };
    
    // Solo agregar fecha_programada si tiene valor
    if (formData.fecha_programada) {
      dataToSend.fecha_programada = formData.fecha_programada;
    }
    
    console.log('Data to send:', JSON.stringify(dataToSend, null, 2));
    
    try {
      const result = await postData(dataToSend);
      console.log('Solicitud creada exitosamente:', result);
      navigate('/client/requests');
    } catch (error: any) {
      console.error('Error creando solicitud:', error);
      console.error('Error response status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      console.error('Error full response:', error.response);
      
      // Intentar obtener más detalles del error
      let errorMessage = 'Error desconocido';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === 'object') {
          errorMessage = JSON.stringify(error.response.data, null, 2);
        }
      } else {
        errorMessage = error.message;
      }
      
      alert(`Error al crear solicitud: ${errorMessage}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'peso_estimado' ? Number(value) : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Solicitar Recolección
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Programa la recolección de tus residuos de forma fácil y rápida
          </p>
        </div>

        <Card>
          <CardBody>
            {(loadingTipos || loadingLocalidades || loadingEmpresas) ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-eco-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Cargando formulario...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4 border border-red-200">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

              <Select
                label="Tipo de Residuo"
                name="tipo_residuo"
                value={formData.tipo_residuo}
                onChange={handleInputChange}
                options={wasteTypes}
                placeholder="Selecciona el tipo de residuo"
                required
              />

              <Input
                label="Peso Estimado (kg)"
                type="number"
                name="peso_estimado"
                value={formData.peso_estimado || ''}
                onChange={handleInputChange}
                placeholder="0"
                min="0.1"
                step="0.1"
                required
                leftIcon={<ScaleIcon className="h-5 w-5" />}
              />

              <Textarea
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Describe brevemente el contenido a recolectar"
                rows={3}
                helpText="Incluye detalles que ayuden a la empresa recolectora"
              />

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  Información de Ubicación
                </h3>
                
                <div className="space-y-4">
                  <Input
                    label="Dirección Completa"
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Calle 123 # 45-67, Barrio Centro"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Localidad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      options={localities}
                      placeholder="Selecciona una localidad"
                      required
                    />
                    <Input
                      label="Código Postal"
                      type="text"
                      name="codigo_postal"
                      value={formData.codigo_postal}
                      onChange={handleInputChange}
                      placeholder="110111"
                    />
                  </div>
                </div>
              </div>

              <Input
                label="Fecha Programada (Opcional)"
                type="datetime-local"
                name="fecha_programada"
                value={formData.fecha_programada}
                onChange={handleInputChange}
                leftIcon={<CalendarIcon className="h-5 w-5" />}
                helpText="Si no seleccionas fecha, se asignará automáticamente"
              />

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/client/dashboard')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                >
                  Solicitar Recolección
                </Button>
              </div>
            </form>
            )}
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default RequestCollection;
