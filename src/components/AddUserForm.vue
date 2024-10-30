<template>
  <div class="adduserform">
    <div class="container">
      <div class="card" style="width:100%">
        <div class="card-header">
          Add new user  
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="card-body">
          <div class="container">
            <form @submit.prevent="submitForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputUsername4" class="form-label">Username</label>
                  <input type="text" class="form-control" id="inputUsername4" v-model="userData.username" required>
                </div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" v-model="userData.email" required>
                </div>
              </div>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputRole4" class="form-label">Role</label>
                  <select class="form-control" id="inputRole4" v-model="userData.roleId" required>
                    <option value="" disabled>Select Role</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input type="password" class="form-control" id="inputPassword4" v-model="userData.password" required>
                </div>
              </div>

              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputStatus4" class="form-label">Status</label>
                  <select class="form-control" id="inputStatus4" v-model="userData.status" required>
                    <option value="" disabled>Select Status</option>
                    <option value="is_active">Active</option>
                    <option value="not_active">Not Active</option>
                  </select>
                </div>
              </div>

              <div class="row g-3">
                <div class="col-12 py-3">
                  <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;"> <i class="fa fa-plus"></i> Add user</button>
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

const userData = ref({
  username: '',
  roleId: '',
  status: '',
  email: '',
  password: ''
});

const roles = ref([]);

// Fetch roles for dropdown
async function fetchRoles() {
  try {
    const response = await axios.get('api/auth/rolesAsDropDown');
    roles.value = response.data; // Adjust based on your response structure
  } catch (error) {
    handleError(error);
  }
}

// Function to handle form submission
async function submitForm() {
  try {
    const response = await axios.post('api/auth/register', userData.value);
    if (response.status === 201) {
      toast.success('User added successfully!');
      resetForm();
      router.push('/users');
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
  toast.error(message); // Show error message with toast
}

// Function to reset the form after successful submission
function resetForm() {
  userData.value = { username: '', roleId: '', status: '', email: '', password: '' };
}

// Fetch roles on component mount
onMounted(fetchRoles);
</script>

<style scoped>
.adduserform {
  font-family: 'Euclid Circular', sans-serif;
  font-size: 12px;
}
</style>
