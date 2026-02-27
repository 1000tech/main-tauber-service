<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMenu } from '~/composables/useMenu'

const { data: menu } = useMenu()
const { locale, availableLocales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const emit = defineEmits<{
	(e: 'navigate'): void
}>()
const localeCodes = computed(() => {
	return availableLocales.map((item) => (typeof item === 'string' ? item : item.code))
})

const switchLocale = async (code: string) => {
	if (code === locale.value) return
	if (['de', 'en', 'ru'].includes(code)) {
		emit('navigate')
		await navigateTo(switchLocalePath(code as 'de' | 'en' | 'ru'))
	}
}

const handleNavigate = () => {
	emit('navigate')
}
</script>

<template>
	<nav class="menu">
		<ul class="menu-list">
			<li v-for="it in menu?.items || []" :key="it.path">
				<NuxtLink :to="localePath(it.path)" @click="handleNavigate">
					<Icon v-if="it.icon" :name="it.icon" class="mr-2 flex-shrink-0" />
					<span>{{ it.label }}</span>
				</NuxtLink>
			</li>
		</ul>
		<div class="locale-switcher">
			<button
				v-for="code in localeCodes"
				:key="code"
				:class="['locale-btn', { active: code === locale }]"
				type="button"
				@click="switchLocale(code as string)"
			>
				{{ code.toUpperCase() }}
			</button>
		</div>
	</nav>
</template>

<style scoped lang="stylus">
.menu
	display flex
	flex-direction column
	gap 1rem
	height 100%

.menu-list
	list-style none
	padding 0
	margin 0
	flex 1
	overflow-y auto
	min-height 0
	li
		margin .5rem 0
	a
		color $white
		text-decoration none
		display flex
		align-items center
		gap .5rem
		padding .75rem
		width 100%
		font-weight 600
		&:hover
			background rgba(255, 255, 255, .2)
	
	&::-webkit-scrollbar
		width 4px
	&::-webkit-scrollbar-track
		background rgba(255, 255, 255, 0.1)
		border-radius 2px
	&::-webkit-scrollbar-thumb
		background rgba(255, 255, 255, 0.3)
		border-radius 2px
	&::-webkit-scrollbar-thumb:hover
		background rgba(255, 255, 255, 0.5)

.locale-switcher
	display flex
	justify-content right
	gap .5rem
	flex-wrap wrap
	margin-top auto
	padding 1rem
	border-top 1px solid rgba(255,255,255,.2)

.locale-btn
	border 1px solid rgba(255,255,255,.3)
	background transparent
	color $white
	padding .35rem .6rem
	border-radius 6px
	cursor pointer
	font-weight 600
	transition all 0.2s ease
	&:hover
		background rgba(255,255,255,.1)
	&.active
		background $white
		color $primary
		border-color $white
</style>
