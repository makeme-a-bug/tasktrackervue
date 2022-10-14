import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import AddProjectView from "../views/AddProjectView.vue";
import AccountView from "../views/AccountView.vue";
import ProjectMainView from "../views/ProjectMainView.vue";
import ProjectMain from "../components/ProjectMain";
import { supabase } from '../supabaseClient'
import { store } from '../store'

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
      if (!!store.user){
        return true
      }
      router.push("/login")
      return false
    },
  },
  ,
  {
    path: "/projects/add",
    name: "add_projects",
    component: AddProjectView,
    beforeEnter: (to, from) => {
      console.log(store.user)
      if (!!store.user){
        return true
      }
      router.push("/login")
      return false
    },
  },
  {
    path: "/projects/edit/:id",
    name: "edit_projects",
    component: AddProjectView,
    props: true,
    beforeEnter: (to, from) => {
      console.log(store.user)
      if (!!store.user){
        return true
      }
      router.push("/login")
      return false
    },
  },
  ,
  {
    path: "/project/:id",
    name: "project",
    component: ProjectMain,
    props: true,
    beforeEnter: (to, from) => {
      console.log(store.user)
      if (!!store.user){
        return true
      }
      router.push("/login")
      return false
    },
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '',
        component: ProjectMainView,
      },
      // {
      //   // UserPosts will be rendered inside User's <router-view>
      //   // when /user/:id/posts is matched
      //   path: 'posts',
      //   component: UserPosts,
      // },
    ],
  },
  {
    path: "/me",
    name: "account",
    component: AccountView,
    beforeEnter: (to, from) => {
      if (!!store.user){
        return true
      }
      router.push("/login")
      return false
    },

  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
