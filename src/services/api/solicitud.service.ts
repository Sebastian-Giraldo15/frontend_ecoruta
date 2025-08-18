import api from './config';
import type { 
  APIResponse, 
  PaginatedResponse, 
  Solicitud, 
  SolicitudCreateRequest,
  RegistrarRecoleccionRequest 
} from '../../types/api.types';

export const solicitudService = {
  async create(solicitudData: SolicitudCreateRequest): Promise<APIResponse<Solicitud>> {
    const response = await api.post<APIResponse<Solicitud>>('/solicitudes/', solicitudData);
    return response.data;
  },

  async list(params?: {
    page?: number;
    estado?: string;
    tipo_residuo__categoria?: string;
  }): Promise<PaginatedResponse<Solicitud>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.estado) queryParams.append('estado', params.estado);
    if (params?.tipo_residuo__categoria) {
      queryParams.append('tipo_residuo__categoria', params.tipo_residuo__categoria);
    }

    const response = await api.get<PaginatedResponse<Solicitud>>('/solicitudes/', {
      params: queryParams
    });
    return response.data;
  },

  async getById(id: number): Promise<APIResponse<Solicitud>> {
    const response = await api.get<APIResponse<Solicitud>>(`/solicitudes/${id}/`);
    return response.data;
  },

  async update(id: number, solicitudData: Partial<SolicitudCreateRequest>): Promise<APIResponse<Solicitud>> {
    const response = await api.put<APIResponse<Solicitud>>(`/solicitudes/${id}/`, solicitudData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/solicitudes/${id}/`);
  },

  async registrarRecoleccion(id: number, data: RegistrarRecoleccionRequest): Promise<APIResponse<{ status: string }>> {
    const response = await api.post<APIResponse<{ status: string }>>(`/solicitudes/${id}/registrar_recoleccion/`, data);
    return response.data;
  },

  async reporteUsuario(params?: {
    fecha_inicio?: string;
    fecha_fin?: string;
    usuario_id?: number;
  }): Promise<APIResponse<Array<{
    usuario__nombre: string;
    tipo_residuo__categoria: string;
    total_recolecciones: number;
    total_peso: number;
    total_puntos: number;
  }>>> {
    const queryParams = new URLSearchParams();
    if (params?.fecha_inicio) queryParams.append('fecha_inicio', params.fecha_inicio);
    if (params?.fecha_fin) queryParams.append('fecha_fin', params.fecha_fin);
    if (params?.usuario_id) queryParams.append('usuario_id', params.usuario_id.toString());

    const response = await api.get<APIResponse<Array<{
      usuario__nombre: string;
      tipo_residuo__categoria: string;
      total_recolecciones: number;
      total_peso: number;
      total_puntos: number;
    }>>>('/solicitudes/reporte_usuario/', {
      params: queryParams
    });
    return response.data;
  }
};

export default solicitudService;
