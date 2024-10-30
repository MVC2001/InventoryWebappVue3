<template>
    <div class="addCategoryForm">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            Add New Category  
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <div class="container">
              <form @submit.prevent="submitForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="inputCategoryName" class="form-label">Category Name</label>
                    <input type="text" class="form-control" id="inputCategoryName" v-model="categoryData.categoryName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="inputDescription" class="form-label">Description</label>
                    <input type="text" class="form-control" id="inputDescription" v-model="categoryData.categoryDescription" required>
                  </div>
                </div>
  
                <div class="row g-3">
                  <div class="col-12 py-3">
                    <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;">
                      <i class="fa fa-plus"></i> Add Category
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
  import { ref } from 'vue';
  import axios from '@/axios'; // Ensure this points to your axios instance
  import { useToast } from 'vue-toastification'; 
  import { useRouter } from 'vue-router';
  
  const toast = useToast();
  const router = useRouter();
  
  const categoryData = ref({
    categoryId: null, // Initialize categoryId, even if it's not used in the form
    categoryName: '',
    categoryDescription: ''
  });
  
  // Function to handle form submission
  async function submitForm() {
    try {
      const response = await axios.post('/api/categories', categoryData.value); // Adjust endpoint as needed
  
      if (response.status === 201) {
        toast.success('Category added successfully!');
        resetForm();
        router.push('/product-categories'); // Redirect to product categories page
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
    categoryData.value = { categoryId: null, categoryName: '', categoryDescription: '' }; // Reset form fields
  }
  </script>
  
  <style scoped>
  .addCategoryForm {
    font-family: 'Euclid Circular', sans-serif;
    font-size: 12px;
  }
  </style>
  