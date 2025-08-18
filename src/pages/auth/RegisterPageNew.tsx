import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Select } from '../../components/common';
import type { RegisterData } from '../../types/auth.types';
import type { UserRole } from '../../types/navigation.types';

/**
 * Página de registro de usuarios - Versión simplificada
 */
export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmarPassword: '',
    nombre: '',
    apellido: '',
    rol: 'usuario' as UserRole,
    telefono: '',
    localidad_id: 1,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Limpiar errores cuando cambie el formulario
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData, clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      await register(formData);
      // La redirección se maneja en el useEffect
    } catch (error) {
      // El error se maneja en el contexto
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleOptions = [
    { value: 'usuario', label: 'Cliente' },
    { value: 'empresa_recolectora', label: 'Empresa Recolectora' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Formulario */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Crear cuenta nueva
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-eco-600 hover:text-eco-500">
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
              >
                {error}
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Tipo de usuario */}
              <Select
                label="Tipo de usuario"
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                options={roleOptions}
                required
              />

              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  autoComplete="given-name"
                />
                <Input
                  label="Apellido"
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                  autoComplete="family-name"
                />
              </div>

              {/* Email */}
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
              />

              {/* Teléfono */}
              <Input
                label="Teléfono (opcional)"
                type="tel"
                name="telefono"
                value={formData.telefono || ''}
                onChange={handleInputChange}
                autoComplete="tel"
              />

              <div className="relative">
                <Input
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirmar contraseña"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmarPassword"
                  value={formData.confirmarPassword}
                  onChange={handleInputChange}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                disabled={!formData.email || !formData.password || !formData.nombre || !formData.apellido}
              >
                {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Lado derecho - Imagen */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-400 to-ocean-600">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <h2 className="text-4xl font-bold mb-4">
                Únete a EcoRuta
              </h2>
              <p className="text-xl mb-8">
                Ayuda al medio ambiente y gana recompensas
              </p>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">♻️</div>
                  <div className="text-sm">Recicla fácilmente</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎁</div>
                  <div className="text-sm">Gana recompensas</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🌱</div>
                  <div className="text-sm">Cuida el planeta</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="text-sm">Comunidad activa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
