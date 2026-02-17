<template>
  <h2>Estudiantes</h2>
  <p class="subtitle">
    Aquí puedes ver la lista de Estudiantes registrados y agregar uno nuevo
  </p>

  <div class="container">
    <div class="search-container">
      <SearchBar @update:search="searchTerm = $event" />
      <router-link class="registrar" to="registrarEstudiantes">
        Registrar Nuevo Estudiante
      </router-link>
    </div>
    <div>
      <ActionCard
        v-for="student in filteredStudents"
        :key="student.ci"
        :user="student"
        @edit="openEditModal(student)"
      />
    </div>
  </div>

  <EditModal v-if="isOpen" :user="selectedUser" @close="isOpen = false" />
</template>

<script setup>
import { ref, onMounted,computed } from "vue";
import { listarEstudiantes } from "../servicios/seguridadService";
import ActionCard from "../components/ActionCard.vue";
import SearchBar from "../components/SearchBar.vue";
import EditModal from "../components/EditModal.vue";

const searchTerm = ref("");


const students = ref([]);
const selectedUser = ref(null);
const isOpen = ref(false);

const openEditModal = (student) => {
  selectedUser.value = { ...student };
  isOpen.value = true;
};

const filteredStudents = computed(() => {
  if (!searchTerm.value) return students.value;

  return students.value.filter((student) =>
    student.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    student.ci.toString().includes(searchTerm.value)
  );
});
onMounted(async () => {
  try {
    const response = await listarEstudiantes();
    const data = response.data;
    students.value = data.students;
  } catch (error) {
    console.log("Error al obtener los estudiantes: ", error);
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
