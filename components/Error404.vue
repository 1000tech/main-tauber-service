<script setup lang="ts">
// Get site texts for localized error messages
const { data: siteTexts } = await useSiteTexts()

// Use localized path for home link
const localePath = useLocalePath()

// Set status code for SEO
useHead({
    title: siteTexts.value?.error_404_title || 'Page Not Found',
})

// Set 404 status for server response
if (import.meta.server) {
    setResponseStatus(404)
}
</script>

<template>
    <div class="min-h-screen bg-whit text-gray-900 transition-colors flex items-center justify-center">
        <div class="max-w-md w-full mx-auto text-center px-4">
            <!-- Error Code -->
            <div class="mb-8">
                <h1 class="text-8xl font-bold text-gray-400 mb-4">
                    404
                </h1>

                <!-- Error Title -->
                <h2 class="text-2xl font-semibold mb-4">
                    {{ siteTexts?.error_404_title || 'Page Not Found' }}
                </h2>

                <!-- Error Description -->
                <p class="text-gray-600 mb-8">
                    {{ siteTexts?.error_404_description || 'The requested page could not be found.' }}
                </p>
            </div>

            <!-- Error Icon -->
            <div class="mb-8">
                <div class="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon name="heroicons:exclamation-triangle" class="w-10 h-10 text-yellow-500" />
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-4">
                <!-- Go to Homepage -->
                <NuxtLink
                    :to="localePath('/')"
                    class="inline-block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    prefetch
                    prefetch-on="interaction"
                >
                    {{ siteTexts?.error_404_button || 'Go to Homepage' }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
