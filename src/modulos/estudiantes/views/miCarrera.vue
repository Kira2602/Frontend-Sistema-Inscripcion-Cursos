<template>
  <div v-if="loading">Cargando...</div>

  <div v-else>
    <div v-if="student && student.data.carrera_usuario === null">
      <h1 class="title">Carreras Disponibles</h1>
      <p class="description">
        Aún no estás inscrito en ninguna carrera. Este es el momento perfecto
        para dar el primer paso hacia tu futuro profesional. Explora nuestras
        carreras disponibles, descubre nuevas oportunidades y elige el camino
        que mejor se adapte a tus metas y aspiraciones. Empieza hoy a construir
        tu futuro académico con confianza, compromiso y el respaldo que
        necesitas para alcanzar el éxito.
      </p>
      <div class="carrera-grid">
        <div class="carrera-card" v-for="carrera in carreras.data">
          <h2>{{ carrera.nombre }}</h2>
          <p class="desc">{{ carrera.descripcion }}</p>
          <div class="specs">
            <p class="spec">
              <SimpleIcon iconName="grid" iconColor="" />
              Código: {{ String(carrera.codigo).toUpperCase() }}
            </p>
            <p class="spec">
              <SimpleIcon iconName="verified" iconColor="" />
              Certificación
            </p>
            <p class="spec">
              <SimpleIcon iconName="info" iconColor="" />
              Duración: {{ carrera.duracion }}
            </p>
          </div>
          <div class="button-group">
            <button class="insc">Inscribirse</button>
          </div>
        </div>
      </div>
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
            <p class="titu">Nombre:</p>
            {{ student.data.nombre }}
            <p class="titu">CI:</p>
            {{ student.data.ci }}
            <p class="titu">Correo:</p>
            {{ student.data.correo }}
            <p class="titu">Fecha de Nacimiento:</p>
            {{ student.data.fecha_nac }}
            <p class="titu">Dirección:</p>
            {{ student.data.direccion }}
            <p class="titu">Teléfono:</p>
            {{ student.data.telefono }}
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
const carreras = ref([]);

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

    const carrerasResponse = await api.get("/carreras/disponibles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const carreraData = await carrerasResponse.data;
    carreras.value = carreraData;
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

.carrera-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.carrera-card {
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  box-shadow: 10px 10px 12px 5px #dcdcdc;
}

.desc {
  margin: 0.5rem 0rem;
  color: #787878;
  font-size: small;
}

.specs {
  display: flex;
  gap: 5px;
  margin: 1rem 0rem;
}

.spec {
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 0.5rem 0.8rem;
  font-size: small;
  gap: 5px;
}

.spec:nth-child(1) {
  background-color: #680092;
  color: #de8bff;
}

.spec:nth-child(2) {
  background-color: #005414;
  color: #00ff3c;
}

.spec:nth-child(3) {
  background-color: rgb(150, 120, 0);
  color: rgb(255, 255, 0);
}

.button-group {
  margin: 2rem 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.insc {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  background-color: #003cff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 2rem;
  font-weight: 600;
}

.insc:hover {
  text-decoration: underline;
}
</style>
