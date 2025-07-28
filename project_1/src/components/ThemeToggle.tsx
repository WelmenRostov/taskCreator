import { useState, useEffect } from 'react';

const ThemeToggleWithBox = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Проверяем сохраненную тему при загрузке страницы
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    // Переключение темы
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="p-4">
            {/* Кнопка для переключения темы */}
            <button
                onClick={toggleTheme}
                className="mb-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-md"
            >
                {isDarkMode ? '🌙 Темная тема' : '🌞 Светлая тема'}
            </button>

            {/* div, который будет менять цвет в зависимости от темы */}
            <div
                className='w-32 h-32 rounded-lg transition-colors duration-300 bg-gray-800 dark:bg-yellow-300'
            ></div>
        </div>
    );
};

export default ThemeToggleWithBox;
