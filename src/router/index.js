import { createRouter, createWebHistory, routes } from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import Impressum from "../views/Impressum.vue";
import Datenschutzerklaerung from "../views/Datenschutzerklaerung";
import Lizenz from "../views/Lizenz";
import PageNotFound from "../views/PageNotFound";

routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/impressum",
    name: "impressum",
    component: Impressum,
  },
  {
    path: "/datenschutzerklaerung",
    name: "datenschutzerklaerung",
    component: Datenschutzerklaerung,
  },
  {
    path: "/lizenz",
    name: "lizenz",
    component: Lizenz,
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory("/apps/lernplano/"),
  routes: routes,
});

export default router;
