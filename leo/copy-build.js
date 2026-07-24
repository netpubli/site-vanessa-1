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

const distDir = path.join(__dirname, 'source', 'dist');
const outDir = __dirname;

for (const item of fs.readdirSync(distDir)) {
  const src = path.join(distDir, item);
  const dst = path.join(outDir, item);
  if (fs.statSync(src).isDirectory()) {
    console.log(`copy dir: ${item}/`);
    copyDir(src, dst);
  } else {
    fs.copyFileSync(src, dst);
    console.log(`copy: ${item}`);
  }
}
console.log('\nBuild copiado para leo/');
