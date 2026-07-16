import { useEffect } from 'react'

// Smoothly scroll to an element (or a Y offset) — used by nav-link clicks.
// Uses the browser's NATIVE smooth scroll, so it never interferes with the
// user's mouse-wheel / trackpad / keyboard scrolling.
export function smoothScrollTo(elOrY, offset = 76) {
  const y =
    typeof elOrY === 'number'
      ? elOrY
      : elOrY.getBoundingClientRect().top + window.scrollY - offset
  const max = document.documentElement.scrollHeight - window.innerHeight
  const clamped = Math.max(0, Math.min(y, max))
  window.scrollTo({ top: clamped, behavior: 'smooth' })
}

// Intentionally a no-op: we rely on native scrolling everywhere.
// (Kept as a hook so App.jsx's call site stays unchanged.)
export default function useSmoothScroll() {
  useEffect(() => {}, [])
}
