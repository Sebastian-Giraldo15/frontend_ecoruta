import api from './config';
import type { 
  APIResponse, 
  PaginatedResponse, 
  Notificacion,
  NotificacionCreateRequest 
} from '../../types/api.types';

export const notificacionService = {
  async create(notificacionData: NotificacionCreateRequest): Promise<APIResponse<Notificacion>> {
    const response = await api.post<APIResponse<Notificacion>>('/notificaciones/', notificacionData);
    return response.data;
  },

  async list(page: number = 1): Promise<PaginatedResponse<Notificacion>> {
    const params = new URLSearchParams();
    if (page > 1) params.append('page', page.toString());

    const response = await api.get<PaginatedResponse<Notificacion>>('/notificaciones/', { params });
    return response.data;
  },

  async getById(id: number): Promise<APIResponse<Notificacion>> {
    const response = await api.get<APIResponse<Notificacion>>(`/notificaciones/${id}/`);
    return response.data;
  },

  async update(id: number, notificacionData: Partial<NotificacionCreateRequest>): Promise<APIResponse<Notificacion>> {
    const response = await api.put<APIResponse<Notificacion>>(`/notificaciones/${id}/`, notificacionData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/notificaciones/${id}/`);
  },

  async enviarWhatsapp(id: number): Promise<APIResponse<{ status: string }>> {
    const response = await api.post<APIResponse<{ status: string }>>(`/notificaciones/${id}/enviar_whatsapp/`);
    return response.data;
  }
};

export default notificacionService;
