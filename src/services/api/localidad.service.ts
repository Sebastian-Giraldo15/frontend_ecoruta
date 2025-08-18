import api from './config';
import type { 
  APIResponse, 
  PaginatedResponse, 
  Localidad 
} from '../../types/api.types';

export const localidadService = {
  async list(page: number = 1): Promise<PaginatedResponse<Localidad>> {
    const params = new URLSearchParams();
    if (page > 1) params.append('page', page.toString());

    const response = await api.get<PaginatedResponse<Localidad>>('/localidades/', { params });
    return response.data;
  },

  async getById(id: number): Promise<APIResponse<Localidad>> {
    const response = await api.get<APIResponse<Localidad>>(`/localidades/${id}/`);
    return response.data;
  },

  async create(localidadData: Omit<Localidad, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>): Promise<APIResponse<Localidad>> {
    const response = await api.post<APIResponse<Localidad>>('/localidades/', localidadData);
    return response.data;
  },

  async update(id: number, localidadData: Partial<Omit<Localidad, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>>): Promise<APIResponse<Localidad>> {
    const response = await api.put<APIResponse<Localidad>>(`/localidades/${id}/`, localidadData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/localidades/${id}/`);
  }
};

export default localidadService;
