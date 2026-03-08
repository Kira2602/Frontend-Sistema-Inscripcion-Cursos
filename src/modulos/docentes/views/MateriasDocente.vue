<template>
  <div class="wrapper">
    <h1>Mis materias</h1>
    <div class="head"> 
        <div class="search">
        <SearchBar
        @update:search="searchTerm=$event"
        />
        </div>
        
    </div>
        
        
    <div class="container" >
        <CardMateria
        v-for="curso in filteredCursos"
        :key="curso.id_materia"
        :curso="curso"
        @view="abrirModal(curso)"
        />
    </div>
    <ModalMateria 
        v-if="modalAbierto"
      :curso="selectedCurso"
      @close="modalAbierto = false"
    />
    
    
    </div>
  </template>

<script setup>
import SearchBar from '../components/SearchBar.vue'
import { ref,computed,onMounted } from 'vue';


import CardMateria from '../components/CardMateria.vue';
import ModalMateria from '../components/ModalMateria.vue';


const modalAbierto=ref(false)
const searchTerm = ref("");
const selectedCurso = ref(null);
const ofertaCarrera=ref(true)
const cumpleMateria=ref(Boolean)
const noCumplen=[]
const abrirModal = async(curso) => {
  
  selectedCurso.value = { ...curso };
  modalAbierto.value = true;
};

const filteredCursos = computed(() => {
  if (!searchTerm.value) return cursos.value;

  return cursos.value.filter(
    (curso) =>
      curso.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      curso.id_materia.toString().includes(searchTerm.value),
  );
});


const abrirNotas=()=>{
    router.push({name:"NotasMateria"})
}

onMounted(async () => {
  /*try {
    
    const response = await listarMisMaterias();

const inscripciones = response.data.data;

// 🔥 Aplanamos las materias
cursos.value = inscripciones.flatMap(inscripcion =>
  inscripcion.materias.map(m => ({
    ...m.materia,           // datos reales de la materia
    estado: m.estado,       // estado INSCRITO o PENDIENTE_PAGO
    id_inscripcion: inscripcion.id_inscripcion,
    fecha_inscripcion: inscripcion.fecha_inscripcion
  }))
);

  } catch (error) {
    console.log("Error al obtener los cursos: ", error);
  }*/
});

const cursos = ref([
    {
        "dia": "Martes",
        "aula": {
            "id_aula": 4,
            "nombre": "Laboratorio 1"
        },
        "cupo": 30,
        "inscritos": 1,
        "tipo": "Obligatoria",
        "nombre": "Algebra Lineal",
        "hora_fin": "12:30:00",
        "fecha_fin": "2026-05-25",
        "id_materia": "MAT-111",
        "hora_inicio": "09:00:00",
        "aula_id_aula": 4,
        "fecha_inicio": "2026-02-25",
        "carrera_codigo": "ins",
    },
    {
        "dia": "Miércoles",
        "aula": {
            "id_aula": 2,
            "nombre": "Aula 202"
        },
        "cupo": 35,
        "inscritos": 0,
        "tipo": "Obligatoria",
        "nombre": "Estructuras de Datos",
        "hora_fin": "10:30:00",
        "fecha_fin": "2026-05-25",
        "id_materia": "SIS-201",
        "hora_inicio": "08:00:00",
        "aula_id_aula": 2,
        "fecha_inicio": "2026-02-25",
        "carrera_codigo": "ins"
    },
    {
        "dia": "Jueves",
        "aula": {
            "id_aula": 5,
            "nombre": "Laboratorio 2"
        },
        "cupo": 25,
        "inscritos": 3,
        "tipo": "Obligatoria",
        "nombre": "Base de Datos I",
        "hora_fin": "15:30:00",
        "fecha_fin": "2026-05-25",
        "id_materia": "SIS-230",
        "hora_inicio": "13:00:00",
        "aula_id_aula": 5,
        "fecha_inicio": "2026-02-25",
        "carrera_codigo": "ins"
    },
    {
        "dia": "Viernes",
        "aula": {
            "id_aula": 1,
            "nombre": "Aula Magna"
        },
        "cupo": 40,
        "inscritos": 5,
        "tipo": "Obligatoria",
        "nombre": "Arquitectura de Computadoras",
        "hora_fin": "18:00:00",
        "fecha_fin": "2026-05-25",
        "id_materia": "SIS-250",
        "hora_inicio": "16:00:00",
        "aula_id_aula": 1,
        "fecha_inicio": "2026-02-25",
        "carrera_codigo": "ins"
    }
]);

</script>



<style scoped>
.wrapper{
  padding: 40px;
}
.search{
  width: 100%;
}
.head{
  display: flex;
  flex-direction: row;
  gap: 5%;
  background-color: #fff;
  height: 10%;
  align-items: center;
  padding: 2%;
  border-radius: 10px;
  
 
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}
select {

  width: 30%;
  padding: 10px 12px;
  border-radius: 8px;
  border:2px solid #f7ba00;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none; /* Quita estilo nativo */
}

/* Flecha personalizada */
select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='%235fa8a8' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
}

select:hover {
  border-color: #5fa8a8;
}

select:focus {
  border-color: #5fa8a8;
  box-shadow: 0 0 0 2px rgba(95, 168, 168, 0.2);
  outline: none;
}
option {
  font-size: 14px;
  background-color: #fff;
  color: #333;
}
.cart-button {
  position: relative;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #f7ba00;
  color: black;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 50%;
}
</style>