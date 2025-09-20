# Настройка автоматического развертывания (CI/CD)

## 🎯 Варианты автоматического развертывания

### 1. GitHub Actions (Рекомендуется) ⭐

**Преимущества:**
- Простая настройка
- Надежность
- Интеграция с GitHub
- Бесплатно для публичных репозиториев

**Настройка:**

1. **Добавьте секреты в GitHub:**
   - Перейдите в Settings → Secrets and variables → Actions
   - Добавьте:
     - `SERVER_HOST` - IP адрес вашего сервера
     - `SERVER_USER` - имя пользователя для SSH
     - `SERVER_SSH_KEY` - приватный SSH ключ

2. **Файл уже создан:** `.github/workflows/deploy.yml`

3. **Настройте сервер:**
   ```bash
   # Создайте SSH ключ для GitHub Actions
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   
   # Добавьте публичный ключ в ~/.ssh/authorized_keys
   cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   ```

### 2. Webhook + Node.js скрипт

**Преимущества:**
- Полный контроль
- Работает с любым Git хостингом
- Можно настроить дополнительные проверки

**Настройка:**

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Настройте переменные окружения:**
   ```bash
   export WEBHOOK_SECRET="your-secret-key-here"
   ```

3. **Запустите webhook сервер:**
   ```bash
   node deploy-webhook.js
   ```

4. **Настройте systemd сервис:**
   ```bash
   sudo cp greentodoer-webhook.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable greentodoer-webhook
   sudo systemctl start greentodoer-webhook
   ```

5. **Настройте GitHub webhook:**
   - Перейдите в Settings → Webhooks
   - URL: `http://your-server:3001/webhook`
   - Content type: `application/json`
   - Secret: ваш секретный ключ

### 3. Простой скрипт развертывания

**Для ручного запуска или cron:**

```bash
# Сделайте скрипт исполняемым
chmod +x deploy.sh

# Запустите развертывание
./deploy.sh
```

**Настройка cron для автоматического развертывания:**
```bash
# Проверка обновлений каждые 5 минут
*/5 * * * * cd /path/to/project && git pull origin main && ./deploy.sh
```

## 🔧 Настройка сервера

### 1. Подготовка сервера

```bash
# Установите Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установите Git
sudo apt-get install git

# Создайте директорию для проекта
sudo mkdir -p /var/www/welmenrostov.ru/projects
sudo chown -R $USER:$USER /var/www/welmenrostov.ru/projects
```

### 2. Клонирование репозитория

```bash
cd /var/www/welmenrostov.ru/projects
git clone https://github.com/your-username/greentodoer.git
cd greentodoer
npm install
```

### 3. Настройка Nginx

```nginx
server {
    listen 80;
    server_name welmenrostov.ru;
    
    location /projects/greentodoer/ {
        alias /var/www/welmenrostov.ru/projects/greentodoer/dist/;
        try_files $uri $uri/ /projects/greentodoer/index.html;
        
        # Кэширование статических файлов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## 🚀 Процесс развертывания

### Автоматический (рекомендуется):

1. **Делаете коммит:**
   ```bash
   git add .
   git commit -m "Обновление функционала"
   git push origin main
   ```

2. **GitHub Actions автоматически:**
   - Клонирует код
   - Устанавливает зависимости
   - Собирает проект
   - Развертывает на сервер

### Ручной:

1. **На сервере:**
   ```bash
   cd /var/www/welmenrostov.ru/projects/greentodoer
   git pull origin main
   npm run build
   ```

## 🔍 Мониторинг и отладка

### Проверка статуса развертывания:

```bash
# GitHub Actions
# Перейдите в Actions вкладку в GitHub

# Webhook сервис
sudo systemctl status greentodoer-webhook
sudo journalctl -u greentodoer-webhook -f

# Логи Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Откат к предыдущей версии:

```bash
# Если есть резервные копии
sudo cp -r /path/to/backup/greentodoer-YYYYMMDD-HHMMSS/* /var/www/welmenrostov.ru/projects/greentodoer/dist/
sudo systemctl reload nginx
```

## 📋 Чеклист настройки

- [ ] Репозиторий создан на GitHub
- [ ] SSH ключи настроены
- [ ] Сервер подготовлен (Node.js, Git, Nginx)
- [ ] Проект клонирован на сервер
- [ ] Nginx настроен для SPA
- [ ] Выбран и настроен метод CI/CD
- [ ] Тестовое развертывание прошло успешно
- [ ] Мониторинг настроен

## 🆘 Решение проблем

### Ошибка "Permission denied":
```bash
sudo chown -R www-data:www-data /var/www/welmenrostov.ru/projects/greentodoer
sudo chmod -R 755 /var/www/welmenrostov.ru/projects/greentodoer
```

### Ошибка "Module not found":
```bash
cd /var/www/welmenrostov.ru/projects/greentodoer
npm ci
```

### Ошибка 404 на роутах:
Проверьте настройку Nginx для SPA (try_files директива)

### Webhook не работает:
```bash
# Проверьте статус сервиса
sudo systemctl status greentodoer-webhook

# Проверьте логи
sudo journalctl -u greentodoer-webhook -f

# Проверьте порт
sudo netstat -tlnp | grep 3001
```
