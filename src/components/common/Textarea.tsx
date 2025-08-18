import React from 'react';
import { classNames } from '../../utils';

// Tipos para las props del textarea
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  isRequired?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Componente Textarea reutilizable
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helpText,
  isRequired = false,
  resize = 'vertical',
  className,
  id,
  rows = 3,
  ...props
}) => {
  // Generar ID único si no se proporciona
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  // Clases base del textarea
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors duration-200 sm:text-sm';
  
  // Clases condicionales basadas en el estado de error
  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-eco-500 focus:border-eco-500';
  
  // Clases de redimensionamiento
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  return (
    <div className="form-group">
      {/* Label */}
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Textarea */}
      <textarea
        id={textareaId}
        rows={rows}
        className={classNames(
          baseClasses,
          stateClasses,
          resizeClasses[resize],
          className
        )}
        {...props}
      />
      
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

export default Textarea;
