import React from 'react';
import { classNames } from '../../utils';

// Tipos para las props del select
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  placeholder?: string;
  isRequired?: boolean;
}

/**
 * Componente Select reutilizable
 */
export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helpText,
  options,
  placeholder,
  isRequired = false,
  className,
  id,
  ...props
}) => {
  // Generar ID único si no se proporciona
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  // Clases base del select
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors duration-200 sm:text-sm bg-white';
  
  // Clases condicionales basadas en el estado de error
  const stateClasses = error
    ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-eco-500 focus:border-eco-500';

  return (
    <div className="form-group">
      {/* Label */}
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Select */}
      <select
        id={selectId}
        className={classNames(
          baseClasses,
          stateClasses,
          className
        )}
        {...props}
      >
        {/* Placeholder option */}
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {/* Options */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
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

export default Select;
