// Tipos de usuario
export type UserType = 'cliente' | 'empresa_recolectora' | 'administrador';

// Usuario
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  tipo_usuario: UserType;
  telefono?: string;
  fecha_registro: string;
  puntos?: number;
  is_active: boolean;
}

// Empresa recolectora
export interface Company {
  id: number;
  nombre: string;
  descripcion: string;
  telefono: string;
  email: string;
  direccion: string;
  tipos_residuos: string[];
  zona_cobertura: string;
  calificacion_promedio: number;
  usuario: number;
  fecha_registro: string;
  is_active: boolean;
}

// Ubicación
export interface Location {
  id: number;
  direccion: string;
  latitud: number;
  longitud: number;
  ciudad: string;
  codigo_postal: string;
}

// Solicitud de recolección
export interface CollectionRequest {
  id: number;
  cliente: number;
  empresa_asignada?: number;
  ubicacion: Location;
  tipo_residuo: string;
  descripcion: string;
  peso_estimado: number;
  fecha_solicitud: string;
  fecha_programada?: string;
  fecha_completada?: string;
  estado: 'pendiente' | 'asignada' | 'en_progreso' | 'completada' | 'cancelada';
  puntos_otorgados?: number;
  comentarios?: string;
}

// Recompensa
export interface Reward {
  id: number;
  nombre: string;
  descripcion: string;
  puntos_requeridos: number;
  tipo: 'descuento' | 'producto' | 'servicio';
  valor: number;
  imagen?: string;
  stock_disponible: number;
  fecha_vencimiento?: string;
  is_active: boolean;
}

// Intercambio de puntos
export interface PointExchange {
  id: number;
  usuario: number;
  recompensa: number;
  puntos_utilizados: number;
  fecha_intercambio: string;
  estado: 'pendiente' | 'aprobado' | 'entregado' | 'cancelado';
  codigo_canje?: string;
  fecha_entrega?: string;
}

// Tipos para formularios
export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  telefono?: string;
  tipo_usuario: UserType;
}

export interface CollectionRequestFormData {
  tipo_residuo: string;
  descripcion: string;
  peso_estimado: number;
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  fecha_programada?: string;
}

// Respuestas de API
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// Estados de carga
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Filtros para listas
export interface CollectionRequestFilters {
  estado?: string;
  tipo_residuo?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
  empresa?: number;
}

export interface RewardFilters {
  tipo?: string;
  puntos_max?: number;
  disponible?: boolean;
}

// Estadísticas
export interface DashboardStats {
  total_solicitudes: number;
  solicitudes_pendientes: number;
  solicitudes_completadas: number;
  puntos_totales: number;
  empresas_activas: number;
  usuarios_activos: number;
}
