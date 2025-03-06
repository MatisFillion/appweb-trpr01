import { ref } from "vue";

export interface Hams {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }

  //Liste peuplé par ChatGPT
  export const products = ref<Hams[]>([
    { id: crypto.randomUUID(), name: "Le tier du jambon de Parme", description: "Affiné 24 mois", price: 15, quantity: 0 },
    { id: crypto.randomUUID(), name: "Le tier du jambon Serrano", description: "Savoureux et tendre", price: 12, quantity: 5 },
    { id: crypto.randomUUID(), name: "Le tier du jambon Noir de Bigorre", description: "Issu de porcs élevés en liberté", price: 18, quantity: 8 },
    { id: crypto.randomUUID(), name: "Le tier du jambon Ibérique Bellota", description: "Le meilleur jambon d’Espagne", price: 25, quantity: 6 },
    { id: crypto.randomUUID(), name: "Le tier du jambon Bayonne", description: "Douceur et finesse du Sud-Ouest", price: 14, quantity: 4 },
    { id: crypto.randomUUID(), name: "Le tier du jambon de Vendée", description: "Épicé et délicatement salé", price: 10, quantity: 12 },
    { id: crypto.randomUUID(), name: "Le tier du jambon de York", description: "Jambon blanc, légèrement fumé", price: 9, quantity: 15 },
    { id: crypto.randomUUID(), name: "Le tier du jambon Pata Negra", description: "Une saveur exceptionnelle", price: 30, quantity: 3 },
    { id: crypto.randomUUID(), name: "Le tier du jambon Speck", description: "Jambon fumé typique des Alpes", price: 16, quantity: 7 },
    { id: crypto.randomUUID(), name: "Le tier du jambon Prosciutto", description: "Tradition italienne", price: 20, quantity: 9 }
  ]);
  


  export const addProduct = (product: Hams) => {
    products.value.push(product);
  };

  export const editProduct = (product: Hams) => {
    const index = products.value.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products.value[index] = product;
    }
  };

  export const removeProduct = (id: string) => {
    products.value = products.value.filter((product) => product.id !== id);
  };

  export const duplicateProduct = (product: Hams) => {
    const newProduct = { ...product, id: crypto.randomUUID(), name: product.name, description: product.description, price: product.price };
    products.value.push(newProduct)
  };