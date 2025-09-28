// src/i18n.js
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: 'en',  // Default language
    fallbackLocale: 'en',
    messages: {
        en,
        zh
    }
})

export default i18n
