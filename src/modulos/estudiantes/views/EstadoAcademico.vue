<template>
    <div class="wrapper">
        <div class="title-row">
        <h1>Estado académico de mis materias</h1>

        <button class="volver-btn" @click="volver">
            Volver
        </button>
        </div>

        <div class="head">
        <div class="search">
            <SearchBar @update:search="searchTerm = $event" />
        </div>

        <div class="filter-container">
            <select v-model="estadoFiltro">
            <option value="">Filtrar por estado</option>
            <option value="ACTIVO">Activo</option>
            <option value="APROBADO">Aprobado</option>
            <option value="REPROBADO">Reprobado</option>
            </select>
        </div>

        <button class="archivadas-btn" @click="abrirArchivadas">
            <i class="fa-solid fa-box-archive"></i>
            Materias archivadas
        </button>
        </div>

        <div class="container">
        <CursoEstadoCard
            v-for="curso in filteredActivas"
            :key="curso.id_materia + '-' + (curso.id_inscripcion || '')"
            :curso="curso"
            @view="abrirModal(curso)"
        />
        </div>

        <ModalCurso
        v-if="modalAbierto"
        :curso="selectedCurso"
        :noCumple="[]"
        @close="modalAbierto = false"
        />

        <ModalMateriasCulminadas
        v-if="modalArchivadas"
        :materias="filteredArchivadas"
        @close="modalArchivadas = false"
        @view="abrirModalDesdeArchivadas"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import ModalCurso from '../components/ModalCurso.vue'
import CursoEstadoCard from '../components/CursoEstadoCard.vue'
import ModalMateriasCulminadas from '../components/ModalMateriasCulminadas.vue'
import { listarMisMaterias } from '../services/estudianteService'

const router = useRouter()

const searchTerm = ref("")
const estadoFiltro = ref("")
const materias = ref([])
const modalAbierto = ref(false)
const modalArchivadas = ref(false)
const selectedCurso = ref(null)

const normalizarEstadoAcademico = (estado) => {
    if (!estado) return ""
    return estado.toUpperCase().trim()
}

const abrirModal = (curso) => {
    selectedCurso.value = { ...curso }
    modalAbierto.value = true
}

const abrirModalDesdeArchivadas = (curso) => {
    selectedCurso.value = { ...curso }
    modalArchivadas.value = false
    modalAbierto.value = true
}

const abrirArchivadas = () => {
    modalArchivadas.value = true
}

const volver = () => {
    router.back()
}

const filteredActivas = computed(() => {
    let resultado = materias.value.filter(
        (curso) => normalizarEstadoAcademico(curso.estado_academico) === 'ACTIVO'
    )

    if (searchTerm.value) {
        resultado = resultado.filter(
        (curso) =>
            curso.nombre?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            curso.id_materia?.toString().includes(searchTerm.value)
        )
    }

    if (estadoFiltro.value) {
        resultado = resultado.filter(
        (curso) =>
            normalizarEstadoAcademico(curso.estado_academico) === normalizarEstadoAcademico(estadoFiltro.value)
        )
    }

    return resultado
})

const filteredArchivadas = computed(() => {
    let resultado = materias.value.filter((curso) => {
        const estado = normalizarEstadoAcademico(curso.estado_academico)
        return estado === 'APROBADO' || estado === 'REPROBADO'
    })

    if (searchTerm.value) {
        resultado = resultado.filter(
        (curso) =>
            curso.nombre?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            curso.id_materia?.toString().includes(searchTerm.value)
        )
    }

    if (estadoFiltro.value) {
        const filtro = normalizarEstadoAcademico(estadoFiltro.value)
        resultado = resultado.filter(
        (curso) => normalizarEstadoAcademico(curso.estado_academico) === filtro
        )
    }

    return resultado
})

onMounted(async () => {
    try {
        const response = await listarMisMaterias()
        const inscripciones = response.data.data

        materias.value = inscripciones.flatMap(inscripcion =>
        inscripcion.materias.map(m => ({
            ...m.materia,
            estado: m.estado,
            estado_academico: m.estado_academico,
            id_inscripcion: inscripcion.id_inscripcion,
            fecha_inscripcion: inscripcion.fecha_inscripcion,
            fecha_retiro: m.fecha_retiro || null,
            fecha_culminacion: m.fecha_culminacion || null
        }))
        )
    } catch (error) {
        console.log("Error al obtener estado académico:", error)
    }
})
</script>

<style scoped>
.wrapper {
    padding: 40px;
}

.title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
}

.volver-btn {
    border: none;
    background: #6fb3cf;
    color: #fff;
    border-radius: 999px;
    padding: 10px 20px;
    font-weight: 600;
    cursor: pointer;
}

.head {
    display: flex;
    gap: 20px;
    background: #fff;
    padding: 16px;
    border-radius: 12px;
    align-items: center;
}

.search {
    width: 55%;
}

.filter-container {
    width: 25%;
}

.archivadas-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    border-radius: 10px;
    padding: 10px 14px;
    background: #59b3c8;
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
}

.archivadas-btn:hover {
    background: #4aa2b6;
}

.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    margin-top: 30px;
}

select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: #fff;
}
</style>