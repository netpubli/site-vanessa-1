import { Flame, House, ShieldCheck, Sparkles, Sprout, Sun } from 'lucide-react'

const audience = [
  { icon: Sparkles, text: 'sente o chamado da espiritualidade e da magia de luz' },
  { icon: ShieldCheck, text: 'deseja aprender a se proteger energeticamente' },
  { icon: Sun, text: 'busca mais firmeza, clareza e fortalecimento espiritual' },
  { icon: House, text: 'quer aprender práticas espirituais para realizar em casa' },
  { icon: Sprout, text: 'deseja desenvolver sua caminhada espiritual com consciência' },
  { icon: Flame, text: 'sente que precisa limpar e proteger sua energia com mais autonomia' },
]

export default function TargetAudience() {
  return (
    <section id="target-audience" className="section section-bg-surface pattern-weave">
      <div className="section-container">
        <header className="section-header">
          <p className="type-eyebrow">Para quem é esta imersão?</p>
          <h2 className="type-h1">Esta experiência foi criada para você que:</h2>
        </header>
        <div className="audience-grid">
          {audience.map(({ icon: Icon, text }) => (
            <article className="audience-card" key={text}>
              <div className="audience-icon"><Icon size={20} /></div>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="closing-quote">
          <p className="type-quote">Se dentro de você existe esse chamado…</p>
          <p className="type-h3">Talvez esta imersão seja exatamente o próximo passo da sua jornada.</p>
        </div>
      </div>
    </section>
  )
}
