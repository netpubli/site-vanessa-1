import type { CSSProperties } from 'react'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

const LotusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5c0 0-2 4-2 8 0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-2-8-2-8Z" />
    <path d="M12 12c-2-1-5 1-5 4 0 1.6 1.3 3 3 3 1.5 0 2.5-1 2-4z" />
    <path d="M12 12c2-1 5 1 5 4 0 1.6-1.3 3-3 3-1.5 0-2.5-1-2-4z" />
  </svg>
)

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#081827',
      }}
      aria-label="Hero — Corpo Fechado"
    >
      {/* ────────────────────────────────────────
          LAYER 0 — Hero Background Image Reference (Original Colors)
          ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 1, // Full opacity to preserve original artwork colors
          zIndex: 1,
          backgroundPosition: 'var(--bg-pos, right 20% center)',
        } as React.CSSProperties}
        className="[--bg-pos:right_25%_center] lg:[--bg-pos:right_12%_center]"
      />

      {/* ────────────────────────────────────────
          LAYER 1 — Blending Gradient Overlays (Reduced Opacity by 50%+)
          ──────────────────────────────────────── */}
      {/* Desktop overlay: Fades out completely by 60% width, leaving the woman's face untouched */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(8, 24, 39, 0.95) 0%, rgba(8, 24, 39, 0.75) 25%, rgba(8, 24, 39, 0.3) 45%, transparent 60%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        className="hidden lg:block"
      />

      {/* Mobile/Tablet overlay: Soft blend, keeping text contrast high but image visible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(8, 24, 39, 0.8) 0%, rgba(8, 24, 39, 0.4) 40%, rgba(8, 24, 39, 0.7) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        className="block lg:hidden"
      />

      {/* ────────────────────────────────────────
          LAYER 2 — Cinematic Glow Elements
          ──────────────────────────────────────── */}
      {/* Warm candlelight top glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(195,139,42,0.12) 0%, transparent 70%)',
          filter: 'blur(85px)',
          opacity: 0.6,
          animation: 'glowPulse 7s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Ambient green glow at bottom left (nature/herbs motif) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(53,94,59,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.6,
          animation: 'glowPulse 9s ease-in-out 2s infinite',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Subtle light shafts/beams */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '40%',
          transform: 'translateX(-50%) rotate(-8deg)',
          width: '28%',
          height: '140%',
          background: 'linear-gradient(180deg, rgba(249,228,168,0) 0%, rgba(249,228,168,0.02) 20%, rgba(232,176,64,0.04) 45%, rgba(217,164,65,0.02) 70%, transparent 100%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          animation: 'beamDrift 8s ease-in-out infinite',
          zIndex: 3,
        }}
      />

      {/* ────────────────────────────────────────
          LAYER 3 — Film Grain
          ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-50%',
          width: '200%',
          height: '200%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
          backgroundRepeat: 'repeat',
          opacity: 0.015,
          pointerEvents: 'none',
          zIndex: 4,
          mixBlendMode: 'overlay',
          animation: 'grainShift 0.6s steps(1) infinite',
        }}
      />

      {/* ────────────────────────────────────────
          LAYER 4 — Vignette (Subtle edge shading only)
          ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(8,24,39,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ────────────────────────────────────────
          LAYER 10 — Content Container
          ──────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 5vw, 3rem) clamp(2.5rem, 4.5vw, 3.5rem)',
        }}
      >
        {/* Two-column grid — left has content, right is empty for visual weight balance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="lg:grid-cols-2 lg:gap-20"
        >
          {/* LEFT COLUMN — Strong Visual Hierarchy and Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }} className="animate-fade-up">
            
            {/* Elegant invitation eyebrow badge in a pill shape */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(217, 164, 65, 0.25)',
                background: 'rgba(217, 164, 65, 0.04)',
                alignSelf: 'flex-start',
                marginBottom: '1.25rem',
              }}
            >
              <LotusIcon style={{ width: '1rem', height: '1rem', color: 'var(--gold-400)' }} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--neutral-100)',
                  textTransform: 'uppercase',
                }}
              >
                Vivência Presencial • São Paulo
              </span>
            </div>

            {/* Sub-eyebrow in gold */}
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'var(--gold-300)',
                textTransform: 'uppercase',
                marginBottom: '0.85rem',
              }}
            >
              03 DIAS QUE PODEM TRANSFORMAR SUA VIDA
            </div>

            {/* Main Headline */}
            <h1
              style={{
                margin: '0 0 1.25rem 0',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 500,
                lineHeight: '1.1',
                letterSpacing: '-0.01em',
                color: 'var(--neutral-100)',
                textShadow: '0 0 40px rgba(244, 232, 213, 0.1)',
                maxWidth: '620px',
              }}
            >
              Desperte sua proteção ancestral e feche seu{' '}
              <span
                className="text-gold-gradient"
                style={{
                  fontWeight: 600,
                  display: 'inline-block',
                }}
              >
                corpo
              </span>{' '}
              com poder
            </h1>

            {/* Subtitle / Description */}
            <p
              className="type-subtitle"
              style={{
                maxWidth: '520px',
                marginBottom: '1.75rem',
                lineHeight: '1.6',
                fontSize: '0.95rem',
                color: 'rgba(244, 232, 213, 0.75)',
              }}
            >
              Uma jornada espiritual profunda para fortalecer sua energia, expandir sua consciência e viver com mais segurança, clareza e propósito.
            </p>

            {/* Premium Event Details Block with Vertical Dividers */}
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
              style={{
                margin: '0 0 2rem 0',
              }}
            >
              {/* Block 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar style={{ width: '1.35rem', height: '1.35rem', color: 'var(--gold-300)', opacity: 0.85 }} />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--neutral-100)',
                    textTransform: 'uppercase',
                  }}
                >
                  DEZEMBRO DE 2025
                </span>
              </div>

              {/* Divider 1 */}
              <div
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '2rem',
                  background: 'rgba(217, 164, 65, 0.22)',
                }}
                className="hidden sm:block"
              />

              {/* Block 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin style={{ width: '1.35rem', height: '1.35rem', color: 'var(--gold-300)', opacity: 0.85 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--neutral-100)',
                      textTransform: 'uppercase',
                      lineHeight: '1.2',
                    }}
                  >
                    Espaço Sagrado
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--gold-300)',
                      textTransform: 'uppercase',
                      lineHeight: '1.2',
                    }}
                  >
                    São Paulo - SP
                  </span>
                </div>
              </div>

              {/* Divider 2 */}
              <div
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '2rem',
                  background: 'rgba(217, 164, 65, 0.22)',
                }}
                className="hidden sm:block"
              />

              {/* Block 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Users style={{ width: '1.35rem', height: '1.35rem', color: 'var(--gold-300)', opacity: 0.85 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--neutral-100)',
                      textTransform: 'uppercase',
                      lineHeight: '1.2',
                    }}
                  >
                    Vagas
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--gold-300)',
                      textTransform: 'uppercase',
                      lineHeight: '1.2',
                    }}
                  >
                    Limitadas
                  </span>
                </div>
              </div>
            </div>

            {/* Event CTA Action Area */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                margin: '0 0 1.75rem 0',
              }}
            >
              <a
                href="#pricing"
                className="btn btn-primary"
                id="hero-cta-primary"
                style={{
                  padding: '1rem 2.25rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                }}
              >
                <span>Garantir Minha Vaga</span>
                <ArrowRight style={{ width: '1rem', height: '1rem', marginLeft: '0.5rem' }} />
              </a>
              <a
                href="#intro"
                className="btn btn-secondary"
                style={{
                  padding: '1rem 2.25rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  border: '1px solid rgba(217, 164, 65, 0.35)',
                  color: 'var(--neutral-100)',
                }}
              >
                Conhecer a Jornada
              </a>
            </div>

            {/* Badges Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
              }}
            >
              {['Presencial', '3 Dias de Imersão', 'Transformação Real'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(217, 164, 65, 0.15)',
                    background: 'rgba(8, 24, 39, 0.45)',
                  }}
                >
                  <span style={{ fontSize: '0.55rem', color: 'var(--gold-400)' }}>◆</span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: 'var(--neutral-200)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN — Left empty on desktop to display the background subject cleanly */}
          <div className="hidden lg:block" aria-hidden="true" style={{ height: '300px' }} />

        </div>
      </div>

      {/* ────────────────────────────────────────
          Scroll indicator
          ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          opacity: 0.42,
          pointerEvents: 'none',
        }}
        className="hidden md:flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.57rem',
            letterSpacing: '0.22em',
            color: 'var(--gold-600)',
            textTransform: 'uppercase',
          }}
        >
          Rolar
        </span>
        <div
          style={{
            width: '1px',
            height: '44px',
            background: 'linear-gradient(to bottom, var(--gold-400), transparent)',
            animation: 'floatY 3s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
