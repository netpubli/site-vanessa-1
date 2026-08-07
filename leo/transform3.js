const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. "Quero testar por 7 dias"
html = html.replace(/<a class="step-cta" href="[^"]*" data-open-schedule>\s*Quero testar por 7 dias/g, 
  '<a class="step-cta" href="#formulario-rodape">\n              Quero testar por 7 dias');

// 2. Showcase buttons
html = html.replace(/<button class="button button-red" type="button" data-ss-whatsapp="[^"]*">\s*Quero experimentar este modelo\s*<span[^>]*><\/span>\s*<\/button>/g, 
  `<a class="button button-red" href="#formulario-rodape">
                  Quero experimentar este modelo
                  <span data-phosphor="ArrowRight" data-phosphor-size="19" data-phosphor-weight="bold" aria-hidden="true"></span>
                </a>`);

// 3. FAQ Falar com especialista
html = html.replace(/<a class="text-link faq-specialist-button" href="[^"]*" data-whatsapp-link>\s*Falar com um especialista/g, 
  `<a class="text-link faq-specialist-button" href="#formulario-rodape">
            Agendar teste`);

// 4. Final CTA
html = html.replace(/<a class="button button-red" href="[^"]*" data-open-schedule>\s*Agendar teste gratuito/g, 
  `<a class="button button-red" href="#formulario-rodape">
              Agendar teste`);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Transform 3 completed!");
