<template>
    <div class="addroleform">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            Add New Role  
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <div class="container">
              <form @submit.prevent="submitForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="inputRoleName" class="form-label">Role Name</label>
                    <input type="text" class="form-control" id="inputRoleName" v-model="roleData.name" required>
                  </div>
                  <div class="col-md-6">
                    <label for="inputRoleDescription" class="form-label">Description</label>
                    <input type="text" class="form-control" id="inputRoleDescription" v-model="roleData.description" required>
                  </div>
                </div>
  
                <div class="row g-3">
                  <div class="col-12 py-3">
                    <i class="fa fa-plus"></i> <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;">  <i class="fa fa-plus"></i> Add Role</button>
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
  
  const roleData = ref({
    name: '',
    description: ''
  });
  
  // Function to handle form submission
  async function submitForm() {
    try {
      const response = await axios.post('api/auth/add-role', roleData.value); // Adjust endpoint as needed
  
      if (response.status === 201) {
        toast.success('Role added successfully!');
        resetForm();
        router.push('/roles'); // Redirect to roles page
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
    roleData.value = { name: '', description: '' };
  }
  </script>
  
  <style scoped>
  .addroleform {
    font-family: 'Euclid Circular', sans-serif;
    font-size: 12px;
  }
  </style>
  