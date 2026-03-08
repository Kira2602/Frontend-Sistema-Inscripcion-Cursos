<template>
  <div class="contenedor">

    <h2>Registro de notas</h2>
    <p class="subtitulo">
      Aquí puedes registrar y modificar las notas de los estudiantes
    </p>

    <button class="btn-guardar" @click="guardarNotas">
      Guardar Notas
    </button>

    <table class="tabla">
      <thead>
        <tr>
          <th>Nombre Completo</th>

          <th v-for="(evaluacion, i) in evaluaciones" :key="evaluacion.id_evaluacion">
            {{ evaluacion.nombre }}
          </th>

          <th>
            <button class="btn-agregar" @click="agregarEvaluacion">
              + Agregar Evaluación
            </button>
          </th>

          <th>Estado</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(estudiante, i) in estudiantes" :key="estudiante.id_estudiante">
          <td class="nombre">{{ estudiante.nombre }}</td>

          <td v-for="(nota, j) in estudiante.notas" :key="j">
            <input
              type="number"
              v-model.number="estudiante.notas[j]"
              @input="calcularEstado(estudiante)"
              class="input-nota"
            />
          </td>

          <td></td>

          <td>
            <span
              class="estado"
              :class="{
                aprobado: estudiante.estado === 'APROBADO',
                reprobado: estudiante.estado === 'REPROBADO'
              }"
            >
              {{ estudiante.estado }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref } from "vue"

const evaluaciones = ref([
  { id_evaluacion: 1, nombre: "Nota 1" },
  { id_evaluacion: 2, nombre: "Nota 2" },
  { id_evaluacion: 3, nombre: "Nota 3" }
])

const estudiantes = ref([
  {
    id_estudiante: 1,
    nombre: "Juan Pérez",
    notas: [70, 70, 80],
    estado: "APROBADO"
  },
  {
    id_estudiante: 2,
    nombre: "Ana Flores",
    notas: [70, 70, 40],
    estado: "REPROBADO"
  },
  {
    id_estudiante: 3,
    nombre: "Carlos Rojas",
    notas: [70, 70, 80],
    estado: "APROBADO"
  },
  {
    id_estudiante: 4,
    nombre: "María López",
    notas: [70, 70, 40],
    estado: "REPROBADO"
  }
])

function calcularEstado(estudiante) {

  const suma = estudiante.notas.reduce((a, b) => a + Number(b), 0)

  const promedio = suma / estudiante.notas.length

  estudiante.estado = promedio >= 51 ? "APROBADO" : "REPROBADO"

}

function agregarEvaluacion() {

  const numero = evaluaciones.value.length + 1

  evaluaciones.value.push({
    id_evaluacion: numero,
    nombre: `Nota ${numero}`
  })

  estudiantes.value.forEach(e => {
    e.notas.push(0)
  })

}

function guardarNotas() {

  const datosEnviar = estudiantes.value.map(estudiante => ({
    estudiante_id: estudiante.id_estudiante,
    evaluaciones: estudiante.notas.map((nota, index) => ({
      evaluacion_id: evaluaciones.value[index].id_evaluacion,
      nota: nota
    }))
  }))

  console.log("Datos que se enviarán al endpoint:")
  console.log(JSON.stringify(datosEnviar, null, 2))

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

</style>