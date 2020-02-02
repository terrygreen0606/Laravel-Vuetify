require("./bootstrap");

window.Vue = require("vue");
import vuetify from "./vuetify";
import router from "./router";

import App from "./App.vue";

new Vue({
    el: "#app",
    router,
    vuetify,
    components: {
        "app-component": App
    }
});
