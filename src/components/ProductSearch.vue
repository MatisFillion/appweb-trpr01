<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ searchValue: string }>();
const emit = defineEmits(["update:searchValue"]);
</script>

<template>
  <div class="container mt-4 w-50">
    <div class="mb-3">
      <label class="form-label">Chercher:</label>
      <input :value="props.searchValue" @input="emit('update:searchValue', ($event.target as HTMLInputElement).value)" type="text" class="form-control" />
    </div>
  </div>
</template>
