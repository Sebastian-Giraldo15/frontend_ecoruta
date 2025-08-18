import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/common';
import { LoginFormData } from '../../types';

/**
 * Página de inicio de sesión
 */
export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Limpiar errores al cambiar los campos
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData.username, formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(formData);
      // La redirección se maneja en el useEffect
    } catch (error) {
      // El error se maneja en el contexto
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-50 to-ocean-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-eco-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-ocean-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo y título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-eco-500 to-ocean-500 rounded-xl flex items-center justify-center mb-6">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede a tu cuenta de EcoRuta
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10"
        >
          {/* Formulario */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error general */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-md bg-red-50 p-4 border border-red-200"
              >
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error de autenticación
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Campo de usuario */}
            <Input
              label="Nombre de usuario o email"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              autoComplete="username"
              placeholder="Ingresa tu usuario o email"
            />

            {/* Campo de contraseña */}
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              rightIcon={
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              }
            />

            {/* Enlaces adicionales */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-eco-600 focus:ring-eco-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-eco-600 hover:text-eco-500 transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              disabled={!formData.username || !formData.password}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Enlace a registro */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿No tienes cuenta?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/register">
                <Button variant="secondary" size="lg" fullWidth>
                  Crear cuenta nueva
                </Button>
              </Link>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Al iniciar sesión, aceptas nuestros{' '}
              <Link to="/terms" className="text-eco-600 hover:text-eco-500">
                Términos de Servicio
              </Link>{' '}
              y{' '}
              <Link to="/privacy" className="text-eco-600 hover:text-eco-500">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Información sobre EcoRuta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          EcoRuta conecta a las personas con empresas de recolección de residuos 
          para crear un futuro más sostenible. 🌱
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
