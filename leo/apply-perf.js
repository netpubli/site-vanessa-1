const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const htmlPath = path.join(buildDir, 'index.html');
const assetsDir = path.join(buildDir, 'assets');

// Auto-detect main CSS file
const cssFiles = fs.readdirSync(assetsDir).filter(f => f.match(/^index-.*\.css$/));
const cssPath = cssFiles.length > 0 ? path.join(assetsDir, cssFiles[0]) : null;
if (cssPath) console.log(`CSS: ${cssFiles[0]}`);

let html = fs.readFileSync(htmlPath, 'utf8');

// ── 1. Extract + convert base64 JPEG ──────────────────────────────────────
const b64Match = html.match(/src="data:image\/jpeg;base64,([^"]+)"/);
if (b64Match) {
  const jpegBuf = Buffer.from(b64Match[1], 'base64');
  const webpDest = path.join(assetsDir, 'lifelong-support-card.webp');
  sharp(jpegBuf).webp({ quality: 82, effort: 4 }).toFile(webpDest).then(() => {
    console.log('Extracted base64 → lifelong-support-card.webp');
  });
  html = html.replace(
    /src="data:image\/jpeg;base64,[^"]+"/,
    'src="/assets/lifelong-support-card.webp"'
  );
}

// ── 2. Swap asset img src JPG/PNG → WebP ──────────────────────────────────
html = html.replace(/src="(\/assets\/[^"]+\.(jpg|jpeg|png))"/gi, (match, src) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const webpFile = path.join(buildDir, webpSrc.replace(/^\//, ''));
  if (fs.existsSync(webpFile)) {
    console.log(`img swap: ${path.basename(src)} → webp`);
    return `src="${webpSrc}"`;
  }
  return match;
});

// ── 3. Add decoding="async" to lazy images ─────────────────────────────────
let lazyCount = 0;
html = html.replace(/(<img\b[^>]*)\bloading="lazy"([^>]*>)/g, (m, pre, post) => {
  if (m.includes('decoding=')) return m;
  lazyCount++;
  return `${pre}loading="lazy" decoding="async"${post}`;
});
if (lazyCount) console.log(`Added decoding="async" to ${lazyCount} lazy images`);

// ── 4. Fix Google Fonts: blocking → preload+onload ─────────────────────────
const oldFonts = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />`;
const newFonts = `<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" /></noscript>`;
if (html.includes(oldFonts)) {
  html = html.replace(oldFonts, newFonts);
  console.log('Fixed Google Fonts: non-blocking');
} else if (!html.includes('onload="this.onload=null')) {
  console.warn('WARNING: Google Fonts link not found');
}

// ── 5. LCP preload for hero image ──────────────────────────────────────────
if (!html.includes('rel="preload" as="image"')) {
  const heroMatch = html.match(/class="hero-media"[^>]*>[\s\S]*?src="([^"]+\.(jpg|jpeg|png|webp))"/i);
  if (heroMatch) {
    let heroSrc = heroMatch[1];
    const webpSrc = heroSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const webpFile = path.join(buildDir, webpSrc.replace(/^\//, ''));
    if (fs.existsSync(webpFile)) heroSrc = webpSrc;
    const preloadTag = `\n    <link rel="preload" as="image" href="${heroSrc}" fetchpriority="high" />`;
    const insertBefore = '  <script type="module"';
    if (html.includes(insertBefore)) {
      html = html.replace(insertBefore, `${preloadTag}\n    ${insertBefore.trim()}`);
      console.log(`LCP preload: ${heroSrc}`);
    }
  }
}

// ── 6. Inject validation + WhatsApp redirect scripts ──────────────────────
const injectedScripts = `
  <script>
  // Interceptar abertura do WhatsApp → redirecionar para pagina de obrigado
  (function () {
    var _open = window.open;
    window.open = function (url, target, features) {
      if (typeof url === 'string' && url.indexOf('wa.me') !== -1) {
        try { sessionStorage.setItem('waUrl', url); } catch (e) {}
        window.location.href = '/obrigado.html';
        return null;
      }
      return _open.apply(this, arguments);
    };
  })();
  </script>
  <script>
  (function () {
    function digitsOnly(v) { return v.replace(/\\D/g, ''); }
    function isValidPhone(value) {
      var d = digitsOnly(value);
      if (d.startsWith('55') && d.length >= 12) { var local = d.slice(2); return local.length === 10 || local.length === 11; }
      return d.length === 10 || d.length === 11;
    }
    function phoneMsg(value) {
      var d = digitsOnly(value);
      if (d.length < 10) return 'Numero muito curto. Use DDD + numero.';
      if (d.length > 13) return 'Numero muito longo.';
      return 'Telefone invalido. Fixo: DDD + 8 digitos. Celular: DDD + 9 digitos.';
    }
    function isValidEmail(v) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v.trim()); }
    function setupPhone(input) {
      input.addEventListener('keypress', function (e) { if (!/[\\d+\\-]/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault(); });
      input.addEventListener('input', function () {
        var pos = this.selectionStart, clean = this.value.replace(/[^\\d+\\-]/g, '');
        if (this.value !== clean) { this.value = clean; this.setSelectionRange(pos, pos); }
        this.setCustomValidity('');
      });
      input.addEventListener('blur', function () {
        var v = this.value.trim();
        if (!v) { this.setCustomValidity(''); return; }
        if (!isValidPhone(v)) { this.setCustomValidity(phoneMsg(v)); this.reportValidity(); } else this.setCustomValidity('');
      });
    }
    function setupEmail(input) {
      input.addEventListener('input', function () { this.setCustomValidity(''); });
      input.addEventListener('blur', function () {
        var v = this.value.trim();
        if (!v) { this.setCustomValidity(''); return; }
        if (!isValidEmail(v)) { this.setCustomValidity('Digite um e-mail valido. Ex: voce@email.com'); this.reportValidity(); } else this.setCustomValidity('');
      });
    }
    function validateFields(container) {
      var ok = true;
      container.querySelectorAll('input[type="tel"]').forEach(function (inp) {
        var v = inp.value.trim();
        if (inp.required && !v) { inp.setCustomValidity('Preencha o telefone.'); inp.reportValidity(); ok = false; }
        else if (v && !isValidPhone(v)) { inp.setCustomValidity(phoneMsg(v)); inp.reportValidity(); ok = false; }
        else inp.setCustomValidity('');
      });
      container.querySelectorAll('input[type="email"]').forEach(function (inp) {
        var v = inp.value.trim();
        if (v && !isValidEmail(v)) { inp.setCustomValidity('Digite um e-mail valido. Ex: voce@email.com'); inp.reportValidity(); ok = false; }
        else inp.setCustomValidity('');
      });
      return ok;
    }
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('input[type="tel"]').forEach(setupPhone);
      document.querySelectorAll('input[type="email"]').forEach(setupEmail);
      document.querySelectorAll('[data-booking-next]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          var step = this.closest('[data-booking-step]') || this.closest('.booking-form-step') || this.parentElement;
          if (!validateFields(step)) e.stopImmediatePropagation();
        }, true);
      });
      document.querySelectorAll('[data-schedule-form], [data-booking-form]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
          if (!validateFields(this)) { e.preventDefault(); return; }
          var fd = new FormData(this);
          fd.append('origin', this.hasAttribute('data-booking-form') ? 'agendamento' : 'horario');
          fetch('/contact.php', { method: 'POST', body: fd }).catch(function () {});
        });
      });
    });
  })();
  </script>

`;

if (!html.includes('isValidPhone')) {
  html = html.replace('  </body>\n</html>', injectedScripts + '  </body>\n</html>');
  console.log('Injected validation + redirect scripts');
}

// ── 7. Write HTML ──────────────────────────────────────────────────────────
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('\nindex.html written.');

// ── 8. Update CSS background images → WebP ────────────────────────────────
if (cssPath && fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  let cssMod = false;
  css = css.replace(/url\(([^)]+\.(png|jpg|jpeg))\)/gi, (match, src) => {
    const filename = path.basename(src);
    const webpFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const webpFile = path.join(assetsDir, webpFilename);
    if (fs.existsSync(webpFile)) { cssMod = true; console.log(`css swap: ${filename} → ${webpFilename}`); return match.replace(filename, webpFilename); }
    return match;
  });
  if (cssMod) fs.writeFileSync(cssPath, css, 'utf8');
  console.log('CSS updated.');
}

console.log('\nAll done!');
