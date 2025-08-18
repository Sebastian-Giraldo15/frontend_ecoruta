import api from './config';
import type { 
  APIResponse, 
  PaginatedResponse, 
  Canje,
  CanjeCreateRequest 
} from '../../types/api.types';

export const canjeService = {
  async create(canjeData: CanjeCreateRequest): Promise<APIResponse<Canje>> {
    const response = await api.post<APIResponse<Canje>>('/canjes/', canjeData);
    return response.data;
  },

  async list(page: number = 1): Promise<PaginatedResponse<Canje>> {
    const params = new URLSearchParams();
    if (page > 1) params.append('page', page.toString());

    const response = await api.get<PaginatedResponse<Canje>>('/canjes/', { params });
    return response.data;
  },

  async getById(id: number): Promise<APIResponse<Canje>> {
    const response = await api.get<APIResponse<Canje>>(`/canjes/${id}/`);
    return response.data;
  },

  async update(id: number, canjeData: Partial<CanjeCreateRequest>): Promise<APIResponse<Canje>> {
    const response = await api.put<APIResponse<Canje>>(`/canjes/${id}/`, canjeData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/canjes/${id}/`);
  }
};

export default canjeService;
