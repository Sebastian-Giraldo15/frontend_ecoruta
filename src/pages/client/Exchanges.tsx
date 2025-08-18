import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Badge } from '../../components/common';
import { PointExchange } from '../../types';
import { useApi } from '../../hooks';
import { formatDate } from '../../utils';

export const Exchanges: React.FC = () => {
  const { data: exchanges, fetchData } = useApi<PointExchange[]>('/intercambios/');

  useEffect(() => {
    fetchData({ ordering: '-fecha_intercambio' });
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mis Intercambios</h1>
          <p className="mt-1 text-sm text-gray-500">
            Historial de todos tus canjes de puntos
          </p>
        </div>

        <div className="space-y-4">
          {exchanges?.map((exchange) => (
            <motion.div
              key={exchange.id}
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
                          Intercambio #{exchange.id}
                        </h3>
                        <Badge variant="status" status={exchange.estado}>
                          {exchange.estado}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Fecha: {formatDate(exchange.fecha_intercambio)}</p>
                        {exchange.codigo_canje && (
                          <p>Código: {exchange.codigo_canje}</p>
                        )}
                        {exchange.fecha_entrega && (
                          <p>Entregado: {formatDate(exchange.fecha_entrega)}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-semibold">
                        -{exchange.puntos_utilizados} puntos
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Exchanges;
