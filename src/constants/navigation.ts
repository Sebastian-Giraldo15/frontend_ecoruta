import { SidebarItem } from '../types/navigation.types';

export const adminLinks: SidebarItem[] = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { name: 'Usuarios', href: '/admin/users', icon: 'users' },
  { name: 'Empresas', href: '/admin/companies', icon: 'building' },
  { name: 'Localidades', href: '/admin/localidades', icon: 'map-pin' },
  { name: 'Tipos de Residuos', href: '/admin/tipos-residuos', icon: 'recycle' },
  { name: 'Reportes', href: '/admin/reports', icon: 'chart-bar' },
  { name: 'Recompensas', href: '/admin/rewards', icon: 'gift' }
];

export const clientLinks: SidebarItem[] = [
  { name: 'Dashboard', href: '/client', icon: 'home' },
  { name: 'Solicitar Recolección', href: '/client/request-collection', icon: 'truck' },
  { name: 'Mis Solicitudes', href: '/client/requests', icon: 'clipboard-list' },
  { name: 'Recompensas', href: '/client/rewards', icon: 'gift' },
  { name: 'Canjes', href: '/client/exchanges', icon: 'exchange' }
];

export const companyLinks: SidebarItem[] = [
  { name: 'Dashboard', href: '/company', icon: 'home' },
  { name: 'Solicitudes', href: '/company/requests', icon: 'clipboard-list' },
  { name: 'Historial', href: '/company/history', icon: 'history' },
  { name: 'Rutas', href: '/company/routes', icon: 'map' }
];

export const commonLinks: SidebarItem[] = [
  { name: 'Perfil', href: '/profile', icon: 'user' },
  { name: 'Notificaciones', href: '/notifications', icon: 'bell' }
];
