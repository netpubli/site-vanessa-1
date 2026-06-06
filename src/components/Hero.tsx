import { ArrowRight, CalendarDays, Clock3, Video } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="hero grain" aria-label="Imersão Corpo Fechado">
      <div className="hero__image" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__copy animate-fade-up">
          <img className="hero__logo" src="/logo-sf.png" alt="Imersão Corpo Fechado" />
          <p className="type-eyebrow">8 a 10 de julho · Ao vivo às 19h pelo Youtube</p>
          <h1 className="type-display">
            Imersão
            <span className="text-gold-gradient">Corpo Fechado</span>
          </h1>
          <p className="hero__lead">
            Aprenda práticas simples e eficazes de proteção energética e o Ritual completo de fechamento de corpo.
          </p>
          <p className="hero__support">
            3 dias de aprendizado espiritual para você se manter protegido no seu dia a dia e iniciar sua caminhada na magia de luz.
          </p>
          <div className="hero__facts">
            <span><CalendarDays size={14} /> 8 a 10 de julho</span>
            <span><Clock3 size={14} /> Ao vivo às 19h</span>
            <span><Video size={14} /> Pelo Youtube</span>
          </div>
          <a href="#pricing" className="btn btn-primary btn-lg">
            Garantir minha vaga <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
