import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import en from './locales/en.json';
import zh from './locales/zh.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import pa from './locales/pa.json';
import tr from './locales/tr.json';
import nl from './locales/nl.json';
import sv from './locales/sv.json';
import fi from './locales/fi.json';
import pl from './locales/pl.json';
import uk from './locales/uk.json';
import ur from './locales/ur.json';

i18n
  .use(LanguageDetector) // Detects language from browser/localStorage
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false, // change to true for console logs
    interpolation: {
      escapeValue: false, // react already protects from XSS
    },
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      pt: { translation: pt },
      ru: { translation: ru },
      ja: { translation: ja },
      ko: { translation: ko },
      ar: { translation: ar },
      hi: { translation: hi },
      bn: { translation: bn },
      pa: { translation: pa },
      tr: { translation: tr },
      nl: { translation: nl },
      sv: { translation: sv },
      fi: { translation: fi },
      pl: { translation: pl },
      uk: { translation: uk },
      ur: { translation: ur },
    },
  });

export default i18n;
