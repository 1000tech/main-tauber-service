import withNuxt from './.nuxt/eslint.config.mjs'

const tabIndent = 4

export default withNuxt(
    {
        files: ['**/*.{js,mjs,ts,vue}'],
        rules: {
            // Code style and formatting
            'max-len': ['error', { code: 150 }],
            indent: ['error', tabIndent],
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            'quote-props': ['error', 'as-needed'],
            'comma-dangle': ['error', {
                objects: 'always-multiline',
                arrays: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            }],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            // camelcase: ['error', {
            //     properties: 'never',
            //     ignoreDestructuring: false,
            //     ignoreImports: false,
            //     ignoreGlobals: false,
            //     allow: ['^[A-Z][A-Z0-9_]*$'], // Allow UPPER_SNAKE_CASE for const
            // }],

            // Import/export rules
            'import/extensions': 0,
            'import/no-unresolved': 0,

            // Function and variable naming
            'func-names': ['error', 'never'],
            'no-param-reassign': 0,

            // Modern syntax preferences
            'object-shorthand': ['error', 'always'],
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-template': 'error',
            'prefer-destructuring': ['error', {
                array: false,
                object: true,
            }],

            // Security and best practices
            'no-restricted-globals': ['error', 'event'],
            'no-magic-numbers': ['error', {
                ignore: [-1, 0, 1],
                ignoreArrayIndexes: true,
                ignoreDefaultValues: true,
                detectObjects: false,
            }],
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-new-func': 'error',
            'no-proto': 'error',
            'no-script-url': 'error',

            // Development vs production
            'no-console': process.env.NODE_ENV === 'production' ? 'error' : 0,
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 0,

            // Dead code elimination
            'no-unused-vars': ['error', {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
            }],
            'no-unused-expressions': ['error', {
                allowShortCircuit: true,
                allowTernary: true,
            }],
            'no-unused-labels': 'error',
            'no-unreachable': 'error',
            'no-useless-return': 'error',
            'no-useless-constructor': 'error',
            'no-useless-computed-key': 'error',
            'no-useless-concat': 'error',
            'no-useless-escape': 'error',
            'no-useless-rename': 'error',
            'no-constant-condition': 'error',
            'no-empty': 'error',
            'no-empty-function': 'error',

            // Performance optimization
            'no-loop-func': 'error',
            'no-new-object': 'error',
            'no-new-wrappers': 'error',
            'no-array-constructor': 'error',
            'no-new-symbol': 'error',
            'no-useless-call': 'error',
            'no-extend-native': 'error',
            'no-iterator': 'error',
            'no-sequences': 'error',
            'no-with': 'error',
            radix: 'error',

            // Vue handling
            'vue/no-mutating-props': 0,
            'vue/no-unused-components': 0,
            'vue/no-multiple-template-root': 'off',
            'vue/multi-word-component-names': 0,
            'vue/html-indent': ['error', tabIndent, {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            }],
        },
    },
    {
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: '.',
            },
        },
        rules: {
            // '@typescript-eslint/strict-boolean-expressions': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
        },
    },
    {
        ignores: ['.nuxt', '.output', 'node_modules', 'public', 'eslint.config.ts', 'tailwind.config.ts'],
    },
)
