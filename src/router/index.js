import { createRouter, createWebHistory } from "vue-router";
import SeguridadLayout from "../layouts/SeguridadLayout.vue";
import RegistrarAdmin from "../modulos/seguridad/views/RegistrarAdmin.vue";
import ListarEstudiantes from "../modulos/seguridad/views/ListarEstudiantes.vue";
import ListarDocentes from "../modulos/seguridad/views/ListarDocentes.vue";
import ListarAdministradores from "../modulos/seguridad/views/ListarAdministradores.vue";
import RegistrarEstudiantes from "../modulos/seguridad/views/RegistrarEstudiantes.vue";
import RegistrarDocentes from "../modulos/seguridad/views/RegistrarDocentes.vue";

import AdminLayout from "../layouts/AdminLayout.vue";
import ListarCarreras from "../modulos/admin/views/ListarCarreras.vue";
import RegistrarCarrera from "../modulos/admin/views/RegistrarCarrera.vue";
import ListarExtra from "../modulos/admin/views/ListarExtra.vue";
import VerCarrera from "../modulos/admin/views/VerCarrera.vue";


import ListarCursos from "../modulos/admin/views/ListarCursos.vue";
import DocenteLayout from "../layouts/DocenteLayout.vue";

import EstudianteLayout from "../layouts/EstudianteLayout.vue";
import Login from "../modulos/seguridad/views/Login.vue";

const routes = [
  {
  path: "/login",
  name: "login",
  component: Login,
  },
  {
  path: "/",
  redirect: "/login",
  },
  {
    
    path: "/seguridad",
    component: SeguridadLayout,
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
  {
    path:"/administrador",
    component:AdminLayout,
    children:[
      {
      path:"",
      redirect:{name:"listarCarreras"}
      },
      {
        path: "listarCarreras",
        name: "listarCarreras",
        component: ListarCarreras,
      },
      {
        path:"registrarCarrera",
        name:"registrarCarrera",
        component:RegistrarCarrera
      },
      {
        path:"listarCursos",
        name:"listarCursos",
        component:ListarCursos
      },
      {
        path:"listarExtra",
        name:"listarExtra",
        component: ListarExtra
      },
      {
        path:"verCarrera/:codigo",
        name:"verCarrera",
        component:VerCarrera,
        
      }
    ]
  },
  {
    path:"/docente",
    component:DocenteLayout,
    //children:[]
  },
  {
    path:"/estudiante",
    component:EstudianteLayout,
    //children:[]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
