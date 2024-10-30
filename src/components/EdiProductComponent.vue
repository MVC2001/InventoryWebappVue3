<template>
    <div class="editProductForm">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            Edit Product
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProduct">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputProductName" class="form-label">Product Name</label>
                  <input type="text" class="form-control" id="inputProductName" v-model="productData.productName" required>
                </div>
                <div class="col-md-6">
                  <label for="inputDescription" class="form-label">Description</label>
                  <input type="text" class="form-control" id="inputDescription" v-model="productData.description" required>
                </div>
              </div>
  
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputQuantity" class="form-label">Quantity</label>
                  <input type="number" class="form-control" id="inputQuantity" v-model="productData.quantity" required>
                </div>
                <div class="col-md-6">
                  <label for="inputPrice" class="form-label">Price</label>
                  <input type="number" class="form-control" id="inputPrice" v-model="productData.price" step="0.01" required>
                </div>
              </div>
  
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputSupplier" class="form-label">Select Supplier</label>
                  <select id="inputSupplier" class="form-control" v-model="productData.supplierId" required>
                    <option disabled value="">-- Select Supplier --</option>
                    <option v-for="supplier in suppliers" :key="supplier.supplierId" :value="supplier.supplierId">
                      {{ supplier.supplierName }}
                    </option>
                  </select>
                </div>
  
                <div class="col-md-6">
                  <label for="inputCategory" class="form-label">Select Category</label>
                  <select id="inputCategory" class="form-control" v-model="productData.categoryId" required>
                    <option disabled value="">-- Select Category --</option>
                    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                      {{ category.categoryName }}
                    </option>
                  </select>
                </div>
              </div>
  
              <div class="row g-3">
                <div class="col-12 py-3">
                  <button type="submit" class="btn btn-block" style="background-color:#075d80; width:180px;color:white;">
                    Update Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/axios'; 
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute(); 
const router = useRouter();

const productData = ref({
  productId: null,
  productName: '',
  description: '',
  quantity: null,
  price: null,
  supplierId: null,
  categoryId: null, // Add categoryId to productData
});

const suppliers = ref([]);
const categories = ref([]);

onMounted(async () => {
  const productId = route.params.id;
  await fetchSuppliers();
  await fetchCategories();
  await fetchProduct(productId); 
});

// Fetch product by ID
async function fetchProduct(productId) {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    productData.value = data; // Assuming data includes categoryId
  } catch (error) {
    handleError(error);
  }
}

// Fetch suppliers from the API
async function fetchSuppliers() {
  try {
    const response = await axios.get('/api/suppliers');
    suppliers.value = response.data;
  } catch (error) {
    handleError(error);
  }
}

// Fetch categories from the API
async function fetchCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data; // Store the fetched categories
  } catch (error) {
    handleError(error);
  }
}

// Update product
async function updateProduct() {
  try {
    await axios.put(`/api/products/${productData.value.productId}`, productData.value);
    toast.success('Product updated successfully!');
    router.push('/products'); // Redirect to products list
  } catch (error) {
    handleError(error);
  }
}

// Handle errors
function handleError(error) {
  let message = 'An unexpected error occurred';
  if (error.response) {
    message = error.response.data.message || error.response.statusText;
  } else if (error.request) {
    message = 'No response from the server. Please check your connection.';
  } else {
    message = error.message;
  }
  toast.error(message);
}
</script>

  
  <style scoped>
  .editProductForm {
    font-family: 'Euclid Circular', sans-serif;
    font-size: 12px;
  }
  </style>
  