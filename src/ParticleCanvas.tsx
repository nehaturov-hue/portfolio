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
    let running = true
    let particles: Particle[] = []
    let mouse = { x: -9999, y: -9999 }

    function computeParticleCount() {
      const rect = canvas!.getBoundingClientRect()
      const area = rect.width * rect.height
      return Math.max(40, Math.min(200, Math.round(area / 5000)))
    }

    const BASE_SPEED = 0.15
    const MOUSE_STRENGTH = 0.0008

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

    const themeObserver = new MutationObserver(readBrandColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // IntersectionObserver: pause animation when off-screen
    let isVisible = true
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible
        isVisible = entry.isIntersecting
        if (isVisible && !wasVisible) {
          running = true
          animId = requestAnimationFrame(draw)
        }
      },
      { threshold: 0.1 }
    )
    intersectionObserver.observe(canvas)

    // Spatial grid for O(n) connection lookups
    function buildGrid(cellSize: number, w: number) {
      const cols = Math.ceil(w / cellSize) + 1
      const grid = new Map<number, number[]>()
      for (let i = 0; i < particles.length; i++) {
        const col = Math.floor(particles[i].x / cellSize)
        const row = Math.floor(particles[i].y / cellSize)
        const key = row * cols + col
        let bucket = grid.get(key)
        if (!bucket) {
          bucket = []
          grid.set(key, bucket)
        }
        bucket.push(i)
      }
      return { grid, cols }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      ctx!.scale(dpr, dpr)
      canvas!.style.width = rect.width + 'px'
      canvas!.style.height = rect.height + 'px'
      // Reinitialize particles to fill new dimensions
      initParticles(computeParticleCount())
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
      if (!running || !isVisible) {
        running = false
        return
      }

      const rect = canvas!.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const [r, g, b] = brandColor
      const connDist = Math.max(100, Math.min(200, Math.sqrt(w * h) / 8))
      const mouseRadius = connDist * 1.25

      ctx!.clearRect(0, 0, w, h)

      // Update + draw particles
      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius && dist > 1) {
          const force = (1 - dist / mouseRadius) * MOUSE_STRENGTH
          p.vx += dx * force
          p.vy += dy * force
        }

        p.vx *= 0.995
        p.vy *= 0.995

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > BASE_SPEED * 3) {
          p.vx = (p.vx / speed) * BASE_SPEED * 3
          p.vy = (p.vy / speed) * BASE_SPEED * 3
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`
        ctx!.fill()
      }

      // Spatial grid for O(n) particle-particle connections
      const { grid, cols } = buildGrid(connDist, w)
      ctx!.lineWidth = 0.5
      ctx!.beginPath()
      for (let i = 0; i < particles.length; i++) {
        const col = Math.floor(particles[i].x / connDist)
        const row = Math.floor(particles[i].y / connDist)
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const bucket = grid.get((row + dr) * cols + (col + dc))
            if (!bucket) continue
            for (const j of bucket) {
              if (j <= i) continue
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const distSq = dx * dx + dy * dy
              if (distSq < connDist * connDist) {
                const dist = Math.sqrt(distSq)
                const alpha = Math.round(((1 - dist / connDist) * 0.15) * 20) / 20
                if (alpha > 0.01) {
                  ctx!.moveTo(particles[i].x, particles[i].y)
                  ctx!.lineTo(particles[j].x, particles[j].y)
                }
              }
            }
          }
        }
      }
      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.08)`
      ctx!.stroke()

      // Mouse connections
      ctx!.beginPath()
      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius) {
          ctx!.moveTo(p.x, p.y)
          ctx!.lineTo(mouse.x, mouse.y)
        }
      }
      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.12)`
      ctx!.stroke()

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
        running = false
        cancelAnimationFrame(animId)
      } else if (isVisible) {
        running = true
        animId = requestAnimationFrame(draw)
      }
    }

    resize()
    animId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      themeObserver.disconnect()
      intersectionObserver.disconnect()
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
