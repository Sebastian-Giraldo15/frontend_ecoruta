import api from './config';
import type { 
  APIResponse, 
  PaginatedResponse, 
  TipoResiduo 
} from '../../types/api.types';

export const tipoResiduoService = {
  async list(params?: {
    page?: number;
    categoria?: string;
    subcategoria?: string;
  }): Promise<PaginatedResponse<TipoResiduo>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.categoria) queryParams.append('categoria', params.categoria);
    if (params?.subcategoria) queryParams.append('subcategoria', params.subcategoria);

    const response = await api.get<PaginatedResponse<TipoResiduo>>('/tipos-residuos/', {
      params: queryParams
    });
    return response.data;
  },

  async getById(id: number): Promise<APIResponse<TipoResiduo>> {
    const response = await api.get<APIResponse<TipoResiduo>>(`/tipos-residuos/${id}/`);
    return response.data;
  },

  async create(tipoResiduoData: Omit<TipoResiduo, 'id' | 'fecha_creacion'>): Promise<APIResponse<TipoResiduo>> {
    const response = await api.post<APIResponse<TipoResiduo>>('/tipos-residuos/', tipoResiduoData);
    return response.data;
  },

  async update(id: number, tipoResiduoData: Partial<Omit<TipoResiduo, 'id' | 'fecha_creacion'>>): Promise<APIResponse<TipoResiduo>> {
    const response = await api.put<APIResponse<TipoResiduo>>(`/tipos-residuos/${id}/`, tipoResiduoData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/tipos-residuos/${id}/`);
  }
};

export default tipoResiduoService;
