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
    'rounded-lg p-3 focus:outline-none focus:ring-2 transition-all dark:!bg-grey-950 border-2 border-gray-700',
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
