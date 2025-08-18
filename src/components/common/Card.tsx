import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils';

// Tipos para las props de la card
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Componente Card reutilizable con animaciones opcionales
 */
export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
  shadow = 'md',
  onClick,
  rounded = 'lg',
}) => {
  // Clases base
  const baseClasses = 'bg-white overflow-hidden transition-all duration-200';
  
  // Clases de padding
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };
  
  // Clases de sombra
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };
  
  // Clases de bordes redondeados
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };
  
  // Clases de hover
  const hoverClasses = hover ? 'hover:shadow-eco hover:-translate-y-1 cursor-pointer' : '';
  
  // Clases de click
  const clickClasses = onClick ? 'cursor-pointer' : '';

  const cardClasses = classNames(
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    hoverClasses,
    clickClasses,
    className
  );

  if (hover && onClick) {
    return (
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
        className={cardClasses}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

// Subcomponentes para estructura de card
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={classNames('px-4 py-5 sm:px-6 border-b border-gray-200', className)}>
    {children}
  </div>
);

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => (
  <div className={classNames('px-4 py-5 sm:p-6', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={classNames('px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50', className)}>
    {children}
  </div>
);

export default Card;
