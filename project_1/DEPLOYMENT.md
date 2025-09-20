# Инструкция по развертыванию GreenTodoer

## Настройка проекта для welmenrostov.ru/projects/greentodoer

Проект уже настроен для работы на пути `/projects/greentodoer/` на вашем домене.

### Что было настроено:

1. **Vite конфигурация** (`vite.config.ts`):
   - `base: '/projects/greentodoer/'` - базовый путь для всех ресурсов

2. **React Router** (`src/main.tsx`):
   - `basename="/projects/greentodoer"` - базовый путь для роутинга

3. **Автоматическое исправление путей**:
   - Скрипт `fix-paths.js` автоматически исправляет пути в HTML после сборки

## Развертывание на сервере

### 1. Сборка проекта
```bash
npm run build
```
Это создаст папку `dist` с готовыми файлами для продакшена.

### 2. Загрузка на сервер
Скопируйте содержимое папки `dist` в папку `greentodoer` на вашем сервере:
```
welmenrostov.ru/
├── servers/          # ваши серверы
└── projects/
    └── greentodoer/  # сюда скопируйте содержимое dist/
        ├── index.html
        ├── assets/
        └── vite.svg
```

### 3. Настройка веб-сервера

#### Для Nginx:
```nginx
location /projects/greentodoer/ {
    try_files $uri $uri/ /projects/greentodoer/index.html;
}
```

#### Для Apache (.htaccess):
```apache
RewriteEngine On
RewriteBase /projects/greentodoer/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /projects/greentodoer/index.html [L]
```

### 4. Проверка
После развертывания ваш сайт должен быть доступен по адресу:
- `https://welmenrostov.ru/projects/greentodoer/`
- `https://welmenrostov.ru/projects/greentodoer/signin`
- `https://welmenrostov.ru/projects/greentodoer/registration`
- `https://welmenrostov.ru/projects/greentodoer/user/...`

## Структура файлов на сервере

```
welmenrostov.ru/projects/greentodoer/
├── index.html              # Главная страница
├── assets/
│   ├── index-[hash].js     # JavaScript бандл
│   ├── index-[hash].css    # CSS стили
│   └── index-[hash].map    # Source maps
└── vite.svg               # Иконка сайта
```

## Обновление сайта

Для обновления сайта:
1. Внесите изменения в код
2. Запустите `npm run build`
3. Загрузите новые файлы из папки `dist` на сервер
4. Очистите кэш браузера (Ctrl+F5)

## Отладка

Если что-то не работает:
1. Проверьте, что все файлы загружены в правильную папку
2. Убедитесь, что веб-сервер настроен для SPA (Single Page Application)
3. Проверьте консоль браузера на наличие ошибок 404
4. Убедитесь, что пути в HTML файле содержат `/projects/greentodoer/`
