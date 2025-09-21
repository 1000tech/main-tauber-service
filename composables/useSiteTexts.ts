import { useI18n } from 'vue-i18n'
import type { AsyncData, NuxtError } from '#app'

export type SiteTexts = {
    error_404_title: string
    error_404_description: string
    error_404_button: string
    contact_title: string
    contact_subtitle: string
    contact_name: string
    contact_email: string
    contact_phone: string
    contact_message: string
    contact_submit: string
    contact_sending: string
    contact_success: string
    contact_error: string
    footer_impressum: string
    footer_contact: string
    cta_title: string
    cta_text: string
    cta_buttons: Array<{ label: string; href?: string; variant?: string }>
}

export const useSiteTexts = (): AsyncData<SiteTexts | null, NuxtError<unknown> | null> => {
    const { locale } = useI18n()
    return useAsyncData<SiteTexts>(
        () => `texts-${locale.value}`,
        async () => {
            const doc = await queryContent<SiteTexts>(`/${locale.value}/_texts`).findOne()
            const {
                error_404_title = '',
                error_404_description = '',
                error_404_button = '',
                contact_title = '',
                contact_subtitle = '',
                contact_name = '',
                contact_email = '',
                contact_phone = '',
                contact_message = '',
                contact_submit = '',
                contact_sending = '',
                contact_success = '',
                contact_error = '',
                footer_impressum = '',
                footer_contact = '',
                cta_title = '',
                cta_text = '',
                cta_buttons = [],
            } = (doc ?? {}) as Partial<SiteTexts>
            return {
                error_404_title,
                error_404_description,
                error_404_button,
                contact_title,
                contact_subtitle,
                contact_name,
                contact_email,
                contact_phone,
                contact_message,
                contact_submit,
                contact_sending,
                contact_success,
                contact_error,
                footer_impressum,
                footer_contact,
                cta_title,
                cta_text,
                cta_buttons,
            }
        },
        { watch: [locale] },
    )
}
