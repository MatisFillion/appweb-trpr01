<script setup lang="ts">
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
</script>

<template>
<ProductForm @addProduct="handleAddProduct"/>
<ProductSearch v-model:searchValue="searchValue" />
<ProductList @duplicate="handleDuplicateProduct" @modify="handleModifyProduct" @delete="deleteProduct" :products="filteredProducts" />
<ExportButton :products="products" />
</template>

<style scoped></style>
