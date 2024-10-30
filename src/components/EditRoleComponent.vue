<template>
  <div class="editRoleForm">
    <div class="container">
      <div class="card" style="width:100%">
        <div class="card-header">
          Edit Role
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="card-body">
          <div class="container">
            <form @submit.prevent="updateRole">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputRoleName" class="form-label">Role Name</label>
                  <input type="text" class="form-control" id="inputRoleName" v-model="roleData.name" required>
                </div>
                <div class="col-md-6">
                  <label for="inputDescription" class="form-label">Description</label>
                  <input type="text" class="form-control" id="inputDescription" v-model="roleData.description">
                </div>
              </div>
              <div class="row g-3">
                <div class="col-12 py-3">
                  <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;">Update Role</button>
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

const roleData = ref({
  id: null,
  name: '',
  description: ''
});

// Fetch role data on component mount
onMounted(async () => {
  const roleId = route.params.id;
  try {
    const { data } = await axios.get(`/api/auth/role/${roleId}`);
    roleData.value = data;
  } catch (error) {
    handleError(error);
  }
});

// Update role data
async function updateRole() {
  try {
    await axios.put(`/api/auth/roles/${roleData.value.id}`, {
      name: roleData.value.name, // Ensure this matches your DTO
      description: roleData.value.description
    });
    toast.success('Role updated successfully!');
    router.push('/roles'); 
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
.editRoleForm {
  font-family: 'Euclid Circular', sans-serif;
  font-size: 12px;
}
</style>
