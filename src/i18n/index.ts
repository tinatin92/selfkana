import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import homePageKa from "@/i18n/ka/home.json";
import homePageJa from "@/i18n/ja/home.json";
import homePageEn from "@/i18n/en/home.json";
import storieDetailEn from "@/i18n/en/storie-detail.json";
import storieDetailKa from "@/i18n/ka/storie-detail.json";
import storieDetailJa from "@/i18n/ja/storie-detail.json";
import lessonsPageEn from "@/i18n/en/lessons.json";
import lessonsPageKa from "@/i18n/ka/lessons.json";
import lessonsPageJa from "@/i18n/ja/lessons.json";
import createStorieKa from "@/i18n/ka/create-storie.json";
import createStorieEn from "@/i18n/en/create-storie.json";
import createStorieJa from "@/i18n/ja/create-storie.json";

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      translation: {
        "home-page": homePageKa,
        "storie-detail": storieDetailKa,
        "lessons": lessonsPageKa,
        "create-storie": createStorieKa,
      },
    },
    ja: {
      translation: {
        "home-page": homePageJa,
        "storie-detail": storieDetailJa,
        "lessons": lessonsPageJa,
        "create-storie": createStorieJa
      },
    },
    en: {
      translation: {
        "home-page": homePageEn,
        "storie-detail": storieDetailEn,
        "lessons": lessonsPageEn,
        "create-storie": createStorieEn
      },
    },
  },
  lng: "ka",
  fallbackLng: "ja",

  interpolation: {
    escapeValue: false,
  },
});
