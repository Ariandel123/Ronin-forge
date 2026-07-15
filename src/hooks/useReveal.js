import { useEffect } from 'react'

// Adds `.is-in` to any [data-reveal] element when it scrolls into view.
// Staggers children that carry [data-reveal-child] via --i index.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => {
      el.querySelectorAll('[data-reveal-child]').forEach((c, i) => {
        c.style.setProperty('--i', i)
      })
      io.observe(el)
    })
    return () => io.disconnect()
  })
}
