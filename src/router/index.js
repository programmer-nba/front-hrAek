import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
