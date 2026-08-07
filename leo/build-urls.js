const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace relative paths with absolute paths for production
html = html.split('/lptemporaria/2/').join('https://www.centroauditivomacae.com.br/lptemporaria/2/');

fs.writeFileSync('index.html', html, 'utf8');
console.log('URLs updated to production absolute paths.');
