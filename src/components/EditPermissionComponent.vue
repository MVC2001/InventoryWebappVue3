<template>
    <div class="editPermissionForm">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            Edit Permission
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <div class="container">
              <form @submit.prevent="updatePermission">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="inputPermissionName" class="form-label">Permission Name</label>
                    <input type="text" class="form-control" id="inputPermissionName" v-model="permissionData.name" required>
                  </div>
                  <div class="col-md-6">
                    <label for="inputDescription" class="form-label">Description</label>
                    <input type="text" class="form-control" id="inputDescription" v-model="permissionData.description">
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-12 py-3">
                    <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;">Update Permission</button>
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
import axios from '@/axios'; // Ensure this points to your axios instance
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute(); 
const router = useRouter();

const permissionData = ref({
  id: null,
  name: '',
  description: ''
});

// Fetch permission data on component mount
onMounted(async () => {
  const permissionId = route.params.id;
  try {
    const { data } = await axios.get(`/api/auth/permission/${permissionId}`);
    permissionData.value = data;
  } catch (error) {
    handleError(error);
  }
});

// Update permission data
async function updatePermission() {
  try {
    await axios.put(`/api/auth/permissions/${permissionData.value.id}`, {
      name: permissionData.value.name, // Ensure this matches your DTO
      description: permissionData.value.description
    });
    toast.success('Permission updated successfully!');
    router.push('/permissions'); // Redirect after success
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
.editPermissionForm {
  font-family: 'Euclid Circular', sans-serif;
  font-size: 12px;
}
</style>
