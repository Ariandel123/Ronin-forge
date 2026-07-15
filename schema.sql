-- D1 schema for Ronin Forge commission requests.
-- Apply:  npx wrangler d1 execute ronin-forge --file=./schema.sql --remote
--         (drop --remote to apply to the local dev DB)

CREATE TABLE IF NOT EXISTS commissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL,
  message    TEXT,
  katana     TEXT,                       -- chosen katana name, or NULL
  lang       TEXT,                       -- 'en' | 'uk'
  ip         TEXT,
  user_agent TEXT,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_commissions_created ON commissions(created_at);
