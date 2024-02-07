import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $ from "jquery";
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/resizable';
import "jquery-ui/ui/widgets/datepicker";
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

global.$ = global.jQuery = $;

// Attach jQuery to the Vue instance
app.config.globalProperties.$ = $;


app.use(store).use(router).mount("#app");
