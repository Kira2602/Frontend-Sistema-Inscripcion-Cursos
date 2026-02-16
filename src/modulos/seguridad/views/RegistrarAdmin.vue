<template>
  <div>
    <h2>Registros de nuevos Administradores</h2>
    <p>Completa el formulario para agregar un nuevo Administrador</p>

    <div class="form-card">
      <form>
        <div class="grid">
          <div>
            <label>Nombre Completo</label>
            <input type="text" />
          </div>

          <div>
            <label>Dirección</label>
            <input type="text" />
          </div>

          <div>
            <label>Carnet de Identidad</label>
            <input type="text" />
          </div>

          <div>
            <label>Correo electrónico</label>
            <input type="email" />
          </div>

          <div>
            <label>Fecha de Nacimiento</label>
            <input type="date" />
          </div>

          <div>
            <label>Contraseña</label>
            <input type="password" />
          </div>

          <div>
            <label>Número de celular</label>
            <input type="text" />
          </div>

          <div>
            <label>Confirmación de Contraseña</label>
            <input type="password" />
          </div>
        </div>

        <div class="buttons">
          <button type="reset" class="btn-clear">Limpiar</button>
          <button type="submit" class="btn-register">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 10px;
}

p {
  margin-bottom: 30px;
  color: #666;
}

.form-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: 0.2s;
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
  background: #ccc;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
}

.btn-register {
  background: #5fa8a8;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
}
</style>

