import auth from "src/middleware/auth";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "configuracoes/clientes",
        component: () =>
          import("../pages/configuracoes/Clientes/ListaPage.vue"),
      },
      {
        path: "configuracoes/clientes/adicionar",
        component: () =>
          import("../pages/configuracoes/Clientes/AdicionarPage.vue"),
      },
      {
        path: "configuracoes/clientes/editar/:id",
        component: () =>
          import("../pages/configuracoes/Clientes/EditarPage.vue"),
      },
      {
        path: "configuracoes/carros",
        component: () => import("../pages/configuracoes/Carros/ListaPage.vue"),
      },
      {
        path: "configuracoes/carros/adicionar",
        component: () =>
          import("../pages/configuracoes/Carros/AdicionarPage.vue"),
      },
      {
        path: "configuracoes/carros/editar/:id",
        component: () => import("../pages/configuracoes/Carros/EditarPage.vue"),
      },
    ],
    beforeEnter: auth,
  },

  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
