import { defineNuxtConfig } from 'nuxt/config'
import { resolve, join, relative, sep } from 'path'
import { readdirSync } from 'fs'

// Helper: collect localized routes from content/*.md for prerender (with i18n strategy prefix_except_default)
const locales = ['de', 'en', 'ru'] as const
const defaultLocale = 'de'
const contentRoot = resolve(__dirname, 'content')

function walk(dir: string): string[] {
    const out: string[] = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) out.push(...walk(full))
        else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full)
    }
    return out
}

function shouldSkip(fileRelPath: string): boolean {
    // Skip special content like _menu.md, _texts.md and any path segment starting with underscore
    const segments = fileRelPath.split('/')
    const fname = segments[segments.length - 1]
    if (fname && fname.startsWith('_')) return true
    return segments.some((s: string) => s.startsWith('_'))
}

function contentFileToRoute(locale: string, fileAbsPath: string): string | null {
    const rel = relative(join(contentRoot, locale), fileAbsPath).split(sep).join('/')
    if (shouldSkip(rel)) return null
    const withoutExt = rel.replace(/\.md$/i, '')
    // Map home.md to locale root
    const pathPart = withoutExt === 'home' ? '' : `/${withoutExt}`
    return locale === defaultLocale ? `${pathPart || '/'}` : `/${locale}${pathPart}`
}

function collectPrerenderRoutes(): string[] {
    const routes = new Set<string>()
    for (const loc of locales) {
        const base = join(contentRoot, loc)
        try {
            const files = walk(base)
            for (const f of files) {
                const r = contentFileToRoute(loc, f)
                if (r) routes.add(r)
            }
        } catch {
            // ignore missing locale folder
        }
    }
    // Also include non-content pages like contact per locale
    for (const loc of locales) {
        routes.add(loc === defaultLocale ? '/contact' : `/${loc}/contact`)
    }
    return Array.from(routes)
}

export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxtjs/i18n',
        '@nuxtjs/seo',
        '@nuxtjs/tailwindcss',
        '@nuxt/icon',
        '@nuxtjs/color-mode',
    ],
    compatibilityDate: '2025-08-22',
    nitro: {
        preset: 'vercel',
        future: {
            nativeSWR: true,
        },
        routeRules: {
            '/api/**': { cache: false },
            '/admin/**': { cache: false },
            '/**': { swr: 604800 },
        },
        prerender: {
            crawlLinks: true,
            routes: collectPrerenderRoutes(),
        },
    },
    runtimeConfig: {
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
        oauthRedirectUrl: process.env.OAUTH_REDIRECT_URL ?? '',
        public: {
            locales: ['de', 'en', 'ru'],
        },
    },
    i18n: {
        locales: [
            { code: 'de', iso: 'de-DE' },
            { code: 'en', iso: 'en-US' },
            { code: 'ru', iso: 'ru-RU' },
        ],
        defaultLocale: 'de',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false,
        compilation: {
            strictMessage: false,
        },
    },
    app: {
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
        },
    },
    // colorMode: {
    //     preference: 'system', // default theme
    //     fallback: 'light',
    //     classSuffix: '', // use .dark and .light classes without suffix
    //     storageKey: 'nuxt-color-mode',
    // },
    site: {
        url: 'https://main-tauber-service.de',
        name: 'Dienstleistungen.Main-Tauber-Kreis',
    },
    schemaOrg: {
        identity: 'Organization',
    },
    seo: {
        meta: {
            themeColor: [
                { content: '#2c7bc4', media: '' },
            ],
        },
    },
    css: ['../assets/styles/layout.styl'],
    vite: {
        // Disable CSS code-splitting to avoid extra tiny CSS chunks (e.g., usePageContent.*.css)
        // This consolidates all styles into a single CSS file, reducing critical request chains for LCP
        build: {
            cssCodeSplit: false,
        },
        css: {
            preprocessorOptions: {
                stylus: {
                    imports: ['../assets/styles/_vars.styl'],
                },
            },
        },
    },
    content: {
        // Configure @nuxt/content
        sources: {
            content: {
                driver: 'fs',
                base: resolve(__dirname, 'content'),
                prefix: '',
            },
        },
        // Enable markdown parsing
        markdown: {
            toc: {
                depth: 3,
                searchDepth: 3,
            },
        },
        // Enable syntax highlighting
        highlight: {
            theme: 'github-dark',
            preload: ['javascript', 'typescript', 'vue', 'css', 'json', 'bash'],
        },
    },
})
