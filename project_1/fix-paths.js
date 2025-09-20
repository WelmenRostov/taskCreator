import fs from 'fs';
import path from 'path';

const distPath = './dist';
const basePath = '/projects/greentodoer';

// Читаем index.html
const indexPath = path.join(distPath, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// Заменяем пути в HTML
htmlContent = htmlContent.replace(/href="\/assets\//g, `href="${basePath}/assets/`);
htmlContent = htmlContent.replace(/src="\/assets\//g, `src="${basePath}/assets/`);
htmlContent = htmlContent.replace(/href="\/vite\.svg"/g, `href="${basePath}/vite.svg"`);

// Записываем исправленный HTML
fs.writeFileSync(indexPath, htmlContent);

console.log('✅ Пути в HTML файле исправлены для base path:', basePath);
