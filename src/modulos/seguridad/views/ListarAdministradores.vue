<template>
  <h2>Administradores</h2>
  <p class="subtitle">
    Aquí puedes ver la lista de Administradores registrados y agregar uno nuevo
  </p>

  <div class="container">
    <div class="search-container">
      <SearchBar @update:search="searchTerm = $event"/>
      <router-link class="registrar" to="registrarAdmin">
        Registrar Nuevo Administrador
      </router-link>
    </div>
    <div>
      <ActionCard v-for="admin in filteredAdmins" :key="admin.ci" :user="admin" @edit="openEditModal(admin)"/>
    </div>
  </div>
<EditModal v-if="isOpen" :user="selectedUser" @close="isOpen = false" />
</template>

<script setup>
import { ref, onMounted,computed } from "vue";
import { listarAdministradores } from "../servicios/seguridadService";
import ActionCard from "../components/ActionCard.vue";
import SearchBar from "../components/SearchBar.vue";
import EditModal from "../components/EditModal.vue";

const admins = ref([]);
const selectedUser = ref(null);
const isOpen = ref(false);
const searchTerm=ref("");

const openEditModal = (admin) => {
  selectedUser.value = { ...admin };
  isOpen.value = true;
};

const filteredAdmins = computed(() => {
  if (!searchTerm.value) return admins.value;

  return admins.value.filter((admin) =>
    admin.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    admin.ci.toString().includes(searchTerm.value)
  );
});

onMounted(async () => {
  try {
    const response = await listarAdministradores();
    const data = response.data;
    admins.value = data.data;
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
