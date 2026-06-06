import { Check } from 'lucide-react'

const qualifications = [
  ['Psicologia Transpessoal', 'O caminho do autoconhecimento e da cura interior.'],
  ['Radiestesia e Radiônica', 'Equilíbrio energético e harmonização vibracional.'],
  ['Iridologia Orgânica e Comportamental', 'Diagnóstico emocional e identificação de traumas na íris.'],
  ['Master Reiki no Sistema Usui e Magnified Healing', 'Canalização e cura energética.'],
  ['Reiki OMROM e Reiki Ervas Multidimensionais', 'Frequências de cura e conexão com a natureza.'],
  ['Orixá Reiki Magnificado', 'Alinhamento espiritual com as energias ancestrais.'],
  ['Homeopatia e Cromoterapia', 'Terapias vibracionais para equilíbrio físico e emocional.'],
  ['Tarô Terapêutico', 'Uma abordagem profunda do tarô como ferramenta de autoconhecimento.'],
  ['Terapia Xamânica e Massoterapia', 'Cura através das práticas ancestrais.'],
  ['Professora e iniciada em Magia Divina do Fogo e Raios', 'Ativação do poder espiritual e conexão com a magia sagrada.'],
  ['Consteladora Familiar Xamânica', 'Cura sistêmica e libertação de padrões familiares.'],
  ['Ginecologia Natural e Doulagem', 'Conexão e resgate do sagrado feminino.'],
  ['Benzedeira e dirigente de vivências com expansão da consciência', 'Rituais e práticas espirituais para elevação energética.'],
  ['Idealizadora do curso Magia da Consciência e da Formação de Condutoras de Círculos de Mulheres', 'Guiando mulheres no despertar do seu poder pessoal.'],
]

export default function Instructor() {
  return (
    <section id="instructor" className="section depth-cinematic-split grain-fine">
      <div className="section-container">
        <div className="instructor-intro">
          <figure className="image-frame instructor-photo"><img src="/freepik__talk__57252.jpeg" alt="Vanessa Tikura" /></figure>
          <div>
            <p className="type-eyebrow">Quem é Vanessa Tikura</p>
            <h2 className="type-h1">Maga e terapeuta holística com mais de 14 anos de experiência</h2>
            <div className="divider-short divider-left" />
            <div className="prose">
              <p>A Imersão será ministrada por Vanessa Tikura, maga e terapeuta holística com mais de 14 anos de experiência no atendimento espiritual e na formação de alunos.</p>
              <p>Vanessa é reconhecida por conduzir rituais com profundidade, ética, clareza e acolhimento — sempre guiando seus alunos a acessarem sua própria força espiritual.</p>
            </div>
          </div>
        </div>
        <header className="section-header qualifications-title">
          <p className="type-eyebrow">Qualificações e especializações</p>
        </header>
        <div className="qualifications-grid">
          {qualifications.map(([title, text]) => (
            <article key={title}><Check size={16} /><p><strong>{title}</strong> — {text}</p></article>
          ))}
        </div>
      </div>
    </section>
  )
}
