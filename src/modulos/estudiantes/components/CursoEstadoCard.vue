<template>
    <div class="card-container">
        <div class="header">
        <h2 class="title">{{ curso.nombre }}</h2>
        <p class="codigo">Código materia</p>
        <p class="codigo-value">{{ curso.id_materia }}</p>
        <p class="docente">Docente</p>
        <p class="docente-value">{{ curso.docente?.nombre }}</p>
        </div>

        <div class="content">
        <div class="schedule-section">
            <div class="pill dia">{{ curso.dia }}</div>
            <div class="horarios">
            <span class="pill small">{{ curso.hora_inicio }}</span>
            <span class="pill small">{{ curso.hora_fin }}</span>
            </div>
        </div>

        <span class="estado-pill" :class="estadoClass">
            {{ estadoLabel }}
        </span>

        <p
            v-if="(normalizarEstado(curso.estado_academico) === 'APROBADO' || normalizarEstado(curso.estado_academico) === 'REPROBADO') && curso.fecha_culminacion"
            class="fecha"
        >
            Fecha de culminación: {{ curso.fecha_culminacion }}
        </p>
        </div>

        <div class="footer">
        <button class="btn" @click="$emit('view')">Ver más</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    curso: { type: Object, required: true }
})

defineEmits(['view'])

const normalizarEstado = (estado) => {
    if (!estado) return ""
    return estado.toUpperCase().trim()
}

const estadoLabel = computed(() => {
    const estado = normalizarEstado(props.curso.estado_academico)
    if (estado === 'ACTIVO') return 'Activo'
    if (estado === 'APROBADO') return 'Aprobado'
    if (estado === 'REPROBADO') return 'Reprobado'
    return props.curso.estado_academico
})

const estadoClass = computed(() => {
    const estado = normalizarEstado(props.curso.estado_academico)
    if (estado === 'ACTIVO') return 'estado-activo'
    if (estado === 'APROBADO') return 'estado-aprobado'
    if (estado === 'REPROBADO') return 'estado-reprobado'
    return ''
})
</script>

<style scoped>
.card-container {
    width: 100%;
    max-width: 350px;
    min-width: 280px;
    background-color: #fff;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    box-sizing: border-box;
    border: 1px solid #8ed2eb;
}

.title { margin: 0; font-size: 1.2rem; color: #333; }
.codigo, .docente { margin: 5px 0 0; font-size: 0.85rem; color: #777; }
.codigo-value, .docente-value { margin: 0; font-size: 0.9rem; color: #444; }

.content {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.schedule-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.pill {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 6px 12px;
    text-align: center;
    font-size: 0.9rem;
}

.horarios {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.small {
    font-size: 0.75rem;
    padding: 4px 10px;
}

.estado-pill {
    border-radius: 20px;
    padding: 8px 12px;
    text-align: center;
    font-weight: 700;
}

.estado-activo {
    background: #99d9df;
    color: #163b40;
}

.estado-aprobado {
    background: #a9d86b;
    color: #29440c;
    }

.estado-reprobado {
    background: #ea7272;
    color: #4f0f0f;
    }

.fecha {
    margin: 0;
    font-size: 0.8rem;
    color: #8a8a8a;
    }

.footer {
    display: flex;
    justify-content: center;
}

.btn {
    width: 60%;
    background: #0c5c75;
    color: white;
    border: none;
    border-radius: 100px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    }
</style>