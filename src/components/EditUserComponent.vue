<template>
    <div class="editUserform">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            User Profile
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <div class="container">
              <!-- Display fetched user information -->
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputUsername4" class="form-label">Username</label>
                  <input type="text" class="form-control" id="inputUsername4" v-model="userData.username" required>
                </div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" v-model="userData.email" readonly>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputRole4" class="form-label">Role</label>
                  <input type="text" class="form-control" id="inputRole4" v-model="userData.role" required>
                </div>

                <div class="col-md-6">
                    <label for="inputStatus4" class="form-label">Status</label>
                    <input type="text" class="form-control" id="inputStatus4" v-model="userData.status" required>
                  </div>
              </div>
  
              <!-- Form for updating user profile -->
              <form class="py-5" @submit.prevent="updateUserProfile">
                <p class="sms py-2" style="font-weight: bold;">UPDATE PROFILE</p>
                <div class="row g-3">
                  <div class="col-12 py-3">
                    <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;">Update Profile</button>
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
import { useRouter,useRoute } from 'vue-router';
import axios from '@/axios'; // Ensure this points to your axios instance
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute(); 
const router = useRouter();
// Object to store fetched user data
const userData = ref({
  username: '',
  email: '',
  status: '',
  role: '',
  id: null // Add ID field to store user ID
});

// Fetch user profile on component mount
onMounted(async () => {
  const userId = route.params.id; // Get user ID from route parameters
  try {
    const { data } = await axios.get(`/api/auth/user/${userId}`); // Destructure data directly
    userData.value = data; // Set the fetched data into userData
  } catch (error) {
    handleError(error);
  }
});

// Update user profile
async function updateUserProfile() {
  try {
    await axios.put(`/api/auth/users/${userData.value.id}`, userData.value); // Omit response
    toast.success('Profile updated successfully!');
    router.push('/users'); 
  } catch (error) {
    handleError(error);
  }
}

// Handle errors and display appropriate messages
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
</script>


<style scoped>
.editUserform {
  font-family: 'Euclid Circular', sans-serif;
  font-size: 12px;
}
</style>