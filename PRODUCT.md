# Product

## Register

brand

## Users

Two audiences, one site:

**Primary: Technical recruiters and hiring managers** reviewing candidates for software engineering, DevOps, AI infrastructure, and technical support roles. They scan fast: headline, stack, projects, then move on. They need proof of real work (not tutorial forks), clear skill tags, and an easy way to get in touch.

**Secondary: Non-tech employers** (warehouse, logistics, retail, coordination). They're evaluating reliability, availability, and communication skills, not code. The portfolio needs to read as competent and hireable even without understanding the tech stack.

Both audiences share one context: they're looking at many candidates. The portfolio has 10-15 seconds to make an impression.

## Product Purpose

Get Kyryll Nehaturov hired. The portfolio is a job-seeking tool, not a creative showcase or a blog. Every element should reduce friction between "I found this person" and "I want to contact them." Success = interview invitations from any role, technical or not.

## Brand Personality

**Direct. Technical. Grounded.**

- **Direct**: No filler copy, no marketing language, no "passionate about code." The hero says what Kyryll builds. The contact section says what roles are open. Every word earns its place.
- **Technical**: The site demonstrates technical skill through its own construction (generative particles, scroll animations, typewriter effect, full-bleed layout). It shows, doesn't tell.
- **Grounded**: Honest about the career path. The experience timeline includes courier/driver work. The contact section says "office or warehouse." No inflated titles, no hidden gaps.

Emotional goals: confidence without arrogance, competence without pretension, approachability without desperation.

## Anti-references

- **Generic AI-generated dev portfolios**: dark mode + purple accent + Inter font + identical card grids. The "I used an AI template" look. (Already avoided via warm teal palette, Outfit font, bento grid.)
- **Over-designed agency portfolios**: scroll-jacking, cursor trails, 3D scenes that take 10 seconds to load. The portfolio has particle effects and scroll reveals, but they degrade gracefully and never block content.
- **Minimalist resume sites**: single-column text dumps with no visual personality. The full-bleed layout and massive typography exist specifically to avoid this.
- **SaaS landing pages**: hero-metric templates, gradient text, glassmorphism, "trusted by" logos. This is a personal portfolio, not a product pitch.

## Design Principles

1. **Show, don't tell.** The site demonstrates technical skill through its own construction. A portfolio that says "I build autonomous systems" should itself feel autonomous (particle canvas, scroll animations, typewriter).
2. **Radical honesty.** Include courier work in the timeline. Say "office or warehouse" in the contact section. The audience that judges this negatively isn't the right fit anyway.
3. **Full-bleed confidence.** No centered-column safety net. The layout takes up space because the work deserves space. `clamp(3rem, 9vw, 7rem)` headlines fill the viewport.
4. **Dual-audience readability.** Tech recruiters see stack tags and project descriptions. Non-tech employers see clear language, availability, and a direct contact button. Neither audience is confused.
5. **Progressive enhancement.** Particle canvas, scroll reveals, and typewriter animation are enhancements, not requirements. `prefers-reduced-motion` disables them. No-JS shows static content. The site works without the fancy stuff.

## Accessibility & Inclusion

- **WCAG AA** minimum for all text contrast (verified: primary text 17.5:1 on dark, 18.3:1 on light).
- **prefers-reduced-motion**: all animations disabled, particle canvas doesn't initialize, typewriter shows static text.
- **Dual-theme**: dark and light modes with proper light-mode adjustments (not inverted dark mode).
- **Keyboard navigation**: all interactive elements (nav links, buttons, theme toggle) are keyboard-accessible.
- **Language**: English C1/C2 level. No jargon in contact section or hero subtitle. Tech stack tags use standard names (React, Docker, TypeScript) that non-tech employers can Google.
