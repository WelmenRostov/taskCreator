import React, {useRef} from 'react';
import clsx from "clsx";

interface MyTextarea extends HTMLTextAreaElement{

    size?: 'small' | 'medium' | 'large'; // Размер кнопки
    name:string,
    placeholder:string
    text:string,
    className?:string

}
const MyTextarea = ({name, placeholder, text, className, size}:MyTextarea) => {

    
    const textareaClasses = clsx(
        '',
        {
            'w-full': size === 'editor',
            'w-min-h-[50px] w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none': size === 'base',
        },
        className
    );

    const textareaRef = useRef<MyTextarea | null>(null);

    // Функция для изменения высоты textarea по мере ввода
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            if ("style" in textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
            if ("style" in textareaRef.current) {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }
    };

    return (
        <textarea
            ref={textareaRef}
            name={name}
            className={textareaClasses}
            placeholder={placeholder}
            rows={1}
            defaultValue={text}
            onInput={adjustTextareaHeight} // Автоматическое изменение высоты
        ></textarea>
    );
};

export default MyTextarea;