<template>
  <div v-if="icons[iconName]" v-html="icons[iconName]" :style="{ color: iconColor }"></div>
  <div v-else>No Icon</div>
</template>

<script setup>
import { icons } from "../../../icons/lib.js";

defineProps({
  iconName: { type: String, required: true },
  iconColor: { type: String, default: "black" },
});
</script>
