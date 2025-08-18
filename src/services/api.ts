import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthResponse, User } from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL = 'http://localhost:8000/api';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token automáticamente
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar errores de autenticación
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const response = await this.refreshAccessToken(refreshToken);
              localStorage.setItem('accessToken', response.access);
              
              // Reintentar la solicitud original
              const originalRequest = error.config;
              originalRequest.headers.Authorization = `Bearer ${response.access}`;
              return axios(originalRequest);
            } catch (refreshError) {
              // Si el refresh falla, limpiar tokens y redirigir al login
              this.clearTokens();
              window.location.href = '/login';
            }
          } else {
            // No hay refresh token, redirigir al login
            this.clearTokens();
            window.location.href = '/login';
          }
        }
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
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await this.api.post('/auth/logout/', { refresh: refreshToken });
    }
    this.clearTokens();
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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

  // Métodos específicos para cada entidad
  
  // Usuarios
  async getUsers(params?: any) {
    return this.get('/usuarios/', params);
  }

  async getUser(id: number) {
    return this.get(`/usuarios/${id}/`);
  }

  async updateUser(id: number, data: any) {
    return this.put(`/usuarios/${id}/`, data);
  }

  async deleteUser(id: number) {
    return this.delete(`/usuarios/${id}/`);
  }

  // Solicitudes de recolección
  async getCollectionRequests(params?: any) {
    return this.get('/solicitudes/', params);
  }

  async getCollectionRequest(id: number) {
    return this.get(`/solicitudes/${id}/`);
  }

  async createCollectionRequest(data: any) {
    return this.post('/solicitudes/', data);
  }

  async updateCollectionRequest(id: number, data: any) {
    return this.put(`/solicitudes/${id}/`, data);
  }

  async deleteCollectionRequest(id: number) {
    return this.delete(`/solicitudes/${id}/`);
  }

  // Empresas
  async getCompanies(params?: any) {
    return this.get('/empresas/', params);
  }

  async getCompany(id: number) {
    return this.get(`/empresas/${id}/`);
  }

  async createCompany(data: any) {
    return this.post('/empresas/', data);
  }

  async updateCompany(id: number, data: any) {
    return this.put(`/empresas/${id}/`, data);
  }

  async deleteCompany(id: number) {
    return this.delete(`/empresas/${id}/`);
  }

  // Recompensas
  async getRewards(params?: any) {
    return this.get('/recompensas/', params);
  }

  async getReward(id: number) {
    return this.get(`/recompensas/${id}/`);
  }

  async createReward(data: any) {
    return this.post('/recompensas/', data);
  }

  async updateReward(id: number, data: any) {
    return this.put(`/recompensas/${id}/`, data);
  }

  async deleteReward(id: number) {
    return this.delete(`/recompensas/${id}/`);
  }

  // Intercambios
  async getExchanges(params?: any) {
    return this.get('/intercambios/', params);
  }

  async getExchange(id: number) {
    return this.get(`/intercambios/${id}/`);
  }

  async createExchange(data: any) {
    return this.post('/intercambios/', data);
  }

  async updateExchange(id: number, data: any) {
    return this.put(`/intercambios/${id}/`, data);
  }

  // Ubicaciones
  async getLocations(params?: any) {
    return this.get('/ubicaciones/', params);
  }

  async createLocation(data: any) {
    return this.post('/ubicaciones/', data);
  }

  // Estadísticas y reportes
  async getDashboardStats() {
    return this.get('/estadisticas/dashboard/');
  }

  async getReports(params?: any) {
    return this.get('/reportes/', params);
  }
}

export const apiService = new ApiService();
export default apiService;
