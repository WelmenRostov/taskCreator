#!/bin/bash
set -e

echo "🚀 Начинаем развертывание..."

# Получаем последние изменения
git pull origin main

# Переходим в папку с исходным кодом
cd project_1

# Устанавливаем зависимости
npm ci

# Собираем проект
npm run build

# Создаем папку dist в корне если её нет
mkdir -p ../dist

# Очищаем старую папку dist
rm -rf ../dist/*

# Копируем собранные файлы из project_1/dist в корневую dist
cp -r dist/* ../dist/

# Устанавливаем права доступа
sudo chown -R www-data:www-data ../dist/
sudo chmod -R 755 ../dist/

# Перезапускаем Nginx
sudo systemctl reload nginx

echo "✅ Развертывание завершено!"
echo "🌐 Сайт доступен по адресу: https://welmenrostov.ru/projects/greentodoer/"
