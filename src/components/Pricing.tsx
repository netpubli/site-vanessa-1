import { ArrowRight, Check, ShieldCheck } from 'lucide-react'

export default function Pricing() {
  return (
    <section id="pricing" className="section pricing-section grain">
      <div className="section-container-sm">
        <header className="section-header" style={{ marginBottom: '2.5rem' }}>
          <p className="type-eyebrow">Inscrição</p>
          <h2 className="type-h1">Garanta sua vaga na imersão</h2>
        </header>
        <article className="pricing-card">
          <img src="/logo-sf.png" alt="" className="pricing-card__mark" />
          <p className="type-eyebrow">Investimento único</p>
          <div className="price"><small>8x</small> R$9,02</div>
          <p className="price-cash">ou R$62,00 à vista</p>
          <div className="divider-short" />
          <p>Um investimento acessível para viver uma experiência profunda de conexão, proteção e fortalecimento espiritual.</p>
          <ul>
            <li><Check size={16} /> 3 dias de encontros ao vivo</li>
            <li><Check size={16} /> Gravações por 7 dias</li>
            <li><Check size={16} /> 3 apostilas em PDF</li>
            <li><Check size={16} /> Grupo VIP no WhatsApp</li>
          </ul>
          <a href="#contact" className="btn btn-primary btn-lg">Garantir minha vaga <ArrowRight size={18} /></a>
          <div className="guarantee-badge">
            <ShieldCheck size={14} /> Garantia de 7 dias · Reembolso total sem burocracia
          </div>
        </article>
      </div>
    </section>
  )
}
