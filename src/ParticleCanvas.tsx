import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let particles: Particle[] = []
    let mouse = { x: -9999, y: -9999 }

    // Scale factor: ~1 particle per 5000 sq px, clamped
    function computeParticleCount() {
      const rect = canvas!.getBoundingClientRect()
      const area = rect.width * rect.height
      return Math.max(40, Math.min(200, Math.round(area / 5000)))
    }

    const BASE_SPEED = 0.15
    const MOUSE_STRENGTH = 0.0008

    // Cache brand color, update on theme change
    let brandColor: [number, number, number] = [0, 168, 154]

    function readBrandColor() {
      const style = getComputedStyle(document.documentElement)
      const brand = style.getPropertyValue('--accent').trim()
      if (brand.startsWith('#') && brand.length >= 7) {
        const hex = brand.replace('#', '')
        brandColor = [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ]
      }
    }

    readBrandColor()

    // Watch for theme toggle changing data-theme attribute
    const themeObserver = new MutationObserver(readBrandColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      ctx!.scale(dpr, dpr)
      canvas!.style.width = rect.width + 'px'
      canvas!.style.height = rect.height + 'px'
    }

    function initParticles(count: number) {
      const rect = canvas!.getBoundingClientRect()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * BASE_SPEED * 2,
        vy: (Math.random() - 0.5) * BASE_SPEED * 2,
        radius: 1.2 + Math.random() * 1.5,
      }))
    }

    function draw() {
      const rect = canvas!.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const [r, g, b] = brandColor
      const connDist = Math.max(100, Math.min(200, Math.sqrt(w * h) / 8))
      const mouseRadius = connDist * 1.25

      ctx!.clearRect(0, 0, w, h)

      // Update + draw particles
      for (const p of particles) {
        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius && dist > 1) {
          const force = (1 - dist / mouseRadius) * MOUSE_STRENGTH
          p.vx += dx * force
          p.vy += dy * force
        }

        // Damping
        p.vx *= 0.995
        p.vy *= 0.995

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > BASE_SPEED * 3) {
          p.vx = (p.vx / speed) * BASE_SPEED * 3
          p.vy = (p.vy / speed) * BASE_SPEED * 3
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`
        ctx!.fill()
      }

      // Draw connections
      ctx!.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connDist) {
            const alpha = (1 - dist / connDist) * 0.15
            ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }

      // Mouse connections
      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius) {
          const alpha = (1 - dist / mouseRadius) * 0.2
          ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx!.beginPath()
          ctx!.moveTo(p.x, p.y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.stroke()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        animId = requestAnimationFrame(draw)
      }
    }

    resize()
    initParticles(computeParticleCount())
    animId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(animId)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}