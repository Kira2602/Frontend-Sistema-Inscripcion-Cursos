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

          <!-- FILA 1 -->
          <div class="field">
            <label>Código</label>
            <input :value="curso.id_materia" disabled />
          </div>

          <div class="field">
            <label>Docente</label>
            <input :value="curso.docente?.nombre || 'Sin docente'" disabled />
          </div>

          <div class="field">
            <label>Tipo</label>
            <input :value="curso.tipo || 'N/A'" disabled />
          </div>

          <div class="field">
            <label>Cupo</label>
            <input :value="curso.cupo ?? 'N/A'" disabled />
          </div>

          <!-- FILA 2 -->
          <div class="field">
            <label>Día</label>
            <input :value="curso.dia || 'N/A'" disabled />
          </div>

          <!-- FILA 3 -->
          <div class="field">
            <label>Fecha de inicio</label>
            <input :value="formatearFecha(curso.fecha_inicio)" disabled />
          </div>

          <div class="field">
            <label>Hora de inicio</label>
            <input :value="curso.hora_inicio || 'N/A'" disabled />
          </div>

          <div class="field">
            <label>Fecha fin</label>
            <input :value="formatearFecha(curso.fecha_fin)" disabled />
          </div>

          <div class="field">
            <label>Hora fin</label>
            <input :value="curso.hora_fin || 'N/A'" disabled />
          </div>

          <div
            v-if="normalizarEstado(curso.estado) === 'RETIRADO'"
            class="field"
          >
            <label>Fecha retiro</label>
            <input :value="formatearFecha(curso.fecha_retiro)" disabled />
          </div>

          <!-- MONTO -->
          <div class="field monto-field">
            <label>Monto</label>
            <input :value="curso.monto != null ? `${curso.monto} Bs` : 'N/A'" disabled />
          </div>

        </div>
      </form>

      <div class="buttons">
        <button
          v-if="normalizarEstado(curso.estado) !== 'RETIRADO'"
          type="button"
          class="btn-retirar"
          @click="$emit('retirar', curso)"
        >
          Retirar Materia
        </button>

        <button
          v-else
          type="button"
          class="btn-retirada"
          disabled
        >
          Materia retirada
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { usarCarrito } from "../../../store/carrito";
import ModalError from "../../seguridad/components/ModalError.vue";
import ModalExito from "../../seguridad/components/ModalExito.vue";

const props = defineProps({
  curso: { type: Object, required: true },
  noCumple: { type: Array, required: true }
});

const emit = defineEmits(["close", "retirar"]);

const noCumpleComputed = computed(() => {
  return Array.isArray(props.noCumple) ? props.noCumple : [];
});

const form = ref({
  nombre: "",
  cupo: "",
  dia: "",
  monto: ""
});

const formatearFecha = (fecha) => {
  if (!fecha) return "N/A";
  return fecha;
};

const normalizarEstado = (estado) => {
  if (!estado) return "";
  return String(estado).toUpperCase().trim();
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

.btn-submit {
  cursor: pointer;
  background: #5fa8a8;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}

.btn-submit:disabled {
  background: #405656;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}

.btn-retirar {
  cursor: pointer;
  background: #e88787;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
}

.btn-retirar:hover {
  background-color: #d96d6d;
}

.btn-retirada {
  cursor: not-allowed;
  background: #8e8e8e;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
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
</style>