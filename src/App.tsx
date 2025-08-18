import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout, DashboardLayout } from './components/layout';

// Páginas públicas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Páginas de cliente
import ClientDashboard from './pages/client/ClientDashboard';
import RequestCollection from './pages/client/RequestCollection';
import MyRequests from './pages/client/MyRequests';
import Rewards from './pages/client/Rewards';
import Exchanges from './pages/client/Exchanges';

// Páginas de empresa
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyRequests from './pages/company/CompanyRequests';
import CompanyRoutes from './pages/company/CompanyRoutes';
import CompanyHistory from './pages/company/CompanyHistory';

// Páginas de administrador
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCompanies from './pages/admin/AdminCompanies';
import AdminRewards from './pages/admin/AdminRewards';
import AdminReports from './pages/admin/AdminReports';

// Componentes de protección de rutas
import ProtectedRoute from './components/ProtectedRoute';
import { LoadingPage } from './components/common';

// Estilos globales
import './styles/globals.css';

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Rutas protegidas - Cliente */}
            <Route
              path="/client/*"
              element={
                <ProtectedRoute requiredUserType="cliente">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route path="request" element={<RequestCollection />} />
              <Route path="requests" element={<MyRequests />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="exchanges" element={<Exchanges />} />
            </Route>

            {/* Rutas protegidas - Empresa */}
            <Route
              path="/company/*"
              element={
                <ProtectedRoute requiredUserType="empresa_recolectora">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="requests" element={<CompanyRequests />} />
              <Route path="routes" element={<CompanyRoutes />} />
              <Route path="history" element={<CompanyHistory />} />
            </Route>

            {/* Rutas protegidas - Administrador */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredUserType="administrador">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="companies" element={<AdminCompanies />} />
              <Route path="rewards" element={<AdminRewards />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>

            {/* Redirección automática al dashboard según tipo de usuario */}
            <Route
              path="/dashboard"
              element={<DashboardRedirect />}
            />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

/**
 * Componente para redirigir al dashboard correcto según el tipo de usuario
 */
const DashboardRedirect: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage message="Cargando..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.tipo_usuario) {
    case 'cliente':
      return <Navigate to="/client/dashboard" replace />;
    case 'empresa_recolectora':
      return <Navigate to="/company/dashboard" replace />;
    case 'administrador':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

/**
 * Página 404
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mt-2">
            Lo sentimos, la página que buscas no existe.
          </p>
        </div>
        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" size="lg" fullWidth>
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Importar useAuth para usar en DashboardRedirect
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from './components/common';

export default App;
