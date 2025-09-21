<script setup lang="ts">
const { data: siteTexts } = useSiteTexts()

const seoTitle = computed(() => `${siteTexts.value?.contact_title}`)
const seoDescription = computed(() => siteTexts.value?.contact_subtitle)
useSeoMeta({
    title: seoTitle,
    ogTitle: seoTitle,
    description: seoDescription,
    ogDescription: seoDescription,
})

const form = reactive({
    name: '',
    email: '',
    phone: '',
    message: '',
})

const fields = [
    { key: 'name', labelKey: 'contact_name', type: 'text', required: true },
    { key: 'email', labelKey: 'contact_email', type: 'email', required: true },
    { key: 'phone', labelKey: 'contact_phone', type: 'tel', required: false },
    { key: 'message', labelKey: 'contact_message', type: 'textarea', required: true, rows: 5 },
]

const loading = ref(false)
const success = ref(false)
const error = ref('')

const submit = async () => {
    loading.value = true
    success.value = false
    error.value = ''
    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data?.error || siteTexts.value?.contact_error || 'Ошибка отправки')
        }
        success.value = true
        Object.keys(form).forEach(key => {
            form[key as keyof typeof form] = ''
        })
    } catch (e: any) {
        error.value = e.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="max-w-lg mx-auto py-10 px-4">
        <h1 class="text-2xl font-bold mb-4">
            {{ siteTexts?.contact_title }}
        </h1>
        <p class="text-gray-600 mb-4">
            {{ siteTexts?.contact_subtitle }}
        </p>
        <form class="space-y-6 bg-white p-6 rounded shadow transition-colors" @submit.prevent="submit">
            <div v-for="field in fields" :key="field.key">
                <label class="block mb-1 font-medium" :for="field.key">
                    {{ (siteTexts as any)?.[field.labelKey] }}
                    <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <input
                    v-if="field.type !== 'textarea'"
                    :id="field.key"
                    v-model="form[field.key as keyof typeof form]"
                    :type="field.type"
                    class="w-full border rounded px-3 py-2"
                    :required="field.required"
                >
                <textarea
                    v-else
                    :id="field.key"
                    v-model="form[field.key as keyof typeof form]"
                    :rows="field.rows"
                    class="w-full border rounded px-3 py-2"
                    :required="field.required"
                />
            </div>
            <button type="submit" :disabled="loading" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                <span v-if="loading">{{ siteTexts?.contact_sending }}</span>
                <span v-else>{{ siteTexts?.contact_submit }}</span>
            </button>
            <div v-if="success" class="text-green-600 mt-2">{{ siteTexts?.contact_success }}</div>
            <div v-if="error" class="text-red-600 mt-2">{{ siteTexts?.contact_error }}: {{ error }}</div>
        </form>
    </div>
</template>
