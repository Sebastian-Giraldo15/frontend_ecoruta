import api from './config';

/**
 * Tipos para Solicitudes de Recolección
 */
export interface SolicitudRecoleccion {
  id: number;
  usuario: number;
  empresa_recolectora?: number;
  tipo_residuo: number;
  tipo_residuo_nombre?: string;
  cantidad_estimada: number;
  cantidad_real?: number;
  direccion_recoleccion: string;
  fecha_solicitud: string;
  fecha_recoleccion?: string;
  fecha_programada?: string;
  estado: 'pendiente' | 'programada' | 'en_proceso' | 'completada' | 'cancelada';
  puntos_otorgados?: number;
  notas?: string;
  coordenadas_lat?: number;
  coordenadas_lng?: number;
}

/**
 * Tipos para reportes
 */
export interface ReporteUsuario {
  total_solicitudes: number;
  total_kilos_recolectados: number;
  total_puntos_acumulados: number;
  solicitudes_por_estado: {
    [key: string]: number;
  };
  recoleccion_por_tipo: {
    tipo_residuo: string;
    total_kilos: number;
    total_puntos: number;
    porcentaje: number;
  }[];
  proxima_recoleccion?: {
    fecha: string;
    tipo_residuo: string;
  };
}

/**
 * Servicio para manejar operaciones con solicitudes de recolección
 */
const solicitudesService = {
  // GET /api/solicitudes/ - Listar solicitudes (filtradas según rol)
  async list(params?: any): Promise<SolicitudRecoleccion[]> {
    const response = await api.get<SolicitudRecoleccion[]>('/solicitudes/', { params });
    return response.data;
  },

  // POST /api/solicitudes/ - Crear solicitud
  async create(solicitudData: Omit<SolicitudRecoleccion, 'id' | 'fecha_solicitud' | 'estado'>): Promise<SolicitudRecoleccion> {
    const response = await api.post<SolicitudRecoleccion>('/solicitudes/', solicitudData);
    return response.data;
  },

  // GET /api/solicitudes/{id}/ - Ver solicitud específica
  async getById(id: number): Promise<SolicitudRecoleccion> {
    const response = await api.get<SolicitudRecoleccion>(`/solicitudes/${id}/`);
    return response.data;
  },

  // PUT /api/solicitudes/{id}/ - Actualizar solicitud
  async update(id: number, solicitudData: Partial<SolicitudRecoleccion>): Promise<SolicitudRecoleccion> {
    const response = await api.put<SolicitudRecoleccion>(`/solicitudes/${id}/`, solicitudData);
    return response.data;
  },

  // DELETE /api/solicitudes/{id}/ - Eliminar solicitud
  async delete(id: number): Promise<void> {
    await api.delete(`/solicitudes/${id}/`);
  },

  // POST /api/solicitudes/{id}/registrar_recoleccion/ - Registrar recolección (empresa)
  async registrarRecoleccion(id: number, datos: { cantidad_real: number; notas?: string }): Promise<SolicitudRecoleccion> {
    const response = await api.post<SolicitudRecoleccion>(`/solicitudes/${id}/registrar_recoleccion/`, datos);
    return response.data;
  },

  // GET /api/solicitudes/reporte_usuario/ - Obtener reporte de usuario
  async getReporteUsuario(): Promise<ReporteUsuario> {
    const response = await api.get<ReporteUsuario>('/solicitudes/reporte_usuario/');
    return response.data;
  },

  // GET /api/solicitudes/reporte_localidad/ - Obtener reporte por localidad
  async getReporteLocalidad(localidadId?: number): Promise<any> {
    const params = localidadId ? { localidad: localidadId } : {};
    const response = await api.get('/solicitudes/reporte_localidad/', { params });
    return response.data;
  },

  // Filtros específicos
  async getByEstado(estado: string): Promise<SolicitudRecoleccion[]> {
    return this.list({ estado });
  },

  async getPendientes(): Promise<SolicitudRecoleccion[]> {
    return this.list({ estado: 'pendiente' });
  },

  async getCompletadas(): Promise<SolicitudRecoleccion[]> {
    return this.list({ estado: 'completada' });
  }
};

export default solicitudesService;
