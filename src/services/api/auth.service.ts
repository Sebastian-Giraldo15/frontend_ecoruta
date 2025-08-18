import api from './config';
import usuariosService from './usuarios.service';
import type { LoginCredentials, RegisterData, User } from '../../types/auth.types';
import { getCurrentUserIdFromToken } from '../../utils/jwt';

interface TokenResponse {
  access: string;
  refresh: string;
}

const authService = {
  // POST /api/token/ - Obtener token JWT
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/token/', credentials);
    return response.data;
  },

  // POST /api/token/refresh/ - Refrescar token JWT
  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    const response = await api.post<{ access: string }>('/token/refresh/', {
      refresh: refreshToken
    });
    return response.data;
  },

  // POST /api/usuarios/ - Registro de usuario (público)
  async register(data: RegisterData): Promise<User> {
    return usuariosService.create(data);
  },

  // GET /api/usuarios/{id}/ - Obtener usuario actual usando el ID del token
  async getCurrentUser(): Promise<User> {
    const userId = getCurrentUserIdFromToken();
    if (!userId) {
      throw new Error('No se pudo obtener el ID del usuario del token');
    }
    return usuariosService.getById(parseInt(userId, 10));
  },

  // Logout (solo limpiar tokens locales)
  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // PUT /api/usuarios/{id}/ - Actualizar usuario
  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    return usuariosService.update(userId, data);
  }
};

export default authService;
