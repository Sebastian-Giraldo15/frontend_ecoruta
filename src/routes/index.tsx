import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { DashboardLayout } from '../components/layout';
import { DashboardRedirect } from '../components/DashboardRedirect';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminCompanies from '../pages/admin/AdminCompanies';
import AdminReports from '../pages/admin/AdminReports';
import AdminRewards from '../pages/admin/AdminRewards';
import AdminLocalidades from '../pages/admin/AdminLocalidades';
import AdminTiposResiduos from '../pages/admin/AdminTiposResiduos';

// Client Pages
import ClientDashboard from '../pages/client/ClientDashboard';
import Exchanges from '../pages/client/Exchanges';
import MyRequests from '../pages/client/MyRequests';
import RequestCollection from '../pages/client/RequestCollection';
import Rewards from '../pages/client/Rewards';

// Company Pages
import CompanyDashboard from '../pages/company/CompanyDashboard';
import CompanyHistory from '../pages/company/CompanyHistory';
import CompanyRequests from '../pages/company/CompanyRequests';
import CompanyRoutes from '../pages/company/CompanyRoutes';

// Common Pages
import LandingPage from '../pages/LandingPage';
import NotFound from '../pages/NotFound';
import ServerError from '../pages/ServerError';
import Profile from '../pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <DashboardRedirect /> }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="administrador">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'companies', element: <AdminCompanies /> },
      { path: 'reports', element: <AdminReports /> },
      { path: 'rewards', element: <AdminRewards /> },
      { path: 'localidades', element: <AdminLocalidades /> },
      { path: 'tipos-residuos', element: <AdminTiposResiduos /> }
    ]
  },
  {
    path: '/client',
    element: (
      <ProtectedRoute requiredRole="usuario">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <ClientDashboard /> },
      { path: 'exchanges', element: <Exchanges /> },
      { path: 'requests', element: <MyRequests /> },
      { path: 'request-collection', element: <RequestCollection /> },
      { path: 'rewards', element: <Rewards /> }
    ]
  },
  {
    path: '/company',
    element: (
      <ProtectedRoute requiredRole="empresa_recolectora">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <CompanyDashboard /> },
      { path: 'history', element: <CompanyHistory /> },
      { path: 'requests', element: <CompanyRequests /> },
      { path: 'routes', element: <CompanyRoutes /> }
    ]
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Profile /> }
    ]
  },
  {
    path: '/server-error',
    element: <ServerError />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
