<template>
    <div class="addProductForm">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            Add New Product
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <div class="container">
              <form @submit.prevent="submitForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="inputProductName" class="form-label">Product Name</label>
                    <input type="text" class="form-control" id="inputProductName" v-model="productData.productName" required>
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
                    <label for="inputQuantity" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="inputQuantity" v-model="productData.quantity" required>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="inputPrice" class="form-label">Price</label>
                    <input type="number" class="form-control" id="inputPrice" v-model="productData.price" step="0.01" required>
                  </div>
                  <div class="col-md-6">
                    <label for="inputDescription" class="form-label">Description</label>
                    <input type="text" class="form-control" id="inputDescription" v-model="productData.description" required>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-12 py-3">
                    <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;">
                      <i class="fa fa-plus"></i> Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '@/axios'; // Ensure this points to your axios instance
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  const toast = useToast();
  const router = useRouter();
  
  const productData = ref({
    productName: '',
    categoryId: null,
    supplierId: null,
    quantity: '',
    price: '',
    description: '',
  });
  
  const categories = ref([]);
  const suppliers = ref([]);
  
  // Fetch categories and suppliers on component mount
  onMounted(async () => {
    await fetchCategories();
    await fetchSuppliers();
  });
  
  // Fetch categories from the API
  async function fetchCategories() {
    try {
      const response = await axios.get('/api/categories');
      categories.value = response.data;
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
  
  // Function to handle form submission
  async function submitForm() {
    try {
      const postData = {
        productName: productData.value.productName,
        categoryId: productData.value.categoryId, // Use categoryId directly
        supplierId: productData.value.supplierId,
        quantity: productData.value.quantity,
        price: productData.value.price,
        description: productData.value.description,
      };
      
      const response = await axios.post('/api/products', postData);
      if (response.status === 201) {
        toast.success('Product added successfully!');
        resetForm();
        router.push('/products'); // Redirect to products page
      }
    } catch (error) {
      handleError(error);
    }
  }
  
  // Function to handle and display errors
  function handleError(error) {
    let message = 'An unexpected error occurred';
  
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message;
      } else {
        message = error.response.statusText;
      }
    } else if (error.request) {
      message = 'No response from the server. Please check your connection.';
    } else {
      message = error.message;
    }
  
    toast.error(message);
  }
  
  // Function to reset the form after successful submission
  function resetForm() {
    productData.value = { productName: '', categoryId: null, supplierId: null, quantity: '', price: '', description: '' }; // Reset form fields
  }
  </script>
  
  <style scoped>
  .addProductForm {
    font-family: 'Euclid Circular', sans-serif;
    font-size: 12px;
  }
  </style>
  