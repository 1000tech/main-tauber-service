import { createError, getCookie, setResponseHeader, getRequestURL, getQuery } from 'h3'

type TokenParams = {
    clientId: string
    clientSecret: string
    code: string
    redirectUri: string
}

type TokenResponse = { access_token: string }

async function exchangeCodeForToken({ clientId, clientSecret, code, redirectUri }: TokenParams): Promise<TokenResponse> {
    const access_endpoint = 'https://github.com/login/oauth/access_token'
    const res = await $fetch(access_endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
        },
    }) as TokenResponse
    return res
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const clientId = config.githubClientId
    const clientSecret = config.githubClientSecret
    const redirectBase = config.oauthRedirectUrl || `${getRequestURL(event).origin}`

    if (!clientId || !clientSecret) {
        throw createError({ statusCode: 500, statusMessage: 'Missing GitHub OAuth env vars' })
    }

    const { code, state } = getQuery(event)
    const codeStr = typeof code === 'string' ? code : Array.isArray(code) ? code[0] : undefined
    const stateStr = typeof state === 'string' ? state : Array.isArray(state) ? state[0] : undefined
    const expectedState = getCookie(event, 'gh_oauth_state')

    if (codeStr === undefined || codeStr === '' || stateStr === undefined || stateStr === '' || stateStr !== expectedState) {
        setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')
        return `<!doctype html>
        <html>
            <body>
                <script>
                    (function(){
                        var msg = 'authorization:github:error:Invalid state or missing code';
                        if (window.opener) { window.opener.postMessage(msg, '*'); }
                        window.close();
                    })();
                </script>
                Error: invalid state
            </body>
        </html>`
    }

    try {
        const tokenRes = await exchangeCodeForToken({
            clientId,
            clientSecret,
            code: codeStr,
            redirectUri: `${redirectBase}/api/oauth/callback`,
        })
        const accessToken = tokenRes.access_token
        if (!accessToken) {
            throw new Error(`No token: ${JSON.stringify(tokenRes)}`)
        }
        setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')
        // Post a message that Decap CMS listens for
        return `<!doctype html>
        <html>
            <body>
                <script>
                    (function(){
                        var msg = \`authorization:github:success:${accessToken}\`;
                        if (window.opener) { window.opener.postMessage(msg, '*'); }
                        window.close();
                    })();
                </script>
                Success
            </body>
        </html>`
    } catch (e: unknown) {
        setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')
        let message = 'OAuth error'
        if (e instanceof Error && typeof e.message === 'string') {
            message = e.message.replace(/</g, '&lt;')
        } else if (typeof e === 'string') {
            message = e.replace(/</g, '&lt;')
        }
        return `<!doctype html>
        <html>
            <body>
                <script>
                    (function(){
                        var msg = \`authorization:github:error:${message}\`;
                        if (window.opener) { window.opener.postMessage(msg, '*'); }
                        window.close();
                    })();
                </script>
                Error
            </body>
        </html>`
    }
})
