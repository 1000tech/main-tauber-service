#  Dienstleistungen.Main-Tauber-Kreis + Decap CMS + i18n (de/en/ru)

Minimal starter without styling: Nuxt 3 + @nuxt/content (Markdown), @nuxtjs/i18n, Decap CMS admin, GitHub OAuth endpoints for Vercel.

## What's inside

- Nuxt 3 + Nitro (Vercel preset)
- @nuxt/content for Markdown in `content/` with locales subfolders
- @nuxtjs/i18n with locales: en (default), de, ru
- Decap CMS at `/admin/` with i18n enabled collections
- GitHub OAuth flow via server endpoints under `/api/oauth/*`

## Development Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

### 3. Start the CMS proxy server (for local editing)

In a **separate terminal**, run:

```bash
npx netlify-cms-proxy-server
```

This starts a proxy server on port 8081 that allows Decap CMS to edit local files directly without GitHub integration.

### 4. Access the application

- **Website**: http://localhost:3000
- **Admin panel**: http://localhost:3000/admin/
- **Language switching**:
  - EN: http://localhost:3000 (default)
  - DE: http://localhost:3000/de
  - RU: http://localhost:3000/ru

## Admin Panel Usage

### Local Development Mode

With `local_backend: true` in `config.yml` and the proxy server running:

- Click **"Login"** in the admin panel (no GitHub authentication needed)
- Edit content directly, changes save to local files
- Perfect for development and testing

### Production Mode (GitHub Backend)

For production deployment, you'll need GitHub OAuth:

1. **Create a GitHub OAuth App:**

   - Homepage URL: `https://your-app.vercel.app`
   - Authorization callback URL: `https://your-app.vercel.app/api/oauth/callback`
2. **Set environment variables:**

   - `GITHUB_CLIENT_ID` = your OAuth app client ID
   - `GITHUB_CLIENT_SECRET` = your OAuth app client secret
   - `OAUTH_REDIRECT_URL` = `https://your-app.vercel.app` (optional)
3. **For production, disable local backend in `config.yml`:**

   ```yaml
   # Comment out for production:
   # local_backend: true

   backend:
     name: github
     repo: your-github-user/your-repo
     branch: main
   ```

## Deploy to Vercel

### ✅ **Vercel Compatibility: YES**

This project is **fully compatible** with Vercel:

1. **Push to GitHub** and import the repo in Vercel
2. **Vercel auto-detects Nuxt** - no additional configuration needed
3. **Set environment variables** in Vercel → Project Settings → Environment Variables:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `OAUTH_REDIRECT_URL` (optional)

### Important Notes for Production:

- **OAuth endpoints work on Vercel** - the custom `/api/oauth/*` handlers are built for Vercel's serverless functions
- **Disable local_backend** in production by commenting out `local_backend: true` in `config.yml`
- **The proxy server is NOT needed** in production - it's only for local development
- **Content edits go directly to GitHub** - changes are committed to your repo automatically

## File Structure

```
content/
├── en/
│   ├── home.md          # English homepage
│   └── _texts.md        # English global texts (header/footer)
├── de/
│   ├── home.md          # German homepage  
│   └── _texts.md        # German global texts
└── ru/
    ├── home.md          # Russian homepage
    └── _texts.md        # Russian global texts

public/admin/
├── index.html           # Decap CMS interface
└── config.yml           # CMS configuration

server/api/oauth/
├── auth.get.ts          # GitHub OAuth initiation
└── callback.get.ts      # GitHub OAuth callback handler
```

## Content Management

### Pages Collection

- Creates/edits files in `content/{locale}/{slug}.md`
- Each page has `title` and `body` fields
- Supports all three languages (en/de/ru)

### Global Texts Collection

- Edits `content/{locale}/_texts.md` files
- Contains `header` and `footer` fields
- Automatically updates site header/footer

## Troubleshooting

### Admin panel shows login screen but doesn't load after authentication

1. Check browser console for errors
2. Verify GitHub OAuth app settings (callback URL must match exactly)
3. Ensure your GitHub account has write access to the repository
4. Try local mode first to isolate the issue

### Proxy server connection errors

- Make sure `npx netlify-cms-proxy-server` is running in a separate terminal
- Check that port 8081 is not blocked
- Restart both dev server and proxy server if needed

## Tech Stack

- **Nuxt 3** - Vue.js framework
- **@nuxt/content** - Git-based headless CMS
- **@nuxtjs/i18n** - Internationalization
- **Decap CMS** - Admin interface
- **Vercel** - Deployment platform
