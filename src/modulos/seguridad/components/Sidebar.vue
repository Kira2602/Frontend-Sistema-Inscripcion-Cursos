<template>
  <aside class="sidebar-container">
    <div class="sidebar-accent"></div>

    <div class="sidebar-content">
      <div class="profile-section">
        <div class="profile-img">
          <img src="/src/assets/logo.png" alt="Logo" />
        </div>
        <div class="profile-info">
          <div class="titulo">SixSeven</div>
          <div class="titulo">Academy</div>
        </div>
      </div>

      <nav class="menu">
        <router-link :to="{name:'listarEstudiantes'}" class="menu-item">
          Estudiantes
        </router-link>
        <router-link :to="{name:'listarDocentes'}" class="menu-item">
          Docentes
        </router-link>
        <router-link :to="{name:'listarAdministradores'}" class="menu-item">
          Administradores
        </router-link>
        
      </nav>

      <button class="logout-btn" @click="logout">Cerrar Sesión</button>
    </div>
  </aside>
</template>

<style scoped>
/* Contenedor principal con la franja lateral */
.sidebar-container {
  display: flex;
  width: 280px;
  height: 100vh;
  background-color: #A0DDE0; /* Turquesa claro del fondo */
}

/* La franja azul petróleo oscuro a la izquierda */
.sidebar-accent {
  width: 45px;
  background-color: #004D66;
  height: 100%;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  align-items: center;
}

/* Sección de perfil superior */
.profile-section {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-bottom: 50px;
}

.profile-img {
  width: 80px;
  height: 80px;
  background-color: #D9D9D9; /* Cuadrado gris del mockup */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.profile-img img {
  width: 90%;
  object-fit: contain;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.info-line-short { width: 60%; height: 8px; background: #B3B3B3; }
.info-line-long { width: 90%; height: 8px; background: #B3B3B3; }

/* Menú y Enlaces */
.menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  flex-grow: 1;
}

.menu-item, .menu-item-placeholder {
  text-decoration: none;
  padding: 15px;
  border-radius: 30px; /* Bordes muy redondeados como el mockup */
  background: #7FB6BD; /* Color azulado claro de los botones inactivos */
  color: #002B3D;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.menu-item-placeholder {
  height: 50px;
  opacity: 0.6;
}

/* Estado Activo (Igual al botón "Docentes" del mockup) */
.menu-item.router-link-active {
  background-color: #000066; /* Azul muy oscuro/negro del mockup */
  color: white;
}

/* Botón Cerrar Sesión inferior */
.logout-btn {
  width: 90%;
  padding: 15px;
  border-radius: 30px;
  border: none;
  background-color: #003355; /* Azul petróleo oscuro */
  color: white;
  font-weight:bolder;
  cursor: pointer;
  margin-top: auto; /* Lo empuja al fondo */
}

.logout-btn:hover {
  background-color: #002233;
}
.titulo{
  font-size: 3.5vh;
  font-weight: bold;
  color: #004D66;
}
</style>