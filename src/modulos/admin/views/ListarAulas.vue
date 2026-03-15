<template>
  <div class="titles">
    <h1>Registro de Nuevas Aulas</h1>
    <p class="subtitle">Completa el formulario para agregar una nueva aula</p>
  </div>
  <div class="main-card">
    <p>Nombre o Código del Aula:</p>
    <div class="register-container">
      <input
        v-model="nombreAula"
        type="text"
        class="new-aula"
        placeholder="Nombre o código"
      />
      <button class="registrar" @click="handleRegister">Registrar</button>
    </div>

    <h2>Aulas Registradas:</h2>
    <div class="aulas-cards">
      <div class="single-aula" v-for="aula in aulas" :key="aula.id_aula">
        <Icon iconName="classroom" iconColor="#0095ff" />
        <p>{{ aula.nombre }}</p>
      </div>
    </div>
  </div>

  <div v-if="modal.show" class="modal-overlay">
    <div class="modal-content" :class="modal.type">
      <h3>{{ modal.title }}</h3>
      <p>{{ modal.message }}</p>
      <button @click="modal.show = false">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { listAllAulas, registrarAula } from "../servicios/aulasService";
import Icon from "../../seguridad/components/Icon.vue";

const nombreAula = ref("");

const aulas = ref([]);

const modal = ref({
  show: false,
  title: "",
  message: "",
  type: "",
});

const showModal = (title, message, type) => {
  modal.value = {
    show: true,
    title,
    message,
    type,
  };
};

const handleRegister = async () => {
  if (!nombreAula.value.trim()) {
    showModal("Campo vacío", "Ingrese el nombre del aula", "error");
    return;
  }

  try {
    const payload = { nombre: nombreAula.value.trim() };
    const response = await registrarAula(payload);

    if (response && response.exito !== false) {
      showModal("Exito", `Aula ${nombreAula.value} registrada`, "success");

      if (response.id_aula) {
        mockData.value.push(response);
      }

      nombreAula.value = "";
      await fetchAulas();
    } else {
      const msg = response.mensaje || "Error al registrar el aula";
      showModal("Error", msg, "error");
    }
  } catch (error) {
    showModal(
      "Error de conexión",
      "No se pudo establecer la conexión al servidor",
      "error",
    );
  }
};

const fetchAulas = async () => {
  try {
    const response = await listAllAulas();
    if (response && response.exito) {
      aulas.value = response.data;
    } else {
      console.error("Error al cargar aulas:", response.mensaje);
    }
  } catch (error) {
    console.error("Error de conexión al listar aulas:", error);
  }
};

onMounted(async () => {
  await fetchAulas();
});
</script>

<style scoped>
.titles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 0rem 0rem 2rem 0rem;
}

.subtitle {
  color: #707070;
}

.main-card {
  margin: 0px 0px 0px 0px;
  padding: 2rem 2rem;
  width: 100%;
  background-color: white;
  border-radius: 12px;
}

.register-container {
  width: 100%;
  margin: 0rem 0rem 1rem 0rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4rem;
}

.new-aula {
  flex: 6;
  margin: 0.5rem 0rem;
  padding: 0.8rem 0.5rem;
  outline: none;
  border: 2px solid #b1b1b1;
  border-radius: 6px;
  transition: all 0.2s ease-in 0s;
}

.new-aula:focus {
  border: 2px solid #0095ff;
}

.registrar {
  cursor: pointer;
  flex: 4;
  padding: 0.5rem;
  background-color: #0095ff;
  color: #ffffff;
  border: 2px solid #0076ca;
  border-radius: 6px;
  font-size: medium;
}

.registrar:hover {
  background-color: #0076ca;
}

.aulas-cards {
  margin: 1rem 0rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.single-aula {
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #f6f6f6;
  box-shadow: 5px 5px 0px 2px #cfcece;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success h3 {
  color: #27ae60;
}
.error h3 {
  color: #e74c3c;
}

.modal-button {
  margin-top: 1.5rem;
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 6px;
  background-color: #0095ff;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.modal-button:hover {
  background-color: #0076ca;
}
</style>
