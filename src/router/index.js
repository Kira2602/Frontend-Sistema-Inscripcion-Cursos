import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layouts/SeguridadLayout.vue";
import RegistrarAdmin from "../modulos/seguridad/views/RegistrarAdmin.vue";
import RegistrarEstudiantes from "../modulos/seguridad/views/RegistrarEstudiantes.vue";
import RegistrarDocentes from "../modulos/seguridad/views/RegistrarDocentes.vue";
const routes = [
  {
    path: "/seguridad",
    component: AdminLayout,
    children: [
        {
            path:"",
            redirect:{name:"registrarAdmin"}
        },
        {
            path: "registrarAdmin",
            name:"registrarAdmin",
            component: RegistrarAdmin
        },
        {
            path: "registrarEstudiantes",
            name:"registrarEstudiantes",
            component: RegistrarEstudiantes
        },
        {
            path:"registrarDocentes",
            name:"registrarDocentes",
            component:RegistrarDocentes
        }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
