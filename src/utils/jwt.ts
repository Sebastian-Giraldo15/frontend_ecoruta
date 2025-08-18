/**
 * Utilidades para manejar tokens JWT
 */

interface JWTPayload {
  user_id: string;
  exp: number;
  iat: number;
  token_type: string;
}

/**
 * Decodifica un token JWT y extrae el payload
 * @param token Token JWT
 * @returns Payload decodificado o null si es inválido
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    // Un JWT tiene 3 partes separadas por puntos: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decodificar el payload (segunda parte)
    const payload = parts[1];
    
    // Agregar padding si es necesario para base64
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decodificar base64 usando window.atob para evitar problemas de tipos
    const decodedPayload = window.atob(paddedPayload);
    
    // Parsear JSON
    return JSON.parse(decodedPayload) as JWTPayload;
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

/**
 * Obtiene el user_id del token JWT almacenado
 * @returns user_id o null si no existe o es inválido
 */
export const getCurrentUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return null;
  }

  const payload = decodeJWT(token);
  return payload?.user_id || null;
};

/**
 * Verifica si un token JWT ha expirado
 * @param token Token JWT
 * @returns true si ha expirado, false si aún es válido
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) {
    return true;
  }

  // exp está en segundos, Date.now() está en milisegundos
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};
