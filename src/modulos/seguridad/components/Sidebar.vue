<template>
  <aside class="sidebar">
    <div class="logo">
      <h3>Panel Admin</h3>
    </div>

    <nav class="menu">
      <router-link to="registrarEstudiantes">Estudiantes</router-link>
      <router-link to="registrarDocentes">Docentes</router-link>
      <router-link to="registrarAdmin">Administradores</router-link>
    </nav>
    <button class="logout">Cerrar Sesión</button>
  </aside>
</template>


<style scoped>
.sidebar {
  width: 260px;
  min-width: 260px; /* importante */
  height: 100%;
  background: #7fb6b6;
  display: flex;
  flex-direction: column;
  padding: 25px 20px;
}

.logo {
  margin-bottom: 40px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
}

.menu a {
  text-decoration: none;
  padding: 12px;
  border-radius: 25px;
  background: #a7d3d3;
  color: #003b4f;
  font-weight: 500;
}

.menu a.router-link-active {
  background: #003b4f;
  color: white;
}

.logout {
  padding: 12px;
  border-radius: 25px;
  border: none;
  background: #003b4f;
  color: white;
  cursor: pointer;
}
</style>
