export default {
  target: "static",

  head: {
    title: "OSporte",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Информационный портал о спорте",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/eslint-module"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "nuxt-i18n"],

  axios: {},

  i18n: {
    locales: [
      {
        code: "kz",
        iso: "kz-KZ",
      },
      {
        code: "ru",
        iso: "ru-RU",
      },
    ],
    baseUrl: "https://1sport.kz",
    seo: true,
    defaultLocale: "ru",
    vueI18n: {
      fallbackLocale: "ru",
      messages: {
        ru: require("./locales/ru.json"),
        kz: require("./locales/kz.json"),
      },
    },
  },

  build: {},
};
