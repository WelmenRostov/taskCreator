#!/usr/bin/env node

import { createServer } from 'http';
import { exec } from 'child_process';
import { promisify } from 'util';
import crypto from 'crypto';

const execAsync = promisify(exec);

// Конфигурация
const config = {
  port: 3001,
  secret: process.env.WEBHOOK_SECRET || 'your-secret-key',
  deployPath: '/path/to/your/website/projects/greentodoer',
  branch: 'main'
};

// Функция для проверки подписи GitHub
function verifySignature(payload, signature) {
  const hmac = crypto.createHmac('sha256', config.secret);
  hmac.update(payload);
  const expectedSignature = 'sha256=' + hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Функция развертывания
async function deploy() {
  try {
    console.log('🚀 Начинаем развертывание...');
    
    // Переходим в директорию проекта
    await execAsync(`cd ${config.deployPath}`);
    
    // Получаем последние изменения
    console.log('📥 Получаем изменения из Git...');
    await execAsync(`cd ${config.deployPath} && git pull origin ${config.branch}`);
    
    // Устанавливаем зависимости
    console.log('📦 Устанавливаем зависимости...');
    await execAsync(`cd ${config.deployPath} && npm ci`);
    
    // Собираем проект
    console.log('🔨 Собираем проект...');
    await execAsync(`cd ${config.deployPath} && npm run build`);
    
    // Перезапускаем веб-сервер (если нужно)
    console.log('🔄 Перезапускаем веб-сервер...');
    await execAsync('sudo systemctl reload nginx');
    
    console.log('✅ Развертывание завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при развертывании:', error.message);
    throw error;
  }
}

// Создаем HTTP сервер
const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const signature = req.headers['x-hub-signature-256'];
        
        if (!signature || !verifySignature(body, signature)) {
          console.log('❌ Неверная подпись webhook');
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }
        
        const payload = JSON.parse(body);
        
        // Проверяем, что это push в нужную ветку
        if (payload.ref === `refs/heads/${config.branch}`) {
          console.log(`📝 Получен push в ветку ${config.branch}`);
          await deploy();
        } else {
          console.log(`⏭️ Игнорируем push в ветку ${payload.ref}`);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success' }));
        
      } catch (error) {
        console.error('❌ Ошибка обработки webhook:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(config.port, () => {
  console.log(`🎯 Webhook сервер запущен на порту ${config.port}`);
  console.log(`🔗 URL для GitHub webhook: http://your-server:${config.port}/webhook`);
});
