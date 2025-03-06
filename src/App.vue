<script setup lang="ts">
//Why is he not seeing it?
import ProductForm from "./components/ProductForm.vue";
import ProductSearch from "./components/ProductSearch.vue";
import ProductList from "./components/ProductList.vue";
import ExportButton from "./components/ExportButton.vue";
import { ref, computed } from "vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  products,
  addProduct,
  removeProduct,
  duplicateProduct,
  editProduct,
} from "./scripts/jambons";
import type { Hams } from "./scripts/jambons";

const deleteProduct = (id: string) => {
  removeProduct(id);
};

const handleDuplicateProduct = (product: Hams) => {
  duplicateProduct(product);
};

const searchValue = ref("");

const handleModifyProduct = (product: Hams) => {
    if (product.name.trim() == "" || product.description.trim() == "" || product.price <= 0) {
    return;
    }
  editProduct({
    ...product,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
  });
};

const handleAddProduct = (product: Hams) => {
  if (product.name.trim() != "" && product.description.trim() != "" && product.price > 0) {
    addProduct({ ...product });
    Object.assign(product, {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      price: 0,
      quantity: 0,
    });
  } else {
    alert("Veuillez remplir tous les champs correctement !");
  }
};

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return (
      product.name
      .toLowerCase()
      .includes(searchValue.value.toLowerCase()) ||
      product.description
      .toLowerCase()
      .includes(searchValue.value.toLowerCase())
    );
  });
});

// Exportation CSV fait par ChatGPT
const exportToCSV = () => {
  const csvContent = [
    ["ID", "Nom", "Description", "Prix", "Quantité"], // En-tête du fichier CSV
    ...products.value.map(product => [
      product.id,
      product.name,
      product.description,
      product.price,
      product.quantity
    ])
  ].map(e => e.join(",")).join("\n");

  // Créer un Blob contenant le CSV
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Créer un lien de téléchargement
  const a = document.createElement("a");
  a.href = url;
  a.download = "produits.csv"; // Nom du fichier
  a.click();

  // Nettoyer l'URL après le téléchargement
  URL.revokeObjectURL(url);
};
</script>

<template>
<ProductForm @addProduct="handleAddProduct"/>
<ProductSearch v-model:searchValue="searchValue" />
<ProductList @duplicate="handleDuplicateProduct" @modify="handleModifyProduct" @delete="deleteProduct" :products="filteredProducts" />
<ExportButton :products="products" />
</template>

<style scoped></style>
