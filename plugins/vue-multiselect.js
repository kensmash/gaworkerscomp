//solution from https://medium.com/@codebeast_/why-your-third-party-plugin-dont-work-in-nuxt-and-how-to-fix-it-d1a8caadf422
import Vue from "vue";
import Multiselect from "vue-multiselect";

const VueMultiSelect = {
  install(Vue, options) {
    Vue.component("multiselect", Multiselect);
  }
};

Vue.use(VueMultiSelect);
