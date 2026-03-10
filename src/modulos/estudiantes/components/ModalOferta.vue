<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="helper-container">
        <div class="user-data">
          <h2>{{ curso.nombre }}</h2>
        </div>

        <div class="close-button" @click="$emit('close')">
          ×
        </div>
      </div>

      <form>
        <div class="form-grid">

          <div class="field">
            <label>Código</label>
            <input :value="curso.id_materia" disabled />
          </div>

          <div class="field">
            <label>Docente</label>
            <input :value="curso.docente?.nombre" disabled />
          </div>

          <div class="field">
            <label>Tipo</label>
            <input :value="curso.tipo" disabled />
          </div>

          <div class="field">
            <label>Cupo</label>
            <input :value="curso.cupo" disabled />
          </div>

          <div class="field">
            <label>Inscritos</label>
            <input :value="curso.inscritos" disabled />
          </div>

          <div class="field">
            <label>Día</label>
            <input :value="curso.dia" disabled />
          </div>

          <div
            class="field requisitos"
            v-if="Array.isArray(curso.requisitos) && curso.requisitos.length"
          >
            <label>Requisitos</label>
            <div class="req-container">
              <input 
                v-for="req in curso.requisitos"
                :key="req.id_materia"
                :value="req.nombre"
                disabled
                :class="{
                  'input-error': noCumpleComputed.includes(req.id_materia),
                  'input-success': !noCumpleComputed.includes(req.id_materia)
                }"
              />
            </div>
          </div>

          <div class="field">
            <label>Fecha de inicio</label>
            <input :value="curso.fecha_inicio" disabled />
          </div>

          <div class="field">
            <label>Hora de inicio</label>
            <input :value="curso.hora_inicio" disabled />
          </div>

          <div class="field">
            <label>Fecha fin</label>
            <input :value="curso.fecha_fin" disabled />
          </div>

          <div class="field">
            <label>Hora fin</label>
            <input :value="curso.hora_fin" disabled />
          </div>

          <div class="field monto-field">
            <label>Monto</label>
            <input :value="curso.monto + ' Bs'" disabled />
          </div>

        </div>
      </form>

      <div
        v-if="motivosBloqueoComputed.length > 0"
        class="bloqueos-container"
      >
        <p class="bloqueos-title">No puedes inscribirte por lo siguiente:</p>
        <ul class="bloqueos-list">
          <li v-for="(motivo, index) in motivosBloqueoComputed" :key="index">
            {{ motivo }}
          </li>
        </ul>
      </div>

      <button 
        type="button" 
        class="btn-submit" 
        @click="agregarAlCarrito" 
        :disabled="botonDeshabilitado"
      >
        {{ textoBoton }}
      </button>
    </div>
  </div>

  <ModalError
    :message="mensajeModal"
    :visible="mostrarError"
    @close="mostrarError = false"
  />
  <ModalExito
    :message="mensajeModal"
    :visible="mostrarExito"
    @close="mostrarExito = false"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { usarCarrito } from "../../../store/carrito";
import ModalError from "../../seguridad/components/ModalError.vue";
import ModalExito from "../../seguridad/components/ModalExito.vue";

const carrito = usarCarrito();
const mensajeModal = ref("");
const mostrarExito = ref(false);
const mostrarError = ref(false);

const props = defineProps({ 
  curso: { type: Object, required: true },
  noCumple: { type: Array, required: true },
  motivosBloqueo: { type: Array, default: () => [] },
  puedeInscribirse: { type: Boolean, default: true }
});

const emit = defineEmits(["close", "save"]);

const noCumpleComputed = computed(() => {
  return Array.isArray(props.noCumple) ? props.noCumple : [];
});

const motivosBloqueoComputed = computed(() => {
  return Array.isArray(props.motivosBloqueo) ? props.motivosBloqueo : [];
});

const yaEnCarrito = computed(() => {
  return carrito.cursos.some(
    c => c.id_materia === props.curso.id_materia
  );
});

const tieneRequisitosIncumplidos = computed(() => {
  return noCumpleComputed.value.length > 0;
});

const tieneBloqueos = computed(() => {
  return motivosBloqueoComputed.value.length > 0 || props.puedeInscribirse === false;
});

const botonDeshabilitado = computed(() => {
  return yaEnCarrito.value || tieneRequisitosIncumplidos.value || tieneBloqueos.value;
});

const textoBoton = computed(() => {
  if (yaEnCarrito.value) return "Ya agregado";
  if (tieneBloqueos.value) return "No disponible";
  if (tieneRequisitosIncumplidos.value) return "No se cumplen los requisitos";
  return "Agregar al carrito";
});

const agregarAlCarrito = () => {
  if (tieneBloqueos.value) {
    mensajeModal.value = motivosBloqueoComputed.value.length > 0
      ? motivosBloqueoComputed.value.join(" | ")
      : "No puedes inscribirte en esta materia";
    mostrarError.value = true;
    return;
  }

  if (tieneRequisitosIncumplidos.value) {
    mensajeModal.value = "No puedes agregar este curso porque no cumple los requisitos";
    mostrarError.value = true;
    return;
  }

  const resultado = carrito.agregarCurso(props.curso);

  mensajeModal.value = resultado.mensaje;

  if (resultado.exito) {
    mostrarExito.value = true;

    setTimeout(() => {
      emit("close");
    }, 3000);
  } else {
    mostrarError.value = true;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #f2f2f2;
  padding: 2rem 3rem;
  border-radius: 10px;
  width: 85%;
  max-width: 1100px;
}

.helper-container {
  display: flex;
  flex-direction: row;
  margin: 0px 0px 20px 0px;
}

.user-data {
  flex: 9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.icon-data {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
  color: #000;
  font-weight: 300;
  line-height: 1;
  transition: color 0.2s;
}

.close-button:hover {
  color: #666;
}

.subtitle {
  color: #666;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px 35px;
}

label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
}

input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  background: #fff;
  font-size: 14px;
}

input:focus {
  border-color: #5fa8a8;
  outline: none;
}

.buttons {
  margin-top: 40px;
  display: flex;
  justify-content: center;
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

.btn-submit {
  cursor: pointer;
  background: #5fa8a8;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
  margin-top: 24px;
}

.btn-submit:disabled {
  background: #405656;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}

.error {
  color: rgb(255, 128, 128);
  font-size: 13px;
  margin-top: 4px;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 40px;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
}

.toggle-btn:hover {
  color: #5fa8a8;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: 0.2s;
}

select:focus {
  border-color: #5fa8a8;
  outline: none;
}

.field {
  display: flex;
  flex-direction: column;
}

.requisitos {
  grid-column: span 3;
}

.req-container {
  display: flex;
  gap: 15px;
}

.monto-field {
  grid-column: 4;
  margin-top: 10px;
}

.input-error {
  background-color: rgb(255, 173, 173);
}

.input-success {
  background-color: rgb(178, 255, 178);
}

.bloqueos-container {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #ffe3e3;
  border: 1px solid #f0a7a7;
}

.bloqueos-title {
  margin: 0 0 8px 0;
  font-weight: 700;
  color: #8a1f1f;
}

.bloqueos-list {
  margin: 0;
  padding-left: 20px;
  color: #7a2323;
}
</style>