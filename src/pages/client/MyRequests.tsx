import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Badge, Button, Pagination, LoadingSpinner } from '../../components/common';
import { CollectionRequest } from '../../types';
import { useApi, usePagination } from '../../hooks';
import { formatDate } from '../../utils';

export const MyRequests: React.FC = () => {
  const { data: requests, loading, fetchData } = useApi<CollectionRequest[]>('/solicitudes/');
  const pagination = usePagination(1, 10);

  useEffect(() => {
    fetchData({ 
      page: pagination.currentPage, 
      page_size: pagination.pageSize 
    });
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
                        <Button variant="secondary" size="sm" className="mt-2">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
            
            {requests && requests.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.goToPage}
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyRequests;
