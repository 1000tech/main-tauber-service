import nodemailer from 'nodemailer'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name = '', email = '', phone = '', message = '' } = body || {}

    if (!email || !message) {
        event.res.statusCode = 400
        return { error: 'E-Mail und Nachricht sind erforderlich.' }
    }

    console.log('SMTP_HOST:', process.env.SMTP_HOST)
    console.log('SMTP_PORT:', process.env.SMTP_PORT)
    console.log('SMTP_USER:', process.env.SMTP_USER)

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // for port 587
        requireTLS: true,
        tls: {
            ciphers: 'SSLv3',
        },
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `Neue Nachricht von ${name || 'Gast'}: ${email}`,
            text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nNachricht: ${message}`,
        })

        // Optional: send confirmation to user
        try {
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Danke für Ihre Anfrage',
                text: `Hallo ${name || 'Gast'}. Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden. Ihre Telefonnummer: ${phone || 'nicht angegeben'}.`,
            })
        } catch (confirmError) {
            console.log('Error sending confirmation:', confirmError)
            // Don't interrupt if confirmation wasn't sent
        }
    } catch (error) {
        console.error('Error sending:', error)
        event.res.statusCode = 500
        return { error: 'Fehler beim Senden der E-Mail.' }
    }

    return { success: true }
})
