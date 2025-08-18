import React from 'react';
import { classNames } from '../../utils';

// Tipos para las props del input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRequired?: boolean;
}

/**
 * Componente Input reutilizable con label, error y estados
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  isRequired = false,
  className,
  id,
  ...props
}) => {
  // Generar ID único si no se proporciona
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Clases base del input
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors duration-200 sm:text-sm';
  
  // Clases condicionales basadas en el estado de error
  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-eco-500 focus:border-eco-500';
  
  // Clases para iconos
  const iconClasses = 'absolute inset-y-0 flex items-center pointer-events-none';
  const leftIconClasses = leftIcon ? 'pl-10' : '';
  const rightIconClasses = rightIcon ? 'pr-10' : '';

  return (
    <div className="form-group">
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input container */}
      <div className="relative">
        {/* Icono izquierdo */}
        {leftIcon && (
          <div className={classNames(iconClasses, 'left-0 pl-3')}>
            <span className="text-gray-400 sm:text-sm">{leftIcon}</span>
          </div>
        )}
        
        {/* Input */}
        <input
          id={inputId}
          className={classNames(
            baseClasses,
            stateClasses,
            leftIconClasses,
            rightIconClasses,
            className
          )}
          {...props}
        />
        
        {/* Icono derecho */}
        {rightIcon && (
          <div className={classNames(iconClasses, 'right-0 pr-3')}>
            <span className="text-gray-400 sm:text-sm">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <p className="form-error">{error}</p>
      )}
      
      {/* Texto de ayuda */}
      {helpText && !error && (
        <p className="form-help">{helpText}</p>
      )}
    </div>
  );
};

export default Input;
