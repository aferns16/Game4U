import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Help from "../views/Help.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/help",
    name: "help",
    component: Help
  }
];

const router = new VueRouter({
  routes
});

export default router;
