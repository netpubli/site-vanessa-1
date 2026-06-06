/* ============================================================
   DesignSystemPreview — Visual validation only
   Not part of the Corpo Fechado landing page.
   ============================================================ */

// ── Helpers ──────────────────────────────────────────────────

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <span className="type-eyebrow">{title}</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      </div>
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.65rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: '0.5rem',
      textAlign: 'center',
    }}>
      {children}
    </p>
  )
}

// ── 1. Colors ────────────────────────────────────────────────

const backgroundColors = [
  { name: '--bg-deep',    value: '#081827', label: 'bg-deep' },
  { name: '--bg-base',    value: '#0F2435', label: 'bg-base' },
  { name: '--bg-surface', value: '#122D44', label: 'bg-surface' },
  { name: '--bg-raised',  value: '#173450', label: 'bg-raised' },
  { name: '--bg-overlay', value: '#1C3B5A', label: 'bg-overlay' },
]

const goldColors = [
  { name: '--gold-50',  value: '#FEF6E4', label: 'gold-50 · shimmer' },
  { name: '--gold-100', value: '#F9E4A8', label: 'gold-100 · champagne' },
  { name: '--gold-200', value: '#F2C957', label: 'gold-200 · polished' },
  { name: '--gold-300', value: '#E8B040', label: 'gold-300 · 22k warm' },
  { name: '--gold-400', value: '#D9A441', label: 'gold-400 · base' },
  { name: '--gold-500', value: '#C38B2A', label: 'gold-500 · aged' },
  { name: '--gold-600', value: '#A0711F', label: 'gold-600 · antique' },
  { name: '--gold-700', value: '#7A5218', label: 'gold-700 · deep amber' },
  { name: '--gold-800', value: '#5A3A10', label: 'gold-800 · dark recess' },
  { name: '--gold-900', value: '#3D2508', label: 'gold-900 · black-gold' },
]

const greenColors = [
  { name: '--green-light', value: '#4A7D52', label: 'green-light' },
  { name: '--green-base',  value: '#355E3B', label: 'green-base' },
  { name: '--green-dark',  value: '#243F29', label: 'green-dark' },
]

const neutralColors = [
  { name: '--neutral-100', value: '#F4E8D5', label: 'neutral-100' },
  { name: '--neutral-200', value: '#E8D4B8', label: 'neutral-200' },
  { name: '--neutral-300', value: '#D4B896', label: 'neutral-300' },
  { name: '--neutral-400', value: '#B89470', label: 'neutral-400' },
  { name: '--neutral-500', value: '#8C6A44', label: 'neutral-500' },
]

function ColorSwatch({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '10px',
        background: value,
        border: '1px solid rgba(217,164,65,0.15)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }} />
      <Label>{label}</Label>
      <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
        {value}
      </span>
    </div>
  )
}

function ColorRow({ title, colors }: { title: string; colors: typeof goldColors }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {title}
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {colors.map(c => <ColorSwatch key={c.name} value={c.value} label={c.label} />)}
      </div>
    </div>
  )
}

// ── 2. Typography ─────────────────────────────────────────────

// ── 3. Buttons ────────────────────────────────────────────────

// ── 4. Cards ──────────────────────────────────────────────────

// ── Main Component ────────────────────────────────────────────

export default function DesignSystemPreview() {
  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh', padding: '0 0 8rem' }}>

      {/* ── Header ── */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '2rem clamp(1rem, 5vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Design System
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '0.1em' }}>
            CORPO FECHADO — VISUAL VALIDATION
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['Colors', 'Typography', 'Buttons', 'Cards', 'Dividers', 'Badges', 'Effects', 'Patterns', 'Animations', 'Atmosphere'].map(s => (
            <a
              key={s}
              href={`#ds-${s.toLowerCase()}`}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                border: '1px solid var(--border-subtle)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = 'var(--gold-bright)';
                (e.target as HTMLElement).style.borderColor = 'var(--border-base)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = 'var(--text-muted)';
                (e.target as HTMLElement).style.borderColor = 'var(--border-subtle)';
              }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem clamp(1rem, 5vw, 3rem)' }}>

        {/* ── 1. Colors ── */}
        <div id="ds-colors">
          <Block title="1. Color Palette">
            <ColorRow title="Backgrounds" colors={backgroundColors} />
            <ColorRow title="Gold" colors={goldColors} />
            <ColorRow title="Green — São Jorge" colors={greenColors} />
            <ColorRow title="Neutral — Parchment" colors={neutralColors} />

            {/* Semantic tokens */}
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '1.5rem' }}>
              Semantic Text
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { label: 'text-primary', sample: 'Proteção sagrada', style: { color: 'var(--text-primary)' } },
                { label: 'text-secondary', sample: 'Proteção sagrada', style: { color: 'var(--text-secondary)' } },
                { label: 'text-muted', sample: 'Proteção sagrada', style: { color: 'var(--text-muted)' } },
                { label: 'text-gold', sample: 'Proteção sagrada', style: { color: 'var(--text-gold)' } },
              ].map(t => (
                <div key={t.label}>
                  <p style={{ fontFamily: 'Inter', fontSize: '1rem', ...t.style }}>{t.sample}</p>
                  <Label>{t.label}</Label>
                </div>
              ))}
            </div>
          </Block>
        </div>

        {/* ── 2. Typography ── */}
        <div id="ds-typography">
          <Block title="2. Typography">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

              <div>
                <p className="type-display">Display — Cormorant</p>
                <Label>type-display · Cormorant Garamond 600 · clamp(3rem → 6.5rem)</Label>
              </div>

              <div>
                <p className="type-h1">Heading 1 — Ancestral</p>
                <Label>type-h1 · Cormorant Garamond 600 · clamp(2.25rem → 4rem)</Label>
              </div>

              <div>
                <p className="type-h2">Heading 2 — Sagrado</p>
                <Label>type-h2 · Cormorant Garamond 500 · clamp(1.75rem → 3rem)</Label>
              </div>

              <div>
                <p className="type-h3">Heading 3 — Proteção</p>
                <Label>type-h3 · Cormorant Garamond 500 · clamp(1.25rem → 2rem)</Label>
              </div>

              <div>
                <p className="type-h4">Heading 4 — Espiritual</p>
                <Label>type-h4 · Cormorant Garamond 500 · clamp(1.1rem → 1.5rem)</Label>
              </div>

              <hr className="divider-gold" />

              <div>
                <p className="type-h2 type-italic">Italic Heading — <em>Feminine Energy</em></p>
                <Label>type-h2 type-italic · Cormorant Garamond Italic</Label>
              </div>

              <div>
                <p className="type-h2 text-gold-gradient">Metallic Gold Gradient</p>
                <Label>text-gold-gradient · jewelry metallic · 8-stop sheen</Label>
              </div>

              <div>
                <p className="type-h2 text-gold-warm">Warm Gold Gradient</p>
                <Label>text-gold-warm · candlelight on curved surface</Label>
              </div>

              <div>
                <p className="type-h2 text-gold">Gold Solid</p>
                <Label>text-gold · var(--text-gold) · flat gold</Label>
              </div>

              <hr className="divider-gold" />

              <div>
                <p className="type-subtitle">Subtitle — Inter, lighter weight, secondary color. Used below headings to provide context and rhythm to the section opener.</p>
                <Label>type-subtitle · Inter 400 · clamp(0.9rem → 1.125rem)</Label>
              </div>

              <div>
                <p className="type-body">Body copy — Inter regular. Used for paragraphs, descriptions, and explanatory text. Designed for readability on dark backgrounds with the parchment color palette.</p>
                <Label>type-body · Inter 400 · 1rem / 1.7</Label>
              </div>

              <div>
                <p className="type-body-sm">Small body — Inter regular small. Used for captions, footnotes, and secondary descriptive content that supports the main copy without competing with it.</p>
                <Label>type-body-sm · Inter 400 · 0.875rem / 1.6</Label>
              </div>

              <div>
                <p className="type-eyebrow">Eyebrow Label · Section Tag · Module Title</p>
                <Label>type-eyebrow · Inter 600 · 0.75rem · letter-spacing 0.18em</Label>
              </div>

              <div>
                <p className="type-quote">"A proteção que emana de dentro para fora. A luz que nenhuma sombra apaga."</p>
                <Label>type-quote · Cormorant Garamond Italic 400 · clamp(1.25rem → 1.875rem)</Label>
              </div>

            </div>
          </Block>
        </div>

        {/* ── 3. Buttons ── */}
        <div id="ds-buttons">
          <Block title="3. Buttons">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              <div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <button className="btn btn-primary btn-lg">Primary Large</button>
                  <button className="btn btn-primary">Primary Base</button>
                  <button className="btn btn-primary btn-sm">Primary Small</button>
                </div>
                <Label>btn-primary · gold filled · pill radius · gold glow shadow</Label>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <button className="btn btn-secondary btn-lg">Secondary Large</button>
                  <button className="btn btn-secondary">Secondary Base</button>
                  <button className="btn btn-secondary btn-sm">Secondary Small</button>
                </div>
                <Label>btn-secondary · gold outlined · transparent fill</Label>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <button className="btn btn-verde btn-lg">Verde Large</button>
                  <button className="btn btn-verde">Verde Base</button>
                  <button className="btn btn-verde btn-sm">Verde Small</button>
                </div>
                <Label>btn-verde · São Jorge green · protection energy</Label>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <button className="btn btn-ghost btn-lg">Ghost Large</button>
                  <button className="btn btn-ghost">Ghost Base</button>
                  <button className="btn btn-ghost btn-sm">Ghost Small</button>
                </div>
                <Label>btn-ghost · minimal · subtle border</Label>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-verde">Verde</button>
                  <button className="btn btn-ghost">Ghost</button>
                </div>
                <Label>Side-by-side comparison at base size</Label>
              </div>

            </div>
          </Block>
        </div>

        {/* ── 4. Cards ── */}
        <div id="ds-cards">
          <Block title="4. Cards">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>

              <div className="card">
                <p className="type-eyebrow" style={{ marginBottom: '0.75rem' }}>Base Card</p>
                <p className="type-h4" style={{ marginBottom: '0.5rem' }}>Título do Card</p>
                <p className="type-body-sm">Componente base. Hover eleva com border e gold shadow sutil.</p>
                <Label>card · bg-surface · border-subtle</Label>
              </div>

              <div className="card-glass">
                <p className="type-eyebrow" style={{ marginBottom: '0.75rem' }}>Glass Card</p>
                <p className="type-h4" style={{ marginBottom: '0.5rem' }}>Título do Card</p>
                <p className="type-body-sm">Glassmorphism com backdrop-filter. Ideal sobre imagens ou gradientes.</p>
                <Label>card-glass · blur(20px) · translucent</Label>
              </div>

              <div className="card-ritual">
                <p className="type-eyebrow" style={{ marginBottom: '0.75rem' }}>Ritual Card</p>
                <p className="type-h4" style={{ marginBottom: '0.5rem' }}>Título do Card</p>
                <p className="type-body-sm">Gold line on top, gradient bg, premium feeling. For featured content.</p>
                <Label>card-ritual · top gold accent line · gradient bg</Label>
              </div>

              <div className="card-flat">
                <p className="type-eyebrow" style={{ marginBottom: '0.75rem' }}>Flat Card</p>
                <p className="type-h4" style={{ marginBottom: '0.5rem' }}>Título do Card</p>
                <p className="type-body-sm">Sem hover. Estático. Para uso em grids densos ou listas de itens.</p>
                <Label>card-flat · no hover · static</Label>
              </div>

            </div>

            {/* Card with full content example */}
            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-ritual" style={{ maxWidth: '480px' }}>
                <div className="badge-ritual" style={{ marginBottom: '1rem' }}>Destaque</div>
                <p className="type-h3" style={{ marginBottom: '0.75rem' }}>Card com conteúdo completo</p>
                <p className="type-body-sm" style={{ marginBottom: '1.5rem' }}>Combinação de badge, heading e body dentro de um card-ritual, mostrando hierarquia visual real.</p>
                <button className="btn btn-primary btn-sm">Ação Principal</button>
              </div>
              <Label style={{ textAlign: 'left' }}>card-ritual com badge + hierarquia completa</Label>
            </div>
          </Block>
        </div>

        {/* ── 5. Dividers ── */}
        <div id="ds-dividers">
          <Block title="5. Dividers & Ornaments">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

              <div>
                <hr className="divider-gold" />
                <Label>divider-gold · full width · jewelry sheen · 7-stop gradient</Label>
              </div>

              <div>
                <hr className="divider-gold-double" />
                <Label>divider-gold-double · luxury double line · upper + lower offset</Label>
              </div>

              <div style={{ textAlign: 'center' }}>
                <hr className="divider-short" />
                <Label>divider-short · 80px centered · section opener</Label>
              </div>

              <div>
                <div className="divider-triple">
                  <span className="type-eyebrow" style={{ whiteSpace: 'nowrap' }}>◆ Símbolo ◆</span>
                </div>
                <Label>divider-triple · ornamental with text/symbol center</Label>
              </div>

              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div>
                  <p className="type-h4 accent-bar-left">Accent bar gold</p>
                  <p className="type-body-sm accent-bar-left" style={{ marginTop: '0.5rem' }}>Secondary line with same accent</p>
                  <Label>accent-bar-left · gold left border</Label>
                </div>
                <div>
                  <p className="type-h4 accent-bar-left-green">Accent bar verde</p>
                  <p className="type-body-sm accent-bar-left-green" style={{ marginTop: '0.5rem' }}>São Jorge green accent</p>
                  <Label>accent-bar-left-green</Label>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div className="section-ornament">
                  <span className="type-eyebrow">◆</span>
                </div>
                <Label>section-ornament · centered symbol with flanking lines</Label>
              </div>

              <div>
                <div style={{ padding: '1.5rem', borderRadius: '8px', background: 'var(--bg-surface)' }}>
                  <div className="border-top-gold" style={{ paddingTop: '1rem' }}>
                    <p className="type-body-sm">Content with top gold border</p>
                  </div>
                </div>
                <Label>border-top-gold · border-bottom-gold · utility borders</Label>
              </div>

            </div>
          </Block>
        </div>

        {/* ── 6. Badges ── */}
        <div id="ds-badges">
          <Block title="6. Badges & Labels">
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="badge-ritual">Ritual Badge</span>
              <span className="badge-ritual">◆ Com Símbolo</span>
              <span className="badge-ritual">Módulo 01</span>
              <span className="badge-ritual">Exclusivo</span>
            </div>
            <Label>badge-ritual · gold · uppercase · letter-spaced</Label>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', marginTop: '2rem' }}>
              <span className="badge-verde">Verde Badge</span>
              <span className="badge-verde">◆ Proteção</span>
              <span className="badge-verde">São Jorge</span>
            </div>
            <Label>badge-verde · green · São Jorge energy</Label>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem', alignItems: 'center' }}>
              <span className="badge-ritual">Eyebrow Label</span>
              <p className="type-h2" style={{ margin: 0 }}>Section Heading Below Badge</p>
            </div>
            <Label>badge + heading combination — standard section opener pattern</Label>
          </Block>
        </div>

        {/* ── 7. Effects ── */}
        <div id="ds-effects">
          <Block title="7. Glow Effects & Shadows">

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <p className="type-h4 glow-text-gold">Gold Text Glow</p>
                <Label>glow-text-gold</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <p className="type-h4 glow-text-soft" style={{ color: 'var(--neutral-100)' }}>Soft Text Glow</p>
                <Label>glow-text-soft</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--gold-bright)',
                  margin: '0 auto',
                }} className="glow-gold" />
                <Label>glow-gold · shadow-gold-md</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--gold-bright)',
                  margin: '0 auto',
                }} className="glow-gold-strong" />
                <Label>glow-gold-strong · shadow-gold-lg</Label>
              </div>

            </div>

            {/* Shadow scale */}
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Shadow Scale
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
              {[
                { label: 'shadow-gold-sm', cls: 'shadow-gold-sm' },
                { label: 'shadow-gold-md', cls: 'shadow-gold-md' },
                { label: 'shadow-gold-lg', cls: 'shadow-gold-lg' },
                { label: 'shadow-deep',    cls: 'shadow-deep' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div className={`card-flat ${s.cls}`} style={{ marginBottom: '0.5rem' }}>
                    <p className="type-body-sm" style={{ textAlign: 'center' }}>{s.label}</p>
                  </div>
                  <Label>{s.label}</Label>
                </div>
              ))}
            </div>

            {/* Ambient orb preview */}
            <div style={{ position: 'relative', height: '200px', marginTop: '2rem', borderRadius: '12px', background: 'var(--bg-surface)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <div className="glow-gold-orb animate-glow-pulse" style={{ width: '300px', height: '300px', top: '-80px', left: '-60px' }} aria-hidden="true" />
              <div className="glow-green-orb animate-glow-pulse-slow" style={{ width: '250px', height: '250px', bottom: '-80px', right: '-40px' }} aria-hidden="true" />
              <div className="glow-warm-orb animate-glow-pulse" style={{ width: '200px', height: '200px', top: '-40px', right: '30%' }} aria-hidden="true" />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p className="type-eyebrow">Ambient Orb Preview — glow-gold-orb · glow-green-orb · glow-warm-orb</p>
              </div>
            </div>
            <Label>Decorative background orbs (aria-hidden, pointer-events none)</Label>

          </Block>
        </div>

        {/* ── 8. Patterns ── */}
        <div id="ds-patterns">
          <Block title="8. Background Patterns">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>

              {[
                { cls: 'pattern-dots',  label: 'pattern-dots · radial dot grid · 32px' },
                { cls: 'pattern-weave', label: 'pattern-weave · diagonal lines · ancestral cloth' },
                { cls: 'pattern-lines', label: 'pattern-lines · horizontal · manuscript feel' },
              ].map(p => (
                <div key={p.cls}>
                  <div className={p.cls} style={{
                    height: '160px',
                    borderRadius: '12px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <p className="type-eyebrow" style={{ opacity: 0.5 }}>{p.cls}</p>
                  </div>
                  <Label>{p.label}</Label>
                </div>
              ))}

              <div>
                <div style={{
                  height: '160px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'var(--bg-raised)',
                }} className="vignette">
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <p className="type-eyebrow" style={{ opacity: 0.5 }}>vignette</p>
                  </div>
                </div>
                <Label>vignette · radial dark edges · cinematic depth</Label>
              </div>

            </div>

            {/* Combined pattern + orbs */}
            <div style={{ marginTop: '1.5rem', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', height: '180px' }}>
              <div className="pattern-dots" style={{ position: 'absolute', inset: 0, background: 'var(--bg-surface)' }} />
              <div className="glow-gold-orb animate-glow-pulse-slow" style={{ width: '400px', height: '400px', top: '-150px', left: '20%', opacity: 0.12 }} aria-hidden="true" />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '0.5rem' }}>
                <p className="type-eyebrow">pattern-dots + glow-gold-orb combined</p>
                <p className="type-body-sm" style={{ opacity: 0.4 }}>Standard section background recipe</p>
              </div>
            </div>
            <Label>Recommended combo: section-bg-surface + pattern-dots + glow orb</Label>
          </Block>
        </div>

        {/* ── 9. Animations ── */}
        <div id="ds-animations">
          <Block title="9. Animations">

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

              <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div className="animate-fade-in" style={{ width: '48px', height: '48px', background: 'var(--gold-bright)', borderRadius: '50%', margin: '0 auto 0.75rem', animation: 'fadeIn 1.5s ease-in-out infinite alternate' }} />
                <Label>animate-fade-in · opacity 0→1</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div className="animate-fade-up" style={{ width: '48px', height: '48px', background: 'var(--gold-bright)', borderRadius: '50%', margin: '0 auto 0.75rem', animation: 'fadeUp 1.5s ease-in-out infinite alternate' }} />
                <Label>animate-fade-up · opacity + translateY 28px→0</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div className="animate-float" style={{ width: '48px', height: '48px', background: 'var(--gold-bright)', borderRadius: '50%', margin: '0 auto 0.75rem' }} />
                <Label>animate-float · translateY loop ±10px · 5s</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div className="animate-glow-pulse" style={{ width: '48px', height: '48px', background: 'var(--gold-bright)', borderRadius: '50%', margin: '0 auto 0.75rem', boxShadow: 'var(--shadow-gold-lg)' }} />
                <Label>animate-glow-pulse · opacity 0.15→0.30 · 3s</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--gold-bright)', borderRadius: '8px', margin: '0 auto 0.75rem' }} className="flicker" />
                <Label>flicker · candleFlicker · scale + opacity · 4s</Label>
              </div>

              <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--gold-bright)', borderRadius: '8px', margin: '0 auto 0.75rem' }} className="flicker-slow" />
                <Label>flicker-slow · candleFlicker · 7s variant</Label>
              </div>

            </div>

            {/* Delay helpers */}
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Animation delay helpers
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              {[
                { cls: 'delay-100', label: '100ms' },
                { cls: 'delay-200', label: '200ms' },
                { cls: 'delay-300', label: '300ms' },
                { cls: 'delay-500', label: '500ms' },
                { cls: 'delay-700', label: '700ms' },
              ].map(d => (
                <div key={d.cls} style={{ textAlign: 'center' }}>
                  <div
                    className={`animate-fade-up ${d.cls}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--gold-bright)',
                      borderRadius: '6px',
                      animation: `fadeUp 1s ease-in-out ${d.cls.replace('delay-', '')}ms infinite alternate`,
                    }}
                  />
                  <Label>{d.label}</Label>
                </div>
              ))}
            </div>
            <Label style={{ textAlign: 'left', marginTop: '0.5rem' }}>Stagger pattern: animate-fade-up + delay-100…700 on child elements</Label>

          </Block>
        </div>

        {/* ── 10. Atmosphere ── */}
        <div id="ds-atmosphere">
          <Block title="10. Cinematic Atmosphere">

            {/* Film grain */}
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Film Grain</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { cls: 'grain-fine',   label: 'grain-fine · 300px · 0.018 opacity' },
                { cls: 'grain',        label: 'grain · 220px · 0.028 opacity' },
                { cls: 'grain-coarse', label: 'grain-coarse · 160px · 0.038 opacity' },
              ].map(g => (
                <div key={g.cls}>
                  <div
                    className={g.cls}
                    style={{ height: '120px', borderRadius: '10px', background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p className="type-eyebrow" style={{ opacity: 0.5, position: 'relative', zIndex: 1 }}>{g.cls}</p>
                  </div>
                  <Label>{g.label}</Label>
                </div>
              ))}
            </div>

            {/* Light beams */}
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Light Beams</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { cls: 'beam-primary', label: 'beam-primary · dual angled shafts · animated drift' },
                { cls: 'beam-narrow',  label: 'beam-narrow · tight column · bright center' },
                { cls: 'beam-side',    label: 'beam-side · enters from left edge' },
              ].map(b => (
                <div key={b.cls}>
                  <div
                    className={`beam-wrap ${b.cls}`}
                    style={{ height: '150px', borderRadius: '10px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p className="type-eyebrow" style={{ opacity: 0.4, position: 'relative', zIndex: 2 }}>{b.cls}</p>
                  </div>
                  <Label>{b.label}</Label>
                </div>
              ))}
            </div>

            {/* Vignette variants */}
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Vignette System</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { cls: 'vignette',        label: 'vignette · standard · radial edges' },
                { cls: 'vignette-strong', label: 'vignette-strong · cinematic deep' },
                { cls: 'vignette-top',    label: 'vignette-top · top edge only' },
                { cls: 'vignette-bottom', label: 'vignette-bottom · fade into next section' },
              ].map(v => (
                <div key={v.cls}>
                  <div
                    className={v.cls}
                    style={{ height: '120px', borderRadius: '10px', background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p className="type-eyebrow" style={{ opacity: 0.5, position: 'relative', zIndex: 3 }}>{v.cls}</p>
                  </div>
                  <Label>{v.label}</Label>
                </div>
              ))}
            </div>

            {/* Depth recipes */}
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Depth Layer Recipes</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { cls: 'depth-candle-top',       label: 'depth-candle-top · warm source from above' },
                { cls: 'depth-candle-bottom',    label: 'depth-candle-bottom · warm source from below' },
                { cls: 'depth-sacred-center',    label: 'depth-sacred-center · centered radial glow' },
                { cls: 'depth-cinematic-split',  label: 'depth-cinematic-split · warm left / cool right' },
                { cls: 'depth-atmosphere',       label: 'depth-atmosphere · full hero recipe' },
              ].map(d => (
                <div key={d.cls}>
                  <div
                    className={d.cls}
                    style={{ height: '140px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p className="type-eyebrow" style={{ opacity: 0.5 }}>{d.cls}</p>
                  </div>
                  <Label>{d.label}</Label>
                </div>
              ))}
            </div>

            {/* Full combined preview */}
            <div
              className="beam-wrap beam-primary grain depth-atmosphere"
              style={{ position: 'relative', borderRadius: '12px', border: '1px solid var(--border-subtle)', height: '240px', overflow: 'hidden' }}
            >
              <div className="glow-gold-orb animate-glow-pulse-slow" style={{ width: '400px', height: '400px', top: '-120px', left: '30%' }} aria-hidden="true" />
              <div className="glow-green-orb animate-glow-pulse" style={{ width: '300px', height: '300px', bottom: '-80px', left: '-40px' }} aria-hidden="true" />
              <div className="vignette" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '0.75rem' }}>
                <span className="badge-ritual">◆ Combined Preview</span>
                <p className="type-h3 text-gold-gradient">Atmosfera Completa</p>
                <p className="type-body-sm">depth-atmosphere + beam-primary + grain + glow orbs + vignette</p>
              </div>
            </div>
            <Label>Full atmospheric stack — recommended hero section recipe</Label>

          </Block>
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign: 'center', paddingTop: '4rem', borderTop: '1px solid var(--border-subtle)' }}>
          <p className="type-eyebrow" style={{ marginBottom: '0.5rem' }}>Design System — Corpo Fechado</p>
          <p className="type-body-sm" style={{ opacity: 0.4 }}>Validation page only · Not part of the public landing page</p>
        </div>

      </div>
    </div>
  )
}
