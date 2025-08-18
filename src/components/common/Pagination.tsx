import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { classNames } from '../../utils';

// Tipos para las props de paginación
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

/**
 * Componente Pagination reutilizable
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className,
}) => {
  // Calcular rango de páginas visibles
  const getVisiblePages = (): number[] => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // Ajustar start si end se ajustó
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={classNames('flex items-center justify-between', className)}>
      {/* Información de páginas */}
      <div className="flex-1 flex justify-between sm:hidden">
        {/* Móvil: Solo botones anterior/siguiente */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-700 self-center">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>

      {/* Desktop: Paginación completa */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Página <span className="font-medium">{currentPage}</span> de{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Botón Primera página */}
          {showFirstLast && currentPage > 1 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(1)}
              className="mr-2"
            >
              Primera
            </Button>
          )}

          {/* Botón Anterior */}
          {showPrevNext && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              leftIcon={<ChevronLeftIcon className="h-4 w-4" />}
            >
              Anterior
            </Button>
          )}

          {/* Números de página */}
          <div className="flex space-x-1 mx-4">
            {/* Ellipsis izquierda */}
            {visiblePages[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  1
                </button>
                {visiblePages[0] > 2 && (
                  <span className="px-3 py-2 text-sm font-medium text-gray-500">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Páginas visibles */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={classNames(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                  page === currentPage
                    ? 'bg-eco-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {page}
              </button>
            ))}

            {/* Ellipsis derecha */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className="px-3 py-2 text-sm font-medium text-gray-500">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Botón Siguiente */}
          {showPrevNext && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              rightIcon={<ChevronRightIcon className="h-4 w-4" />}
            >
              Siguiente
            </Button>
          )}

          {/* Botón Última página */}
          {showFirstLast && currentPage < totalPages && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className="ml-2"
            >
              Última
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
