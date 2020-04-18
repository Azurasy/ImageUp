import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home';
import Upload from '../views/Upload';
import ImageView from '../views/ImageView';
import PageNotFound from '../views/PageNotFound';
import Account from '../views/Account';
import UserProfile from '../views/UserProfile';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload,
  },
  {
    path: '/i/:id',
    name: 'image',
    component: ImageView,
  },
  {
    path: '/login',
    name: 'account',
    component: Account,
    meta: {
      requiresLogout: true,
    },
  },
  {
    path: '/u/:username',
    name: 'profile',
    component: UserProfile,
  },
  {
    path: '/404',
    nmae: '404',
    component: PageNotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/*import store from "../store";
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogout)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next(`/u/${store.getters.user.username}`);
  } else {
    next();
  }
});
*/

export default router;
