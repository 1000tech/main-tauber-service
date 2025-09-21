import { createError, setCookie, getRequestURL, setResponseHeader } from 'h3'

function randomState(length = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let out = ''
    for (let i = 0; i < length; i++) out += chars.charAt(Math.floor(Math.random() * chars.length))
    return out
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const clientId = config.githubClientId
    const redirectBase = config.oauthRedirectUrl || `${getRequestURL(event).origin}`
    if (!clientId) {
        throw createError({ statusCode: 500, statusMessage: 'Missing GITHUB_CLIENT_ID env' })
    }

    const state = randomState()
    // Set httpOnly cookie to validate the callback
    setCookie(event, 'gh_oauth_state', state, { httpOnly: false, sameSite: 'lax', path: '/', secure: false })

    const redirectUri = `${redirectBase}/api/oauth/callback`
    const url = new URL('https://github.com/login/oauth/authorize')
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('redirect_uri', redirectUri)
    url.searchParams.set('scope', 'repo,user:email')
    url.searchParams.set('state', state)
    url.searchParams.set('allow_signup', 'false')

    const statusFound = 302
    return sendRedirect(event, url.toString(), statusFound)
})
