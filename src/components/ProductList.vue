<script setup lang="ts">
import { defineProps } from "vue";
import ProductCard from "./ProductCard.vue";
import type { Hams } from "../scripts/jambons";

defineProps<{ products: Hams[] }>();
const emit = defineEmits(["modify", "duplicate", "delete"]);

const modify = (product: Hams) => {
  emit('modify', product);
};
</script>

<template>
  <div>
    <h2 class="container mt-4">Liste des Jambons</h2>
    <div class="row">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @modify="modify"
        @duplicate="$emit('duplicate', product)"
        @delete="$emit('delete', product.id)"
      />
    </div>
  </div>
</template>
