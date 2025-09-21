<script setup lang="ts">
const { data: siteTexts } = await useSiteTexts()
const route = useRoute()
const localePath = useLocalePath()
</script>

<template>
    <section class="py-8 px-4 md:py-10 md:px-10 bg-gradient-to-br from-[#3790d8] to-[#2c7bc4] text-center text-white">
        <div class="cta-content">
            <h2 class="mb-4 font-bold">
                {{ siteTexts?.cta_title }}
            </h2>
            <p class="mb-8 opacity-90">
                {{ siteTexts?.cta_text }}
            </p>
            <div class="cta-buttons flex gap-4 justify-center flex-wrap flex-col md:flex-row items-center md:items-stretch">
                <template v-for="(b, idx) in (siteTexts?.cta_buttons || []).filter(btn => !(btn.href === '/impressum' && route.path.endsWith('/impressum')))" :key="idx">
                    <NuxtLink
                        :to="localePath(b.href)"
                        :class="b.variant === 'outline' ? 'btn-outline' : 'btn-primary'"
                        prefetch
                        prefetch-on="interaction"
                    >
                        {{ b.label }}
                    </NuxtLink>
                </template>
            </div>
        </div>
    </section>
</template>

<style lang="stylus" scoped>
.cta-content
    h2
        font-size 2rem

        @media (min-width $screen-lg)
            font-size 2.2rem

    p
        font-size 1.2rem

.cta-buttons
    .btn-primary
        &:hover
            background-color #f5dbb8

    .btn-outline
        border-color white
        color white

        &:hover
            background-color white
            color #3790d8

.btn-primary, .btn-outline
    display flex
    align-items center
    justify-content center
    padding 1rem 1.5rem
    border none
    border-radius 8px
    font-size 1rem
    font-weight 600
    cursor pointer
    transition all $time ease
    text-decoration none
    width 100%
    max-width 300px
    font-family 'Courier New', monospace

    @media (min-width $screen-md)
        width auto
        max-width none

.btn-primary
    background linear-gradient(45deg, #3790d8, #2c5aa0)
    color white
    position relative
    overflow hidden
    text-transform uppercase
    letter-spacing 1px

    &::before
        content ''
        position absolute
        top 0
        left -100%
        width 100%
        height 100%
        background linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)
        transition left 0.5s ease

    &:hover::before
        left 100%

    &:hover
        background linear-gradient(45deg, #2c7bc4, #2c5aa0)
        transform translateY(-2px)
        box-shadow 0 5px 15px rgba(55, 144, 216, 0.3)

.btn-outline
    background-color transparent
    color #3790d8
    border 2px solid #3790d8

    &:hover
        background-color #3790d8
        color white
</style>
