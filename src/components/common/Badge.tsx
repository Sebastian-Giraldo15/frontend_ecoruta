import React from 'react';
import { motion } from 'framer-motion';
import { classNames, getStatusColor } from '../../utils';

// Tipos para las props del badge
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'status';
  size?: 'sm' | 'md' | 'lg';
  status?: string; // Para variant='status', usar getStatusColor
  className?: string;
  animate?: boolean;
}

/**
 * Componente Badge reutilizable para mostrar estados y etiquetas
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  status,
  className,
  animate = false,
}) => {
  // Clases base
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  // Clases de tamaño
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };
  
  // Clases de variante
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    status: status ? getStatusColor(status) : 'bg-gray-100 text-gray-800',
  };

  const badgeClasses = classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (animate) {
    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={badgeClasses}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;
