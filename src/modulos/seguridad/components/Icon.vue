<template>
  <div v-if="icons[iconName]">
    <router-link :to="to">
      <div v-html="icons[iconName]" :style="{ color: iconColor }"></div>
    </router-link>
  </div>
  <div v-else>No Icon</div>
</template>

<script setup>
import { icons } from "../../../icons/lib.js";

defineProps({
  to: {
    type: String,
    required: false,
  },
  iconName: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: "black",
  },
});
</script>
