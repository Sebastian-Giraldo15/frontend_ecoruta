import React from 'react';
import { Card } from './Card';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple';
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  maxValue,
  color = 'green',
  showPercentage = true,
  className = ''
}) => {
  const percentage = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;
  
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  const backgroundClasses = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100'
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm text-gray-500">{percentage}%</span>
        )}
      </div>
      <div className={`w-full rounded-full h-2 ${backgroundClasses[color]}`}>
        <div
          className={`h-2 rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{value} kg</span>
        {maxValue > 0 && <span>{maxValue} kg total</span>}
      </div>
    </div>
  );
};
