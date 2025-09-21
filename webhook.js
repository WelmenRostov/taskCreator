const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    console.log('🚀 Получен webhook, начинаем развертывание...');
    
    exec('cd /var/www/myproject/greentodoer && git pull origin main && cd project_1 && npm ci && npm run build && mkdir -p ../dist && rm -rf ../dist/* && cp -r dist/* ../dist/ && sudo chown -R www-data:www-data ../dist/ && sudo chmod -R 755 ../dist/ && sudo systemctl reload nginx', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Ошибка:', error);
        return;
      }
      console.log('✅ Развертывание завершено');
    });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3001, () => {
  console.log('🎯 Webhook сервер запущен на порту 3001');
});
