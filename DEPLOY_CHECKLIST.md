# Чеклист деплою — Ronin Forge (GitHub → Cloudflare Pages)

Обраний шлях: **GitHub-connected Pages**, email-сповіщення **пізніше** (заявки в D1).
Детальніше: `BACKEND_PLAN.md` (архітектура) і `DEPLOY_CLOUDFLARE.md` (домен+захист).

---

## A. Код на GitHub
- [ ] Створити приватний репозиторій на GitHub (напр. `ronin-forge`).
- [ ] Локально (я вже зробив `git init` + перший коміт):
  ```bash
  git remote add origin https://github.com/<你>/ronin-forge.git
  git branch -M main
  git push -u origin main
  ```

## B. Turnstile (антибот для форми)
- [ ] Cloudflare dash → **Turnstile** → **Add site** → домен(и) → Create.
- [ ] Скопіювати **Site Key** (публічний) і **Secret Key** (приватний).

## C. Cloudflare Pages — створити проєкт
- [ ] Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → обрати репо.
- [ ] Build settings:
  - Framework preset: **Vite**
  - Build command: `npm run build`
  - Build output directory: `dist`
- [ ] **Environment variables** (Settings → Environment variables):
  - Build/production: `VITE_TURNSTILE_SITEKEY` = *Site Key з кроку B*
  - Production (Encrypt): `TURNSTILE_SECRET` = *Secret Key з кроку B*
  - Production: `SITE_ORIGIN` = `https://<твій-домен>`
  - *(email — пізніше: `RESEND_API_KEY`, `OWNER_EMAIL`, `FROM_EMAIL`)*
- [ ] **Save and Deploy**.

## D. D1 (база заявок)
- [ ] Локально автентифікуватись: `npx wrangler login` (відкриє браузер).
- [ ] Створити БД: `npm run db:create`
      → скопіювати `database_id` у `wrangler.toml` (замінити `REPLACE_WITH_D1_ID`).
- [ ] Застосувати схему до продакшн-БД: `npm run db:schema`
- [ ] Прив'язати D1 до Pages: Pages → проєкт → **Settings → Functions → D1 database bindings**
      → Variable name: `DB`, Database: `ronin-forge` → Save.
- [ ] Закомітити оновлений `wrangler.toml` і `git push` (тригерне ре-деплой).

## E. Домен (GoDaddy → Cloudflare)
> Повна інструкція у `DEPLOY_CLOUDFLARE.md`.
- [ ] Cloudflare → **Add a site** → домен → Free → отримати 2 nameservers.
- [ ] GoDaddy → домен → **Change Nameservers** → вписати Cloudflare-івські → Save.
- [ ] Дочекатись активації (лист від Cloudflare).
- [ ] Pages → проєкт → **Custom domains** → додати `<домен>` та `www.<домен>`.

## F. SSL + захист
- [ ] SSL/TLS → **Full (strict)**, **Always Use HTTPS** ON, **Min TLS 1.2**.
- [ ] Security → WAF → увімкнути **Cloudflare Managed Ruleset**.
- [ ] Security → Bots → **Bot Fight Mode** ON.
- [ ] Security → WAF → **Rate limiting rule** на `POST /api/commission`: 5 req/min/IP → Block.

## G. Перевірка
- [ ] Відкрити сайт на домені (https).
- [ ] Надіслати тестову заявку через форму «Почати замовлення».
- [ ] Переконатись, що заявка в БД: `npm run db:list`.

---

### Готово ✅
Сайт на власному домені через Cloudflare, форма пише заявки в D1, під захистом
WAF + DDoS + Bot Fight + Turnstile. Email додамо пізніше (крок з Resend у `BACKEND_PLAN.md`).
