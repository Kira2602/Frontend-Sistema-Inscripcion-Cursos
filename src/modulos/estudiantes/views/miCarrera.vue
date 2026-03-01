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
            <button class="insc" @click="inscribirse(carrera)">
              Inscribirse
            </button>
            <button class="vermas" @click="verMaterias(carrera)">
              Ver Materias
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="showModal = false"
      >
        <div class="modal-content">
          <h2>{{ selectedCarrera }}</h2>

          <div v-if="materias.data && materias.data.length > 0">
            <div v-for="materia in materias.data" class="materia-row">
              <p class="detail">
                <SimpleIcon iconName="carrera" iconColor="#003ffc" />
                {{ materia.nombre }}
              </p>
              <p class="detail">
                <SimpleIcon iconName="attention" iconColor="red" />
                Tipo: {{ materia.tipo }}
              </p>
              <p class="detail">
                <SimpleIcon iconName="money" iconColor="#00ff3c" />
                Monto: Bs. {{ materia.monto }}
              </p>
            </div>
          </div>
          <p v-else-if="!materias.data">Cargando materias...</p>
          <p v-else>No hay materias disponibles.</p>

          <button class="cerrar" @click="showModal = false">Cerrar</button>
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
const materias = ref([]);
const selectedCarrera = ref("");
const showModal = ref(false);

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

async function verMaterias(carrera) {
  try {
    selectedCarrera.value = carrera.nombre;
    const localToken = localStorage.getItem("token");
    const materiasResponse = await api.get(
      `carreras/disponibles/${carrera.codigo}/materias`,
      {
        headers: { Authorization: `Bearer ${localToken}` },
      },
    );

    const materiasData = materiasResponse.data;
    materias.value = materiasData;
    showModal.value = true;
  } catch (error) {
    console.error("ERROR", error);
  }
}

async function inscribirse(carrera) {
  try {
    loading.value = true;
    const locToken = localStorage.getItem("token");

    const inscResponse = await api.post(
      "/estudiantes/inscribirse",
      {
        codigo_carrera: carrera.codigo,
      },
      {
        headers: { Authorization: `Bearer ${locToken}` },
      },
    );

    if (inscResponse.data.success) {
      student.value = inscResponse.data;
      alert("INSCRIPCION EXITOSA");
    }
  } catch (error) {
    const message = "ERROR";
    console.error("ERROR", error);
    alert(message);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
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
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
}

@media (min-width: 768px) {
  .carrera-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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
  gap: 10px;
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
  min-width: 6rem;
}

.insc:hover {
  text-decoration: underline;
}

.vermas {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 2rem;
  min-width: 6rem;
}

.vermas:hover {
  background-color: #dcdcdc;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.materia-row {
  margin: 1rem 0rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem 0.5rem;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.cerrar {
  cursor: pointer;
  margin-top: 1rem;
  padding: 0.5rem 0.6rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 8px;
}

.cerrar:hover {
  background-color: crimson;
}

.detail {
  display: flex;
  flex-direction: row;
  gap: 6px;
}
</style>
