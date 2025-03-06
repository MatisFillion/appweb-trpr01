<script setup lang="ts">
import { reactive, defineEmits } from "vue";
import type { Hams } from "../scripts/jambons";

const emit = defineEmits(["addProduct"]);

const newProduct = reactive<Hams>({
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
});

const handleAddProduct = () => {
  if (newProduct.name.trim() != "" && newProduct.description.trim() != "" && newProduct.price > 0) {
    emit("addProduct", { ...newProduct });
    Object.assign(newProduct, {
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
</script>

<template>
  <div class="container mt-4 w-50">
    <h2 class="mb-3">Ajouter un produit</h2>
    <form @submit.prevent="handleAddProduct">
      <div class="mb-3">
        <label class="form-label">Nom:</label>
        <input v-model="newProduct.name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Description:</label>
        <textarea v-model="newProduct.description" class="form-control" required></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Prix:</label>
        <input v-model.number="newProduct.price" type="number" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Quantité:</label>
        <input v-model.number="newProduct.quantity" type="number" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-outline-success" @Click="handleAddProduct">Ajouter le produit</button>
    </form>
  </div>
</template>
