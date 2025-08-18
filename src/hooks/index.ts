import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { LoadingState } from '../types';

/**
 * Hook personalizado para manejar operaciones CRUD con estado de carga
 */
export const useApi = <T = any>(endpoint: string, initialData: T | null = null) => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para realizar GET
  const fetchData = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.get<T>(endpoint, params);
      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al cargar datos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para realizar POST
  const postData = async (payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.post<T>(endpoint, payload);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al crear datos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para realizar PUT
  const putData = async (id: number | string, payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.put<T>(`${endpoint}${id}/`, payload);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al actualizar datos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para realizar DELETE
  const deleteData = async (id: number | string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.delete<T>(`${endpoint}${id}/`);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al eliminar datos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
    clearError,
    setData,
  };
};

/**
 * Hook para manejar estado de carga simple
 */
export const useLoading = (initialState: boolean = false): LoadingState & {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(initialState);
  const [error, setErrorState] = useState<string | null>(null);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (loading) {
      setErrorState(null);
    }
  };

  const setError = (error: string | null) => {
    setErrorState(error);
    setIsLoading(false);
  };

  const clearError = () => {
    setErrorState(null);
  };

  return {
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  };
};

/**
 * Hook para debounce de valores (útil para búsquedas)
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook para manejo de localStorage
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Obtener valor inicial del localStorage o usar el valor por defecto
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer ${key} del localStorage:`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error);
    }
  };

  // Función para eliminar el valor
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error al eliminar ${key} del localStorage:`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

/**
 * Hook para paginación
 */
export const usePagination = (initialPage: number = 1, initialPageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const reset = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    setCurrentPage,
    setPageSize,
    setTotalCount,
    goToPage,
    nextPage,
    previousPage,
    reset,
  };
};

/**
 * Hook para filtros de búsqueda
 */
export const useFilters = <T extends Record<string, any>>(initialFilters: T) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const updateFilter = (key: keyof T, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateFilters = (newFilters: Partial<T>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const clearFilter = (key: keyof T) => {
    setFilters(prev => ({
      ...prev,
      [key]: initialFilters[key],
    }));
  };

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    clearFilter,
  };
};
