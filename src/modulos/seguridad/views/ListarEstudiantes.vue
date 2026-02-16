<template>
  <h2>Estudiantes</h2>
  <p class="subtitle">
    Aquí puedes ver la lista de Estudiantes registrados y agregar uno nuevo
  </p>

  <div class="container">
    <div class="search-container">
      <SearchBar />
      <router-link class="registrar" to="registrarEstudiantes">
        Registrar Nuevo Estudiante
      </router-link>
    </div>
    <div>
      <ActionCard
        v-for="student in students"
        :key="student.id"
        :user="student"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ActionCard from "../components/ActionCard.vue";
import SearchBar from "../components/SearchBar.vue";

const students = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    students.value = data;
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
