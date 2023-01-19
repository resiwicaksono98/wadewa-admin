/** @format */

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import VueCookies from "vue-cookies";
import axios from "axios";

axios.defaults.withCredentials = true;

const app = createApp(App);
app.use(router);
app.use(VueCookies);
app.mount("#app");
