<template>
  <h2>Cursos</h2>
  <p class="subtitle">
    Aquí puedes ver la lista de cursos por carrera y registrar un nuevo curso
  </p>

  <div class="container">
    <div class="search-container">
      <SearchBarCurso @update:search="searchTerm = $event" />
      <select v-model="carreraSeleccionada" class="custom-select">
        <option value="">Filtrar por carrera</option>
        <option 
            v-for="carrera in listaCarreras" 
            :key="carrera.codigo"
            :value="carrera.codigo"
        >
            {{ carrera.nombre }}
        </option>
    </select>

      <router-link class="registrar" to="registrarCursos">
        Registrar Nuevo Curso
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
  <EditModal
    v-if="isOpen"
    :user="selectedUser"
    @close="isOpen = false"
    @save="actualizarCurso"
  />

  <DeletionModal
    v-if="isDeletion"
    :user="selectedUser"
    @cancelar="isDeletion = false"
    @aceptar="deleteTeacher"
  />

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

<script setup>
import { ref, onMounted, computed } from "vue";
import EditModal from "../components/EditModal.vue"; //modal de edicion de usuarios
import ActionCard from "../components/ActionCard.vue";
import SearchBarCurso from "../components/SearchBarCurso.vue";//barra de busqueda
import ModalError from "../../seguridad/components/ModalError.vue"; //Modal de error en operacion
import ModalExito from "../../seguridad/components/ModalExito.vue"; //Modal de exito en operacion
import DeletionModal from "../../seguridad/components/DeletionModal.vue";
const showModal = ref(false);
const successMessage = ref("");
const showErrorModal = ref(false);
const errorMessage = ref("");

const searchTerm = ref("");
const cursos = ref([]);
const selectedUser = ref(null);
const isOpen = ref(false);
const isDeletion = ref(false);
//variable que almacena el codigo de la carrera para el filtrado por carrera
const carreraSeleccionada = ref("");



const openEditModal = (curso) => {
  selectedUser.value = { ...curso };
  isOpen.value = true;
};

const openDeletionModal = (curso) => {
  selectedUser.value = { ...curso };
  isDeletion.value = true;
};
//filtrado de cursos mediante la barra de bisqueda y el valor del filtrado por carrera
const filteredCursos = computed(() => {
  return cursos.value.filter((curso) => {

    // 🔍 Filtro por búsqueda
    const coincideBusqueda =
      !searchTerm.value ||
      curso.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      curso.id_materia.toString().includes(searchTerm.value);

    // 🎓 Filtro por carrera
    const coincideCarrera =
      !carreraSeleccionada.value ||
      curso.carrera_codigo === carreraSeleccionada.value;

    // ✅ Debe cumplir ambos
    return coincideBusqueda && coincideCarrera;
  });
});


const actualizarCurso = async (usuarioActualizado) => {
  // 🔹 Mostramos en consola lo recibido
  console.log("Datos recibidos del modal:", usuarioActualizado);

  try {
    const { ci, ...cursoActualizado } = usuarioActualizado;
    const resultado = await editarCurso(
      usuarioActualizado.ci,
      cursoActualizado,
    );

    if (resultado?.exito) {
      console.log("curso actualizado correctamente:", resultado);

      // Actualizar lista local usando ref de Vue 3
      cursos.value = cursos.value.map((doc) =>
        doc.ci === ci
          ? { ...doc, ...cursoActualizado }
          : doc,
      );

      successMessage.value = resultado.message;
      showModal.value = true;
    } else {
      console.error("Error al actualizar:", resultado?.message);
      errorMessage.value = resultado?.message || "Error desconocido";
      showErrorModal.value = true;
    }
  } catch (error) {
    console.error("Error de conexión con el backend:", error);
    errorMessage.value = "No se pudo conectar con el servidor";
    showErrorModal.value = true;
  }
};

const deleteTeacher = async () => {
  if (!selectedUser.value) return;

  try {
    const response = await eliminarcurso(selectedUser.value.ci);
    if (response.success === false) {
      console.error("Error al eliminar: ", response.message);
      return;
    }

    cursos.value = cursos.value.filter(
      (curso) => curso.ci !== selectedUser.value.ci,
    );

    isDeletion.value = false;
    selectedUser.value = null;

    successMessage.value = "cursoeliminado";
    showModal.value = true;
  } catch (error) {
    console.error("Error eliminando curso: ", error);
    errorMessage.value = "Error al eliminar el curso";
    showErrorModal.value = true;
  }
};

onMounted(async () => {
    //simulacion del cargado de cursos con la lista de prueba
    cursos.value=listaCursos;
    /*
  try {
    const response = await listarCursos();
    const data = response.data;
    cursos.value = data.data;
  } catch (err) {
    console.error("Error al obtener los datos: ", err);
  }*/
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
  {
    "id_materia": 3,
    "usuario_ci": "7654321",
    "carrera_codigo": "der",
    "nombre": "Derecho Constitucional",
    "tipo": "Obligatoria",
    "cupo": 40,
    "dia": "Martes",
    "hora_inicio": "09:00:00",
    "hora_fin": "11:00:00",
    "fecha_inicio": "2026-03-01",
    "fecha_fin": "2026-07-01",
    "monto": 300.00,
    "aula_id_aula": 201
  },
  {
    "id_materia": 4,
    "usuario_ci": "7654321",
    "carrera_codigo": "der",
    "nombre": "Derecho Penal",
    "tipo": "Obligatoria",
    "cupo": 35,
    "dia": "Jueves",
    "hora_inicio": "11:00:00",
    "hora_fin": "13:00:00",
    "fecha_inicio": "2026-03-01",
    "fecha_fin": "2026-07-01",
    "monto": 320.00,
    "aula_id_aula": 202
  },
  {
    "id_materia": 5,
    "usuario_ci": "4567890",
    "carrera_codigo": "psi",
    "nombre": "Psicología General",
    "tipo": "Obligatoria",
    "cupo": 28,
    "dia": "Lunes",
    "hora_inicio": "14:00:00",
    "hora_fin": "16:00:00",
    "fecha_inicio": "2026-03-01",
    "fecha_fin": "2026-07-01",
    "monto": 280.00,
    "aula_id_aula": 301
  },
  {
    "id_materia": 6,
    "usuario_ci": "4567890",
    "carrera_codigo": "psi",
    "nombre": "Psicología Clínica",
    "tipo": "Electiva",
    "cupo": 20,
    "dia": "Viernes",
    "hora_inicio": "16:00:00",
    "hora_fin": "18:00:00",
    "fecha_inicio": "2026-03-01",
    "fecha_fin": "2026-07-01",
    "monto": 300.00,
    "aula_id_aula": 302
  }


]


</script>

<style scoped>
.subtitle {
  color: #666;
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

.registrar:hover {
  background-color: #daa300;
}

.custom-select {
  flex: 2;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Quitar estilo nativo */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Flecha personalizada */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.custom-select:focus {
  outline: none;
  border-color: #f7ba00;
  box-shadow: 0 0 0 2px rgba(247, 186, 0, 0.2);
  background-color: #fff;
}

.custom-select:hover {
  border-color: #f7ba00;
}

</style>
