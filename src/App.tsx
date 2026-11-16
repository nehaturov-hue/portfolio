import { useState, useEffect, useRef } from 'react'
import './App.css'
import './overdrive.css'


function App() {
  const email = 'nehaturov@gmail.com'
  const linkedin = 'https://linkedin.com/in/kyryll-nehaturov-142386190'
  const github = 'https://github.com/nehaturov-hue'

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
      if (stored) return stored
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
    return 'dark'
  })

  const [displayedLength, setDisplayedLength] = useState(0)
  const [showCursor, setShowCursor] = useState(false)
  const headlineText = 'I design and run AI agent systems'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Typewriter: character-by-character (all screen sizes)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayedLength(headlineText.length)
      setShowCursor(true)
      return
    }

    let i = 0
    let timeout: ReturnType<typeof setTimeout>

    function typeNext() {
      if (i < headlineText.length) {
        i++
        setDisplayedLength(i)
        timeout = setTimeout(typeNext, 50 + (Math.random() - 0.5) * 50)
      } else {
        setShowCursor(true)
      }
    }

    timeout = setTimeout(typeNext, 600)
    return () => clearTimeout(timeout)
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)


  // Escape key closes mobile menu, focus management on open/close
  useEffect(() => {
    if (!menuOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
      }
      // Focus trap: keep Tab within the menu
      if (e.key === 'Tab') {
        const focusable = menuRef.current?.querySelectorAll('a, button, [tabindex]')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0] as HTMLElement
        const last = focusable[focusable.length - 1] as HTMLElement
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    // Focus first link when menu opens
    const firstLink = menuRef.current?.querySelector('a')
    firstLink?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const projects: {
    title: string
    stack: string[]
    description: string
    demoUrl?: string
    linkLabel?: string
  }[] = [
    {
      title: 'Self-hosted multi-agent system',
      stack: ['Hermes Agent', 'Claude', 'Kanban dispatch', 'Telegram'],
      description:
        'I designed and run a system of 15 agent profiles, mainly for my own job search. It collects vacancies, grades them, drafts and reviews applications, and reports to me through a Telegram assistant. I make every apply decision myself.',
    },
    {
      title: 'Agent development loop',
      stack: ['Git worktrees', 'Reviewer agents', 'Kanban'],
      description:
        'A design agent specifies each change and a coding agent builds it in its own git worktree. A separate reviewer agent approves the exact commit, and an operator agent merges and deploys it. The reviewer cannot commit or merge. Since October these agents have closed 900+ cards and produced 700+ commits.',
    },
    {
      title: 'Job data pipeline',
      stack: ['n8n', 'PostgreSQL 16', 'Podman'],
      description:
        'Collects from 19 job sites into 7M+ observations and 600,000+ role records. LLM grading agents have stored 15,000+ structured role grades.',
    },
    {
      title: 'Agentic wiki',
      stack: ['Hermes Agent', 'Research agents', 'Cron'],
      description:
        'Research agents maintain a 16,000+ page wiki of employers and skills that the grading agents use. Compile workers check each claim against its source before it lands on a page.',
      demoUrl: './wiki-pipeline-demo/index.html',
      linkLabel: 'Architecture demo (May 2026)',
    },
    {
      title: 'Visitech GIS project',
      stack: ['React', 'Express', 'InfluxDB', 'Grafana', 'Docker', 'GitLab CI'],
      description:
        'Sole developer on a GIS visualization project: worker coordinates, equipment locations and pipeline maps for oil extraction monitoring, built on tracker APIs. I also customized the Grafana source via Docker for branded themes and translations.',
    },
  ]

  const skillGroups = [
    {
      category: 'AI agents',
      skills: ['Hermes Agent', 'Claude Code', 'OpenAI Codex', 'OpenClaw', 'Multi-agent orchestration', 'Tool use / function calling'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'TypeScript', 'JavaScript'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'Redux', 'CSS', 'HTML'],
    },
    {
      category: 'Infrastructure',
      skills: ['Docker', 'Podman', 'Linux', 'Bash', 'PostgreSQL', 'n8n'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'GitLab CI', 'Grafana', 'InfluxDB'],
    },
  ]

  const experience = [
    { period: 'Oct 2022 – present', role: 'Driver, courier, order picker', company: 'Uber / Bolt, Thuisbezorgd, D-Logistiek' },
    { period: 'Jan 2026 – Jul 2026', role: 'Forward Deployed Engineer (part-time)', company: 'Syntalith.ai · OpenClaw agents for client companies’ CEOs' },
    { period: 'Oct 2021 – Oct 2022', role: 'Front-End Developer', company: 'Coax Software' },
    { period: 'Nov 2019 – Sep 2021', role: 'Junior Front-End Developer', company: 'Visitech' },
  ]

  const stagger = (i: number) => `reveal reveal-stagger-${i + 1}`

  return (
    <>
      <a className="skip-link" href="#hero">Skip to content</a>
      <nav aria-label="Main navigation">
        <span className="nav-brand">Kyryll Nehaturov</span>
        <div className="nav-right">
          <div ref={menuRef} id="nav-menu" className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
          <button
            ref={hamburgerRef}
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
            <span className={`hamburger-line${menuOpen ? ' hamburger-open' : ''}`} />
            <span className={`hamburger-line${menuOpen ? ' hamburger-open' : ''}`} />
            <span className={`hamburger-line${menuOpen ? ' hamburger-open' : ''}`} />
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <main>
      <header id="hero">
        <div className="hero-tag">
          <span className="dot" />
          Open to work · Leiden, NL
        </div>
        <h1 className="hero-headline" aria-label={headlineText}>
          <span className="headline-visible">
            {headlineText.split('').map((char, i) => (
              <span key={i}>
                <span style={{ opacity: i < displayedLength ? 1 : 0 }}>{char}</span>
                {i === displayedLength - 1 && (
                  <span className="typewriter-cursor" aria-hidden="true" style={{ opacity: showCursor ? undefined : 0 }}>│</span>
                )}
              </span>
            ))}
          </span>
        </h1>
        <p className="hero-subtitle">
          Developer with 3 years of commercial JavaScript and TypeScript work
          (2019 to 2022). Since April 2026 I have designed and run a self-hosted
          multi-agent system on Hermes Agent. Based in Leiden, with an unrestricted
          right to work in the Netherlands.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            Get in touch
          </a>
          <a className="btn btn-ghost" href="/resume.pdf" download>
            Download Resume
          </a>
          <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn<span className="sr-only"> (opens in new tab)</span>
          </a>
          <a className="btn btn-ghost" href={github} target="_blank" rel="noreferrer">
            GitHub<span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </header>

      <section id="projects" aria-labelledby="projects-heading">
        <div className="section-header reveal">
          <h2 id="projects-heading">Projects</h2>
          <p>Systems I designed and run.</p>
        </div>
        <div className="project-grid">
          {projects.map((p, i) => (
            <article className={`project-card ${stagger(i)}`} key={p.title}>
              <h3>{p.title}</h3>
              <div className="stack-row">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <p className="project-desc">{p.description}</p>
              {p.demoUrl && (
                <a className="btn btn-ghost project-demo-link" href={p.demoUrl}>
                  {p.linkLabel ?? 'View Demo'}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-heading">
        <div className="section-header reveal">
          <h2 id="experience-heading">Experience</h2>
        </div>
        <ul className="timeline" role="list">
          {experience.map((e, i) => (
            <li className={`timeline-row ${stagger(i)}`} key={e.period}>
              <span className="timeline-period">{e.period}</span>
              <span className="timeline-role">{e.role}</span>
              <span className="timeline-company">{e.company}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="skills" aria-labelledby="skills-heading">
        <div className="section-header reveal">
          <h2 id="skills-heading">Skills</h2>
          <p>Tools I use.</p>
        </div>
        <ul className="skills-grid" role="list">
          {skillGroups.map((g, i) => (
            <li className={`skill-group ${stagger(i)}`} key={g.category}>
              <h3 className="skill-category">{g.category}</h3>
              <div className="skill-tags">
                {g.skills.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="reveal">Let's work together</h2>
        <p className="contact-text reveal">
          I'm looking for forward deployed and AI agent engineering roles, in the
          Netherlands or remote. I can start within 1 to 2 weeks and reply within
          24 hours.
        </p>
        <div className="contact-links reveal">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            {email}
          </a>
          <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn Profile<span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </section>

      </main>

      <footer>
        <p>&copy; 2026 Kyryll Nehaturov</p>
      </footer>
    </>
  )
}

export default App