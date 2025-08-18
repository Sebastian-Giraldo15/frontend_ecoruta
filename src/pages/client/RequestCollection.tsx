import React, { useState } from 'react';
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

  const wasteTypes = [
    { value: 'plastico', label: 'Plástico' },
    { value: 'papel', label: 'Papel y Cartón' },
    { value: 'vidrio', label: 'Vidrio' },
    { value: 'metal', label: 'Metal' },
    { value: 'organico', label: 'Orgánico' },
    { value: 'electronico', label: 'Electrónico' },
    { value: 'textil', label: 'Textil' },
    { value: 'mixto', label: 'Mixto' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postData(formData);
      navigate('/client/requests');
    } catch (error) {
      console.error('Error creando solicitud:', error);
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
                    <Input
                      label="Ciudad"
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      placeholder="Bogotá"
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
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default RequestCollection;
