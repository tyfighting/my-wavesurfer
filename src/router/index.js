import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    redirect: { name: "wavesurfer" },
    children: [
      {
        path: "/wavesurfer",
        name: "wavesurfer",
        component: () => import("../views/Wavesurfer.vue"),
      },
      {
        path: "/pagination",
        name: "pagination",
        component: () => import("../views/Pagination.vue"),
        children: [
          {
            path: "pageByCountTotal",
            name: "pageByCountTotal",
            component: () => import("../views/pagination/PageByCountTotal.vue"),
          },
          {
            path: "pageByGroupCount",
            name: "pageByGroupCount",
            component: () => import("../views/pagination/PageByGroupCount.vue"),
          },
          {
            path: "menuView",
            name: "menuView",
            component: () => import("../views/pagination/MenuView.vue"),
            redirect: { name: "detail" },
            children: [
              {
                path: "detail",
                name: "detail",
                component: () => import("../views/pagination/Detail.vue"),
              },
              {
                path: "info",
                name: "info",
                component: () => import("../views/pagination/Info.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  routes,
});

export default router;
