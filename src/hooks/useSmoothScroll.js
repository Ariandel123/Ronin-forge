import { useEffect } from 'react'

// Shared controller so nav clicks can drive the same smooth-scroll loop.
const controller = { target: null, current: 0, active: false }

// Animated scroll to an element (or Y). Used by nav-link clicks.
// When the wheel-driven loop is active we just retarget it; otherwise
// we fall back to the browser's native smooth scroll (mobile / reduced motion).
export function smoothScrollTo(elOrY, offset = 76) {
  const y =
    typeof elOrY === 'number'
      ? elOrY
      : elOrY.getBoundingClientRect().top + window.scrollY - offset
  const max = document.body.scrollHeight - window.innerHeight
  const clamped = Math.max(0, Math.min(y, max))

  if (controller.active) {
    controller.target = clamped // the raf loop eases toward it
  } else {
    window.scrollTo({ top: clamped, behavior: 'smooth' })
  }
}

// Lightweight Lenis-style smooth scroll (no deps).
// Lerps the window scroll toward a target for a "heavy, precise" feel.
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) return // native scroll on touch/mobile

    controller.current = window.scrollY
    controller.target = window.scrollY
    controller.active = true
    let rafId = 0
    const ease = 0.09

    const onWheel = (e) => {
      e.preventDefault()
      controller.target += e.deltaY
      controller.target = Math.max(
        0,
        Math.min(controller.target, document.body.scrollHeight - window.innerHeight)
      )
    }

    const loop = () => {
      controller.current += (controller.target - controller.current) * ease
      if (Math.abs(controller.target - controller.current) < 0.1)
        controller.current = controller.target
      window.scrollTo(0, controller.current)
      rafId = requestAnimationFrame(loop)
    }

    // Keep target synced when the user uses keyboard / scrollbar drag.
    const onScroll = () => {
      if (Math.abs(window.scrollY - controller.current) > 2) {
        controller.target = window.scrollY
        controller.current = window.scrollY
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', () => {
      controller.target = window.scrollY
    })
    document.addEventListener('scroll', onScroll, { passive: true })
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      controller.active = false
      window.removeEventListener('wheel', onWheel)
      document.removeEventListener('scroll', onScroll)
    }
  }, [])
}
