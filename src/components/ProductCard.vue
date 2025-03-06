<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";
import type { Hams } from "../scripts/jambons";

const props = defineProps<{ product: Hams }>();
const emit = defineEmits(["modify", "duplicate", "delete"]);
const showMore = ref(false);

const isEditing = ref(false);
const editedProduct = ref({ ...props.product });

const saveChanges = () => {
  emit("modify", editedProduct.value);
  isEditing.value = false;
};

const cancelEdit = () => {
  editedProduct.value = { ...props.product };
  isEditing.value = false;
};
</script>

<template>
  <div class="card p-2 text-center shadow-sm col-3" style="width: 18rem; cursor: pointer" @click="showMore = !showMore">
  <div class="card-body">
    <template v-if="isEditing">
      <input v-model="editedProduct.name" class="form-control mb-2" />
      <input v-model="editedProduct.description" class="form-control mb-2" />
      <input type="number" v-model="editedProduct.price" class="form-control mb-2" />
      <input type="number" v-model="editedProduct.quantity" class="form-control mb-2" />
    </template>
    <template v-else>
      <h5 class="card-title">{{ product.name }}</h5>
      <p v-if="product.quantity <= 0" class="card-text text-danger fw-bold">Stock épuisé</p>
      <p class="card-text fw-bold">{{ product.price }}$</p>
      <div v-if="showMore">
      <p class="card-text text-muted">{{ product.description }}</p>
      <p class="fw-bold" :class="{
        'text-danger': product.quantity <= 5,
        'text-warning': product.quantity > 5 && product.quantity <= 10,
        'text-success': product.quantity > 10
      }">
        Quantité restante : {{ product.quantity }}
      </p>
    </div>
    </template>
  </div>

  <div class="d-flex justify-content-around">
    <button class="btn btn-outline-warning w-100 mx-1" @click.stop="isEditing = true" v-if="!isEditing">
      <i class="bi bi-pen"></i>
    </button>
    <template v-if="isEditing">
      <button class="btn btn-outline-success w-100 mx-1" @click.stop="saveChanges">
        <i class="bi bi-check"></i>
      </button>
      <button class="btn btn-outline-secondary w-100 mx-1" @click.stop="cancelEdit">
        <i class="bi bi-x"></i>
      </button>
    </template>
    <button class="btn btn-outline-primary w-100 mx-1" @click.stop="emit('duplicate', product)" v-if="!isEditing">
      <i class="bi bi-copy"></i>
    </button>
    <button class="btn btn-outline-danger w-100 mx-1" @click.stop="emit('delete', product.id)" v-if="!isEditing">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</div>
</template>