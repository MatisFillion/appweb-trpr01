<script setup lang="ts">
import { defineProps } from "vue";
import type { Hams } from "../scripts/jambons";

const props = defineProps<{ products: Hams[] }>();

//Fonctinalité du export to CSV fait par ChatGPT (J'ai apporté quelque modifications)
const exportToCSV = () => {
  const csvContent = [
    ...props.products.map(product => [
      "ID: " + product.id,
      "Nom: " + product.name,
      "Description:" + product.description,
      "Prix: " + product.price,
      "Quantité: " + product.quantity
    ])
  ].map(e => e.join(", ")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "produits.csv";
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <button @click="exportToCSV" class="btn btn-outline-info mt-3">
    Télécharger la liste en CSV
  </button>
</template>
