/** @format */

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
