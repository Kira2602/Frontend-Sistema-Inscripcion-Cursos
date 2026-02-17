<template>
  <div class="icon-wrapper">
    <Icon
      to="listarDocentes"
      iconName="arrow_back"
      iconColor="black"
      message="Volver"
    />
  </div>

  <h2>Registrar Docentes</h2>
  <p class="subtitle">Completa el formulario para agregar un nuevo docente</p>

  <div class="form-card">
    <form @submit="manejarEnvio">
      <div class="grid">
        <div>
          <label>Carnet de Identidad</label>
          <input type="text" v-model="form.ci" />
        </div>

        <div>
          <label>Nombre Completo</label>
          <input type="text" v-model="form.nombre" />
        </div>

        <div>
          <label>Dirección</label>
          <input type="text" v-model="form.direccion" />
        </div>

        <div>
          <label>Teléfono</label>
          <input type="text" v-model="form.telefono" />
        </div>

        <div>
          <label>Fecha de Nacimiento</label>
          <input type="date" v-model="form.fechaNac" />
        </div>

        <div>
          <label>Correo Electrónico</label>
          <input type="email" v-model="form.correo" />
        </div>

        <div>
          <label>Experiencia</label>
          <input type="text" v-model="form.experiencia" />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" v-model="form.contrasenia" />
        </div>

        <div>
          <label>Confirmación de Contraseña</label>
          <input type="password" v-model="form.confirmarContrasenia" />
        </div>
      </div>

      <div class="buttons">
        <button type="reset" class="btn-clear">Limpiar</button>
        <button
          type="submit"
          class="btn-register"
          :disabled="!formularioValido"
        >
          Registrar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import Icon from "../components/Icon.vue";
import { ref, computed } from "vue";

const form = ref({
  ci: "",
  nombre: "",
  direccion: "",
  telefono: "",
  fechaNac: "",
  correo: "",
  experiencia: "",
  contrasenia: "",
  confirmarContrasenia: "",
});

const formularioValido = computed(() => {
  return (
    form.value.ci &&
    form.value.nombre &&
    form.value.direccion &&
    form.value.telefono &&
    form.value.fechaNac &&
    form.value.correo &&
    form.value.experiencia &&
    form.value.contrasenia &&
    form.value.confirmarContrasenia &&
    form.value.contrasenia === form.value.confirmarContrasenia
  );
});

const manejarEnvio = () => {
  alert(`
  CI:${form.value.ci}
  Nombre:${form.value.nombre}
  Direccion:${form.value.direccion}
  telefono:${form.value.telefono}
  fecha de naciemiento:${form.value.fechaNac}
  correo:${form.value.correo}
  experiencia:${form.value.experiencia}
  contraseña:${form.value.contrasenia}
  confirmacion:${form.value.confirmarContrasenia}
  `);

  Object.key(form.value).forEach((campo) => (form.value[campo] = ""));
};
</script>

<style scoped>
.icon-wrapper {
  cursor: pointer;
  display: inline-flex;
  padding: 0.5rem 0.6rem;
  border-radius: 50px;
}

.icon-wrapper:hover {
  background-color: #eee;
}

h2 {
  margin-bottom: 10px;
}

p {
  margin-bottom: 30px;
  color: #666;
}

.form-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: 0.2s;
}

input:focus {
  border-color: #5fa8a8;
  outline: none;
}

.buttons {
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.btn-clear {
  cursor: pointer;
  background: #ccc;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
}

.btn-clear:hover {
  background-color: #aaa;
}

.btn-register {
  cursor: pointer;
  background: #5fa8a8;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}

.btn-register:disabled {
  background: #405656;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}
</style>
