import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layouts/SeguridadLayout.vue";
import RegistrarAdmin from "../modulos/seguridad/views/RegistrarAdmin.vue";
import ListarEstudiantes from "../modulos/seguridad/views/ListarEstudiantes.vue";
import ListarDocentes from "../modulos/seguridad/views/ListarDocentes.vue";
const routes = [
  {
    path: "/seguridad",
    component: AdminLayout,
    children: [
      {
        path: "",
        redirect: { name: "registrarAdmin" },
      },
      {
        path: "registrarAdmin",
        name: "registrarAdmin",
        component: RegistrarAdmin,
      },
      {
        path: "listarEstudiantes",
        name: "listarEstudiantes",
        component: ListarEstudiantes,
      },
      {
        path: "listarDocentes",
        name: "listarDocentes",
        component: ListarDocentes,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
