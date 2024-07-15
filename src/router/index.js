import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Member from "../views/Member.vue";
import Agendamentos from "../components/Agendamentos.vue";

import { auth } from "../main";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/createGym",
    name: "createGym",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/createGym.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/ListaTreinos",
    name: "ListaTreinos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ListaTreinos.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/agendamentos",
    name: "agendamentos",
    component: Agendamentos,
  },
  {
    path: "/Logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Logout.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/Member",
    name: "Member",
    component: Member,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticatedUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authenticatedUser) next("/");
  else next();
});

export default router;
