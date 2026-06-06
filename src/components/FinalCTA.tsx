import { ArrowRight, MessageCircle } from 'lucide-react'

export default function FinalCTA() {
  return (
    <>
      <section id="final-cta" className="final-cta grain">
        <div className="final-cta__shade" />
        <div className="section-container-sm final-cta__content">
          <img src="/logo-sf.png" alt="" />
          <div className="divider-triple" />
          <p className="type-quote">Se dentro de você existe esse chamado…</p>
          <h2 className="type-h1">Talvez esta imersão seja exatamente o próximo passo da sua jornada.</h2>
          <a href="#pricing" className="btn btn-primary btn-lg">Garantir minha vaga <ArrowRight size={18} /></a>
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div>
          <p className="type-eyebrow">Ainda com dúvida?</p>
          <h2 className="type-h2">Nossa equipe está à disposição para ajudá-la.</h2>
        </div>
        <a href="https://wa.me/5511999999999" className="btn btn-secondary btn-lg"><MessageCircle size={19} /> Falar com a equipe</a>
      </section>
    </>
  )
}
