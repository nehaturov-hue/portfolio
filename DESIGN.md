---
name: Kyryll Nehaturov Portfolio
description: "I Build Autonomous Systems. A full-bleed portfolio for a systems engineer and AI builder."
colors:
  deep-void: "#030706"
  warm-teal: "#009084"
  living-teal: "#00a89a"
  living-teal-hover: "#3dbbae"
  moonlight: "#e9f0ef"
  silver-mist: "#bdc6c5"
  slate-whisper: "#798381"
  shadow-slate: "#4f5756"
  success-green: "#00ac5f"
  morning-mist: "#f0f7f6"
  cloud-white: "#fdffff"
  light-teal: "#007b6e"
  light-accent: "#006b5f"
typography:
  display:
    fontFamily: "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(3rem, 9vw, 7rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.06em"
    textTransform: "uppercase"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
rounded:
  sm: "5px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "32px"
  xl: "80px"
  page-px: "clamp(24px, 5vw, 80px)"
components:
  button-primary:
    backgroundColor: "{colors.warm-teal}"
    textColor: "{colors.moonlight}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  button-primary-hover:
    backgroundColor: "{colors.living-teal}"
    textColor: "{colors.moonlight}"
  button-ghost:
    backgroundColor: "rgba(9, 19, 17, 0.6)"
    textColor: "{colors.silver-mist}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  tag:
    backgroundColor: "rgba(9, 19, 17, 0.8)"
    textColor: "{colors.slate-whisper}"
    rounded: "{rounded.sm}"
    padding: "3px 10px"
  card:
    backgroundColor: "rgba(9, 19, 17, 0.6)"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: Kyryll Nehaturov Portfolio

## 1. Overview

**Creative North Star: "The Autonomous Builder"**

This is a portfolio for someone who builds systems that run themselves. The design should feel like the systems it describes: alive, connected, self-sufficient. A generative particle canvas fills the hero, reacting to the cursor like an agent orchestration graph. Headlines type themselves out on load. Sections reveal with cinematic blur-to-sharp transitions as you scroll.

The layout is radical and full-bleed. No centered-column safety net. The root container has no max-width; sections breathe across the entire viewport. The headline "I Build Autonomous Systems" fills the screen at `clamp(3rem, 9vw, 7rem)`. Projects use a bento grid where the strongest work spans two columns. This is a portfolio that takes up space.

The palette is warm teal on deep void. Not blue (the AI-default), not purple (the dev-tool cliché), not black (too harsh). Warm teal (#009084) carries the brand identity. Neutrals are tinted toward the same hue at imperceptible chroma (0.005–0.01). The effect is cohesion without obvious theming.

**Key Characteristics:**
- Full-bleed layout with fluid edge padding (`clamp(24px, 5vw, 80px)`)
- Generative particle canvas as hero background (Canvas 2D, cursor-reactive)
- Scroll-driven cinematic reveals (`animation-timeline: view()`)
- Typewriter headline animation with blinking caret
- Warm teal monochrome palette with dual-theme (dark/light) support
- Massive display typography that fills the viewport width
- Bento grid for project cards (asymmetric, not uniform)

## 2. Colors

A warm teal monochrome system. One accent carries the identity; neutrals are tinted toward the same hue for subconscious cohesion.

### Primary
- **Warm Teal** (#009084): The brand identity. Used on primary buttons, the "Available for hire" pill border, interactive accents, and the particle canvas connections. This is the only saturated color in the system. Its rarity is the point.

### Accent
- **Living Teal** (#00a89a): A brighter variant of the primary for hover states, links, the typewriter caret, and emphasis moments. Never used for large surfaces; always interactive or stateful.

### Neutral (Dark Theme)
- **Deep Void** (#030706): The default background. Very dark teal-black, not pure black. Tinted toward the brand hue at imperceptible chroma.
- **Moonlight** (#e9f0ef): Primary text. Near-white with a teal cast. Never pure white (#fff is prohibited).
- **Silver Mist** (#bdc6c5): Secondary text. Desaturated teal-gray for body copy.
- **Slate Whisper** (#798381): Tertiary text. Muted for captions, labels, metadata.
- **Shadow Slate** (#4f5756): Quaternary text. Footer, copyright, lowest-emphasis content.

### Neutral (Light Theme)
- **Morning Mist** (#f0f7f6): Light background. Warm off-white with teal tint, not pure white.
- **Cloud White** (#fdffff): Surface/card background. Near-white, tinted.
- **Light Teal** (#007b6e): Primary text on light background. Darker teal for contrast.
- **Light Accent** (#006b5f): Links and interactive elements on light background.

### Semantic
- **Success Green** (#00ac5f): The pulsing dot on "Available for hire." No other semantic colors are used.

### Named Rules

**The No Pure Neutrals Rule.** Never use `#000` or `#fff`. Every neutral is tinted toward the brand hue (warm teal) at chroma 0.005–0.01. The effect is invisible but the cohesion is felt.

**The One Accent Rule.** Warm teal is the only saturated color. Its rarity on the page (buttons, links, the pill border, canvas connections) is what makes it powerful. Do not introduce a second accent.

**The Dual-Theme Rule.** Light mode is NOT inverted dark mode. Different surface hierarchies, accent lightness (darker teal on light backgrounds for contrast), and border treatment. Both themes share the same hue family but have distinct lightness curves.

## 3. Typography

**Display Font:** Outfit (with system-ui, -apple-system, 'Segoe UI', Roboto fallback)
**Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular fallback)

**Character:** Outfit is a geometric sans with warm personality. Not the cold neutrality of Inter, not the costume of a display serif. It's technical without being clinical, friendly without being playful. JetBrains Mono handles code, tags, and timeline dates; it signals "this person builds things" without the monospace-as-costume trap.

### Hierarchy
- **Display** (700, `clamp(3rem, 9vw, 7rem)`, line-height 0.95, tracking -0.04em): Hero headline only. Fills the viewport width. Types itself out on load.
- **Headline** (600, `clamp(2rem, 5vw, 4rem)`, line-height 1.05, tracking -0.03em): Section headers. Projects, Experience, Skills, Contact. Goes big on wide screens.
- **Title** (600, 1.25rem, line-height 1.35): Project card titles, timeline roles.
- **Body** (400, 16px, line-height 1.5): Paragraph text. Max line length capped at 65ch via `max-width` on subtitles.
- **Label** (500, 0.8125rem, tracking 0.06em, uppercase): Skill group categories (SYSTEMS, TOOLS, BACKEND, etc.).
- **Mono** (400, 0.6875rem, tracking 0.01em): Technology tags, timeline periods. JetBrains Mono.

### Named Rules

**The Massive Display Rule.** The hero headline uses `clamp(3rem, 9vw, 7rem)`. On a 1440px monitor that's ~7rem (112px). It should feel like it owns the viewport. If it looks small, the viewport is too constrained or the font weight is too light.

**The Mono-for-Data Rule.** JetBrains Mono is used only for data labels (tech stack tags, timeline dates, code). Never for body text, headings, or navigation. It's a signal, not a voice.

**The No Flat Scale Rule.** The type scale has clear steps: Display (7rem) → Headline (4rem) → Title (1.25rem) → Body (1rem) → Label (0.8125rem) → Mono (0.6875rem). Each step is a clear visual jump, not a subtle nudge.

## 4. Elevation

This system is flat by default. No box-shadows anywhere. Depth is conveyed through surface color layering: the background is the darkest tone, cards and surfaces are slightly lighter (via rgba overlays on the background), and hover states lift further. Borders use the `--border-subtle` / `--border-standard` / `--border-solid` scale for definition.

The particle canvas in the hero creates perceived depth through motion and connection density, not through shadow or blur.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. No shadows, no glassmorphism, no decorative blurs. The nav uses `backdrop-filter: blur(16px)` for functional translucency (seeing content scroll behind it), not for decorative glass effects.

**The Border-as-Depth Rule.** Borders replace shadows for surface definition. `--border-subtle` (#101817) for quiet edges, `--border-standard` (#1a2422) for card boundaries, `--border-solid` (#141d1b) for hover emphasis. Each step is a slightly lighter teal-gray.

## 5. Components

### Buttons

Confident, minimal. No icons, no gradients, no rounded-pill defaults.

- **Shape:** Gently curved edges (8px radius)
- **Primary:** Warm teal background (#009084), moonlight text (#e9f0ef), padding 10px 22px. Font: Outfit 500, 0.875rem.
- **Hover:** Background shifts to living teal (#00a89a). Transition: 0.2s ease.
- **Ghost:** Transparent background with standard border, silver-mist text. Hover: slight background fill, text lightens to primary.

### Tags / Chips

Monospace labels for technology stacks. Functional, not decorative.

- **Style:** JetBrains Mono 0.6875rem, slate-whisper text (#798381), tag-bg background (rgba overlay on surface), subtle border. Radius: 5px. Padding: 3px 10px.
- **Context:** Used in project card stack rows and skill group tags.

### Cards / Containers

The bento grid breaks card monotony. The first project spans 2 columns; others are single-column.

- **Corner Style:** Generously curved (12px radius)
- **Background:** Card-bg (rgba overlay on dark background, 0.6 opacity)
- **Border:** Standard border (#1a2422) at rest, accent border (#00a89a) on hover
- **Internal Padding:** 32px
- **Hover:** Border color shifts to accent, subtle 2px upward translation. Transition: 0.2s ease.
- **Layout:** 3-column bento grid on desktop. First card spans 2 columns. Falls to 2-col at 1024px, 1-col at 768px.

### Navigation

Sticky, translucent, minimal.

- **Style:** Sticky top, full-width, backdrop-filter blur (16px). Background: nav-bg (rgba on dark, 0.85 opacity). Border-bottom: subtle.
- **Brand:** Kyryll Nehaturov. Outfit 600, 0.9375rem, moonlight text.
- **Links:** Outfit 500, 0.875rem, slate-whisper text. Hover: moonlight. Gap: 28px.
- **Theme Toggle:** 36px square, 8px radius, standard border. Sun/moon SVG icons.
- **Mobile:** Nav links hidden at 480px. Theme toggle remains.

### Hero Section

The signature moment. Full-bleed, full-height, alive.

- **Layout:** min-height 80vh, flex column, justify-content center. Padding: 140px page-px 80px.
- **Particle Canvas:** Canvas 2D, 160 particles, cursor-reactive (200px mouse radius). Connections at 160px. Tinted to accent color. Prefers-reduced-motion: canvas doesn't initialize.
- **Available for Hire Pill:** Inline-flex, pill radius (9999px), brand border, accent text. Pulsing success-green dot. Width: fit-content.
- **Headline:** Display scale, typewriter animation (2.2s steps), blinking caret. Degrades to fade-in on mobile (<600px).
- **CTA Row:** Flex row, 12px gap. Primary button + ghost buttons.

### Timeline

Full-width experience rows. Three-column grid: period, role, company.

- **Style:** Card-bg background, subtle border, 10px radius. Padding: 20px 28px.
- **Period:** JetBrains Mono, 0.8125rem, slate-whisper.
- **Role:** Outfit 500, 1rem, moonlight.
- **Company:** Outfit 400, 1rem, silver-mist. Right-aligned on desktop, left-aligned on mobile.
- **Hover:** Border shifts to standard. Transition: 0.2s ease.

### Motion

- **Scroll Reveals:** `animation-timeline: view()` triggers blur-to-sharp + slide-up (24px, 4px blur). Staggered timing for project cards and skill groups.
- **Typewriter:** CSS steps(N) animation where N = headline character count (computed in JS). Blinking caret at 0.6s step-end. Caret fades after completion.
- **Particle Canvas:** requestAnimationFrame loop. Pauses when tab is hidden.
- **Reduced Motion:** All animations disabled via `prefers-reduced-motion: reduce`. Content visible immediately.

## 6. Do's and Don'ts

### Do:
- **Do** use warm teal (#009084) as the only saturated accent. Its rarity is the point.
- **Do** tint every neutral toward the brand hue. Even at imperceptible chroma (0.005–0.01), the cohesion is felt.
- **Do** let the hero headline fill the viewport. `clamp(3rem, 9vw, 7rem)` is not too big.
- **Do** use the bento grid for projects. The first card spanning 2 columns breaks monotony.
- **Do** respect `prefers-reduced-motion`. The particle canvas must not initialize. Animations must disable gracefully.
- **Do** use `width: fit-content` on inline pills and tags to prevent stretching in the full-width layout.
- **Do** keep the typewriter animation on `white-space: nowrap`. Degrade to fade-in on mobile (<600px) to prevent overflow.
- **Do** use `--page-px: clamp(24px, 5vw, 80px)` for all edge padding. Never hardcode padding values.

### Don't:
- **Don't** use `#000` or `#fff`. Ever. Every neutral is tinted toward warm teal.
- **Don't** use gradient text (`background-clip: text`). Use a single solid color. Emphasis via weight or size.
- **Don't** use side-stripe borders (`border-left` or `border-right` > 1px as colored accent). Use full borders, background tints, or nothing.
- **Don't** use glassmorphism as default. The nav blur is functional translucency, not decorative glass.
- **Don't** use identical card grids (same-sized cards with icon + heading + text, repeated). The bento grid exists for a reason.
- **Don't** use the hero-metric template (big number, small label, supporting stats, gradient accent). This is a portfolio, not a SaaS landing page.
- **Don't** use modals as first thought. Exhaust inline and progressive alternatives first.
- **Don't** animate CSS layout properties. Use transform, opacity, and filter for motion.
- **Don't** use em dashes. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** wrap everything in a container. The full-width layout is the point.
- **Don't** center the contact section. Left-aligned matches the full-width aesthetic.
- **Don't** use monospace for body text or headings. JetBrains Mono is for data labels only (tags, dates, code).
