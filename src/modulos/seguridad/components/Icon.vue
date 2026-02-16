<template>
  <div v-if="icons[iconName]">
    <div v-html="icons[iconName]" :style="{ color: iconColor }"></div>
  </div>
  <div v-else>No Icon</div>
</template>

<script setup>
import { icons } from "../../../icons/lib.js";

defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: "currentColor",
  },
});
</script>
