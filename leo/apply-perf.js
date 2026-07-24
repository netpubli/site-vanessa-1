const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const assetsDir = path.join(__dirname, 'assets');
const cssPath = path.join(assetsDir, 'index-BzrxqtIA.css');

let html = fs.readFileSync(htmlPath, 'utf8');

// ── 1. Extract + convert base64 JPEG (benefits card) ──
const b64Match = html.match(/src="data:image\/jpeg;base64,([^"]+)"/);
if (b64Match) {
  const jpegBuf = Buffer.from(b64Match[1], 'base64');
  const webpDest = path.join(assetsDir, 'lifelong-support-card.webp');
  sharp(jpegBuf).webp({ quality: 82, effort: 4 }).toFile(webpDest).then(() => {
    console.log(`Extracted base64 → lifelong-support-card.webp`);
  });
  html = html.replace(
    /src="data:image\/jpeg;base64,[^"]+"/,
    'src="/lptemporaria/2/assets/lifelong-support-card.webp"'
  );
}

// ── 2. Convert all asset img src from JPG/PNG to WebP when WebP exists ──
html = html.replace(/src="(\/lptemporaria\/2\/assets\/[^"]+\.(jpg|jpeg|png))"/gi, (match, src) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const webpFile = path.join(__dirname, webpSrc.replace('/lptemporaria/2/', ''));
  if (fs.existsSync(webpFile)) {
    console.log(`img swap: ${path.basename(src)} → webp`);
    return `src="${webpSrc}"`;
  }
  return match;
});

// ── 3. Add decoding="async" to lazy-loaded images ──
let lazyCount = 0;
html = html.replace(/(<img\b[^>]*)\bloading="lazy"([^>]*>)/g, (m, pre, post) => {
  if (m.includes('decoding=')) return m;
  lazyCount++;
  return `${pre}loading="lazy" decoding="async"${post}`;
});
if (lazyCount) console.log(`Added decoding="async" to ${lazyCount} lazy images`);

// ── 4. Fix Google Fonts: blocking → preload+onload ──
const oldFonts = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />`;
const newFonts = `<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" /></noscript>`;
if (html.includes(oldFonts)) {
  html = html.replace(oldFonts, newFonts);
  console.log('Fixed Google Fonts: now non-blocking');
} else if (!html.includes('onload="this.onload=null')) {
  console.warn('WARNING: could not find Google Fonts link to fix');
}

// ── 5. Add preload for LCP hero image (auto-detect from hero section) ──
if (!html.includes('rel="preload" as="image"')) {
  const heroMatch = html.match(/class="hero-media"[^>]*>[\s\S]*?src="([^"]+\.(jpg|jpeg|png|webp))"/i);
  if (heroMatch) {
    let heroSrc = heroMatch[1];
    // prefer WebP version
    const webpSrc = heroSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const webpFile = path.join(__dirname, webpSrc.replace('/lptemporaria/2/', ''));
    if (fs.existsSync(webpFile)) heroSrc = webpSrc;

    const preloadTag = `\n    <link rel="preload" as="image" href="${heroSrc}" fetchpriority="high" />`;
    const insertBefore = '  <script type="module"';
    if (html.includes(insertBefore)) {
      html = html.replace(insertBefore, `${preloadTag}\n    ${insertBefore.trim()}`);
      console.log(`Added LCP preload for: ${heroSrc}`);
    }
  }
}

// ── 6. Write updated HTML ──
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('\nindex.html written.');

// ── 7. Update CSS background images to WebP ──
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  let cssMod = false;
  css = css.replace(/url\(([^)]+\.(png|jpg|jpeg))\)/gi, (match, src) => {
    const filename = path.basename(src);
    const webpFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const webpFile = path.join(assetsDir, webpFilename);
    if (fs.existsSync(webpFile)) {
      console.log(`css swap: ${filename} → ${webpFilename}`);
      cssMod = true;
      return match.replace(filename, webpFilename);
    }
    return match;
  });
  if (cssMod) fs.writeFileSync(cssPath, css, 'utf8');
  console.log('CSS updated.');
} else {
  console.warn('CSS file not found — skipping');
}

console.log('\nAll done!');
