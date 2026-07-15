import { useEffect, useRef, useState } from 'react'
import SplitText from './components/SplitText.jsx'
import { katanas } from './data.js'
import { translations } from './i18n.js'
import useSmoothScroll, { smoothScrollTo } from './hooks/useSmoothScroll.js'
import useReveal from './hooks/useReveal.js'
import useCursor from './hooks/useCursor.js'

// Intercept in-page anchor clicks and ease to the target block.
function handleAnchor(e) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('#')) return
  const id = href.slice(1)
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (id !== 'top' && !target) return
  e.preventDefault()
  smoothScrollTo(id === 'top' ? 0 : target)
  history.replaceState(null, '', href)
}

/* ---------------- Navbar ---------------- */
function Navbar({ t, lang, onLang, onOrder }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const navClick = (e) => { handleAnchor(e); close() }

  return (
    <header className={`nav ${open ? 'is-open' : ''}`}>
      <a className="nav-brand" href="#top" onClick={navClick} data-cursor>
        RONIN FORGE<span className="nav-kanji">浪</span>
      </a>

      <button
        className="nav-burger"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        data-cursor
      >
        <span /><span /><span />
      </button>

      <div className="nav-menu">
        <nav className="nav-links">
          <a href="#collection" onClick={navClick} data-cursor>{t.nav.collection}</a>
          <a href="#path" onClick={navClick} data-cursor>{t.nav.path}</a>
          <a href="#anatomy" onClick={navClick} data-cursor>{t.nav.anatomy}</a>
          <a href="#craft" onClick={navClick} data-cursor>{t.nav.craft}</a>
        </nav>
        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'is-active' : ''} onClick={() => onLang('en')} data-cursor>EN</button>
            <span className="lang-divider">/</span>
            <button className={lang === 'uk' ? 'is-active' : ''} onClick={() => onLang('uk')} data-cursor>УКР</button>
          </div>
          <button className="nav-cta" onClick={() => { onOrder(); close() }} data-cursor>
            {t.nav.order} <span className="nav-cta-dot" />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------------- Hero ---------------- */
function Hero({ t }) {
  // On phones, skip the 1.5MB video download — the poster image (CSS bg) is enough.
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
  )
  return (
    <section className="hero" id="top">
      {!isMobile && (
        <video
          className="hero-video"
          autoPlay muted loop playsInline
          preload="metadata"
          poster="/hero.jpg"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
      </div>
      <div className="hero-hud hud-tr">EST. 2026 · KYOTO</div>
      <div className="hero-hud hud-bl">CSS-FIRST · JS-LIGHT</div>
      <div className="hero-hud hud-br">{t.hero.hudScroll}</div>

      <div className="hero-kanji" aria-hidden="true">刀</div>

      <div className="hero-inner">
        <p className="hero-eyebrow" data-reveal>{t.hero.eyebrow}</p>
        <h1 className="hero-title">
          <span className="hero-line line-1">{t.hero.line1}</span>
          <span className="hero-line line-2">{t.hero.line2}</span>
          <span className="hero-line line-3 accent">{t.hero.line3}</span>
        </h1>
        <p className="hero-sub" data-reveal>{t.hero.sub}</p>
      </div>

      <div className="hero-blade" aria-hidden="true">
        <div className="hero-blade-line" />
      </div>
    </section>
  )
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const items = ['TAMAHAGANE', '折り返し鍛錬', 'CLAY-TEMPERED', '刃文', 'HAND-POLISHED', '侍', 'FORGED IN FIRE']
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="marquee-item">{t}<i>✦</i></span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- The Path (steps 1-2-3) ---------------- */
function Path({ t }) {
  return (
    <section className="path section" id="path">
      <div className="section-head" data-reveal>
        <span className="section-index">{t.path.index}</span>
        <h2 className="section-title">
          <SplitText text={t.path.title} as="span" />
        </h2>
      </div>
      <div className="path-grid" data-reveal>
        <span className="path-progress" aria-hidden="true"><span className="path-progress-fill" /></span>
        {t.path.steps.map((s, i) => (
          <article className="path-card" data-reveal-child key={s.n} data-cursor>
            <span className="path-num" aria-hidden="true">{s.n}</span>
            <div className="path-top">
              <span className="path-node" aria-hidden="true" />
              <span className="path-kanji" aria-hidden="true">{['選', '鍛', '届'][i]}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="path-rule" />
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Catalog ---------------- */
function Catalog({ t, onOrder }) {
  return (
    <section className="catalog section" id="collection">
      <div className="section-head" data-reveal>
        <span className="section-index">{t.catalog.index}</span>
        <h2 className="section-title">
          {(() => {
            const [first, second] = t.catalog.title.split('\n')
            return <>{first}<br />{second}</>
          })()}
        </h2>
      </div>
      <div className="catalog-grid" data-reveal>
        {katanas.map((k) => (
          <article
            className="kard"
            data-reveal-child
            key={k.id}
            style={{ '--accent': k.accent }}
            data-cursor
          >
            <div className="kard-visual">
              <img className="kard-img" src={k.img} alt={`${k.name} — Japanese katana`} loading="lazy" />
              <span className="kard-kanji">{k.kanji}</span>
              <div className="kard-blade" />
            </div>
            <div className="kard-body">
              <div className="kard-name-row">
                <h3>{k.name}</h3>
                <span className="kard-sub">{t.catalog.subtitles[k.id]}</span>
              </div>
              <dl className="kard-specs">
                <div><dt>{t.catalog.steel}</dt><dd>{k.steel}</dd></div>
                <div><dt>{t.catalog.hardness}</dt><dd>{k.hrc}</dd></div>
                <div><dt>{t.catalog.nagasa}</dt><dd>{k.length}</dd></div>
                <div><dt>{t.catalog.hamon}</dt><dd>{k.hamon}</dd></div>
              </dl>
              <div className="kard-foot">
                <span className="kard-price">{k.price}</span>
                <button className="kard-btn" onClick={() => onOrder(k)} data-cursor>
                  {t.catalog.forge}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Anatomy (interactive reactive-kanji list) ---------------- */
function Anatomy({ t }) {
  const parts = [
    { part: 'KISSAKI', jp: '切先' },
    { part: 'HAMON', jp: '刃文' },
    { part: 'SHINOGI', jp: '鎬' },
    { part: 'TSUBA', jp: '鍔' },
    { part: 'TSUKA', jp: '柄' },
    { part: 'SAYA', jp: '鞘' },
  ]
  const [active, setActive] = useState(0)
  const a = parts[active]

  return (
    <section className="anatomy section" id="anatomy">
      <div className="section-head" data-reveal>
        <span className="section-index">{t.anatomy.index}</span>
        <h2 className="section-title">
          <SplitText text={t.anatomy.title} />
        </h2>
      </div>

      <div className="anatomy-stage">
        {/* reactive kanji display — reflects the hovered/focused row */}
        <div className="anatomy-display" aria-hidden="true">
          <span className="anatomy-display-jp" key={active}>{a.jp}</span>
          <div className="anatomy-display-meta">
            <span className="anatomy-display-num">
              0{active + 1} <i>/ 0{parts.length}</i>
            </span>
            <span className="anatomy-display-part" key={'p' + active}>{a.part}</span>
            <span className="anatomy-display-desc" key={'d' + active}>{t.anatomy.parts[active]}</span>
          </div>
        </div>

        <div className="anatomy-list" data-reveal>
          {parts.map((p, i) => (
            <button
              type="button"
              className={`anatomy-row ${i === active ? 'is-active' : ''}`}
              data-reveal-child
              key={p.part}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-cursor
            >
              <span className="anatomy-num">0{i + 1}</span>
              <span className="anatomy-jp">{p.jp}</span>
              <span className="anatomy-part">{p.part}</span>
              <span className="anatomy-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Craft / Philosophy ---------------- */
function Craft({ t }) {
  return (
    <section className="craft section" id="craft">
      <div className="craft-quote" data-reveal>
        <SplitText as="p" text={t.craft.quote} stagger={0.02} />
      </div>
      <div className="craft-grid" data-reveal>
        {t.craft.blocks.map((b, i) => (
          <article className="craft-block" data-reveal-child key={b.ch} data-cursor>
            <span className="craft-kanji" aria-hidden="true">{['鋼', '火', '研'][i]}</span>
            <span className="craft-line" aria-hidden="true" />
            <span className="craft-chapter">{b.ch}</span>
            <p>{b.body}</p>
            <span className="craft-more" aria-hidden="true">→</span>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------------- CTA (magnetic button + kanji parallax) ---------------- */
function CTA({ t, onOrder }) {
  const sectionRef = useRef(null)
  const kanjiRef = useRef(null)

  const onMove = (e) => {
    const sec = sectionRef.current
    if (!sec) return
    const r = sec.getBoundingClientRect()
    const cx = e.clientX - r.left - r.width / 2
    const cy = e.clientY - r.top - r.height / 2
    // kanji drifts subtly with the cursor for depth
    if (kanjiRef.current) {
      kanjiRef.current.style.transform =
        `translate(-50%, -50%) translate(${cx * 0.03}px, ${cy * 0.04}px)`
    }
  }
  const onLeave = () => {
    if (kanjiRef.current) kanjiRef.current.style.transform = 'translate(-50%, -50%)'
  }

  return (
    <section className="cta section" ref={sectionRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="cta-inner" data-reveal>
        <span className="cta-kanji" aria-hidden="true" ref={kanjiRef}>侍</span>
        <h2 className="cta-title">
          <SplitText text={t.cta.title} />
        </h2>
        <p>{t.cta.sub}</p>
        <button className="cta-btn" onClick={() => onOrder()} data-cursor>
          <span className="cta-btn-label">{t.cta.btn}</span>
          <span className="cta-btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */
function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-hud">
        <span>[X].0PX</span><span>[Y].0PX</span>
      </div>
      <div className="footer-main">
        <div className="footer-brand">RONIN FORGE<span>浪</span></div>
        <div className="footer-cols">
          <div>
            <h4>{t.footer.collection}</h4>
            <a href="#collection" onClick={handleAnchor} data-cursor>Ryū</a>
            <a href="#collection" onClick={handleAnchor} data-cursor>Yuki</a>
            <a href="#collection" onClick={handleAnchor} data-cursor>Kaen</a>
            <a href="#collection" onClick={handleAnchor} data-cursor>Kage</a>
          </div>
          <div>
            <h4>{t.footer.house}</h4>
            <a href="#craft" onClick={handleAnchor} data-cursor>{t.footer.craft}</a>
            <a href="#path" onClick={handleAnchor} data-cursor>{t.footer.path}</a>
            <a href="#anatomy" onClick={handleAnchor} data-cursor>{t.footer.anatomy}</a>
          </div>
          <div>
            <h4>{t.footer.contact}</h4>
            <a href="#" data-cursor>{t.footer.atelier}</a>
            <a href="#" data-cursor>hello@roninforge.jp</a>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <span>{t.footer.base1}</span>
        <span>{t.footer.base2}</span>
      </div>
    </footer>
  )
}

/* ---------------- Order Modal ---------------- */
// Cloudflare Turnstile: real site key via VITE_TURNSTILE_SITEKEY,
// falls back to the always-passing TEST key for local dev.
const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY || '1x00000000000000000000AA'

function OrderModal({ t, lang, item, onClose }) {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const widgetHost = useRef(null)
  const tokenRef = useRef('')

  // Load Turnstile and render the widget inside the modal.
  useEffect(() => {
    let widgetId
    const render = () => {
      if (window.turnstile && widgetHost.current && widgetHost.current.childElementCount === 0) {
        widgetId = window.turnstile.render(widgetHost.current, {
          sitekey: TURNSTILE_SITEKEY,
          theme: 'dark',
          callback: (tok) => { tokenRef.current = tok },
          'error-callback': () => { tokenRef.current = '' },
          'expired-callback': () => { tokenRef.current = '' },
        })
      }
    }
    if (window.turnstile) {
      render()
    } else {
      const ID = 'cf-turnstile-script'
      let s = document.getElementById(ID)
      if (!s) {
        s = document.createElement('script')
        s.id = ID
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        s.async = true
        s.defer = true
        document.head.appendChild(s)
      }
      s.addEventListener('load', render)
    }
    return () => { if (widgetId && window.turnstile) window.turnstile.remove(widgetId) }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
          company: form.company.value, // honeypot (must stay empty)
          katana: item?.name || null,
          lang,
          turnstileToken: tokenRef.current,
        }),
      })
      const data = await res.json().catch(() => ({}))
      setStatus(res.ok && data.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} data-cursor>✕</button>
        <span className="modal-index">{t.modal.index}</span>

        {status === 'success' ? (
          <div className="modal-success">
            <span className="modal-success-mark" aria-hidden="true">✓</span>
            <h3>{t.modal.successTitle}</h3>
            <p>{t.modal.successMsg}</p>
            <button className="modal-submit" onClick={onClose} data-cursor>OK</button>
          </div>
        ) : (
          <>
            <h3>{item?.name ? t.modal.titleForge(item.name) : t.modal.titleDefault}</h3>
            {item?.name && (
              <p className="modal-spec">
                {item.steel} · {item.hrc} · {item.hamon} · {item.price}
              </p>
            )}
            <form onSubmit={submit}>
              <input name="name" type="text" placeholder={t.modal.name} required />
              <input name="email" type="email" placeholder={t.modal.email} required />
              <textarea name="message" placeholder={t.modal.message} rows={3} />
              {/* honeypot: hidden from users, catches bots */}
              <input name="company" type="text" tabIndex={-1} autoComplete="off" className="modal-hp" aria-hidden="true" />
              <div className="modal-turnstile" ref={widgetHost} />
              {status === 'error' && <p className="modal-error">{t.modal.errorMsg}</p>}
              <button type="submit" className="modal-submit" disabled={status === 'sending'} data-cursor>
                {status === 'sending' ? t.modal.sending : status === 'error' ? t.modal.retry : t.modal.send}
              </button>
            </form>
            <p className="modal-note">{t.modal.note}</p>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------------- App ---------------- */
export default function App() {
  const [modal, setModal] = useState(null) // null | {} | katana
  const [lang, setLang] = useState(() => localStorage.getItem('tatsu-lang') || 'en')
  const t = translations[lang]

  useSmoothScroll()
  useReveal()
  useCursor()

  const openOrder = (item = {}) => setModal(item)
  const changeLang = (l) => {
    setLang(l)
    localStorage.setItem('tatsu-lang', l)
    document.documentElement.lang = l
  }

  return (
    <>
      <Navbar t={t} lang={lang} onLang={changeLang} onOrder={() => openOrder()} />
      {/* key={lang} remounts sections so split-text and reveals replay on switch */}
      <main key={lang}>
        <Hero t={t} />
        <Marquee />
        <Path t={t} />
        <Catalog t={t} onOrder={openOrder} />
        <Anatomy t={t} />
        <Craft t={t} />
        <CTA t={t} onOrder={openOrder} />
      </main>
      <Footer t={t} />
      {modal && <OrderModal t={t} lang={lang} item={modal} onClose={() => setModal(null)} />}
    </>
  )
}
