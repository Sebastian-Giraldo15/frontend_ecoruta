import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Select } from '../../components/common';
import { RegisterFormData, UserType } from '../../types';
import { isValidEmail, isStrongPassword } from '../../utils';

/**
 * Página de registro de usuarios
 */
export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    telefono: '',
    tipo_usuario: 'cliente',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { register, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Limpiar errores al cambiar los campos
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error de validación específico
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validar campos requeridos
    if (!formData.username.trim()) {
      errors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      errors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (!isStrongPassword(formData.password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.first_name.trim()) {
      errors.first_name = 'El nombre es requerido';
    }

    if (!formData.last_name.trim()) {
      errors.last_name = 'El apellido es requerido';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await register(formData);
      // La redirección se maneja en el contexto después del login automático
    } catch (error) {
      // El error se maneja en el contexto
    } finally {
      setIsSubmitting(false);
    }
  };

  // Opciones para tipo de usuario
  const userTypeOptions = [
    { value: 'cliente', label: 'Cliente - Solicitar recolección de residuos' },
    { value: 'empresa_recolectora', label: 'Empresa Recolectora - Ofrecer servicios de recolección' },
  ];

  // Validaciones en tiempo real
  const getPasswordStrength = () => {
    if (!formData.password) return null;
    
    const checks = [
      { test: formData.password.length >= 8, label: 'Al menos 8 caracteres' },
      { test: /[A-Z]/.test(formData.password), label: 'Una letra mayúscula' },
      { test: /[a-z]/.test(formData.password), label: 'Una letra minúscula' },
      { test: /\d/.test(formData.password), label: 'Un número' },
    ];

    return checks;
  };

  const passwordStrength = getPasswordStrength();

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
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Únete a la revolución del reciclaje
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
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                      Error de registro
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tipo de usuario */}
            <Select
              label="Tipo de cuenta"
              name="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleInputChange}
              options={userTypeOptions}
              required
              helpText="Selecciona el tipo de cuenta según tu necesidad"
            />

            {/* Nombre y apellido */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nombre"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                error={validationErrors.first_name}
                required
                placeholder="Tu nombre"
              />
              <Input
                label="Apellido"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                error={validationErrors.last_name}
                required
                placeholder="Tu apellido"
              />
            </div>

            {/* Usuario */}
            <Input
              label="Nombre de usuario"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={validationErrors.username}
              required
              placeholder="Elige un nombre de usuario único"
              helpText="Mínimo 3 caracteres"
            />

            {/* Email */}
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={validationErrors.email}
              required
              placeholder="tu@email.com"
            />

            {/* Teléfono */}
            <Input
              label="Teléfono (opcional)"
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="+57 300 123 4567"
              helpText="Opcional pero recomendado para coordinar recolecciones"
            />

            {/* Contraseña */}
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={validationErrors.password}
              required
              placeholder="Crea una contraseña segura"
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

            {/* Indicador de fortaleza de contraseña */}
            {passwordStrength && (
              <div className="mt-2">
                <div className="text-sm text-gray-600 mb-2">Requisitos de contraseña:</div>
                <div className="space-y-1">
                  {passwordStrength.map((check, index) => (
                    <div key={index} className="flex items-center text-sm">
                      {check.test ? (
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XMarkIcon className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span className={check.test ? 'text-green-600' : 'text-gray-500'}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmar contraseña */}
            <Input
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={validationErrors.confirmPassword}
              required
              placeholder="Confirma tu contraseña"
              rightIcon={
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              }
            />

            {/* Términos y condiciones */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-eco-600 focus:ring-eco-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Acepto los{' '}
                <Link to="/terms" className="text-eco-600 hover:text-eco-500">
                  Términos de Servicio
                </Link>{' '}
                y la{' '}
                <Link to="/privacy" className="text-eco-600 hover:text-eco-500">
                  Política de Privacidad
                </Link>
              </label>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              disabled={Object.keys(validationErrors).length > 0}
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          {/* Enlace a login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿Ya tienes cuenta?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="secondary" size="lg" fullWidth>
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Al unirte a EcoRuta, formas parte de una comunidad comprometida 
          con el cuidado del medio ambiente. 🌍
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
