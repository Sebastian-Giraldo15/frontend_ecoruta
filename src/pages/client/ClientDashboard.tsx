import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon,
  StarIcon,
  GiftIcon,
  ChartBarIcon,
  PlusIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardBody, Button, Badge, LoadingSpinner } from '../../components/common';
import { useApi } from '../../hooks';
import { CollectionRequest, PointExchange, DashboardStats } from '../../types';
import { formatDate, formatNumber } from '../../utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

/**
 * Dashboard principal para usuarios cliente
 */
export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [realMetrics, setRealMetrics] = useState({
    totalKilos: 0,
    totalRecolecciones: 0,
    totalPuntos: 0,
    rachaActiva: 0
  });
  
  // API calls para obtener datos del dashboard
  const { 
    data: recentRequests, 
    loading: loadingRequests, 
    fetchData: fetchRequests 
  } = useApi<{results: any[]}>('/solicitudes/');
  
  const { 
    data: recentExchanges, 
    fetchData: fetchExchanges 
  } = useApi<PointExchange[]>('/intercambios/');

  const { 
    data: allUserRequests, 
    fetchData: fetchAllRequests 
  } = useApi<{results: any[]}>('/solicitudes/');

  // Datos de ejemplo para gráficos
  const monthlyData = [
    { mes: 'Ene', recolecciones: 4, puntos: 120, kg_reciclados: 8.5 },
    { mes: 'Feb', recolecciones: 6, puntos: 180, kg_reciclados: 12.3 },
    { mes: 'Mar', recolecciones: 5, puntos: 150, kg_reciclados: 10.1 },
    { mes: 'Abr', recolecciones: 8, puntos: 240, kg_reciclados: 15.7 },
    { mes: 'May', recolecciones: 7, puntos: 210, kg_reciclados: 13.2 },
    { mes: 'Jun', recolecciones: 9, puntos: 270, kg_reciclados: 18.4 },
  ];

  const wasteTypeData = [
    { name: 'Plástico', value: 35, color: '#3B82F6' },
    { name: 'Papel', value: 25, color: '#10B981' },
    { name: 'Vidrio', value: 20, color: '#F59E0B' },
    { name: 'Metal', value: 12, color: '#EF4444' },
    { name: 'Orgánico', value: 8, color: '#8B5CF6' },
  ];

  const impactMetrics = [
    {
      title: 'Kilos Reciclados',
      value: realMetrics.totalKilos.toFixed(1),
      unit: 'kg',
      icon: <ChartBarIcon className="h-6 w-6" />,
      color: 'bg-green-500',
      change: '+23%', // Esto podría calcularse comparando con el mes anterior
      description: 'Total de residuos reciclados'
    },
    {
      title: 'Recolecciones',
      value: realMetrics.totalRecolecciones.toString(),
      unit: 'completadas',
      icon: <TruckIcon className="h-6 w-6" />,
      color: 'bg-blue-500',
      change: '+18%',
      description: 'Recolecciones exitosas'
    },
    {
      title: 'Puntos Ganados',
      value: formatNumber(realMetrics.totalPuntos),
      unit: 'puntos',
      icon: <StarIcon className="h-6 w-6" />,
      color: 'bg-purple-500',
      change: '+31%',
      description: 'Puntos por reciclaje'
    },
    {
      title: 'Racha Activa',
      value: realMetrics.rachaActiva.toString(),
      unit: 'días',
      icon: <FireIcon className="h-6 w-6" />,
      color: 'bg-orange-500',
      change: realMetrics.rachaActiva > 0 ? `Activo ${realMetrics.rachaActiva} días` : 'Inicia hoy',
      description: 'Días consecutivos reciclando'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Recolección programada',
      message: 'Tu próxima recolección está programada para mañana a las 9:00 AM',
      time: '2 min',
      type: 'info',
      icon: <TruckIcon className="h-5 w-5" />
    },
    {
      id: 2,
      title: 'Puntos ganados',
      message: 'Has ganado 45 puntos por tu última recolección',
      time: '1 hora',
      type: 'success',
      icon: <StarIcon className="h-5 w-5" />
    },
    {
      id: 3,
      title: 'Nueva recompensa',
      message: 'Hay nuevas recompensas disponibles en el catálogo',
      time: '3 horas',
      type: 'info',
      icon: <GiftIcon className="h-5 w-5" />
    }
  ];

  useEffect(() => {
    // Cargar datos del dashboard
    const loadDashboardData = async () => {
      try {
        await Promise.all([
          fetchRequests({ limit: 5, ordering: '-fecha_solicitud' }),
          fetchExchanges({ limit: 3, ordering: '-fecha_intercambio' }),
          fetchAllRequests() // Obtener todas las solicitudes para calcular métricas
        ]);
        
        // Simular estadísticas del usuario (esto debería venir de la API)
        setStats({
          total_solicitudes: 12,
          solicitudes_pendientes: 2,
          solicitudes_completadas: 8,
          puntos_totales: user?.puntos_acumulados || 0,
          empresas_activas: 5,
          usuarios_activos: 1250
        });
      } catch (error) {
        console.error('Error cargando datos del dashboard:', error);
      }
    };

    loadDashboardData();
  }, []);

  // Calcular métricas reales basadas en los datos del usuario
  useEffect(() => {
    if (allUserRequests?.results) {
      const requests = allUserRequests.results;
      
      // Calcular total de kilos reciclados
      const totalKilos = requests
        .filter((req: any) => req.estado === 'recolectada' && req.peso_kg)
        .reduce((sum: number, req: any) => sum + parseFloat(req.peso_kg || 0), 0);
      
      // Calcular total de recolecciones completadas
      const totalRecolecciones = requests
        .filter((req: any) => req.estado === 'recolectada').length;
      
      // Calcular total de puntos ganados por recolecciones
      const totalPuntosRecoleccion = requests
        .reduce((sum: number, req: any) => sum + (req.puntos_otorgados || 0), 0);
      
      // Calcular racha activa (simplificado)
      const rachaActiva = Math.min(requests.length, 15); // Simulado por ahora

      setRealMetrics({
        totalKilos: totalKilos,
        totalRecolecciones: totalRecolecciones,
        totalPuntos: user?.puntos_acumulados || totalPuntosRecoleccion,
        rachaActiva: rachaActiva
      });
        
      // Actualizar estadísticas del dashboard
      setStats({
        total_solicitudes: requests.length,
        solicitudes_pendientes: requests.filter((req: any) => req.estado === 'pendiente').length,
        solicitudes_completadas: totalRecolecciones,
        puntos_totales: user?.puntos_acumulados || 0,
        empresas_activas: 5,
        usuarios_activos: 1250
      });
    }
  }, [allUserRequests, user]);

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
              ¡Hola, {user?.nombre} {user?.apellido}! 👋
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
                  {formatNumber(user?.puntos_acumulados || 0)}
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
                {user?.puntos_acumulados || 0}
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
          {quickActions.map((action) => (
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

      {/* Métricas de Impacto Ambiental */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Tus Estadísticas de Reciclaje 📊
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <p className="text-xs text-gray-400">{metric.unit}</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.color} text-white`}>
                    {metric.icon}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-green-600 font-medium">
                    {metric.change} vs mes anterior
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {metric.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Gráficos de Actividad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Gráfico de Recolecciones Mensuales */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recolecciones por Mes
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="recolecciones" 
                    stroke="#059669" 
                    fill="#10B981" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Gráfico de Tipos de Residuos */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tipos de Residuos Reciclados
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wasteTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {wasteTypeData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Notificaciones Recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Notificaciones
          </h2>
          <Button variant="secondary" size="sm">
            Ver todas
          </Button>
        </div>
        <Card>
          <CardBody>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className={`p-2 rounded-full ${
                    notification.type === 'success' ? 'bg-green-100 text-green-600' : 
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {notification.time}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Gráfico de Progreso de Puntos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Progreso de Puntos - Últimos 6 Meses
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="puntos" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
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
            ) : recentRequests && recentRequests.results && recentRequests.results.length > 0 ? (
              <div className="space-y-4">
                {recentRequests.results.slice(0, 5).map((request: any) => (
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
