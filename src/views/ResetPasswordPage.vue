<template>
  <div class="userprofile">
    <div class="container">
      <div class="card" style="width:100%; box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;">
        <div class="card-header">
          <i class="fa fa-unlock"></i> Reset password here
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="card-body">
          <div class="container">
           
            <!-- Form for resetting password -->
            <form class="py-5" @submit.prevent="submitForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputEmailReset" class="form-label">Enter email</label>
                  <input type="email" class="form-control" id="inputEmailReset" v-model="resetEmail" required>
                </div>
                <div class="col-md-6">
                  <label for="inputNewPassword" class="form-label">New Password</label>
                  <input type="password" class="form-control" id="inputNewPassword" v-model="newPassword" required>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-12 py-3 d-flex justify-content-between">
                    <button type="submit" class="btn" style="background-color:#075d80; width:150px; color:white;">
                        <i class="fa fa-unlock"></i> Reset Password
                    </button>
                    <a href="/" class="btn" style="background-color:tomato; width:150px; color:white;">
                        <i class="fa fa-home"></i> Back home
                    </a>
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
import { ref,  } from 'vue';
import axios from '@/axios'; 
import { useToast } from 'vue-toastification';

const toast = useToast();
// Input fields for resetting password
const resetEmail = ref('');
const newPassword = ref('');



// Submit form for resetting password
async function submitForm() {
  if (newPassword.value.length < 6) {
    toast.error('Password must be at least 6 characters long.');
    return;
  }

  try {
    await axios.post('/api/auth/update-password', {
      email: resetEmail.value, // Email entered for reset
      newPassword: newPassword.value
    });

    toast.success('Password reset successfully!');
    newPassword.value = ''; // Clear new password input
    resetEmail.value = ''; // Clear reset email input
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
.adduserform {
  font-family: 'Euclid Circular', sans-serif;
  font-size: 12px;
}
</style>




