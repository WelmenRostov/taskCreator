import React, {useRef, useEffect} from 'react';
import clsx from 'clsx';

interface MyTextareaProps {
    size?: 'small' | 'medium' | 'large' | 'editor' | 'base',
    name?: string,
    text?: string,
    type?: string,
    placeholder?: string,
    value?: string,
    className?: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    ref?: React.RefObject<HTMLTextAreaElement | null>,
    rows?: number,
    onInput?: () => void
}

const MyTextarea = ({name, placeholder, value, className, size, onChange, ...props}: MyTextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const textareaClasses = clsx(
        '',
        {
            'w-full': size === 'editor',
            'w-min-h-[50px] w-full mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none': size === 'base',
        },
        className
    );

    // Функция для корректной подгонки высоты
    const adjustTextareaHeight = () => {
        if (textareaRef.current?.style) {
            // Сбросить высоту в auto перед расчётом
            if ("style" in textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
            // Установить высоту равной scrollHeight (полная высота содержимого)
            if ("style" in textareaRef.current) {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` ;
            }
        }
    };

    // Вызываем adjustTextareaHeight при изменении value
    useEffect(() => {
        adjustTextareaHeight();
    }, [value]); // Вызываем, когда изменяется value

    return (
        <textarea
            ref={textareaRef}
            name={name}
            className={textareaClasses}
            placeholder={placeholder}
            value={value} // Используем value для контролируемого компонента
            onChange={onChange} // Обрабатываем изменение текста
            onInput={adjustTextareaHeight} // Растягиваем textarea по мере ввода
            {...props}
        />
    );
};

export default MyTextarea;
