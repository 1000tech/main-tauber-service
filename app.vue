<script setup>
import svg from '~/assets/images/logo.svg?url'
import logo from '~/assets/images/logo.svg?url'

const isOpen = ref(false)
const toggle = () => { isOpen.value = !isOpen.value }
const localePath = useLocalePath()
const { data: siteTexts } = useSiteTexts()

useHead({
    link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: svg },
    ],
})
</script>

<template>
    <div class="app-container">
        <header>
            <button id="burger" class="burger" type="button" aria-label="Menu" @click="toggle">☰</button>
            <NuxtLink :to="localePath('/')" class="logo-link">
                <img :src="logo" alt="Dienstleistungen.Main-Tauber-Kreis Logo" width="60" height="60">
                <span class="ml-4 text-[1.3rem] font-semibold">Dienstleistungen.Main-Tauber-Kreis</span>
            </NuxtLink>
        </header>
        <nav id="sidebar" class="sidebar" :class="{ open: isOpen }">
            <Menu />
        </nav>
        <main class="main-content">
            <NuxtPage />
        </main>
        <footer class="footer">
            <div class="footer-content">
                <p>© 2025 Main-Tauber-Service. Alle Rechte vorbehalten.</p>
                <div class="footer-links">
                    <NuxtLink :to="localePath('/impressum')" class="footer-link">
                        {{ siteTexts?.footer_impressum || 'Impressum' }}
                    </NuxtLink>
                    <NuxtLink :to="localePath('/contact')" class="footer-link">
                        {{ siteTexts?.footer_contact || 'Kontakt' }}
                    </NuxtLink>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="stylus">

.app-container
    min-height 100vh
    display flex
    flex-direction column

header
    position fixed
    top 0
    width 100%
    background rgba(255, 255, 255, 0.25)
    backdrop-filter blur(10px)
    border-bottom 1px solid #e2e8f0
    color #000
    padding 1rem
    display flex
    align-items center
    z-index 1000


.logo-link
    display flex
    align-items center
    text-decoration none
    color inherit
    margin-left 1rem
    
    @media (min-width $screen-md)
        margin 0
    
    &:hover
        opacity 0.8
        transition opacity 0.2s ease

.burger
    background none
    border none
    color #000
    font-size 1.5rem
    cursor pointer
    
    @media (min-width $screen-md)
        display none

.sidebar
    position fixed
    left 0
    top 93px
    width 250px
    height calc(100% - 93px)
    background $primary
    transform translateX(-100%)
    transition transform 0.3s ease
    z-index 999
    display flex
    flex-direction column
    
    @media (min-width $screen-md)
        transform translateX(0)
    
    &.open
        transform translateX(0)

.main-content
    flex 1
    margin-top 70px
    padding 1rem
    
    @media (min-width $screen-md)
        margin-left 250px
        padding 2rem

.footer
    background $white
    color $primary
    padding 1.5rem
    border-top 1px solid #e2e8f0
    margin-top auto
    
    @media (min-width $screen-md)
        margin-left 250px

.footer-content
    display flex
    justify-content space-between
    align-items center
    flex-wrap wrap
    gap 1rem
    
    p
        margin 0
        font-size 0.875rem
        font-weight 500
    
    @media (max-width 768px)
        flex-direction column
        text-align center
        gap 0.5rem

.footer-links
    display flex
    gap 1.5rem
    
    @media (max-width 768px)
        margin-top 0.5rem
    
.footer-link
    color $primary
    text-decoration none
    font-size 0.875rem
    font-weight 500
    transition color 0.2s ease
    
    &:hover
        color #2c7bc4
        text-decoration underline
</style>
