/** @format */

import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Layout from "../components/layout/Layout.vue";
import Dashboard from "../components/Dashboard.vue";
import { useAuthStore } from "../store/auth";

const routes = [
   {
      path: "/login",
      name: "login",
      component: Login,
      meta: { noAuth: true },
   },
   {
      path: "/",
      name: "home",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
         {
            path: "",
            name: "dashboard",
            component: Dashboard,
         },
         //  News
         {
            path: "/news",
            name: "news.index",
            component: () => import("../views/news/Index.vue"),
         },
         {
            path: "/news/create",
            name: "news.create",
            component: () => import("../views/news/Create.vue"),
         },
         {
            path: "/news/edit/:id",
            name: "news.edit",
            component: () => import("../views/news/Edit.vue"),
         },
         //  Complaints
         {
            path: "/complaint",
            name: "complaint.index",
            component: () => import("../views/complaint/Index.vue"),
         },
         {
            path: "/complaint/edit/:id",
            name: "complaint.edit",
            component: () => import("../views/complaint/Edit.vue"),
         },
         {
            path: "/complaint/respon/:id",
            name: "complaint.respon",
            component: () => import("../views/complaint/Respon.vue"),
         },
         //  Complaint Result
         {
            path: "/complaintResult",
            name: "complaintResult.index",
            component: () => import("../views/complaintResult/Index.vue"),
         },

         //  Letters
         {
            path: "/letter",
            name: "letter.index",
            component: () => import("../views/letters/Index.vue"),
         },
         {
            path: "/letter/create",
            name: "letter.create",
            component: () => import("../views/letters/Create.vue"),
         },
         {
            path: "/letter/edit/:id",
            name: "letter.edit",
            component: () => import("../views/letters/Edit.vue"),
         },
      ],
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach(async (to, from, next) => {
   const authStore = useAuthStore();
   await authStore.me();
   if (to.meta.requiresAuth) {
      if (!authStore.user) {
         return next({ name: "login" });
      }
   }
   if (to.meta.noAuth) {
      if (authStore.user) {
         return next({ name: "news.index" });
      }
   }
   return next();
});

export default router;
