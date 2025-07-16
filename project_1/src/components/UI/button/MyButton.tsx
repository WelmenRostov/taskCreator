import React from 'react';
import clsx from 'clsx';

interface MyButtonProps extends HTMLButtonElement{
    size?: 'small' | 'medium' | 'large'; // Размер кнопки
    color?: 'blue' | 'red' | 'green' | 'gray'; // Цвет кнопки
    isDisabled?: boolean; // Если кнопка неактивна
    className?: string; // Дополнительные классы, если нужно
};

const MyButton: React.FC<MyButtonProps> = ({
                                               onClick,
                                               children,
                                               size = 'medium',
                                               color = 'blue',
                                               isDisabled = false,
                                               className,
                                           }) => {
    // Динамическое формирование классов для Tailwind CSS
    const buttonClasses = clsx(
        'rounded-lg p-3 focus:outline-none focus:ring-2 transition-all',
        {
            'w-full': size === 'large', // если размер большой, кнопка займет всю ширину
            'w-20': size === 'small', // если маленькая, ширина будет 20px
            'text-sm px-4 py-2': size === 'small',
            'text-base px-6 py-3': size === 'medium',
            'text-lg px-8 py-4': size === 'large',

            // Цветовые схемы
            'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500': color === 'blue',
            'bg-red-500 hover:bg-red-600 focus:ring-red-500': color === 'red',
            'bg-green-500 hover:bg-green-600 focus:ring-green-500': color === 'green',
            'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500': color === 'gray',

            // Если кнопка неактивна, применяем стили для disabled
            'cursor-not-allowed opacity-50': isDisabled,
        },
        className // Для добавления дополнительных классов
    );

    return (
        <button
            onClick={onClick}
            className={buttonClasses}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default MyButton;
