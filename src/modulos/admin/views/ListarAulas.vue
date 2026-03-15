<template>
  <div class="titles">
    <h1>Registro de Nuevas Aulas</h1>
    <p class="subtitle">Completa el formulario para agregar una nueva aula</p>
  </div>
  <div class="main-card">
    <p>Nombre o Código del Aula:</p>
    <div class="register-container">
      <input type="text" class="new-aula" placeholder="Nombre o código" />
      <button class="registrar">Registrar</button>
    </div>

    <h2>Aulas Registradas:</h2>
    <div class="aulas-cards">
      <div class="single-aula" v-for="aula in mockData" :key="aula.id_aula">
        <Icon iconName="classroom" iconColor="#0095ff" />
        <p>{{ aula.nombre }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from "../../seguridad/components/Icon.vue";

const mockData = [
  {
    id_aula: 1,
    nombre: "AULA-1",
  },
  {
    id_aula: 2,
    nombre: "AULA-2",
  },
  {
    id_aula: 3,
    nombre: "AULA-3",
  },
  {
    id_aula: 4,
    nombre: "AULA-4",
  },
  {
    id_aula: 5,
    nombre: "AULA-5",
  },
  {
    id_aula: 6,
    nombre: "AULA-6",
  },
  {
    id_aula: 7,
    nombre: "AULA-7",
  },
];
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
</style>
