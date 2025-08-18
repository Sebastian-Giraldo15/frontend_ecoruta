import api from './config';
import type { User } from '../../types/auth.types';

/**
 * Servicio para manejar operaciones con usuarios
 */
const usuariosService = {
  // POST /api/usuarios/ - Registro de usuario (público)
  async create(userData: any): Promise<User> {
    const response = await api.post<User>('/usuarios/', userData);
    return response.data;
  },

  // GET /api/usuarios/ - Listar usuarios (solo admin)
  async list(params?: any): Promise<User[]> {
    const response = await api.get<User[]>('/usuarios/', { params });
    return response.data;
  },

  // GET /api/usuarios/{id}/ - Ver usuario específico (admin o usuario propio)
  async getById(id: number): Promise<User> {
    const response = await api.get<User>(`/usuarios/${id}/`);
    return response.data;
  },

  // PUT /api/usuarios/{id}/ - Actualizar usuario (admin o usuario propio)
  async update(id: number, userData: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/usuarios/${id}/`, userData);
    return response.data;
  },

  // PATCH /api/usuarios/{id}/ - Actualizar parcialmente usuario
  async partialUpdate(id: number, userData: Partial<User>): Promise<User> {
    const response = await api.patch<User>(`/usuarios/${id}/`, userData);
    return response.data;
  },

  // DELETE /api/usuarios/{id}/ - Eliminar usuario (admin o usuario propio)
  async delete(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}/`);
  },

  // Búsqueda
  async search(searchTerm: string): Promise<User[]> {
    const response = await api.get<User[]>(`/usuarios/?search=${encodeURIComponent(searchTerm)}`);
    return response.data;
  }
};

export default usuariosService;
