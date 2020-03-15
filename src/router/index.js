import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Upload from "../views/Upload";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/upload",
    name: "upload",
    component: Upload
  },
  {
    path: "/404",
    nmae: "404",
    component: PageNotFound
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
