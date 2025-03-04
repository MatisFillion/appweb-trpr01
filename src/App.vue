<script setup lang="ts">
import { ref, reactive, computed } from "vue";
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

const searchParameter = ref("");

const newProduct = reactive<Hams>({
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
});

const handleModifyProduct = (product: Hams) => {
  editProduct({
    ...product,
    name: newProduct.name,
    description: newProduct.description,
    price: newProduct.price,
    quantity: newProduct.quantity,
  });
};

const handleAddProduct = () => {
  if (newProduct.name && newProduct.description && newProduct.price > 0) {
    addProduct({ ...newProduct });
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

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return (
      product.name
        .toLowerCase()
        .includes(searchParameter.value.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchParameter.value.toLowerCase())
    );
  });
});

const showMore = ref<{ [key: string]: boolean }>({});

const toggleShowMore = (productId: string) => {
  showMore.value[productId] = !showMore.value[productId];
};

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
  <!--Form fait par ChatGPT-->
  <div class="container mt-4 w-50">
    <div class="d-flex align-items-center">
        <img class="img-fluid d-none d-lg-block" src="../public/tierDeJambon.png"
        alt="Tier de Jambons">
        <h2 class="mb-3">Ajouter un tier de jambon</h2>
        <img class="img-fluid d-none d-lg-block" src="../public/tierDeJambonMirrored.png"
        alt="Tier de Jambons">
    </div>

    <form @submit.prevent="handleAddProduct">
      <div class="mb-3">
        <label for="name" class="form-label">Nom:</label>
        <input
          v-model="newProduct.name"
          type="text"
          id="name"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          v-model="newProduct.description"
          id="description"
          class="form-control"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Prix:</label>
        <input
          v-model.number="newProduct.price"
          type="number"
          id="price"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="quantity" class="form-label">Quantité:</label>
        <input
          v-model.number="newProduct.quantity"
          type="number"
          id="quantity"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-outline-success">Ajouter le produit</button>
    </form>
  </div>

  <div class="container mt-4 w-50">
    <div class="mb-3">
      <label for="search" class="form-label">Chercher:</label>
      <input
        v-model="searchParameter"
        type="text"
        id="search"
        class="form-control"
      />
    </div>
  </div>
  <div>
    <h2 class="container mt-4">Liste des Jambons</h2>
    <div class="row">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="card p-2 text-center shadow-sm col-3"
        style="width: 18rem; cursor: pointer"
        @click="toggleShowMore(product.id)"
      >
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>

          <div v-if="product.quantity <= 0">
            <p class="card-text text-label opacity-75 fw-bold text-danger">
            Il n'en reste aucun en stock
          </p>
          </div>

          <p class="card-text text-label opacity-75 fw-bold">
            {{ product.price }}$
          </p>
          <div v-if="showMore[product.id]">
            <p class="card-text text-muted">{{ product.description }}</p>
            <p
              class="card-text fw-bold"
              :class="{
                'text-danger': product.quantity <= 5,
                'text-warning': product.quantity > 5 && product.quantity <= 10,
                'text-success': product.quantity > 10,
              }"
            >
              Quantité restante : {{ product.quantity }}
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-around">
          <button
            class="btn btn-outline-warning w-100 mx-1"
            @click="handleModifyProduct(product)"
          >
            <i class="bi bi-pen"></i>
          </button>
          <button
            class="btn btn-outline-primary w-100 mx-1"
            @click="handleDuplicateProduct(product)"
          >
            <i class="bi bi-copy"></i>
          </button>
          <button
            class="btn btn-outline-danger w-100 mx-1"
            @click="deleteProduct(product.id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <button @click="exportToCSV" class="btn btn-outline-info mt-3">
  Télécharger la liste en CSV
</button>
</template>

<style scoped></style>
