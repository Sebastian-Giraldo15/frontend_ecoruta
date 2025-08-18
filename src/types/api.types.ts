// Tipos base para las respuestas de la API
export interface APIResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Tipos para la autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

// Tipos para usuarios
export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  direccion?: string;
  localidad: number;
  rol: 'administrador' | 'usuario' | 'empresa_recolectora';
  empresa?: number;
  activo: boolean;
  puntos_acumulados: number;
  fecha_registro: string;
  fecha_ultima_conexion?: string;
}

export interface UsuarioCreateRequest {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  direccion?: string;
  localidad: number;
  rol: 'administrador' | 'usuario' | 'empresa_recolectora';
  empresa?: number;
}

// Tipos para empresas
export interface Empresa {
  id: number;
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  activa: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  tipos_residuos: Array<{
    id: number;
    nombre: string;
    categoria: string;
  }>;
}

export interface EmpresaCreateRequest {
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  tipos_residuos_ids?: number[];
}

// Tipos para solicitudes
export interface Solicitud {
  id: number;
  usuario: number;
  tipo_residuo: number;
  empresa: number;
  fecha_solicitud: string;
  fecha_programada?: string;
  fecha_recoleccion?: string;
  estado: 'pendiente' | 'programada' | 'recolectada' | 'cancelada';
  es_programada: boolean;
  frecuencia?: 'semanal' | 'quincenal' | 'mensual';
  peso_kg?: number;
  observaciones?: string;
  cumple_requisitos?: boolean;
  puntos_otorgados: number;
  numero_turno?: number;
  notificacion_enviada: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface SolicitudCreateRequest {
  tipo_residuo: number;
  empresa: number;
  fecha_programada?: string;
  es_programada: boolean;
  frecuencia?: 'semanal' | 'quincenal' | 'mensual';
  observaciones?: string;
}

export interface RegistrarRecoleccionRequest {
  peso_kg: number;
  cumple_requisitos: boolean;
}

// Tipos para localidades
export interface Localidad {
  id: number;
  nombre: string;
  dia_recoleccion_organicos: number;
  activa: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Tipos para tipos de residuos
export interface TipoResiduo {
  id: number;
  nombre: string;
  descripcion?: string;
  categoria: string;
  subcategoria?: string;
  activo: boolean;
  fecha_creacion: string;
}

// Tipos para canjes
export interface Canje {
  id: number;
  usuario: number;
  tienda: number;
  puntos_canjeados: number;
  monto_descuento: number;
  codigo_canje: string;
  usado: boolean;
  fecha_canje: string;
  fecha_uso?: string;
}

export interface CanjeCreateRequest {
  tienda: number;
  puntos_canjeados: number;
  monto_descuento: number;
}

// Tipos para notificaciones
export interface Notificacion {
  id: number;
  usuario: number;
  titulo: string;
  mensaje: string;
  tipo: 'sistema' | 'recoleccion' | 'puntos';
  leida: boolean;
  fecha_creacion: string;
  fecha_lectura?: string;
}

export interface NotificacionCreateRequest {
  usuario: number;
  titulo: string;
  mensaje: string;
  tipo: 'sistema' | 'recoleccion' | 'puntos';
}
