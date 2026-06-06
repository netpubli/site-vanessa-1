const faqs = [
  ['Quando consigo acessar a imersão?', 'O acesso é imediato após a confirmação da inscrição. Lembrando que as aulas serão nos dias 08 a 10 de julho ao vivo.'],
  ['E se eu não puder participar ao vivo?', 'Você terá acesso às gravações por 7 dias, podendo assistir quando for mais conveniente.'],
  ['E se eu quiser desistir da compra?', 'Você pode cancelar sua inscrição em até 7 dias após a compra, e devolvemos todo o valor pago.'],
  ['Terei suporte durante o evento?', 'Sim, haverá suporte disponível para esclarecer suas dúvidas pelo WhatsApp.'],
  ['Recebo apostilas?', 'Sim — você recebe 3 apostilas em PDF, uma para cada dia ritualístico.'],
  ['Como funciona o pagamento?', 'Você pode pagar em 8x de R$ 9,02 no cartão ou R$ 62,00 à vista.'],
  ['É seguro espiritualmente?', 'Sim. Todo o conteúdo é baseado em práticas éticas, ancestrais e alinhadas à luz — sem manipulações ou técnicas obscuras.'],
]

export default function FAQ() {
  return (
    <section id="faq" className="section section-bg-surface">
      <div className="section-container-sm">
        <header className="section-header">
          <p className="type-eyebrow">Perguntas frequentes</p>
          <h2 className="type-h1">Tudo o que você precisa saber</h2>
        </header>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>
                <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="faq-q">{question}</span>
                <span className="faq-toggle">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
