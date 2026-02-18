<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-left">
        <img src="../assets/hero.png" alt="Logo" class="login-logo" />
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

            <button type="submit" :disabled="cargando">
                {{ cargando ? 'Entrando...' : 'Entrar' }}
            </button>

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
}

.login-left {
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
}

.login-logo {
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

button {
  width: 100%;
  padding: 0.7rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background: #369f75;
}
</style>