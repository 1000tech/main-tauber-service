/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './app/**/*.{vue,js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                theme: 'var(--background-color)',
                color: 'var(--text-color)',
            },
        },
    },
    plugins: [],
}
