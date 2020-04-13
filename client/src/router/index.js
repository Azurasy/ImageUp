import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Upload from "../views/Upload";
import ImageView from "../views/ImageView";
import PageNotFound from "../views/PageNotFound";
import Account from "../views/Account";

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
    path: "/i/:id",
    name: "image",
    component: ImageView
  },
  {
    path: "/account",
    name: "account",
    component: Account
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
