# Домен GoDaddy → Cloudflare + захист сайту

> Мета: домен (зареєстрований у GoDaddy) керується через Cloudflare (DNS, CDN,
> захист), сайт хоститься на Cloudflare Pages. **Реєстрацію переносити НЕ треба** —
> лише міняємо nameservers. Усе на безкоштовному плані Cloudflare.

---

## Частина 1 — Підключити домен до Cloudflare (зміна nameservers)

### 1.1. Додати сайт у Cloudflare
1. Реєстрація/вхід на **dash.cloudflare.com**.
2. **Add a site** → ввести свій домен (напр. `roninforge.jp`) → **Continue**.
3. Обрати план **Free** → Continue.
4. Cloudflare просканує наявні DNS-записи GoDaddy і покаже їх. **Перевір, що
   всі потрібні записи на місці** (особливо MX/пошта, якщо є). Додай відсутні.
5. Continue → Cloudflare дасть **2 nameservers**, напр.:
   ```
   dana.ns.cloudflare.com
   rob.ns.cloudflare.com
   ```
   (у тебе будуть інші — скопіюй свої).

### 1.2. Змінити nameservers у GoDaddy
1. **godaddy.com** → увійти → **My Products** (або Domain Portfolio).
2. Обрати домен → **DNS** / **Nameservers** → **Change Nameservers**.
3. Обрати **"I'll use my own nameservers"** (Enter my own nameservers / Custom).
4. **Видалити** старі GoDaddy-NS і **вписати два Cloudflare-івські**.
5. **Save**. GoDaddy може попередити, що вимкне їхній DNS — це нормально.

### 1.3. Активація
- Повернутись у Cloudflare → **Check nameservers now**.
- Активація зазвичай 5 хв – кілька годин (іноді до 24 год).
- Прийде лист «Your domain is now active on Cloudflare».

> ⚠️ Якщо на домені є **пошта** (MX-записи) — переконайся, що вони перенеслись у
> Cloudflare DNS, інакше пошта відвалиться. Записи пошти лиши в режимі **DNS only**
> (сіра хмарка), не проксі.

---

## Частина 2 — Підключити домен до Cloudflare Pages

Після деплою проєкту на Pages (див. `BACKEND_PLAN.md` §9):
1. Cloudflare → **Workers & Pages** → твій проєкт → **Custom domains**.
2. **Set up a custom domain** → ввести `roninforge.jp` → Cloudflare сам створить
   потрібний CNAME (бо DNS уже в Cloudflare). Повторити для `www.roninforge.jp`.
3. SSL-сертифікат випуститься автоматично (кілька хвилин).

---

## Частина 3 — SSL/TLS (обов'язково)

Cloudflare → **SSL/TLS**:
- **Overview** → режим **Full (strict)**.
- **Edge Certificates**:
  - **Always Use HTTPS** → ON (весь трафік на https).
  - **Automatic HTTPS Rewrites** → ON.
  - **Minimum TLS Version** → **1.2**.
  - **HSTS** (Enable HSTS) → ON — вмикати ТІЛЬКИ коли впевнений, що сайт назавжди
    на https (макс-age 6 міс, include subdomains). Обережно: відкат складний.
  - **TLS 1.3** → ON.

---

## Частина 4 — Захист сайту (Security)

### 4.1. DDoS — вже увімкнено
Cloudflare автоматично захищає від L3/L4/L7 DDoS на всіх планах. Нічого робити не треба.

### 4.2. WAF (Web Application Firewall)
Cloudflare → **Security → WAF**:
- **Managed rules** → увімкнути **Cloudflare Free Managed Ruleset** (базовий захист
  від поширених атак/OWASP на Free-плані).
- **Custom rules** (Free: до 5 правил) — приклади нижче.

### 4.3. Bot захист
- **Security → Bots** → **Bot Fight Mode** → ON (безкоштовний захист від простих ботів).
- Форма вже захищена **Turnstile** (у коді) — це головний бар'єр для спаму.

### 4.4. Rate Limiting (обмеження частоти)
Cloudflare → **Security → WAF → Rate limiting rules** (Free: 1 правило):
- Правило на API-форму, щоб ніхто не спамив заявками:
  ```
  Назва:     api-commission-limit
  If:        URI Path equals /api/commission  AND  Method = POST
  Then:      Rate: 5 requests per 1 minute per IP
  Action:    Block (на 1 хв)
  ```

### 4.5. Custom firewall rules (приклади)
Cloudflare → **Security → WAF → Custom rules → Create**:
- **Захист /api від сторонніх методів:**
  ```
  If:   URI Path starts with "/api/"  AND  Method not in {POST, OPTIONS}
  Then: Block
  ```
- **(Опц.) Челендж підозрілих країн** (якщо продаєш лише в певних регіонах):
  ```
  If:   Country not in {UA, PL, US, ...}
  Then: Managed Challenge
  ```
- **(Опц.) Блок відомих поганих ботів / порожній User-Agent:**
  ```
  If:   User Agent equals ""  (порожній)
  Then: Block
  ```

### 4.6. Загальні налаштування безпеки
Cloudflare → **Security → Settings**:
- **Security Level** → **Medium** (за потреби High).
- **Browser Integrity Check** → ON.
- **Challenge Passage** → лишити за замовчуванням.
- **Under Attack Mode** — вмикати вручну ЛИШЕ під час активної атаки (показує
  проміжну сторінку-перевірку всім відвідувачам).

---

## Частина 5 — Додаткове зміцнення (опційно, але корисно)

- **Speed → Optimization**: Auto Minify (JS/CSS/HTML), Brotli, Early Hints — швидкість.
- **Caching → Configuration**: Caching Level = Standard; для статики Pages кешується авто.
- **Cloudflare Web Analytics** (безкоштовна, без кукі) — трафік без Google Analytics.
- **Email Routing** (Security → Email): безкоштовне пересилання `hello@roninforge.jp`
  → твоя особиста пошта.
- **Scrape Shield → Email Address Obfuscation** → ON (ховає email від скраперів).
- **Access (Zero Trust)** — якщо зробиш адмінку `/admin`, захисти її Cloudflare Access
  (вхід лише для тебе через email-код), без власної авторизації.

---

## Порядок дій (коротко)
1. Add site у Cloudflare → отримати 2 NS.
2. GoDaddy → замінити nameservers на Cloudflare-івські → чекати активації.
3. Задеплоїти проєкт на Pages (`BACKEND_PLAN.md`).
4. Pages → Custom domain → `roninforge.jp` + `www`.
5. SSL/TLS → Full (strict), Always HTTPS, Min TLS 1.2.
6. Security → WAF managed ruleset, Bot Fight Mode, Rate limiting на `/api/commission`.

Готово: домен з GoDaddy працює через Cloudflare, сайт під захистом WAF+DDoS+Bot+Turnstile.
