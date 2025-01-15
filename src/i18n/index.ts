import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import homePageKa from '@/i18n/ka/home.json'
import homePageJa from '@/i18n/ja/home.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ka: {
        translation: {
           'home-page': homePageKa
        }
      },
      ja: {
        translation: {
           'home-page': homePageJa
        }
      }
    },
    lng: "ka", 
    fallbackLng: "ja",

    interpolation: {
      escapeValue: false 
    }
  });