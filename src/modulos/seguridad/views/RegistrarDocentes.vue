<template>
  <h2>Docentes</h2>
  <p class="subtitle">
    Aquí puedes ver la lista de docentes registrados y agregar uno nuevo
  </p>

  <div class="container">
    <div class="search-container">
      <div class="search-bar">
        <Icon iconName="search" iconColor="#666" />
        <input type="text" class="search-box" placeholder="Search" />
      </div>
      <button class="registrar">Registrar Nuevo Docente</button>
    </div>
    <div>
      <DocenteCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DocenteCard from "../components/DocenteCard.vue";
import Icon from "../components/Icon.vue";

const users = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    users.value = data;
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

.search-bar {
  display: flex;
  flex-direction: row;
  flex: 7;
  align-items: center;
  gap: 6px;
  background-color: #eee;
  border: none;
  border-radius: 50px;
  padding: 0.2rem 1rem;
}

.search-box {
  flex: 1;
  background: transparent;
  border: none;
  font-size: small;
  outline: none;
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
}

.registrar:hover {
  background-color: #daa300;
}
</style>
