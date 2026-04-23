import './App.css'

function App() {
  const email = 'kyryll.nehaturov@gmail.com'
  const linkedin = 'https://linkedin.com/in/kyryll-nehaturov-142386190'
  const github = 'https://github.com/nehaturov-hue'

  const projects = [
    {
      title: 'Visitech IIoT Dashboard',
      stack: ['React', 'Express.js', 'InfluxDB', 'Grafana', 'Docker', 'WebSocket'],
      description:
        'Sole developer on a real-time personnel monitoring dashboard handling 100+ data points for industrial IoT. Built interactive visualizations for sensor telemetry, alarm management, and operational metrics.',
    },
    {
      title: 'Autonomous Job Pipeline',
      stack: ['Hermes', 'OpenClaw', 'TypeScript', 'Docker', 'SQLite'],
      description:
        'Built an AI-agent-powered pipeline that sources jobs across 8 platforms, researches companies, tailors resumes, and tracks application state end-to-end. Fully automated from discovery to sent application.',
    },
    {
      title: 'Syntalith AI Systems',
      stack: ['OpenClaw', 'Docker', 'Multi-agent orchestration'],
      description:
        'Building and maintaining Docker-based dev environments and debugging agent coordination failures. Designing failure-resistant orchestration patterns for autonomous AI agent swarms.',
    },
    {
      title: 'roadmap.sh OSS',
      stack: ['Documentation', 'Community'],
      description:
        'Contributed to open-source developer roadmaps used by millions of developers worldwide. Added content, fixed errors, and improved structure for learning paths.',
    },
  ]

  const skillGroups = [
    {
      category: 'Systems',
      skills: ['Linux', 'Bash', 'Docker', 'Networking'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'CI/CD', 'Jira', 'Grafana'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'TypeScript'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'CSS', 'HTML'],
    },
    {
      category: 'AI Agents',
      skills: ['Hermes', 'OpenClaw'],
    },
  ]

  return (
    <>
      <nav>
        <span className="nav-brand">Kyryll Nehaturov</span>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href={github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </nav>

      <header id="hero">
        <div className="hero-tag">
          <span className="dot" />
          Available for hire
        </div>
        <h1 className="hero-headline">System Administrator & Developer</h1>
        <p className="hero-subtitle">
          System Administration graduate from Odesa, Ukraine. 3 years commercial
          development with React, Node.js, and Docker. Currently building multi-agent
          AI systems at Syntalith.ai. Based in Leiden, NL — available immediately,
          no sponsorship needed.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            Get in touch
          </a>
          <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn-ghost" href={github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <section id="projects">
        <div className="section-header">
          <h2>Projects</h2>
          <p>Real work, real systems, real impact.</p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.title}>
              <h3>{p.title}</h3>
              <div className="stack-row">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <p className="project-desc">{p.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="section-header">
          <h2>Skills</h2>
          <p>Technologies and tools I work with daily.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div className="skill-group" key={g.category}>
              <h4>{g.category}</h4>
              <div className="skill-tags">
                {g.skills.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2>Let's work together</h2>
        <p className="contact-text">
          Open to software engineering, DevOps, technical support, and AI infrastructure
          roles. I reply within 24 hours.
        </p>
        <div className="contact-links">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            {email}
          </a>
          <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn Profile
          </a>
          <a className="btn btn-ghost" href={github} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        </div>
      </section>

      <footer>
        <p>Built with Vite + React. Styled like Linear. Deployed on Vercel.</p>
      </footer>
    </>
  )
}

export default App
