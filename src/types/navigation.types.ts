export interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: SidebarItem[];
}

export type UserRole = 'administrador' | 'usuario' | 'empresa_recolectora';

export interface NavigationConfig {
  adminLinks: SidebarItem[];
  clientLinks: SidebarItem[];
  companyLinks: SidebarItem[];
  commonLinks: SidebarItem[];
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}
