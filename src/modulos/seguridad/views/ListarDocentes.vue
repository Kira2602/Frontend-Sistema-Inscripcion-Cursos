<template>
  <h2>Docentes</h2>
  <p class="subtitle">
    Aquí puedes ver la lista de Docentes registrados y agregar uno nuevo
  </p>

  <div class="container">
    <div class="search-container">
      <SearchBar @update:search="searchTerm = $event"/>
      <router-link class="registrar" to="registrarDocentes">
        Registrar Nuevo Docente
      </router-link>
    </div>
    <div>
      <ActionCard v-for="docente in filteredDocentes" :key="docente.ci" :user="docente" @edit="openEditModal(docente)" />
    </div>
  </div>
  <EditModal v-if="isOpen" :user="selectedUser" @close="isOpen = false"  @save="actualizarDocente" />
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
import { listarDocentes,editarDocente } from "../servicios/seguridadService";
import EditModal from "../components/EditModal.vue";
import ActionCard from "../components/ActionCard.vue";
import SearchBar from "../components/SearchBar.vue";
import ModalError from "../components/ModalError.vue";
import ModalExito from "../components/ModalExito.vue";
const showModal = ref(false);
const successMessage = ref("");
const showErrorModal = ref(false);
const errorMessage = ref("");

const searchTerm = ref("");
const docentes = ref([]);
const selectedUser = ref(null);
const isOpen = ref(false);

const openEditModal = (docente) => {
  selectedUser.value = { ...docente };
  isOpen.value = true;
};
const filteredDocentes = computed(() => {
  if (!searchTerm.value) return docentes.value;

  return docentes.value.filter((docente) =>
    docente.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    docente.ci.toString().includes(searchTerm.value)
  );
});

const actualizarDocente = async(usuarioActualizado) => {
  // 🔹 Mostramos en consola lo recibido
  console.log("Datos recibidos del modal:", usuarioActualizado);

  try {
     const { ci, ...docenteActualizado } = usuarioActualizado;
    const resultado = await editarDocente(usuarioActualizado.ci, docenteActualizado);

    if (resultado?.success) {
      console.log("Docente actualizado correctamente:", resultado);

      // Actualizar lista local usando ref de Vue 3
      docentes.value = docentes.value.map(doc =>
        doc.ci === docenteActualizado.ci ? { ...doc, ...docenteActualizado } : doc
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


onMounted(async () => {
  try {
    const response = await listarDocentes();
    const data =response.data;
    docentes.value = data.data;
  } catch (err) {
    console.error("Error al obtener los datos: ", err);
  }
});
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
