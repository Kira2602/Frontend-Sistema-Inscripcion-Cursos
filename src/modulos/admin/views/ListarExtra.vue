<template>
  <h2>Cursos Extracurriculares</h2>
  <p class="subtitle">
    Aquí puedes ver la lista de cursos extracurriculares y registrar un nuevo curso
  </p>

  <div class="container">
    <div class="search-container">
      <SearchBarCurso @update:search="searchTerm = $event" />
      

      <router-link class="registrar" to="registrarCursosExtra">
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
import EditModal from "../components/EditModalExtra.vue"; //modal de edicion de cursos extracurriculares
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

const carreraSeleccionada = ref("");



const openEditModal = (curso) => {
  selectedUser.value = { ...curso };
  isOpen.value = true;
};

const openDeletionModal = (curso) => {
  selectedUser.value = { ...curso };
  isDeletion.value = true;
};

const filteredCursos = computed(() => { 
    if (!searchTerm.value) 
        return cursos.value; 
    return cursos.value.filter( 
        (curso) => curso.nombre.toLowerCase().includes(
            searchTerm.value.toLowerCase()) || curso.id_materia.toString().includes(searchTerm.value), 
        ); 
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




const listaCursos=[
  {
    "id_materia": 7,
    "usuario_ci": "9991111",
    "carrera_codigo": null,
    "nombre": "Taller de Oratoria",
    "tipo": "Extracurricular",
    "cupo": 40,
    "dia": "Sábado",
    "hora_inicio": "09:00:00",
    "hora_fin": "11:00:00",
    "fecha_inicio": "2026-04-01",
    "fecha_fin": "2026-06-30",
    "monto": 150.00,
    "aula_id_aula": 401
  },
  {
    "id_materia": 8,
    "usuario_ci": "9991111",
    "carrera_codigo": null,
    "nombre": "Curso de Excel Avanzado",
    "tipo": "Extracurricular",
    "cupo": 35,
    "dia": "Martes",
    "hora_inicio": "18:00:00",
    "hora_fin": "20:00:00",
    "fecha_inicio": "2026-04-05",
    "fecha_fin": "2026-07-05",
    "monto": 200.00,
    "aula_id_aula": 402
  },
  {
    "id_materia": 9,
    "usuario_ci": "8882222",
    "carrera_codigo": null,
    "nombre": "Taller de Fotografía",
    "tipo": "Extracurricular",
    "cupo": 20,
    "dia": "Viernes",
    "hora_inicio": "17:00:00",
    "hora_fin": "19:00:00",
    "fecha_inicio": "2026-03-15",
    "fecha_fin": "2026-06-15",
    "monto": 180.00,
    "aula_id_aula": 403
  },
  {
    "id_materia": 10,
    "usuario_ci": "8882222",
    "carrera_codigo": null,
    "nombre": "Curso de Primeros Auxilios",
    "tipo": "Extracurricular",
    "cupo": 30,
    "dia": "Domingo",
    "hora_inicio": "08:00:00",
    "hora_fin": "12:00:00",
    "fecha_inicio": "2026-05-01",
    "fecha_fin": "2026-05-30",
    "monto": 220.00,
    "aula_id_aula": 404
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
</style>
