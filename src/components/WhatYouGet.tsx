import { BookOpenText, MessageCircle, PlayCircle, Video } from 'lucide-react'

const items = [
  { icon: Video, title: '3 dias de encontros ao vivo', text: 'Uma jornada guiada com Vanessa Tikura para proteção e desenvolvimento espiritual.' },
  { icon: PlayCircle, title: 'Gravações por 7 dias', text: 'Assista depois com tranquilidade caso não consiga estar presente em algum encontro.' },
  { icon: BookOpenText, title: '3 apostilas em PDF', text: 'Material complementar exclusivo para reforçar e aprofundar sua prática espiritual.' },
  { icon: MessageCircle, title: 'Grupo VIP no WhatsApp', text: 'Suporte direto, conexão com a turma e acompanhamento durante toda a imersão.' },
]

export default function WhatYouGet() {
  return (
    <section id="what-you-get" className="section depth-sacred-center grain-fine">
      <div className="section-container">
        <header className="section-header">
          <p className="type-eyebrow">Tudo incluso na sua inscrição</p>
          <h2 className="type-h1">Uma jornada guiada para proteção e desenvolvimento espiritual</h2>
        </header>
        <div className="benefits-grid">
          {items.map(({ icon: Icon, title, text }, i) => (
            <article className="benefit-card" key={title}>
              <div className="icon-seal"><Icon size={22} /></div>
              <h3 className="type-h3">{title}</h3>
              <p>{text}</p>
              <span style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
