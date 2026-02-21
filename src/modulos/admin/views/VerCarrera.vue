<template>
  <div>
    <div class="icon-wrapper">
      <Icon
      to="../listarCarreras"
      iconName="arrow_back"
      iconColor="black"
      message="Volver"
    />
    </div>
       

    <h2>{{user.nombre}}</h2>

    <div class="form-card">
      <form @submit="manejarEnvio" autocomplete="off">
        <div class="grid">
            
            <!-- Columna izquierda -->
            <div class="left-column">
                <div>
                <label>Código</label>
                <input type="text" :value="user?.codigo" disabled />
                </div>

                <div>
                <label>Duración</label>
                <input type="text" :value="user?.duracion" disabled />
                </div>
            </div>

            <!-- Columna derecha -->
            <div class="right-column">
                <label>Descripción</label>
                <textarea
                :value="user?.descripcion"
                disabled
                ></textarea>
            </div>

        </div>

      </form>
    </div>
    <br>
     <div class="container">
    <div class="search-container">
      <SearchBarCurso @update:search="searchTerm = $event" />
      

      <router-link class="registrar" to="registrarCursos">
        Registrar Curso Extracurricular
      </router-link>
    </div>
    <div>
      <ActionCard
        v-for="curso in filteredCursos"
        :key="curso.id_materia"
        :user="curso"
        @edit="openEditModal(curso)"
        @delete="openDeletionModal(curso)"
      />
    </div>
  </div>
  </div>
  <ModalExito 
    :message="successMessage" 
    :visible="showModal" 
    @close="showModal = false"
  />

   <ModalError
    :message="errorMessage"
    :visible="showErrorModal"
    @close="showErrorModal = false"
  />
</template>

<style scoped>
.icon-wrapper {
  cursor: pointer;
  display: inline-flex;
  padding: 0.5rem 0.6rem;
  border-radius: 50px;
}

.icon-wrapper:hover {
  background-color: #eee;
}
h2 {
  margin-bottom: 10px;
}

p {
  margin-bottom: 30px;
  color: #666;
}

.form-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr; /* izquierda pequeña, derecha grande */
  gap: 30px;
  align-items: start;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.right-column {
  display: flex;
  flex-direction: column;
}

textarea {
  width: 100%;
  min-height: 160px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  resize: none;          /* no redimensionable */
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
}




label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: 0.2s;
}

input:focus {
  border-color: #5fa8a8;
  outline: none;
}

.buttons {
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.btn-clear {
  background: #ccc;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
}

.btn-register {
  background: #5fa8a8;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}
.btn-register:disabled {
  background: #405656;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}
.error {
  color: red;
  font-size: 13px;
  margin-top: 4px;
}
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 40px;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
}

.toggle-btn:hover {
  color: #5fa8a8;
}
.full-width {
  grid-column: span 1;
}


textarea:focus {
  outline: none;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 1rem 0rem;
  background-color: white;
  border-radius: 5px;
}

.search-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 10px;
}
.registrar {
  cursor: pointer;
  background-color: #f7ba00;
  color: white;
  display: flex;
  flex: 3;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  font-size: small;
  text-decoration: none;
}
</style>

<script setup>
import Icon from "../../seguridad/components/Icon.vue";
import { ref, computed} from "vue";
import { useRoute } from "vue-router";
import ModalExito from "../../seguridad/components/ModalExito.vue";
import ModalError from "../../seguridad/components/ModalError.vue";
import ActionCard from "../components/ActionCard.vue";
import SearchBarCurso from "../components/SearchBarCurso.vue";


const route = useRoute()

const codigo = route.params.codigo

//simulacion de cargado de la carrera por medio de su codigo
//Esto sera reemplazado con el resultado del endpoint de obtener datos por carrera
const user = computed(()=>{
    return listaCarreras.find(c=>c.codigo===codigo);
})
//simulacion de cargado de las materias de la carrera
//Esto sera reemplazado con el resultado del endpoint de obtener datos por carrera
const cursos=computed(()=>{
    return listaCursos;
})

const showModal = ref(false);
const successMessage = ref("");

const showErrorModal = ref(false);
const errorMessage = ref("");
const searchTerm = ref("");

const form=ref({
  codigo:"",
  nombre:"",
  descripcion:"",
  duracion:""
});

;
const filteredCursos = computed(() => {
  if (!searchTerm.value) return cursos.value;

  return cursos.value.filter(
    (curso) =>
      curso.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      curso.id_materia.toString().includes(searchTerm.value),
  );
});

//lista de prueba de carreras
const listaCarreras=[
    {
        codigo:"ins",
        nombre:"Ingenieria de Sistemas",
        descripcion:"Se enfoca en el diseño, desarrollo, implementación y mantenimiento de software y sistemas informáticos. Los estudiantes aprenden programación, bases de datos, redes y gestión de proyectos tecnológicos.",
        duracion:"5 años"
    },
    {
        codigo:"der",
        nombre:"Derecho",
        descripcion:"Forma profesionales capaces de interpretar y aplicar las leyes, representando a personas o instituciones en asuntos legales, así como asesorando en contratos y derechos.",
        duracion:"5 años"
    },
    {
        codigo:"psi",
        nombre:"Psicología",
        descripcion:"Estudia el comportamiento y los procesos mentales de las personas, capacitando a los profesionales para ofrecer apoyo psicológico, terapias y asesoramiento en distintos contextos.",
        duracion:"5 años"
    }

]
    
//lista de prueba de cursos
const listaCursos=[
    
  {
    "id_materia": 1,
    "usuario_ci": "1234567",
    "carrera_codigo": "ins",
    "nombre": "Programación I",
    "tipo": "Obligatoria",
    "cupo": 30,
    "dia": "Lunes",
    "hora_inicio": "08:00:00",
    "hora_fin": "10:00:00",
    "fecha_inicio": "2026-03-01",
    "fecha_fin": "2026-07-01",
    "monto": 350.00,
    "aula_id_aula": 101
  },
  {
    "id_materia": 2,
    "usuario_ci": "1234567",
    "carrera_codigo": "ins",
    "nombre": "Base de Datos",
    "tipo": "Obligatoria",
    "cupo": 25,
    "dia": "Miércoles",
    "hora_inicio": "10:00:00",
    "hora_fin": "12:00:00",
    "fecha_inicio": "2026-03-01",
    "fecha_fin": "2026-07-01",
    "monto": 400.00,
    "aula_id_aula": 102
  },
  
]

</script>