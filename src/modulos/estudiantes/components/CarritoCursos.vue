

<template>
  <div class="cart-overlay" @click.self="$emit('cerrar')">
    <div class="cart-sidebar">

      <div class="cart-header">
        <h2>Carrito de cursos</h2>
        <Icon icon-name="shopping_cart" icon-color="#fff"/>
        <button class="close" @click="$emit('cerrar')">✖</button>
      </div>

      <div v-if="carrito.cursos.length === 0" class="empty">
        No hay cursos en el carrito
      </div>

      <div v-else class="content">

        <div 
          v-for="curso in carrito.cursos" 
          :key="curso.id_materia"
          class="cart-item"
        >
          <span class="codigo">{{ curso.id_materia }}</span>
          <span class="nombre">{{ curso.nombre }}</span>
          <span class="monto">Bs {{ curso.monto }}</span>
          <button class="delete" @click="eliminar(curso.id_materia)">
            <Icon iconName="trash" icon-color="red"/>
          </button>
        </div>

        
      </div>
      <div class="cart-bottom">
            <div class="total">
            <strong>Total:</strong>
            <span>Bs {{ carrito.total }}</span>
            </div>

            <button class="clear" @click="vaciar">
            Vaciar carrito
            </button>

            <button class="pay" @click="pagar">
            Realizar el pago
            </button>
        </div>

    </div>
  </div>
</template>

<script setup>
import { usarCarrito } from '../../../store/carrito';
import Icon from '../../seguridad/components/Icon.vue';
import { useRouter } from 'vue-router';
const carrito=usarCarrito();
const router=useRouter();
const eliminar = (id_materia) => {
  carrito.eliminarCurso(id_materia);
};

const vaciar = () => {
  carrito.vaciarCarrito();
};

const pagar = () => {
  router.push({name:"pagarCarrito"})
};
</script>
<style scoped>

/* Fondo oscuro */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 999;
}

/* Sidebar */
.cart-sidebar {
  width: 40%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;              /* ocupa todo el espacio disponible */
  overflow-y: auto;     /* solo la lista hace scroll */
  padding: 2%;
}

.cart-bottom {
  padding: 20px;
  background: #fff;
  border-top: 2px solid #1a1a7c;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a7c;
  height: 10%;
  padding: 5%;
  color: #fff;
}


.close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color:#fff;
}



.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e1e8ec;
  padding: 15px;
  margin-bottom: -2px;
  border-top: 2px solid #1a1a7c; 
  border-bottom: 2px solid #1a1a7c;

}

.codigo {
  background: #0b7285;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
}

.delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 20px;

}

.clear {
  margin-top: 10px;
  padding: 10px;
  background: #ccc;
  border: none;
  cursor: pointer;
}

.pay {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  background: #7dbec1;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
}

</style>