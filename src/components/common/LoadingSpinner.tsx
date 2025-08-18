import React from 'react';
import { motion } from 'framer-motion';

// Tipos para diferentes tipos de spinners
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  type?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

/**
 * Componente LoadingSpinner con diferentes tipos y tamaños
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  type = 'spinner',
  className,
}) => {
  // Clases de tamaño
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };
  
  // Clases de color
  const colorClasses = {
    primary: 'text-eco-600',
    white: 'text-white',
    gray: 'text-gray-400',
  };

  if (type === 'spinner') {
    return (
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }

  if (type === 'dots') {
    const dotSize = {
      sm: 'h-2 w-2',
      md: 'h-3 w-3',
      lg: 'h-4 w-4',
      xl: 'h-6 w-6',
    };

    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${dotSize[size]} bg-current rounded-full ${colorClasses[color]}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-current rounded-full ${colorClasses[color]} ${className}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    );
  }

  return null;
};

// Componente para skeleton loading
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width = 'w-full',
  height = 'h-4',
  rounded = true,
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${width} ${height} ${
        rounded ? 'rounded' : ''
      } ${className}`}
    />
  );
};

// Componente para estado de carga de página completa
interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  message = 'Cargando...',
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
