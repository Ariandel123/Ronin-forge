// POST /api/commission — receives the "commission" form from OrderModal.
// Runs on Cloudflare Pages Functions. Bindings/vars (set in Pages settings):
//   DB               — D1 database binding
//   TURNSTILE_SECRET — Turnstile secret key
//   RESEND_API_KEY   — Resend API key (email)
//   OWNER_EMAIL      — where new leads are sent
//   FROM_EMAIL       — verified sender, e.g. "Ronin Forge <orders@roninforge.jp>"
//   SITE_ORIGIN      — allowed CORS origin, e.g. "https://roninforge.jp"

export async function onRequestPost({ request, env }) {
  const cors = corsHeaders(env)
  try {
    const body = await request.json().catch(() => ({}))
    const name = str(body.name, 120)
    const email = str(body.email, 160)
    const message = str(body.message, 2000)
    const katana = str(body.katana, 80) || null
    const lang = body.lang === 'uk' ? 'uk' : 'en'
    const token = str(body.turnstileToken, 4096)

    // honeypot: bots fill hidden fields; humans leave them empty
    if (str(body.company, 100)) return json({ ok: true }, 200, cors)

    // 1) validation
    if (!name || !isEmail(email)) {
      return json({ ok: false, error: 'invalid_input' }, 400, cors)
    }

    // 2) Turnstile (bot check)
    const ip = request.headers.get('CF-Connecting-IP') || ''
    if (env.TURNSTILE_SECRET) {
      const ok = await verifyTurnstile(token, env.TURNSTILE_SECRET, ip)
      if (!ok) return json({ ok: false, error: 'bot_check_failed' }, 403, cors)
    }

    // 3) store in D1 (skip gracefully if binding not configured yet)
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO commissions (name,email,message,katana,lang,ip,user_agent)
         VALUES (?,?,?,?,?,?,?)`
      ).bind(name, email, message, katana, lang, ip,
             str(request.headers.get('User-Agent'), 400)).run()
    }

    // 4) email notification via Resend (skip gracefully if not configured)
    if (env.RESEND_API_KEY && env.OWNER_EMAIL) {
      await sendEmail(env, { name, email, message, katana })
    }

    return json({ ok: true }, 200, cors)
  } catch (e) {
    return json({ ok: false, error: 'server_error' }, 500, cors)
  }
}

// CORS preflight
export function onRequestOptions({ env }) {
  return new Response(null, { status: 204, headers: corsHeaders(env) })
}

/* ---------- helpers ---------- */

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.SITE_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }
}

const json = (obj, status, headers) =>
  new Response(JSON.stringify(obj), { status, headers })

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)

async function verifyTurnstile(token, secret, ip) {
  if (!token) return false
  const r = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    }
  )
  const d = await r.json().catch(() => ({}))
  return d.success === true
}

async function sendEmail(env, { name, email, message, katana }) {
  const subject = `Нова заявка: ${katana || 'консультація'} — ${name}`
  const text =
    `Ім'я: ${name}\n` +
    `Email: ${email}\n` +
    `Катана: ${katana || '—'}\n\n` +
    `Повідомлення:\n${message || '—'}`
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL || 'Ronin Forge <onboarding@resend.dev>',
      to: [env.OWNER_EMAIL],
      reply_to: email,
      subject,
      text,
    }),
  }).catch(() => {}) // don't fail the request if email provider hiccups
}
