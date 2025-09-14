import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import pt from '../locales/PT.json'
import en from '../locales/EN.json'

i18n.use(initReactI18next).init({
    lng:'pt',//Idioma padrão
    fallbackLng:'en',//fallback se não encontrar tradução
    resources:{
        pt:{translation:pt},
        en:{translation:en}
    },
    interpolation:{
        escapeValue:false//Proteção contra ataque XSS
    }
})
export default i18n