const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Duplicate the form
// Extract booking section
const bookingRegex = /<section class="booking-section section-shell.*?<\/section>/s;
const match = html.match(bookingRegex);
if (match) {
  let originalForm = match[0];
  
  // modify original form text
  html = html.replace(
    '<p class="booking-intro">Preencha todos os campos e garanta um desconto especial:</p>',
    '<p class="booking-intro">Preencha todos os campos:</p>'
  );

  let newForm = originalForm;
  
  // Change ID if it has one. The original form might not have an id explicitly or it's inside some div.
  // We'll just replace the first div id or just add an id to the section
  if (newForm.includes('id="booking"')) {
    newForm = newForm.replace('id="booking"', 'id="formulario-rodape"');
  } else {
    newForm = newForm.replace('<section class="booking-section section-shell', '<section id="formulario-rodape" class="booking-section section-shell');
  }
  newForm = newForm.replace('id="booking-title"', 'id="booking-title-footer"');
  newForm = newForm.replace(
    '<p class="booking-intro">Preencha todos os campos e garanta um desconto especial:</p>',
    '<p class="booking-intro">Preencha todos os campos:</p>'
  );
  
  // insert before footer
  if (!html.includes('id="formulario-rodape"')) {
    html = html.replace('<footer class="site-footer">', newForm + '\n\n<footer class="site-footer">');
  }
}

// 2. CTAs update
// "Quero testar por 7 dias" in steps
html = html.replace(/<a class="button button-red" href="[^"]*">\s*Quero testar por 7 dias/g, '<a class="button button-red" href="#formulario-rodape">\n                  Quero testar por 7 dias');

// Showcase WhatsApp buttons -> Quero experimentar este modelo -> #formulario-rodape
html = html.replace(/<a class="button button-whatsapp" href="[^"]*" target="_blank" rel="noopener">\s*<span data-phosphor="WhatsappLogo"[^>]*><\/span>\s*Falar no WhatsApp\s*<\/a>/g, 
  `<a class="button button-red" href="#formulario-rodape">
                  Quero experimentar este modelo
                  <span data-phosphor="ArrowRight" data-phosphor-size="19" data-phosphor-weight="bold" aria-hidden="true"></span>
                </a>`);

// FAQ "Falar com um especialista" -> "Agendar teste"
html = html.replace(/<a class="text-link faq-specialist-button" href="[^"]*">\s*Falar com um especialista/g, 
  `<a class="text-link faq-specialist-button" href="#formulario-rodape">
            Agendar teste`);

// Final CTA "Agendar teste gratuito" -> "Agendar teste"
html = html.replace(/<a class="button button-red" href="[^"]*">\s*Agendar teste gratuito/g, 
  `<a class="button button-red" href="#formulario-rodape">
              Agendar teste`);

// Remove floating whatsapp
html = html.replace(/<a class="floating-whatsapp" href="[^"]*" aria-label="Falar no WhatsApp" data-whatsapp-link>\s*<img class="floating-whatsapp-icon"[^>]*>\s*<\/a>/, '');

// Add styles
const styleBlock = `  <style>
    .booking-consultation-note {
      display: table !important;
      margin: 16px auto 0 !important;
      background-color: #fef2f2 !important;
      color: #991b1b !important;
      border: 1px solid #fecaca !important;
      border-radius: 8px !important;
      padding: 8px 16px !important;
      font-size: 0.85rem !important;
      font-weight: 600 !important;
      text-align: center !important;
    }
    .ss-consultation-note {
      display: block !important;
      text-align: center !important;
      margin-top: 12px !important;
    }
  </style>
`;
if (!html.includes('.booking-consultation-note {')) {
  html = html.replace('<body data-whatsapp-number="+5522992458704">', styleBlock + '<body data-whatsapp-number="+5522992458704">');
}

// 3. Replace paths
html = html.replace(/\/lptemporaria\/2\//g, 'https://www.centroauditivomacae.com.br/lptemporaria/2/');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Transform completed successfully! Match found: ", !!match);
