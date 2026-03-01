<template>
  <div class="card-container">
    <div class="header">
      <h2 class="title">{{ curso.nombre }}</h2>
      <p class="codigo">ID: {{ curso.id_materia }}</p>
      <p class="docente"><strong>Docente:</strong> {{ curso.docente.nombre }}</p>
    </div>

    <div class="content">
      <div class="info-grid">
        <div class="box">
          <p>Cupo</p>
          <div class="pill">{{ curso.cupo }}</div>
        </div>

        <div class="box">
          <p>Monto</p>
          <div class="pill">{{ curso.monto }} Bs</div>
        </div>
      </div>

      <div class="schedule-section">
        <div class="pill dia">{{ curso.dia }}</div>
        <div class="horarios">
          <span class="pill small">{{ curso.hora_inicio }}</span>
          <span class="pill small">{{ curso.hora_fin }}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="btn" @click="$emit('view')">Ver más</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  curso: { type: Object, required: true }
})
defineEmits(["view"])
</script>

<style scoped>
.card-container {
  /* Cambio clave: Usar max-width en lugar de width fijo en vh */
  width: 100%;
  max-width: 350px; 
  min-width: 280px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #5aa6d6;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  box-sizing: border-box; /* Asegura que el padding no rompa el ancho */
}

.title {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.2;
  color: #333;
}

.codigo {
  margin: 5px 0 0;
  font-size: 0.85rem;
  color: #666;
}

.docente {
  margin: 5px 0 10px;
  font-size: 0.9rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-grid {
  display: flex;
  justify-content: bween;
  gap: 10px;
}

.box {
  flex: 1; /* Hace que ambas cajas crezcan por igual */
}

.box p {
  margin: 0 0 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #777;
  text-align: center;
}

.pill {
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 6px 12px;
  text-align: center;
  font-size: 0.9rem;
}

.schedule-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Permite que baje si no hay espacio */
  gap: 20px;
}

.horarios {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.small {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: #e1f5fe;
  border-color: #b3e5fc;
}

.footer {
  margin-top: auto; /* Empuja el botón al fondo si la card crece */
  display: flex;
  justify-content: center;
}

.btn {
  width: 60%; /* Botón más fácil de tocar en móviles */
  background: #0c5c75;
  color: white;
  border: none;
  border-radius: 100px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #08485c;
}

/* Ajustes para pantallas muy pequeñas */
@media (max-width: 320px) {
  .schedule-section {
    flex-direction: column;
    align-items: stretch;
  }
  .horarios {
    justify-content: center;
  }
}
</style>