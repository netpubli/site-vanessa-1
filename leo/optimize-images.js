const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'dist');
const assetsDir = path.join(buildDir, 'assets');
const imgDir = path.join(buildDir, 'img');

const targetExtensions = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!targetExtensions.includes(ext)) return;

  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  if (fs.existsSync(webpPath)) {
    const origSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    console.log(`SKIP (exists) ${path.basename(webpPath)} — orig ${(origSize/1024).toFixed(0)}KB → webp ${(webpSize/1024).toFixed(0)}KB`);
    return;
  }

  const origSize = fs.statSync(filePath).size;
  await sharp(filePath)
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath);
  const webpSize = fs.statSync(webpPath).size;
  const saving = origSize - webpSize;
  console.log(`DONE ${path.basename(webpPath)} — ${(origSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB (saved ${(saving/1024).toFixed(0)}KB, ${Math.round(saving/origSize*100)}%)`);
}

async function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      try {
        await convertToWebP(filePath);
      } catch (e) {
        console.error(`ERR ${file}: ${e.message}`);
      }
    }
  }
}

(async () => {
  console.log('=== build/assets/ ===');
  await processDir(assetsDir);
  console.log('\n=== build/img/ ===');
  await processDir(imgDir);
  console.log('\nDone.');
})();
