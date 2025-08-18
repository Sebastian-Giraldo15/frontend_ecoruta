import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Utilidades para formatear fechas
 */
export const formatDate = (date: string | Date, formatString: string = 'dd/MM/yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatString, { locale: es });
  } catch (error) {
    return 'Fecha inválida';
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

export const formatDateRelative = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
  } catch (error) {
    return 'Fecha inválida';
  }
};

/**
 * Utilidades para validación
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{8,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isStrongPassword = (password: string): boolean => {
  // Al menos 8 caracteres, una mayúscula, una minúscula y un número
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

/**
 * Utilidades para formatear texto
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9 -]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Remover guiones dobles
    .trim();
};

/**
 * Utilidades para números
 */
export const formatCurrency = (amount: number, currency: string = 'COP'): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatNumber = (number: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Utilidades para arrays
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = (item[key] as unknown) as string;
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

/**
 * Utilidades para objetos
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...object };
  keys.forEach(key => delete result[key]);
  return result;
};

export const pick = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in object) {
      result[key] = object[key];
    }
  });
  return result;
};

/**
 * Utilidades para URLs y parámetros
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const filteredParams = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  
  return filteredParams.length > 0 ? `?${filteredParams.join('&')}` : '';
};

export const parseQueryString = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
};

/**
 * Utilidades para almacenamiento
 */
export const setStorageItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error al leer de localStorage:', error);
    return defaultValue;
  }
};

export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error);
  }
};

/**
 * Utilidades para clases CSS
 */
export const classNames = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Utilidades para colores de estado
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    // Estados de solicitudes
    pendiente: 'bg-yellow-100 text-yellow-800',
    asignada: 'bg-blue-100 text-blue-800',
    en_progreso: 'bg-purple-100 text-purple-800',
    completada: 'bg-green-100 text-green-800',
    cancelada: 'bg-red-100 text-red-800',
    
    // Estados de intercambios
    aprobado: 'bg-green-100 text-green-800',
    entregado: 'bg-eco-100 text-eco-800',
    
    // Estados generales
    activo: 'bg-green-100 text-green-800',
    inactivo: 'bg-gray-100 text-gray-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Utilidades para tipos de residuos
 */
export const getWasteTypeIcon = (wasteType: string): string => {
  const wasteIcons: Record<string, string> = {
    plastico: '♻️',
    papel: '📄',
    carton: '📦',
    vidrio: '🍶',
    metal: '🔗',
    organico: '🍃',
    electronico: '💻',
    textil: '👕',
    mixto: '🗂️',
  };
  
  return wasteIcons[wasteType] || '🗑️';
};

/**
 * Utilidades de tiempo
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
};
