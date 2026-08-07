const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.split('https://www.centroauditivomacae.com.br/lptemporaria/2/').join('/lptemporaria/2/');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed URLs');
