<script setup>
const localePath = useLocalePath()
const { locale } = useI18n()

// Получаем контент главной страницы
const { data: homeContent } = await useAsyncData(
    `home-${locale.value}`,
    () => queryContent(`/${locale.value}/home`).findOne(),
    { watch: [locale] }
)

useSeoMeta({ 
    title: homeContent.value?.title || 'Main-Tauber Service' 
})
</script>

<template>
    <section id="welcome">
        <h1>{{ homeContent?.hero_title || 'Willkommen bei Main-Tauber Service!' }}</h1>
        <p>{{ homeContent?.hero_description || 'Unsere Leistungen reichen von Entrümpelungen bis zur Gartenpflege und werden für Privathaushalte, Gewerbebetriebe und Wohnungseigentümergemeinschaften angeboten.' }}</p>
        <p>{{ homeContent?.hero_cta || 'Kontaktieren Sie uns für eine unverbindliche Beratung!' }}</p>
    </section>
    <section id="services">
        <h2>{{ homeContent?.services_title || 'Unsere Leistungen' }}</h2>
        <div class="services-grid">
            <div v-for="service in homeContent?.services || []" :key="service.path" class="service">
                <Icon v-if="service.icon" :name="service.icon" size="40" class="service-icon" aria-hidden="true" />
                <h3><NuxtLink :to="localePath(service.path)">{{ service.title }}</NuxtLink></h3>
                <p>{{ service.description }}</p>
            </div>
        </div>
    </section>
    <section id="contact">
        <h2>{{ homeContent?.contact_title || 'Kontakt' }}</h2>
        <div class="contact-details">
            <p>{{ homeContent?.contact_description || 'Berliner Ring 16597877 Wertheim' }}</p>
            <p>{{ homeContent?.contact_phone || '+49 (0) 17647899067' }}</p>
            <p>{{ homeContent?.contact_email || 'info@main-tauber-service.de' }}</p>
        </div>
    </section>
</template>

<style scoped lang="stylus">
#welcome
    text-align center
    padding 2rem 0
    border-bottom 1px solid #e2e8f0
    h1
        font-size 2rem
        font-weight 700
        color $primary
        margin-bottom 1.5rem
        letter-spacing -0.025em
        @media (min-width $screen-md)
            font-size 2.5rem

#welcome p
    font-size 1.125rem
    color #4a5568
    max-width 600px
    margin 0 auto 1rem
    line-height 1.8
    @media (min-width $screen-md)
        font-size 1.25rem

#services > h2
    text-align center

.services-grid
    display grid
    grid-template-columns 1fr
    gap 1rem
    @media (min-width $screen-md)
        grid-template-columns repeat(2, 1fr)
    @media (min-width $screen-lg)
        grid-template-columns repeat(3, 1fr)

.service
    background white
    padding 1rem
    border-radius 8px
    box-shadow 0 2px 5px rgba(0,0,0,0.1)
    transition: transform 0.3s
    &:hover
        transform translateY(-5px)
    h3
        text-align center
        color $primary
        margin-bottom 0.5rem
        font-size 1.2rem
        font-weight 600

.service-icon
    display block
    margin 0 auto 0.5rem
    color $primary
    width 40px
    height 40px

#contact
    background $white
    padding 3rem 1.5rem
    border-radius 12px
    text-align center
    border 1px solid #e2e8f0

.contact-details p
    margin 0.75rem 0
    font-size 1rem
    color #374151
    font-weight 500
</style>
