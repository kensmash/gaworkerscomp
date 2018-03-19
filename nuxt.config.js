const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:400,700"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  /*loading: { color: "#3B8070" },*/
  loading: false,

  /*
  ** Global CSS
  */
  css: [
    "vue-multiselect/dist/vue-multiselect.min.css",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css",
    "~assets/styles/open-iconic-bootstrap.css",
    "~assets/styles/main.css"
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~plugins/date-filter.js",
    "~plugins/nuxt-vuelidate-plugin.js",
    "~plugins/vue-scrollto.js",
    { src: "~plugins/nuxt-quill-plugin.js", ssr: false },
    { src: "~plugins/vue-multiselect.js" }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt"
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** router settings
  */
  router: {
    linkActiveClass: "active"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ["vue-multiselect"],
    extend(config, ctx) {}
  },

  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  }
};
