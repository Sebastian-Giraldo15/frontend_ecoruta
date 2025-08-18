import api from './config';

/**
 * Tipos para Tipos de Residuos
 */
export interface TipoResidue {
  id: number;
  nombre: string;
  descripcion?: string;
  categoria: 'organico' | 'inorganico' | 'reciclable' | 'peligroso' | 'electronico';
  puntos_por_kilo: number;
  color_identificacion?: string;
  activo: boolean;
}

/**
 * Servicio para manejar operaciones con tipos de residuos
 */
const tiposResiduosService = {
  // GET /api/tipos-residuos/ - Listar tipos de residuos
  async list(params?: any): Promise<TipoResidue[]> {
    const response = await api.get<TipoResidue[]>('/tipos-residuos/', { params });
    return response.data;
  },

  // POST /api/tipos-residuos/ - Crear tipo de residuo (admin)
  async create(tipoData: Omit<TipoResidue, 'id'>): Promise<TipoResidue> {
    const response = await api.post<TipoResidue>('/tipos-residuos/', tipoData);
    return response.data;
  },

  // GET /api/tipos-residuos/{id}/ - Ver tipo de residuo específico
  async getById(id: number): Promise<TipoResidue> {
    const response = await api.get<TipoResidue>(`/tipos-residuos/${id}/`);
    return response.data;
  },

  // PUT /api/tipos-residuos/{id}/ - Actualizar tipo de residuo (admin)
  async update(id: number, tipoData: Partial<TipoResidue>): Promise<TipoResidue> {
    const response = await api.put<TipoResidue>(`/tipos-residuos/${id}/`, tipoData);
    return response.data;
  },

  // DELETE /api/tipos-residuos/{id}/ - Eliminar tipo de residuo (admin)
  async delete(id: number): Promise<void> {
    await api.delete(`/tipos-residuos/${id}/`);
  },

  // Filtros específicos
  async getByCategoria(categoria: string): Promise<TipoResidue[]> {
    return this.list({ categoria });
  },

  async getActivos(): Promise<TipoResidue[]> {
    return this.list({ activo: true });
  }
};

export default tiposResiduosService;
