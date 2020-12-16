import axios from "axios";

const globals = {
  routes: [],
};

export default {
  target: "static",
  server: {
    port: 8080,
    host: "localhost",
  },
  generate: {
    async routes() {
      const baseUrl = `https://api.1sport.kz/wp-json/wp/v2/posts?_fields=id,slug&per_page=100`;
      const posts = [];
      const { data, headers } = await axios.get(baseUrl);
      const pages = headers["x-wp-totalpages"];
      posts.push(...data);

      for (let i = 2; i <= pages; i++) {
        const { data } = await axios.get(`${baseUrl}&page=${i}`);
        posts.push(...data);
      }
      const ru = posts.map((post) => "/posts/" + post.slug);
      const kz = posts.map((post) => "/kz/posts/" + post.slug);
      globals.routes = [...ru, ...kz];
      return globals.routes;
    },
    fallback: "404.html",
  },

  head: {
    title: "Первый Спортивный",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Информационный портал про спортивные новости",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["~/assets/main.scss", "~/assets/fonts/fonts.css"],

  plugins: ["~/plugins/moment.js"],

  components: true,

  buildModules: ["@nuxtjs/eslint-module"],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "nuxt-i18n",
    "@nuxtjs/style-resources",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],

  sitemap: {
    hostname: "https://1sport.kz",
    gzip: true,
    defaults: {
      priority: 1,
      lastmod: new Date(),
    },
    exclude: ["/error"],
  },

  robots: [
    {
      UserAgent: "*",
      Allow: "/",
      Sitemap: "https://1sport.kz/sitemap.xml",
      Host: "https://1sport.kz",
      Disallow: "/404.html",
    },
  ],

  axios: {
    baseURL: "https://api.1sport.kz/wp-json/wp/v2",
  },

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

  styleResources: {
    scss: ["~/assets/main.scss", "vue-select/src/scss/vue-select.scss"],
  },

  build: {},
};
