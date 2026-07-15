import { useEffect } from 'react'

// Custom trailing cursor (StringTune-style). Grows over [data-cursor] targets.
export default function useCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = document.createElement('div')
    const ring = document.createElement('div')
    dot.className = 'cursor-dot'
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      if (e.target.closest('[data-cursor]')) ring.classList.add('is-active')
    }
    const out = (e) => {
      if (e.target.closest('[data-cursor]')) ring.classList.remove('is-active')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      dot.remove()
      ring.remove()
    }
  }, [])
}
