import React from 'react';
import clsx from 'clsx';

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large'; // Размер кнопки
    color?: 'blue' | 'red' | 'green' | 'gray';
    isDisabled?: boolean;
    additionalStyle?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
                                               children,
                                               className,
                                               size = 'medium',
                                               color = 'blue',
                                               isDisabled = false,
                                               additionalStyle,
                                               ...props
                                           }) => {
    const buttonClasses = clsx(
        'rounded-lg p-3 focus:outline-none focus:ring-2 transition-all',
        {
            'w-full': size === 'large',
            'w-20': size === 'small',
            'text-sm px-4 py-2': size === 'small',
            'text-base px-6 py-3': size === 'medium',
            'text-lg px-8 py-4': size === 'large',
            'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500': color === 'blue',
            'bg-red-500 hover:bg-red-600 focus:ring-red-500': color === 'red',
            'bg-green-500 hover:bg-green-600 focus:ring-green-500': color === 'green',
            'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500': color === 'gray',
            'cursor-not-allowed opacity-50': isDisabled,
        },
        additionalStyle,
        className // добавляем переданный className
    );

    return (
        <button
            className={buttonClasses}
            disabled={isDisabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;
