<script setup lang="ts">
import { computed, useSeoMeta } from '#imports'
const { page, slug } = await usePageContent()

const seoTitle = computed(() => `${page.value?.title ?? slug.value}`)
const seoDescription = computed(() => String(page.value?.hero_subtitle ?? ''))
useSeoMeta({
    title: seoTitle,
    ogTitle: seoTitle,
    description: seoDescription,
    ogDescription: seoDescription,
})
</script>

<template>
    <template v-if="page">
        <section class="prose-content px-4">
            <h1 class="mb-2">{{ page.title || slug }}</h1>
            <p v-if="page.hero_subtitle" class="mb-6 text-[#345] opacity-90">{{ page.hero_subtitle }}</p>
            <ContentRenderer :value="page" />
        </section>
    </template>
    <template v-else>
        <Error404 />
    </template>
</template>

<style scoped lang="stylus">
.prose-content
    max-width: 900px
    margin: 0 auto
    line-height: 1.8
    color: #333

    h2, h3
        color: #2c7bc4
        margin-top: 1.5rem
        margin-bottom: .75rem
        font-weight: 700

    h2
        font-size: 1.7rem

    h3
        font-size: 1.4rem

    p
        margin: 0 0 1rem
</style>
