import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const RTL_LANGUAGES = ["ar_AE"];

const setDocumentDirection = (language) => {
  const isRTL = RTL_LANGUAGES.includes(language);
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = language;
  document.body.classList.toggle("rtl", isRTL);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en_US: { translation: en },
      ar_AE: { translation: ar },
    },
    fallbackLng: "en_US",
    interpolation: { escapeValue: false },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

setDocumentDirection(i18n.resolvedLanguage ?? "en_US");

i18n.on("languageChanged", (lng) => {
  setDocumentDirection(lng);
});

export default i18n;
