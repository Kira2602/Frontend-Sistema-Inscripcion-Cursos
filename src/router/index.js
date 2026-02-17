import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layouts/SeguridadLayout.vue";
import RegistrarAdmin from "../modulos/seguridad/views/RegistrarAdmin.vue";
import ListarEstudiantes from "../modulos/seguridad/views/ListarEstudiantes.vue";
import ListarDocentes from "../modulos/seguridad/views/ListarDocentes.vue";
import ListarAdministradores from "../modulos/seguridad/views/ListarAdministradores.vue";
import RegistrarEstudiantes from "../modulos/seguridad/views/RegistrarEstudiantes.vue";
import RegistrarDocentes from "../modulos/seguridad/views/RegistrarDocentes.vue";

const routes = [
  {
    path: "/seguridad",
    component: AdminLayout,
    children: [
      {
        path: "",
        redirect: { name: "listarAdministradores" },
      },
      {
        path: "listarAdministradores",
        name: "listarAdministradores",
        component: ListarAdministradores,
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
      {
        path: "registrarEstudiantes",
        name: "registrarEstudiantes",
        component: RegistrarEstudiantes,
      },
      {
        path: "registrarDocentes",
        name: "registrarDocentes",
        component: RegistrarDocentes,
      },
      {
        path: "registrarAdmin",
        name: "registrarAdmin",
        component: RegistrarAdmin,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
