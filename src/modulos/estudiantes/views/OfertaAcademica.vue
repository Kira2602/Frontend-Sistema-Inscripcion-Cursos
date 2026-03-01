<template>
  <h1>Oferta academica</h1>
  <div class="head"> 
    <div class="search">
      <SearchBar
      @update:search="searchTerm=$event"
      />
    </div>
    <select v-model="ofertaCarrera">
      <option :value="true">Mi carrera</option>
      <option :value="false">Extracurricular</option>
    </select>
  </div>
    
    
    <div class="container" v-if="ofertaCarrera">
      
        <OfertaCard
        v-for="curso in filteredCursos"
        :key="curso.id_materia"
        :curso="curso"
        @view="abrirModal(curso)"
        
        />
    </div>
     <div class="container" v-if="!ofertaCarrera">
      
        <OfertaCard
        v-for="curso in filteredCursosExtra"
        :key="curso.id_materia"
        :curso="curso"
        @view="abrirModal(curso)"
        
        />
    </div>
    <ModalOferta
    v-if="modalAbierto"
    :curso="selectedCurso"
    @close="modalAbierto = false"
    />

  </template>

<script setup>
import OfertaCard from '../components/OfertaCard.vue';
import SearchBar from '../components/SearchBar.vue'
import { ref,computed } from 'vue';
import ModalOferta from '../components/ModalOferta.vue';


const modalAbierto=ref(false)
const searchTerm = ref("");
const selectedCurso = ref(null);
const ofertaCarrera=ref(true)
const abrirModal = (curso) => {
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

const filteredCursosExtra = computed(() => {
  if (!searchTerm.value) return cursosExtracurriculares.value;

  return cursosExtracurriculares.value.filter(
    (curso) =>
      curso.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      curso.id_materia.toString().includes(searchTerm.value),
  );
});


const cursos = ref([
  {
    dia: "LUNES",
    aula: {
      nombre: "Aula 101",
      id_aula: 1
    },
    cupo: 35,
    tipo: "OBLIGATORIA",
    monto: 300,
    nombre: "Arquitectura de Software",
    hora_fin: "10:00:00",
    fecha_fin: "2026-06-30",
    id_materia: "1",
    usuario_ci: "9172358",
    hora_inicio: "08:00:00",
    aula_id_aula: 1,
    fecha_inicio: "2026-03-01",
    carrera_codigo: "ins",
    docente:{
        nombre:"Alvaro Araoz",
        id_usuario:1
    },
    requisitos:[
      {
        id_materia:"sis-101",
        nombre:"ingenieria de software"
      },
      {
        id_materia:"sis-101",
        nombre:"ingenieria de software"
      },
      {
        id_materia:"sis-101",
        nombre:"ingenieria de software"
      },
    ]
  },
  {
    dia: "Martes",
    aula: {
      nombre: "Aula 101",
      id_aula: 1
    },
    cupo: 35,
    tipo: "Obligatorio",
    monto: 100,
    nombre: "Taller de Desarrollo de Software",
    hora_fin: "10:00:00",
    fecha_fin: "2026-06-30",
    id_materia: "SIS-901",
    usuario_ci: "55667788",
    hora_inicio: "08:00:00",
    aula_id_aula: 1,
    fecha_inicio: "2026-03-01",
    carrera_codigo: "ins",
    docente:{
        nombre:"Alvaro Araoz",
        id_usuario:1
    }
  },
  {
    dia: "Miércoles",
    aula: {
      nombre: "Laboratorio 7",
      id_aula: 3
    },
    cupo: 40,
    tipo: "Obligatoria",
    monto: 500,
    nombre: "Programacion I",
    hora_fin: "11:30:00",
    fecha_fin: "2026-07-02",
    id_materia: "SIS-123",
    usuario_ci: "9685245",
    hora_inicio: "09:00:00",
    aula_id_aula: 3,
    fecha_inicio: "2026-02-25",
    carrera_codigo: "ins",
    docente:{
        nombre:"Alvaro Araoz",
        id_usuario:1
    }
  },
  {
    dia: "Martes",
    aula: {
      nombre: "Laboratorio 1",
      id_aula: 4
    },
    cupo: 30,
    tipo: "Obligatoria",
    monto: 300,
    nombre: "Algebra Lineal",
    hora_fin: "12:30:00",
    fecha_fin: "2026-05-25",
    id_materia: "MAT-111",
    usuario_ci: "55667788",
    hora_inicio: "09:00:00",
    aula_id_aula: 4,
    fecha_inicio: "2026-02-25",
    carrera_codigo: "ins",
    docente:{
        nombre:"Alvaro Araoz",
        id_usuario:1
    }
  },
  {
    dia: "Lunes",
    aula: {
      nombre: "Aula 101",
      id_aula: 1
    },
    cupo: 30,
    tipo: "Obligatoria",
    monto: 200,
    nombre: "Introducción a UX/UI",
    hora_fin: "10:00:00",
    fecha_fin: "2026-07-15",
    id_materia: "SIS-111",
    usuario_ci: "1112277",
    hora_inicio: "08:00:00",
    aula_id_aula: 1,
    fecha_inicio: "2026-03-01",
    carrera_codigo: "ins",
    docente:{
        nombre:"Alvaro Araoz",
        id_usuario:1
    }
  },
  {
    dia: "Martes",
    aula: {
      nombre: "Aula 101",
      id_aula: 1
    },
    cupo: 30,
    tipo: "Obligatoria",
    monto: 500,
    nombre: "Diseño UX/IU",
    hora_fin: "10:00:00",
    fecha_fin: "2026-07-15",
    id_materia: "SIS-222",
    usuario_ci: "1112277",
    hora_inicio: "08:00:00",
    aula_id_aula: 1,
    fecha_inicio: "2026-03-01",
    carrera_codigo: "ins",
    docente:{
        nombre:"Alvaro Araoz",
        id_usuario:1
    }
  }
]);

const cursosExtracurriculares = ref([
  {
    dia: "Sábado",
    aula: {
      nombre: "Laboratorio Multimedia",
      id_aula: 5
    },
    cupo: 25,
    tipo: "EXTRACURRICULAR",
    monto: 150,
    nombre: "Fotografía Digital",
    hora_fin: "11:00:00",
    fecha_fin: "2026-04-30",
    id_materia: "EXT-001",
    usuario_ci: "77889911",
    hora_inicio: "09:00:00",
    aula_id_aula: 5,
    fecha_inicio: "2026-03-05",
    carrera_codigo: "general",
    docente: {
      nombre: "María Fernanda Ríos",
      id_usuario: 10
    }
  },
  {
    dia: "Viernes",
    aula: {
      nombre: "Aula 202",
      id_aula: 6
    },
    cupo: 40,
    tipo: "EXTRACURRICULAR",
    monto: 100,
    nombre: "Oratoria y Liderazgo",
    hora_fin: "18:00:00",
    fecha_fin: "2026-05-20",
    id_materia: "EXT-002",
    usuario_ci: "44556677",
    hora_inicio: "16:00:00",
    aula_id_aula: 6,
    fecha_inicio: "2026-03-10",
    carrera_codigo: "general",
    docente: {
      nombre: "Carlos Mendoza",
      id_usuario: 11
    }
  },
  {
    dia: "Miércoles",
    aula: {
      nombre: "Laboratorio 3",
      id_aula: 7
    },
    cupo: 20,
    tipo: "EXTRACURRICULAR",
    monto: 200,
    nombre: "Introducción a Desarrollo de Videojuegos",
    hora_fin: "19:00:00",
    fecha_fin: "2026-06-15",
    id_materia: "EXT-003",
    usuario_ci: "99887766",
    hora_inicio: "17:00:00",
    aula_id_aula: 7,
    fecha_inicio: "2026-03-12",
    carrera_codigo: "general",
    docente: {
      nombre: "Andrés Salvatierra",
      id_usuario: 12
    }
  },
  {
    dia: "Martes",
    aula: {
      nombre: "Aula Creativa",
      id_aula: 8
    },
    cupo: 30,
    tipo: "EXTRACURRICULAR",
    monto: 120,
    nombre: "Marketing Digital",
    hora_fin: "20:00:00",
    fecha_fin: "2026-05-30",
    id_materia: "EXT-004",
    usuario_ci: "22334455",
    hora_inicio: "18:00:00",
    aula_id_aula: 8,
    fecha_inicio: "2026-03-08",
    carrera_codigo: "general",
    docente: {
      nombre: "Lucía Herrera",
      id_usuario: 13
    }
  },
  {
    dia: "Domingo",
    aula: {
      nombre: "Sala de Innovación",
      id_aula: 9
    },
    cupo: 15,
    tipo: "EXTRACURRICULAR",
    monto: 250,
    nombre: "Inteligencia Artificial Aplicada",
    hora_fin: "12:00:00",
    fecha_fin: "2026-07-10",
    id_materia: "EXT-005",
    usuario_ci: "33445566",
    hora_inicio: "09:30:00",
    aula_id_aula: 9,
    fecha_inicio: "2026-03-15",
    carrera_codigo: "general",
    docente: {
      nombre: "Sebastián Quiroga",
      id_usuario: 14
    }
  }
]);
</script>



<style scoped>

.search{
  width: 60%;
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
  border:1px solid #f7ba00;
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
</style>