<template>
    <div class="editCategoryForm">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            Edit Category
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <div class="container">
              <form @submit.prevent="updateCategory">
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
                    <button type="submit" class="btn btn-block" style="background-color:#075d80; width:180px;color:white;">
                      Update Category
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
  import { useRouter, useRoute } from 'vue-router';
  import axios from '@/axios'; 
  import { useToast } from 'vue-toastification';
  
  // Define toast instance for notifications
  const toast = useToast();
  const route = useRoute(); 
  const router = useRouter();
  
  // Define category data object
  const categoryData = ref({
    categoryId: null,
    categoryName: '',
    categoryDescription: ''
  });
  
  // Fetch category data on component mount using the ID from the route parameters
  onMounted(async () => {
    const categoryId = route.params.id;
    try {
      const { data } = await axios.get(`/api/categories/${categoryId}`);
      categoryData.value = {
        categoryId: data.categoryId, 
        categoryName: data.categoryName,
        categoryDescription: data.categoryDescription
      };
    } catch (error) {
      handleError(error);
    }
  });
  
  // Function to update category data
  async function updateCategory() {
    try {
      await axios.put(`/api/categories/${categoryData.value.categoryId}`, categoryData.value);
      toast.success('Category updated successfully!');
      router.push('/product-categories'); // Redirect to product categories list after successful update
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
  </script>
  
  <style scoped>
  .editCategoryForm {
    font-family: 'Euclid Circular', sans-serif;
    font-size: 12px;
  }
  </style>
  