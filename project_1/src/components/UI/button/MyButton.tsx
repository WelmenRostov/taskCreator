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
    'rounded-lg p-3 focus:outline-none dark:focus:ring-2 transition-all border-2 dark:border-gray-700 dark:bg-gray-850 border-yellow-700 dark:hover:border-indigo-500 hover:border-yellow-500 bg-gray-900/50 text-gray-800 dark:bg-gray-950/20 dark:text-zinc-200',
    {
      '!bg-indigo-700': isActive,
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
