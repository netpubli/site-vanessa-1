const fs = require('fs');
const path = require('path');

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const dstPath = path.join(dst, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
      console.log(`  copy: ${file}`);
    }
  }
}

const distSrc = path.join(__dirname, 'source', 'dist');
const outDir  = path.join(__dirname, 'dist');

// Clear dist/assets/ to avoid stale files from previous builds
const assetsOut = path.join(outDir, 'assets');
if (fs.existsSync(assetsOut)) {
  fs.rmSync(assetsOut, { recursive: true, force: true });
  console.log('Cleared dist/assets/');
}

fs.mkdirSync(outDir, { recursive: true });

// 1. Copy Vite output (assets + compiled index.html)
for (const item of fs.readdirSync(distSrc)) {
  const src = path.join(distSrc, item);
  const dst = path.join(outDir, item);
  if (fs.statSync(src).isDirectory()) {
    console.log(`copy dir: ${item}/`);
    copyDir(src, dst);
  } else {
    fs.copyFileSync(src, dst);
    console.log(`copy: ${item}`);
  }
}

// 2. Copy leo/img/ (hero image and other direct-served images)
const imgSrc = path.join(__dirname, 'img');
const imgDst = path.join(outDir, 'img');
if (fs.existsSync(imgSrc)) {
  console.log('copy dir: img/ (leo/img)');
  copyDir(imgSrc, imgDst);
}

// 3. Copy server-side files from leo/ root
const extras = [
  { src: 'contact.php',   dst: 'contact.php'   },
  { src: 'obrigado.html', dst: 'obrigado.html'  },
];
for (const { src, dst } of extras) {
  const srcPath = path.join(__dirname, src);
  const dstPath = path.join(outDir, dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`copy: ${src}`);
  } else {
    console.warn(`WARNING: ${src} not found at leo/${src}`);
  }
}

// 4. Copy reviews/
const reviewsSrc = path.join(__dirname, 'reviews');
const reviewsDst = path.join(outDir, 'reviews');
if (fs.existsSync(reviewsSrc)) {
  console.log('copy dir: reviews/');
  copyDir(reviewsSrc, reviewsDst);
}

console.log('\nBuild copiado para leo/dist/');
