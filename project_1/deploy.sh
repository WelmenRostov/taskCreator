#!/bin/bash

# Скрипт автоматического развертывания
# Использование: ./deploy.sh

set -e  # Остановка при ошибке

echo "🚀 Начинаем автоматическое развертывание..."

# Конфигурация
DEPLOY_PATH="/path/to/your/website/projects/greentodoer"
BACKUP_PATH="/path/to/backup/greentodoer-$(date +%Y%m%d-%H%M%S)"

# Создаем резервную копию
echo "💾 Создаем резервную копию..."
if [ -d "$DEPLOY_PATH" ]; then
    cp -r "$DEPLOY_PATH" "$BACKUP_PATH"
    echo "✅ Резервная копия создана: $BACKUP_PATH"
fi

# Переходим в директорию проекта
cd "$DEPLOY_PATH" || { echo "❌ Директория не найдена: $DEPLOY_PATH"; exit 1; }

# Получаем последние изменения
echo "📥 Получаем изменения из Git..."
git fetch origin
git reset --hard origin/main

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm ci --production=false

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Проверяем, что сборка прошла успешно
if [ ! -d "dist" ]; then
    echo "❌ Ошибка: папка dist не создана"
    exit 1
fi

# Копируем файлы в веб-директорию
echo "📁 Копируем файлы..."
WEB_DIR="/var/www/welmenrostov.ru/projects/greentodoer"
sudo mkdir -p "$WEB_DIR"
sudo cp -r dist/* "$WEB_DIR/"

# Устанавливаем правильные права
echo "🔐 Устанавливаем права доступа..."
sudo chown -R www-data:www-data "$WEB_DIR"
sudo chmod -R 755 "$WEB_DIR"

# Перезапускаем веб-сервер
echo "🔄 Перезапускаем веб-сервер..."
sudo systemctl reload nginx

# Очищаем старые резервные копии (старше 7 дней)
echo "🧹 Очищаем старые резервные копии..."
find /path/to/backup -name "greentodoer-*" -type d -mtime +7 -exec rm -rf {} \;

echo "✅ Развертывание завершено успешно!"
echo "🌐 Сайт доступен по адресу: https://welmenrostov.ru/projects/greentodoer/"
