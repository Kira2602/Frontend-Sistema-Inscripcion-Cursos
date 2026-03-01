<template>
  <div v-if="loading">Cargando...</div>

  <div v-else>
    <div v-if="student && student.data.carrera_usuario === null">
      <h1>Elegir carrera</h1>
    </div>

    <div v-else-if="student">
      <h1>Mi Carrera</h1>
      <div class="main-container">
        <h1 class="title">{{ student.data.carrera.nombre }}</h1>
        <p class="description">{{ student.data.carrera.descripcion }}</p>
        <div class="two-group">
          <div class="badges">
            <p class="badge">
              <SimpleIcon iconName="info" iconColor="" />
              Duración de {{ student.data.carrera.duracion }}
            </p>
            <p class="badge">
              <SimpleIcon iconName="verified" iconColor="" />
              Certificación Digital
            </p>
            <p class="badge">
              <SimpleIcon iconName="grid" iconColor="" />
              Código:
              {{ String(student.data.carrera.codigo).toUpperCase() }}
            </p>
          </div>
          <div class="information">
            <h3 class="title">
              <SimpleIcon iconName="datos" iconColor="orange" />
              Mis Datos:
            </h3>
            <p>
                <p class="titu">Nombre:</p> 
                {{ student.data.nombre }}
            </p>
            <p>
                <p class="titu">CI:</p> 
                {{ student.data.ci }}
            </p>
            <p>
                <p class="titu">Correo:</p> 
                {{ student.data.correo }}
            </p>
            <p>
                <p class="titu">Fecha de Nacimiento:</p> 
                {{ student.data.fecha_nac }}
            </p>
            <p>
                <p class="titu">Dirección:</p> 
                {{ student.data.direccion }}
            </p>
            <p>
                <p class="titu">Teléfono:</p> 
                {{ student.data.telefono }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Estudiante no encontrado o error al cargar los datos.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../../services";
import SimpleIcon from "../../seguridad/components/SimpleIcon.vue";

const student = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const ci = localStorage.getItem("ci");
    const token = localStorage.getItem("token");
    if (ci) {
      const response = await api.get(`/estudiantes/${ci}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      student.value = data;
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
/*
* {
    font-family: "Poppins", sans-serif;
}
*/

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: xx-large;
}

.description {
  color: #787878;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 5rem;
  margin-top: 1rem;
}

.main-container {
  margin-top: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 10px 10px 12px 10px #dcdcdc;
}

.two-group {
  display: flex;
  flex-direction: row;
  margin-top: 2.5rem;
}

.badges {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  flex: 4;
  gap: 1rem;
}

.badge {
  cursor: default;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 50px;
  font-size: small;
  font-weight: bold;
  padding: 0.3rem 1rem;
  gap: 5px;
  max-width: 70%;
}

.badge:nth-child(1) {
  background-color: rgb(150, 150, 0);
  color: rgb(255, 255, 0);
}

.badge:nth-child(2) {
  background-color: #005414;
  color: #00ff3c;
}

.badge:nth-child(3) {
  background-color: #001457;
  color: #6ab7ff;
}

.information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 6;
  padding: 0.3rem 2rem;
}

.titu {
    margin-top: 1rem;
    font-weight: bold;
}
</style>
