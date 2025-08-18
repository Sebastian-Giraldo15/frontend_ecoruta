import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthResponse, User } from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL = '/api'; // Usar el proxy de Vite

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token automáticamente
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token'); // Corregido para coincidir con AuthContext
      console.log('Request interceptor - Token:', token ? token.substring(0, 20) + '...' : 'No token found');
      console.log('Request URL:', config.url);
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header set');
      } else {
        console.warn('No access token found in localStorage');
      }
      return config;
    });

    // Interceptor para manejar errores de autenticación (DEBUGGING MODE)
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        console.log('API Error:', {
          status: error.response?.status,
          url: originalRequest?.url,
          message: error.message,
          response: error.response?.data
        });
        
        // TEMPORALMENTE DESHABILITADO: No cerrar sesión automáticamente
        // Solo hacer log de errores para debugging
        if (error.response?.status === 401) {
          console.warn('401 error detected, but auto-logout is disabled for debugging');
        }
        
        // Para todos los errores, simplemente rechazar sin cerrar sesión
        return Promise.reject(error);
      }
    );
  }

  // Métodos de autenticación
  async login(username: string, password: string): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login/', {
      username,
      password,
    });
    return response.data;
  }

  async register(userData: any): Promise<User> {
    const response: AxiosResponse<User> = await this.api.post('/auth/register/', userData);
    return response.data;
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access: string }> {
    const response: AxiosResponse<{ access: string }> = await this.api.post('/auth/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token'); // Corregido
    if (refreshToken) {
      await this.api.post('/auth/logout/', { refresh: refreshToken });
    }
    this.clearTokens();
  }

  private clearTokens(): void {
    localStorage.removeItem('access_token'); // Corregido
    localStorage.removeItem('refresh_token'); // Corregido
  }

  // Métodos CRUD genéricos
  async get<T>(endpoint: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(endpoint, data);
    return response.data;
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(endpoint);
    return response.data;
  }

  // Métodos específicos para la API

  // Usuarios
  async getUsers(params?: any): Promise<User[]> {
    return this.get<User[]>('/users/', params);
  }

  async getUser(id: number): Promise<User> {
    return this.get<User>(`/users/${id}/`);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.patch<User>(`/users/${id}/`, data);
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete<void>(`/users/${id}/`);
  }

  // Perfil del usuario actual
  async getCurrentUser(): Promise<User> {
    return this.get<User>('/users/me/');
  }

  async updateCurrentUser(data: Partial<User>): Promise<User> {
    return this.patch<User>('/users/me/', data);
  }

  // Empresas
  async getCompanies(params?: any): Promise<any[]> {
    return this.get<any[]>('/empresas/', params);
  }

  async getCompany(id: number): Promise<any> {
    return this.get<any>(`/empresas/${id}/`);
  }

  async createCompany(data: any): Promise<any> {
    return this.post<any>('/empresas/', data);
  }

  async updateCompany(id: number, data: any): Promise<any> {
    return this.patch<any>(`/empresas/${id}/`, data);
  }

  async deleteCompany(id: number): Promise<void> {
    return this.delete<void>(`/empresas/${id}/`);
  }

  // Solicitudes de recolección
  async getRequests(params?: any): Promise<any[]> {
    return this.get<any[]>('/solicitudes/', params);
  }

  async getRequest(id: number): Promise<any> {
    return this.get<any>(`/solicitudes/${id}/`);
  }

  async createRequest(data: any): Promise<any> {
    return this.post<any>('/solicitudes/', data);
  }

  async updateRequest(id: number, data: any): Promise<any> {
    return this.patch<any>(`/solicitudes/${id}/`, data);
  }

  async deleteRequest(id: number): Promise<void> {
    return this.delete<void>(`/solicitudes/${id}/`);
  }

  // Localidades
  async getLocalidades(params?: any): Promise<any[]> {
    return this.get<any[]>('/localidades/', params);
  }

  async getLocalidad(id: number): Promise<any> {
    return this.get<any>(`/localidades/${id}/`);
  }

  async createLocalidad(data: any): Promise<any> {
    return this.post<any>('/localidades/', data);
  }

  async updateLocalidad(id: number, data: any): Promise<any> {
    return this.patch<any>(`/localidades/${id}/`, data);
  }

  async deleteLocalidad(id: number): Promise<void> {
    return this.delete<void>(`/localidades/${id}/`);
  }

  // Tipos de residuos
  async getTiposResiduos(params?: any): Promise<any[]> {
    return this.get<any[]>('/tipos-residuos/', params);
  }

  async getTipoResiduo(id: number): Promise<any> {
    return this.get<any>(`/tipos-residuos/${id}/`);
  }

  async createTipoResiduo(data: any): Promise<any> {
    return this.post<any>('/tipos-residuos/', data);
  }

  async updateTipoResiduo(id: number, data: any): Promise<any> {
    return this.patch<any>(`/tipos-residuos/${id}/`, data);
  }

  async deleteTipoResiduo(id: number): Promise<void> {
    return this.delete<void>(`/tipos-residuos/${id}/`);
  }

  // Reportes
  async getReports(params?: any): Promise<any[]> {
    return this.get<any[]>('/reportes/', params);
  }

  async getReport(id: number): Promise<any> {
    return this.get<any>(`/reportes/${id}/`);
  }

  // Recompensas
  async getRewards(params?: any): Promise<any[]> {
    return this.get<any[]>('/recompensas/', params);
  }

  async getReward(id: number): Promise<any> {
    return this.get<any>(`/recompensas/${id}/`);
  }

  async createReward(data: any): Promise<any> {
    return this.post<any>('/recompensas/', data);
  }

  async updateReward(id: number, data: any): Promise<any> {
    return this.patch<any>(`/recompensas/${id}/`, data);
  }

  async deleteReward(id: number): Promise<void> {
    return this.delete<void>(`/recompensas/${id}/`);
  }

  // Dashboard y estadísticas
  async getDashboardStats(): Promise<any> {
    return this.get<any>('/dashboard/stats/');
  }

  async getAdminStats(): Promise<any> {
    return this.get<any>('/admin/stats/');
  }

  async getCompanyStats(): Promise<any> {
    return this.get<any>('/company/stats/');
  }

  async getClientStats(): Promise<any> {
    return this.get<any>('/client/stats/');
  }
}

// Exportar una instancia singleton
export const apiService = new ApiService();
export default apiService;
