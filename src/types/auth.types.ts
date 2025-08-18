import type { UserRole } from './navigation.types';

export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  telefono?: string;
  direccion?: string;
  empresa?: number; // ID de la empresa si es empresa_recolectora
  localidad: number; // ID de la localidad
  puntos_acumulados: number;
  fecha_registro: string;
  fecha_ultima_conexion?: string;
  activo: boolean;
}

export interface AuthLoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password2: string; // Django espera password2 en lugar de confirmarPassword
  nombre: string;
  apellido: string;
  rol: UserRole;
  telefono?: string;
  direccion?: string;
  localidad: number; // Cambiado de localidad_id a localidad para coincidir con Django
  empresa?: number; // Opcional, solo para empresa_recolectora
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}
