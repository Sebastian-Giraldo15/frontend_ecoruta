import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Badge, Button, Pagination, LoadingSpinner, Modal } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
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

// Tipos basados en la estructura real de la API
interface SolicitudAPI {
  id: number;
  fecha_solicitud: string;
  fecha_programada?: string;
  fecha_recoleccion?: string;
  estado: string;
  es_programada: boolean;
  frecuencia?: string;
  peso_kg?: number;
  observaciones?: string;
  cumple_requisitos?: boolean;
  puntos_otorgados: number;
  numero_turno?: string;
  notificacion_enviada: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  usuario: number;
  tipo_residuo: number;
  empresa?: number;
  cantidad?: number;
  direccion?: string;
  telefono?: string;
}

interface TipoResiduoAPI {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  activo: boolean;
  fecha_creacion: string;
}

interface EmpresaAPI {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  activa: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export const MyRequests: React.FC = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState<SolicitudAPI[]>([]);
  const [tiposResiduos, setTiposResiduos] = useState<TipoResiduoAPI[]>([]);
  const [empresas, setEmpresas] = useState<EmpresaAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<SolicitudAPI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Funciones auxiliares para obtener nombres por ID
  const getTipoResiduoNombre = (id: number): string => {
    const tipo = tiposResiduos.find(t => t.id === id);
    return tipo ? tipo.nombre : `Tipo ${id}`;
  };

  const getEmpresaNombre = (id: number): string => {
    const empresa = empresas.find(e => e.id === id);
    return empresa ? empresa.nombre : `Empresa ${id}`;
  };

  const handleViewDetails = (request: SolicitudAPI) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  // Función para cargar datos de la API
  const loadData = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Cargar solicitudes, tipos de residuos y empresas en paralelo
      const [solicitudesResponse, tiposResponse, empresasResponse] = await Promise.all([
        fetch(`/api/solicitudes/?page=${page}&page_size=${pageSize}`, { headers }),
        fetch('/api/tipos-residuos/', { headers }),
        fetch('/api/empresas/', { headers })
      ]);

      if (!solicitudesResponse.ok) {
        throw new Error(`Error al cargar solicitudes: ${solicitudesResponse.status}`);
      }
      if (!tiposResponse.ok) {
        throw new Error(`Error al cargar tipos de residuos: ${tiposResponse.status}`);
      }
      if (!empresasResponse.ok) {
        throw new Error(`Error al cargar empresas: ${empresasResponse.status}`);
      }

      const solicitudesData = await solicitudesResponse.json();
      const tiposData = await tiposResponse.json();
      const empresasData = await empresasResponse.json();

      setSolicitudes(solicitudesData.results || []);
      setTiposResiduos(tiposData.results || []);
      setEmpresas(empresasData.results || []);
      setTotalPages(Math.ceil((solicitudesData.count || 0) / pageSize));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
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
    loadData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
              onClick={() => loadData(currentPage)} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitudes?.map((request) => (
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
                            {getTipoResiduoNombre(request.tipo_residuo)}
                          </h3>
                          <Badge variant="status" status={request.estado}>
                            {request.estado}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{request.observaciones || 'Sin observaciones'}</p>
                        <div className="text-sm text-gray-500">
                          {request.cantidad && <p>Cantidad: {request.cantidad} kg</p>}
                          {request.peso_kg && <p>Peso real: {request.peso_kg} kg</p>}
                          <p>Solicitado: {formatDate(request.fecha_solicitud)}</p>
                          {request.fecha_recoleccion && (
                            <p>Recolectado: {formatDate(request.fecha_recoleccion)}</p>
                          )}
                          {request.es_programada && request.frecuencia && (
                            <p>Frecuencia: {request.frecuencia}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {request.puntos_otorgados > 0 && (
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
            
            {solicitudes && solicitudes.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {solicitudes && solicitudes.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No tienes solicitudes de recolección aún.</p>
                <Button 
                  variant="primary" 
                  className="mt-4"
                  onClick={() => window.location.href = '/client/request-collection'}
                >
                  Crear Primera Solicitud
                </Button>
              </div>
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
              {selectedRequest.puntos_otorgados > 0 && (
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
                  <p className="font-medium text-gray-900">{getTipoResiduoNombre(selectedRequest.tipo_residuo)}</p>
                </div>
                {selectedRequest.cantidad && (
                  <div>
                    <p className="text-sm text-gray-500">Cantidad Solicitada</p>
                    <p className="font-medium text-gray-900">{selectedRequest.cantidad} kg</p>
                  </div>
                )}
                {selectedRequest.peso_kg && (
                  <div>
                    <p className="text-sm text-gray-500">Peso Real</p>
                    <p className="font-medium text-gray-900">{selectedRequest.peso_kg} kg</p>
                  </div>
                )}
                {selectedRequest.observaciones && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Observaciones</p>
                    <p className="font-medium text-gray-900">{selectedRequest.observaciones}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Información de Ubicación */}
            {selectedRequest.direccion && (
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
                  {selectedRequest.telefono && (
                    <div>
                      <p className="text-sm text-gray-500">Teléfono de Contacto</p>
                      <p className="font-medium text-gray-900">{selectedRequest.telefono}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

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
                {selectedRequest.es_programada && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Tipo de solicitud</span>
                    <span className="font-medium text-gray-900">
                      {selectedRequest.es_programada ? 'Programada' : 'Inmediata'}
                    </span>
                  </div>
                )}
                {selectedRequest.frecuencia && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Frecuencia</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {selectedRequest.frecuencia}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Información Adicional */}
            {(selectedRequest.empresa || selectedRequest.numero_turno || selectedRequest.cumple_requisitos !== null) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Información Adicional
                </h4>
                <div className="space-y-2">
                  {selectedRequest.empresa && (
                    <div>
                      <p className="text-sm text-gray-500">Empresa Recolectora</p>
                      <p className="font-medium text-gray-900">{getEmpresaNombre(selectedRequest.empresa)}</p>
                    </div>
                  )}
                  {selectedRequest.numero_turno && (
                    <div>
                      <p className="text-sm text-gray-500">Número de Turno</p>
                      <p className="font-medium text-gray-900">#{selectedRequest.numero_turno}</p>
                    </div>
                  )}
                  {selectedRequest.cumple_requisitos !== null && (
                    <div>
                      <p className="text-sm text-gray-500">Cumple Requisitos</p>
                      <p className={`font-medium ${selectedRequest.cumple_requisitos ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedRequest.cumple_requisitos ? 'Sí' : 'No'}
                      </p>
                    </div>
                  )}
                  {selectedRequest.notificacion_enviada && (
                    <div>
                      <p className="text-sm text-gray-500">Notificación</p>
                      <p className="font-medium text-green-600">Enviada</p>
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
