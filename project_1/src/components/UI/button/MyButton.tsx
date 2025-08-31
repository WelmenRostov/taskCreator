import React from 'react';
import clsx from 'clsx';

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large'; // Размер кнопки
  color?: 'blue' | 'red' | 'green' | 'gray';
  isDisabled?: boolean;
  additionalStyle?: string;
  isActive?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({
  children,
  className,
  size = 'medium',
  color = 'blue',
  isDisabled = false,
  additionalStyle,
  isActive,
  ...props
}) => {
  const buttonClasses = clsx(
    'rounded-lg p-3 focus:outline-none transition-all border-2 border-yellow-600 bg-yellow-600/90 text-gray-800 hover:bg-yellow-700 dark:bg-gray-950/20 dark:text-zinc-200 dark:focus:ring-2 dark:border-2 dark:border-gray-700 dark:bg-gray-850 dark:hover:border-indigo-500 dark:hover:dark:bg-indigo-700',
    {
      'dark:bg-indigo-700 bg-yellow-700': isActive,
    },
    additionalStyle,
    className
  );

  return (
    <button className={buttonClasses} disabled={isDisabled} {...props}>
      {children}
    </button>
  );
};

export default MyButton;
