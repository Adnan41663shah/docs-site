# CloudBlitz CRM — Documentation site

Standalone Vite + React app for the in-product documentation (served separately from the main CRM bundle).

## Develop

```bash
cd docs-site
npm install
npm run dev
```

- Docs dev server: **http://localhost:5174**
- CRM dev server: **http://localhost:3000** (expected for header logo → CRM links)

## How URLs work (no environment variables)

| Situation | Behaviour |
|-----------|-----------|
| CRM “Documentation” menu (production) | Opens **`/docs/`** on the **same host** as the CRM — configure your reverse proxy or static host to serve this app’s `dist/` at `/docs/`. |
| CRM “Documentation” (local dev) | Opens **http://localhost:5174** |
| Docs site CRM logo (local) | Points to **http://localhost:3000** when the docs tab is on port **5174**. |
| Docs on **`docs.yourdomain.com`**, CRM on **`yourdomain.com`** | Header logo uses **`https://yourdomain.com`** (same scheme/port as the docs page). |

## Build / deploy

```bash
npm run build
```

Output: **`docs-site/dist/`** — deploy as static files. In production, either mount them at **`/docs/`** behind the CRM domain or host the docs app on a **`docs.`** subdomain as in the table above.
