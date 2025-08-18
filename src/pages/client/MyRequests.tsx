import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Badge, Button, Pagination, LoadingSpinner, Modal } from '../../components/common';
import { CollectionRequest } from '../../types';
import { useApi, usePagination } from '../../hooks';
import { formatDate } from '../../utils';
import { 
  MapPinIcon, 
  CalendarIcon, 
  ScaleIcon, 
  TruckIcon, 
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export const MyRequests: React.FC = () => {
  const { data: requestsResponse, loading, error, fetchData } = useApi<{count: number, results: CollectionRequest[]}>('/solicitudes/');
  const pagination = usePagination(1, 10);
  const [selectedRequest, setSelectedRequest] = useState<CollectionRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const requests = requestsResponse?.results || [];

  const handleViewDetails = (request: CollectionRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'completada':
      case 'recolectada':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pendiente':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'cancelada':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'completada':
      case 'recolectada':
        return 'text-green-600 bg-green-50';
      case 'pendiente':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelada':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  useEffect(() => {
    const loadRequests = async () => {
      try {
        console.log('Loading requests...');
        console.log('Access token:', localStorage.getItem('accessToken')?.substring(0, 20) + '...');
        console.log('Refresh token:', localStorage.getItem('refreshToken')?.substring(0, 20) + '...');
        
        await fetchData({ 
          page: pagination.currentPage, 
          page_size: pagination.pageSize 
        });
        console.log('Requests loaded successfully');
      } catch (err) {
        console.error('Error loading requests:', err);
        // No hacer nada aquí, el error ya se maneja en useApi
      }
    };
    
    loadRequests();
  }, [pagination.currentPage]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mis Solicitudes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Historial y estado de todas tus solicitudes de recolección
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">Error al cargar solicitudes: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {requests?.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {request.tipo_residuo}
                          </h3>
                          <Badge variant="status" status={request.estado}>
                            {request.estado}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{request.descripcion}</p>
                        <div className="text-sm text-gray-500">
                          <p>Peso: {request.peso_estimado} kg</p>
                          <p>Solicitado: {formatDate(request.fecha_solicitud)}</p>
                          {request.fecha_completada && (
                            <p>Completado: {formatDate(request.fecha_completada)}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {request.puntos_otorgados && (
                          <p className="text-eco-600 font-semibold">
                            +{request.puntos_otorgados} puntos
                          </p>
                        )}
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handleViewDetails(request)}
                        >
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
            
            {requests && requests.length > 0 && requestsResponse && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={Math.ceil(requestsResponse.count / pagination.pageSize)}
                onPageChange={pagination.goToPage}
              />
            )}
          </div>
        )}
      </motion.div>

      {/* Modal de Detalles */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Detalles de la Solicitud">
        {selectedRequest && (
          <div className="space-y-6">
            {/* Estado y Información Básica */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(selectedRequest.estado)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Solicitud #{selectedRequest.id}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.estado)}`}>
                    {selectedRequest.estado}
                  </span>
                </div>
              </div>
              {selectedRequest.puntos_otorgados && (
                <div className="text-right">
                  <p className="text-eco-600 font-semibold text-lg">
                    +{selectedRequest.puntos_otorgados} puntos
                  </p>
                  <p className="text-xs text-gray-500">Puntos ganados</p>
                </div>
              )}
            </div>

            {/* Información del Residuo */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <ScaleIcon className="h-5 w-5 mr-2" />
                Información del Residuo
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tipo de Residuo</p>
                  <p className="font-medium text-gray-900">{selectedRequest.tipo_residuo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Peso Estimado</p>
                  <p className="font-medium text-gray-900">{selectedRequest.peso_estimado} kg</p>
                </div>
                {selectedRequest.peso_kg && (
                  <div>
                    <p className="text-sm text-gray-500">Peso Real</p>
                    <p className="font-medium text-gray-900">{selectedRequest.peso_kg} kg</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Descripción</p>
                  <p className="font-medium text-gray-900">{selectedRequest.descripcion}</p>
                </div>
              </div>
            </div>

            {/* Información de Ubicación */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Ubicación
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Dirección</p>
                  <p className="font-medium text-gray-900">{selectedRequest.direccion}</p>
                </div>
                {selectedRequest.ciudad && (
                  <div>
                    <p className="text-sm text-gray-500">Ciudad</p>
                    <p className="font-medium text-gray-900">{selectedRequest.ciudad}</p>
                  </div>
                )}
                {selectedRequest.codigo_postal && (
                  <div>
                    <p className="text-sm text-gray-500">Código Postal</p>
                    <p className="font-medium text-gray-900">{selectedRequest.codigo_postal}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Información de Fechas */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Cronología
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Solicitud creada</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(selectedRequest.fecha_solicitud)}
                  </span>
                </div>
                {selectedRequest.fecha_programada && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Programada para</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedRequest.fecha_programada)}
                    </span>
                  </div>
                )}
                {selectedRequest.fecha_recoleccion && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Recolectada el</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedRequest.fecha_recoleccion)}
                    </span>
                  </div>
                )}
                {selectedRequest.fecha_completada && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Completada el</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedRequest.fecha_completada)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Información Adicional */}
            {(selectedRequest.observaciones || selectedRequest.numero_turno) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Información Adicional
                </h4>
                <div className="space-y-2">
                  {selectedRequest.observaciones && (
                    <div>
                      <p className="text-sm text-gray-500">Observaciones</p>
                      <p className="font-medium text-gray-900">{selectedRequest.observaciones}</p>
                    </div>
                  )}
                  {selectedRequest.numero_turno && (
                    <div>
                      <p className="text-sm text-gray-500">Número de Turno</p>
                      <p className="font-medium text-gray-900">#{selectedRequest.numero_turno}</p>
                    </div>
                  )}
                  {selectedRequest.empresa && (
                    <div>
                      <p className="text-sm text-gray-500">Empresa Recolectora</p>
                      <p className="font-medium text-gray-900">{selectedRequest.empresa}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary" onClick={closeModal}>
                Cerrar
              </Button>
              {selectedRequest.estado === 'pendiente' && (
                <Button variant="primary">
                  Editar Solicitud
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyRequests;
