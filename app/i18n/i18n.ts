import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enSettings from "./locales/en/settings.json";
import frSettings from "./locales/fr/settings.json";

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    debug: import.meta.env.DEV,

    ns: ["common", "home", "addresses", "checkout", "product", "search_results", "products", "settings"],
    defaultNS: "common",

    resources: {
      en: {
        settings: enSettings,
      },
      fr: {
        settings: frSettings,
      },
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;