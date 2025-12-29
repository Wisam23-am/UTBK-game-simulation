import React from 'react';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export default function ButtonPrimary({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
}: ButtonPrimaryProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-95';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
    >
      {children}
    </button>
  );
}
