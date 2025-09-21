import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed, type ComputedRef } from 'vue'

interface PageContent {
    [key: string]: unknown
}

export const usePageContent = async (): Promise<{
    page: Ref<PageContent | undefined>
    slug: ComputedRef<string>
    locale: Ref<string>
}> => {
    const route = useRoute()
    const { locale } = useI18n()

    const slug = computed(() => {
        const s = (route.params.slug as string[] | undefined) || []
        return s.join('/') || 'home'
    })

    const key = computed(() => `${locale.value}:${slug.value}`)

    const { data: page } = await useAsyncData(
        key,
        async () => {
            return await queryContent(`/${locale.value}/${slug.value}`).findOne()
        },
        { watch: [locale, slug] },
    )

    return {
        page,
        slug,
        locale,
    }
}
