import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GiftIcon, StarIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, Button, Badge } from '../../components/common';
import { Reward } from '../../types';
import { useApi } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils';

export const Rewards: React.FC = () => {
  const { user } = useAuth();
  const { data: rewards, fetchData } = useApi<Reward[]>('/recompensas/');

  useEffect(() => {
    fetchData({ is_active: true });
  }, []);

  const canRedeem = (pointsRequired: number) => {
    return (user?.puntos_acumulados || 0) >= pointsRequired;
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Recompensas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Canjea tus puntos por increíbles recompensas
          </p>
          
          <div className="mt-4 flex items-center space-x-2 p-4 bg-eco-50 rounded-lg">
            <StarIcon className="h-6 w-6 text-eco-500" />
            <span className="text-eco-700 font-medium">
              Tienes {user?.puntos_acumulados || 0} puntos disponibles
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards?.map((reward) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full">
                <CardBody>
                  <div className="text-center">
                    {reward.imagen ? (
                      <img 
                        src={reward.imagen} 
                        alt={reward.nombre}
                        className="w-20 h-20 mx-auto mb-4 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-eco-400 to-ocean-400 rounded-lg flex items-center justify-center">
                        <GiftIcon className="h-10 w-10 text-white" />
                      </div>
                    )}
                    
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {reward.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {reward.descripcion}
                    </p>
                    
                    <div className="mb-4">
                      <Badge variant={reward.tipo === 'descuento' ? 'warning' : 'info'}>
                        {reward.tipo}
                      </Badge>
                      {reward.valor > 0 && (
                        <p className="text-lg font-bold text-eco-600 mt-1">
                          {reward.tipo === 'descuento' ? `${reward.valor}% OFF` : formatCurrency(reward.valor)}
                        </p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-lg font-bold text-purple-600">
                        {reward.puntos_requeridos} puntos
                      </p>
                      <p className="text-xs text-gray-500">
                        Stock: {reward.stock_disponible}
                      </p>
                    </div>
                    
                    <Button
                      variant={canRedeem(reward.puntos_requeridos) ? 'primary' : 'secondary'}
                      fullWidth
                      disabled={!canRedeem(reward.puntos_requeridos) || reward.stock_disponible === 0}
                    >
                      {!canRedeem(reward.puntos_requeridos) 
                        ? 'Puntos insuficientes' 
                        : reward.stock_disponible === 0 
                        ? 'Agotado'
                        : 'Canjear'
                      }
                    </Button>
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

export default Rewards;
