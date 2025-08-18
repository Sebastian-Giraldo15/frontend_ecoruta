import api from './config';
import type { 
  APIResponse, 
  Empresa,
  EmpresaCreateRequest,
  PaginatedResponse 
} from '../../types/api.types';

export const companyService = {
  async create(companyData: EmpresaCreateRequest): Promise<APIResponse<Empresa>> {
    const response = await api.post<APIResponse<Empresa>>('/empresas/', companyData);
    return response.data;
  },

  async list(page: number = 1, search?: string): Promise<PaginatedResponse<Empresa>> {
    const params = new URLSearchParams();
    if (page > 1) params.append('page', page.toString());
    if (search) params.append('search', search);

    const response = await api.get<PaginatedResponse<Empresa>>('/empresas/', { params });
    return response.data;
  },

  async getById(id: number): Promise<APIResponse<Empresa>> {
    const response = await api.get<APIResponse<Empresa>>(`/empresas/${id}/`);
    return response.data;
  },

  async update(id: number, companyData: Partial<EmpresaCreateRequest>): Promise<APIResponse<Empresa>> {
    const response = await api.put<APIResponse<Empresa>>(`/empresas/${id}/`, companyData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/empresas/${id}/`);
  }
};

export default companyService;
