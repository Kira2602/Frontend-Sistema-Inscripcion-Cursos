<template>
  <div class="contenedor">
    <div class="icon-wrapper">
      <Icon
      to="MateriasDocente"
      iconName="arrow_back"
      iconColor="black"
      message="Volver"
    />
    </div>
    <h2>Registro de notas</h2>
    <p class="subtitulo">
      Aquí puedes registrar nuevas notas de los estudiantes
    </p>

    <button class="btn-guardar" @click="guardarNotas" :disabled="!notasCompletas">
      Guardar Notas
    </button>

    <table class="tabla">
      <thead>
        <tr>
          <th>Nombre Completo</th>

          <th v-for="i in cantidadEvaluaciones" :key="i">
            Nota {{ i }}
          </th>

          <th v-if="nuevaEvaluacion">
            Nueva Evaluación
          </th>

          <th>
            <button class="btn-agregar" @click="agregarEvaluacion">
              + Agregar Evaluación
            </button>
          </th>

          <th>Promedio</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="estudiante in estudiantes"
          :key="estudiante.id_estudiante"
        >
          <td class="nombre">{{ estudiante.nombre }}</td>

          <!-- NOTAS ANTIGUAS SOLO VISUAL -->
          <td v-for="i in cantidadEvaluaciones" :key="i">
            {{ estudiante.notas[i-1] ?? "-" }}
          </td>

          <!-- NUEVA NOTA -->
          <td v-if="nuevaEvaluacion">
            <input
              type="number"
              v-model.number="obtenerNuevaNota(estudiante.id_estudiante).nueva_nota"
              @input="calcularEstado(estudiante)"
              class="input-nota"
            />
          </td>

          <td></td>

          <td>
            <span
              class="estado"
              
            >
              {{ calcularPromedio(estudiante) }}
            </span>
          </td>

        </tr>
      </tbody>
    </table>
    <div v-if="mostrarModal" class="modal-overlay">

  <div class="modal">

    <h3>¿Estás seguro de guardar la evaluación?</h3>

    <p class="sub">
      Estas son las notas a registrar
    </p>

    <div class="lista-notas">

      <div
        v-for="nota in nuevasNotas"
        :key="nota.id_estudiante"
        class="item-nota"
      >
        <strong>{{ nota.nombre }}</strong> :
        {{ nota.nueva_nota }}
      </div>

    </div>

    <div class="botones">

      <button
        class="btn-cancelar"
        @click="cancelarGuardado"
      >
        Cancelar
      </button>

      <button
        class="btn-confirmar"
        @click="confirmarGuardado"
      >
        Confirmar
      </button>

    </div>

  </div>

</div>

  </div>
</template>

<script setup>
import { ref,onMounted } from "vue"
import Icon from "../../seguridad/components/Icon.vue"
import { useRoute } from "vue-router"
const mostrarModal = ref(false)

import { computed } from "vue"
import { listarNotasMateria } from "../services/DocenteService";
const route = useRoute()

onMounted(async () => {
  try {

    const id_materia = route.params.id_materia

    const response = await listarNotasMateria(id_materia)

    estudiantes.value = response.data.map(e => ({
      ...e,
      notas: e.notas ?? []
    }))

  } catch (error) {
    console.log("Error al obtener los cursos: ", error);
  }
})

const notasCompletas = computed(() => {

  if(!nuevaEvaluacion.value) return false

  return nuevasNotas.value.every(nota => 
    nota.nueva_nota !== null && nota.nueva_nota !== ""
  )

})
function calcularPromedio(estudiante){

  let notas = [...estudiante.notas]

  const nueva = obtenerNuevaNota(estudiante.id_estudiante)

  if(nueva && nueva.nueva_nota !== null){
    notas.push(Number(nueva.nueva_nota))
  }

  if(notas.length === 0) return "-"

  const suma = notas.reduce((a,b)=>a+Number(b),0)

  const promedio = suma / notas.length

  return Math.round(promedio)

}


const nuevaEvaluacion = ref(false)


const nuevasNotas=ref([])

const estudiantes = ref([
  
])

const cantidadEvaluaciones = computed(() => {
  if (estudiantes.value.length === 0) return 1
  return Math.max(estudiantes.value[0].notas?.length ?? 0, 1)
})

function calcularEstado(estudiante) {

  let notas = [...estudiante.notas]

  if(estudiante.nueva_nota !== null && estudiante.nueva_nota !== undefined){
    notas.push(Number(estudiante.nueva_nota))
  }

  const suma = notas.reduce((a,b)=>a+Number(b),0)

  const promedio = suma / notas.length

  estudiante.estado = promedio >= 51 ? "APROBADO" : "REPROBADO"

}

function agregarEvaluacion() {

  nuevaEvaluacion.value = true

  nuevasNotas.value = estudiantes.value.map(e => ({
    id_estudiante: e.id_estudiante,
    nombre:e.nombre,
    nueva_nota: null
  }))


}
function obtenerNuevaNota(id_estudiante){

  return nuevasNotas.value.find(n => n.id_estudiante === id_estudiante)

}

function guardarNotas() {
  mostrarModal.value = true
}
function confirmarGuardado() {
  const id_materia = route.params.id_materia
  console.log("Notas a enviar:")
  console.log(JSON.stringify(nuevasNotas.value, null, 2))

  const enviar = {
    id_materia,
    notas: [...nuevasNotas.value]
  }

  console.log(JSON.stringify(enviar, null, 2))
  console.log(enviar)
  mostrarModal.value = false

}
function cancelarGuardado(){
  mostrarModal.value = false
}
</script>

<style scoped>

.contenedor{
  padding:30px;
}

.subtitulo{
  color:#777;
}

.btn-guardar{
  background:#f2b705;
  border:none;
  padding:10px 25px;
  border-radius:6px;
  margin:20px 0;
  font-weight:bold;
}

.tabla{
  width:100%;
  border-collapse:collapse;
  border-radius:8px;
  overflow:hidden;
}

.tabla th,
.tabla td{
  border:1px solid #5ca6d4;
  padding:12px;
  text-align:center;
}

.nombre{
  text-align:left;
}

.input-nota{
  width:70px;
  padding:6px;
  border-radius:6px;
  border:1px solid #999;
  text-align:center;
}

.btn-agregar{
  background:#d9edf7;
  border:1px solid #5ca6d4;
  padding:6px 12px;
  border-radius:6px;
  cursor:pointer;
}

.estado{
  padding:6px 14px;
  border-radius:6px;
  font-weight:bold;
}

.aprobado{
  background:#b9f6c5;
  color:green;
}

.reprobado{
  background:#ffc3c3;
  color:red;
}
.modal-overlay{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.4);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:1000;
}

.modal{
  background:white;
  padding:25px;
  border-radius:10px;
  width:400px;
  max-height:500px;
}

.sub{
  color:#666;
  margin-bottom:10px;
}

.lista-notas{
  border:1px solid #ccc;
  padding:10px;
  max-height:200px;
  overflow-y:auto;
  margin-bottom:20px;
}

.item-nota{
  padding:5px 0;
  border-bottom:1px solid #eee;
}

.botones{
  display:flex;
  justify-content:flex-end;
  gap:10px;
}

.btn-cancelar{
  background:#ddd;
  border:none;
  padding:8px 15px;
  border-radius:6px;
}

.btn-confirmar{
  background:#A0DDE0;
  color:white;
  border:none;
  padding:8px 15px;
  border-radius:6px;
}
.icon-wrapper {
  cursor: pointer;
  display: inline-flex;
  padding: 0.5rem 0.6rem;
  border-radius: 50px;
}

.icon-wrapper:hover {
  background-color: #eee;
}
</style>