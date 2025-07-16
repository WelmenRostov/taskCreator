/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'dark', // Для активации темы через класс 'dark'
    content: [
	"./index.html",
	"./src/**/*.{js,jsx,ts,tsx}", // укажи путь к своим файлам
    ],
    theme: {
	extend: {},
    },
    plugins: [],
}