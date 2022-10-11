import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import AccountView from "../views/AccountView.vue";
import { supabase } from '../supabaseClient'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsView,
    beforeEnter: (to, from) => {
      const user = supabase.auth.user()
      if (!!user){
        return true
      }
      router.push("/login")
      return false
    },
  },
  {
    path: "/me",
    name: "account",
    component: AccountView,
    beforeEnter: (to, from) => {
      const user = supabase.auth.user()
      if (!!user){
        return true
      }
      router.push("/login")
      return false
    },
  },
  // {
  //   path: "/about",
  //   name: "about",
    
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
