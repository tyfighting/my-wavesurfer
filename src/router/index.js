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
        path: "wavesurfer",
        name: "wavesurfer",
        component: () => import("../views/Wavesurfer.vue"),
      },
      {
        path: "pagination",
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
            children: [
              {
                path: "menuDetail",
                name: "menuDetail",
                component: () => import("../views/pagination/MenuDetail.vue"),
              },
              {
                path: "menuInfo",
                name: "menuInfo",
                component: () => import("../views/pagination/MenuInfo.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "music",
        name: "music",
        component: () => import("../views/Music.vue"),
      },
      {
        path: "mySlot",
        name: "mySlot",
        component: () => import("../views/MySlot.vue"),
      },
      {
        path: "table",
        name: "table",
        component: () => import("../views/Table.vue"),
      },
      {
        path: "tableEdit",
        name: "tableEdit",
        component: () => import("../views/TableEdit.vue"),
      },
    ],
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  routes,
});

export default router;
