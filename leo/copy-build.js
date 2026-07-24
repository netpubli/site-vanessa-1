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
const outDir = path.join(__dirname, 'build');

// Clear build/assets/ to avoid stale files from previous builds
const assetsOut = path.join(outDir, 'assets');
if (fs.existsSync(assetsOut)) {
  fs.rmSync(assetsOut, { recursive: true, force: true });
  console.log('Cleared build/assets/');
}

fs.mkdirSync(outDir, { recursive: true });

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
console.log('\nBuild copiado para leo/build/');
