import api from './config';
import type { 
  APIResponse, 
  PaginatedResponse, 
  Usuario as User, 
  UsuarioCreateRequest as CreateUserRequest 
} from '../../types/api.types';

export const userService = {
  async create(userData: CreateUserRequest): Promise<APIResponse<User>> {
    const response = await api.post<APIResponse<User>>('/usuarios/', userData);
    return response.data;
  },

  async list(page: number = 1, search?: string): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();
    if (page > 1) params.append('page', page.toString());
    if (search) params.append('search', search);

    const response = await api.get<PaginatedResponse<User>>('/usuarios/', { params });
    return response.data;
  },

  async getById(id: number): Promise<APIResponse<User>> {
    const response = await api.get<APIResponse<User>>(`/usuarios/${id}/`);
    return response.data;
  },

  async update(id: number, userData: Partial<CreateUserRequest>): Promise<APIResponse<User>> {
    const response = await api.put<APIResponse<User>>(`/usuarios/${id}/`, userData);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}/`);
  }
};

export default userService;
