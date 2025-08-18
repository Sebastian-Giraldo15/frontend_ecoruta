import api from './config';

/**
 * Tipos para Localidades
 */
export interface Localidad {
  id: number;
  nombre: string;
  provincia?: string;
  codigo_postal?: string;
  activo: boolean;
}

/**
 * Servicio para manejar operaciones con localidades
 */
const localidadesService = {
  // GET /api/localidades/ - Listar localidades
  async list(params?: any): Promise<Localidad[]> {
    const response = await api.get<Localidad[]>('/localidades/', { params });
    return response.data;
  },

  // POST /api/localidades/ - Crear localidad (admin)
  async create(localidadData: Omit<Localidad, 'id'>): Promise<Localidad> {
    const response = await api.post<Localidad>('/localidades/', localidadData);
    return response.data;
  },

  // GET /api/localidades/{id}/ - Ver localidad específica
  async getById(id: number): Promise<Localidad> {
    const response = await api.get<Localidad>(`/localidades/${id}/`);
    return response.data;
  },

  // PUT /api/localidades/{id}/ - Actualizar localidad (admin)
  async update(id: number, localidadData: Partial<Localidad>): Promise<Localidad> {
    const response = await api.put<Localidad>(`/localidades/${id}/`, localidadData);
    return response.data;
  },

  // PATCH /api/localidades/{id}/ - Actualizar parcialmente localidad
  async partialUpdate(id: number, localidadData: Partial<Localidad>): Promise<Localidad> {
    const response = await api.patch<Localidad>(`/localidades/${id}/`, localidadData);
    return response.data;
  },

  // DELETE /api/localidades/{id}/ - Eliminar localidad (admin)
  async delete(id: number): Promise<void> {
    await api.delete(`/localidades/${id}/`);
  }
};

export default localidadesService;
