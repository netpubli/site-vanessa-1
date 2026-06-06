import { CalendarDays, Check, LockKeyhole } from 'lucide-react'

const days = [
  {
    date: '1º encontro · 08/07',
    title: 'Eu Sou Luz',
    description: 'O primeiro passo da proteção espiritual é fortalecer sua própria luz.',
    image: '/bg2.jpg',
    items: ['O campo de energia espiritual e como se manter na luz', 'Técnicas para alinhar sua energia na luz', 'Banhos especiais para situações diversas'],
    step: 'Etapa 1 do Ritual de Fechamento de Corpo',
  },
  {
    date: '2º encontro · 09/07',
    title: 'Eu Sou Proteção',
    description: 'Aqui você aprenderá práticas espirituais para momentos de dificuldade, desequilíbrio e sobrecarga energética.',
    image: '/1.jpg',
    items: ['Práticas diversas de banimentos e descarrego para realizar em momentos de dificuldade', 'Rezas poderosas', 'Elementos fáceis de ter e de uso na magia de proteção'],
    step: 'Etapa 2 do Ritual de Fechamento de Corpo',
  },
  {
    date: '3º encontro · 10/07',
    title: 'Corpo Fechado',
    description: 'No último encontro, você aprenderá como sustentar sua proteção espiritual de forma contínua.',
    image: '/bg4.jpg',
    items: ['Práticas diárias para manter a proteção constante', 'Espiritualidade livre e firmada em casa', 'Desenvolvimento no caminho espiritual'],
    step: 'Etapa Final do Ritual Completo de Fechamento de Corpo',
  },
]

export default function ImmersionDays() {
  return (
    <>
      <section id="immersion-days" className="section depth-atmosphere grain">
        <div className="section-container">
          <header className="section-header">
            <p className="type-eyebrow">Os 3 dias da imersão Corpo Fechado</p>
            <h2 className="type-h1">Proteção, descarrego e desenvolvimento espiritual</h2>
            <p className="type-subtitle">Em cada encontro você receberá ensinamentos de proteção, descarrego e desenvolvimento espiritual para se manter na luz e realizaremos em cada dia uma fase do ritual completo de fechamento de corpo.</p>
            <p className="type-quote">Por isso se faz importante a presença em cada dia para que seja alinhado todo o processo de fechamento de corpo que irei ensinar.</p>
          </header>
          <div className="days-grid">
            {days.map((day) => (
              <article className="day-card" key={day.title}>
                <img src={day.image} alt="" />
                <div className="day-card__shade" />
                <div className="day-card__content">
                  <p className="type-eyebrow"><CalendarDays size={15} /> {day.date}</p>
                  <h3 className="type-h2">{day.title}</h3>
                  <p>{day.description}</p>
                  <ul>{day.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
                  <div className="ritual-step"><LockKeyhole size={17} /> {day.step}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-bg-surface">
        <div className="section-container split split--reverse">
          <figure className="image-frame image-frame--wide">
            <img src="/freepik__talk__72210.jpeg" alt="Ervas e elementos para práticas espirituais" />
          </figure>
          <div>
            <p className="type-eyebrow">Viva essa imersão</p>
            <h2 className="type-h1">Presença, profundidade e direção espiritual</h2>
            <div className="divider-short divider-left" />
            <p className="type-subtitle">Para viver plenamente a energia desta imersão, sua participação ao vivo é essencial. Ainda assim, se você não conseguir estar presente em algum dos encontros, terá acesso às gravações por 7 dias para não perder a experiência.</p>
          </div>
        </div>
      </section>
    </>
  )
}
