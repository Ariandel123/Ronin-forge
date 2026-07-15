import { Fragment, useEffect, useRef } from 'react'

// Splits text into words/letters and reveals them on scroll with a stagger.
export default function SplitText({ text, as = 'span', className = '', stagger = 0.03 }) {
  const ref = useRef(null)
  const Tag = as

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // "\n" in the text forces a line break; each line still animates per-letter.
  const lines = text.split('\n')
  let index = 0

  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => {
        const words = line.split(' ')
        return (
          <Fragment key={li}>
            {li > 0 && <br aria-hidden="true" />}
            {words.map((word, wi) => (
              <span className="split-word" key={wi} aria-hidden="true">
                {word.split('').map((ch, ci) => {
                  const delay = (index++ * stagger).toFixed(3)
                  return (
                    <span className="split-char" key={ci} style={{ transitionDelay: `${delay}s` }}>
                      {ch}
                    </span>
                  )
                })}
                {wi < words.length - 1 && <span className="split-space">&nbsp;</span>}
              </span>
            ))}
          </Fragment>
        )
      })}
    </Tag>
  )
}
