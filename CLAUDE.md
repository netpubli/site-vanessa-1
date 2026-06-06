# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projects

This workspace contains client projects built by Antigravity. Currently:

- `landing-page/` — Landing page for the **Corpo Fechado** event (spiritual immersion retreat in São Paulo)

---

## landing-page

React + TypeScript + Vite single-page app. All commands run from `landing-page/`.

### Commands

```bash
npm run dev       # Start dev server (HMR)
npm run build     # Type-check (tsc -b) then bundle via Vite
npm run lint      # ESLint across all .ts/.tsx files
npm run preview   # Serve the production build locally
```

### Architecture

**Routing** (`src/App.tsx`): Two routes — `/` → `HomePage`, `/design-system` → `DesignSystemPage`.

**Page composition** (`src/pages/HomePage.tsx`): Assembles all section components in order: `Hero → Intro → ImmersionDays → WhatYouGet → TargetAudience → Instructor → Pricing → FAQ → FinalCTA → Footer`.

**Components** (`src/components/`): Each section is a self-contained component with no shared state. All styling is done inline via `style={}` props combined with Tailwind utility classes — never CSS modules or styled-components.

**Design System** (`src/index.css`): The entire visual language lives here as CSS custom properties on `:root`. Do not hardcode colors, shadows, or spacing — always reference tokens:
- Colors: `var(--bg-deep)`, `var(--gold-300)` through `var(--gold-900)`, `var(--neutral-100)` etc.
- Shadows: `var(--shadow-gold-sm/md/lg/xl)`, `var(--shadow-deep)`
- Spacing: `var(--space-1)` through `var(--space-32)`, `var(--space-section)`
- Gradients: `var(--grad-gold-metallic)`, `var(--grad-gold-btn)`, `var(--grad-gold-divider)`, etc.
- Transitions: `var(--ease-sacred)`, `var(--ease-smooth)`, `var(--duration-fast/base/slow)`

**Reusable CSS classes** (defined in `src/index.css`):
- Typography: `.type-display`, `.type-h1`–`.type-h4`, `.type-subtitle`, `.type-body`, `.type-eyebrow`, `.type-quote`, `.text-gold-gradient`, `.text-gold-warm`
- Buttons: `.btn` + `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-verde` + size modifiers `.btn-sm`, `.btn-lg`
- Cards: `.card`, `.card-glass`, `.card-ritual`, `.card-flat`
- Sections: `.section`, `.section-container`, `.section-container-sm`, `.section-container-lg`, `.section-header`, `.section-bg-*`
- Dividers: `.divider-gold`, `.divider-gold-double`, `.divider-short`, `.divider-triple`
- Atmosphere: `.grain`, `.grain-coarse`, `.grain-fine`, `.glow-gold-orb`, `.glow-green-orb`, `.beam-primary`, `.beam-narrow`, `.beam-side`, `.vignette`, `.vignette-strong`, `.vignette-top`, `.vignette-bottom`, `.depth-atmosphere`
- Animations: `.animate-fade-in`, `.animate-fade-up`, `.animate-float`, `.animate-glow-pulse` + `.delay-*` stagger helpers

**Design language**: Dark navy base (`#081827`) with a gold/candlelight palette and green accents (Espada de São Jorge motif). Typography uses *Cormorant Garamond* (serif, headings/display) and *Inter* (sans-serif, body/UI). The visual tone is cinematic, ancestral, and sacred — film grain, light beams, vignettes, and ambient glow orbs are used throughout.

**Path alias**: `@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**`/design-system` route**: Renders `DesignSystemPreview` — a live preview of all design tokens and components. Use it to verify visual changes.
