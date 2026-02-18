<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-left">
        <img src="/src/assets/logo.png" alt="Logo" class="login-logo" />
      </div>
      <div class="login-right">
        <h2>SixSeven Academy</h2>

        <form @submit.prevent="login">
            <div class="form-group">
                <label>Usuario</label>
                <input v-model="correo" type="email" />
            </div>

            <div class="form-group">
                <label>Contraseña</label>
                <input v-model="password" type="password" />
            </div>
            <div class="form-actions">
              <button type="submit" :disabled="cargando">
                {{ cargando ? 'Ingresando...' : 'Ingresar' }}
            </button>
            </div>
            

            <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import authService from '../servicios/AuthServicio';;
import { useRouter } from 'vue-router';

const router = useRouter();

const correo = ref('');
const password = ref('');
const error = ref('');
const cargando = ref(false);

const login = async () => {
  error.value = '';
  cargando.value = true;

  try {
    const response = await authService.login(correo.value, password.value);

    const { exito, data, mensaje } = response.data;

    if (exito) {
      // Guardamos token
      localStorage.setItem('token', data.token);

      // Redirigir al home/dashboard
      router.push('/');
    } else {
      error.value = mensaje;
    }
  } catch (err) {
    error.value = err.response?.data?.mensaje || 'Error al iniciar sesión';
  } finally {
    cargando.value = false;
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
  margin: 0;
  padding: 5rem;
}

.login-card {
  background: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
}

.login-right {
  flex: 4;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #00597b;
}

.login-left {
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dee7df;
}

.login-logo {
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
}

.login-card h2 {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #9cd7de;
  color: white;
  border-radius: 100px;
  height: 90px;

  margin-bottom: 1.5rem;
  font-size: 3em;
}


.form-group {
  margin-bottom: 1rem;
  color: white;
}

.form-actions {
  display: flex;
  justify-content: center;
}


label {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 1.5rem;
  color: white;
}

input {
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 0;
  background: transparent;
  font-size: 1rem;
  color: white;
}

input:focus {
  outline: none;
  border-color: #dee7df;
}

button {
  width: 50%;
  height: 60px;
  padding: 0.7rem;
  background: #f7ba00;
  color: white;
  border: none;
  border-radius: 100px;
  font-size: 1.5rem;
  cursor: pointer;
}


button:hover {
  background: #a87f02;
}
</style>