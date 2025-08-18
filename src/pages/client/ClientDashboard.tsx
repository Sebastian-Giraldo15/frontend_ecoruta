import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon,
  StarIcon,
  GiftIcon,
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardBody, Button, Badge, LoadingSpinner } from '../../components/common';
import { useApi } from '../../hooks';
import { CollectionRequest, PointExchange, DashboardStats } from '../../types';
import { formatDate, getStatusColor, formatNumber } from '../../utils';

/**
 * Dashboard principal para usuarios cliente
 */
export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  
  // API calls para obtener datos del dashboard
  const { 
    data: recentRequests, 
    loading: loadingRequests, 
    fetchData: fetchRequests 
  } = useApi<CollectionRequest[]>('/solicitudes/');
  
  const { 
    data: recentExchanges, 
    loading: loadingExchanges, 
    fetchData: fetchExchanges 
  } = useApi<PointExchange[]>('/intercambios/');

  useEffect(() => {
    // Cargar datos del dashboard
    const loadDashboardData = async () => {
      try {
        await Promise.all([
          fetchRequests({ limit: 5, ordering: '-fecha_solicitud' }),
          fetchExchanges({ limit: 3, ordering: '-fecha_intercambio' })
        ]);
        
        // Simular estadísticas del usuario (esto debería venir de la API)
        setStats({
          total_solicitudes: 12,
          solicitudes_pendientes: 2,
          solicitudes_completadas: 8,
          puntos_totales: user?.puntos || 0,
          empresas_activas: 5,
          usuarios_activos: 1250
        });
      } catch (error) {
        console.error('Error cargando datos del dashboard:', error);
      }
    };

    loadDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'Solicitar Recolección',
      description: 'Programa una nueva recolección',
      icon: <TruckIcon className="h-6 w-6" />,
      href: '/client/request',
      color: 'bg-eco-500',
    },
    {
      title: 'Ver Recompensas',
      description: 'Explora las recompensas disponibles',
      icon: <GiftIcon className="h-6 w-6" />,
      href: '/client/rewards',
      color: 'bg-ocean-500',
    },
    {
      title: 'Mis Solicitudes',
      description: 'Revisa el estado de tus solicitudes',
      icon: <ChartBarIcon className="h-6 w-6" />,
      href: '/client/requests',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header del dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900">
              ¡Hola, {user?.first_name || user?.username}! 👋
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Bienvenido a tu dashboard de EcoRuta
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link to="/client/request">
              <Button 
                variant="primary" 
                leftIcon={<PlusIcon className="h-4 w-4" />}
              >
                Nueva Solicitud
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Tarjeta de puntos del usuario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-eco-500 to-ocean-500 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-eco-100">Puntos EcoRuta</p>
                <p className="text-3xl font-bold">
                  {formatNumber(user?.puntos || 0)}
                </p>
                <p className="text-eco-100 text-sm mt-1">
                  ¡Sigue reciclando para ganar más puntos!
                </p>
              </div>
              <div className="text-eco-200">
                <StarIcon className="h-16 w-16" />
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Estadísticas rápidas */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-eco-600">
                {stats.total_solicitudes}
              </div>
              <div className="text-sm text-gray-500">Total Solicitudes</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.solicitudes_pendientes}
              </div>
              <div className="text-sm text-gray-500">Pendientes</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.solicitudes_completadas}
              </div>
              <div className="text-sm text-gray-500">Completadas</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {user?.puntos || 0}
              </div>
              <div className="text-sm text-gray-500">Puntos Ganados</div>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* Acciones rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={action.href}>
                <Card hover className="h-full">
                  <CardBody>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mis solicitudes recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Solicitudes Recientes
          </h2>
          <Link to="/client/requests">
            <Button variant="secondary" size="sm">
              Ver todas
            </Button>
          </Link>
        </div>

        <Card>
          <CardBody>
            {loadingRequests ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : recentRequests && recentRequests.length > 0 ? (
              <div className="space-y-4">
                {recentRequests.slice(0, 5).map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400">
                        {request.estado === 'completada' ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClockIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.tipo_residuo}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(request.fecha_solicitud)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="status" 
                        status={request.estado}
                        className="mb-1"
                      >
                        {request.estado}
                      </Badge>
                      {request.puntos_otorgados && (
                        <p className="text-sm text-eco-600">
                          +{request.puntos_otorgados} puntos
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No tienes solicitudes recientes.
                </p>
                <Link to="/client/request">
                  <Button variant="primary" className="mt-4">
                    Crear tu primera solicitud
                  </Button>
                </Link>
              </div>
            )}
          </CardBody>
        </Card>
      </motion.div>

      {/* Intercambios recientes */}
      {recentExchanges && recentExchanges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Intercambios Recientes
            </h2>
            <Link to="/client/exchanges">
              <Button variant="secondary" size="sm">
                Ver todos
              </Button>
            </Link>
          </div>

          <Card>
            <CardBody>
              <div className="space-y-4">
                {recentExchanges.slice(0, 3).map((exchange) => (
                  <div 
                    key={exchange.id} 
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <GiftIcon className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Intercambio #{exchange.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(exchange.fecha_intercambio)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="status" 
                        status={exchange.estado}
                      >
                        {exchange.estado}
                      </Badge>
                      <p className="text-sm text-red-600">
                        -{exchange.puntos_utilizados} puntos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ClientDashboard;
