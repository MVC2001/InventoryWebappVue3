<template>
  <div class="container-fluid d-flex justify-content-center align-items-center vh-100">
    <div class="row">
      <div class="col-md-8">
        <img src="/homeimg.jpg" alt="Logo" class="homelogo" style="width:900px;height:495px">
       </div>
        <div class="col-md-4">
        <div class="card ">
          <div class="card-body">
            <img src="/logo.png" alt="Logo" class="logo img-fluid mx-auto d-block mb-4" style="width:100px;height:100px">
            <h1 class="card-title text-center mb-4">Login</h1>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username" required />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter password" required />
              </div>
              <button type="submit" class="btn btn-submit btn-block" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm">Loading...</span>
                <span v-if="!loading">Login</span>
              </button>
            </form>
            <br>
            <a href="/reset-password">Reset-password</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import axios from '../axios.js'; // Ensure this is your axios instance
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const loading = ref(false);
const toast = useToast();
const router = useRouter();

const submitForm = async () => {
  if (!username.value || !password.value) {
    toast.error("Please fill in all fields");
    return;
  }

  loading.value = true;
  try {
    const response = await axios.post('/api/auth/login', {
      username: username.value,
      password: password.value,
    });

    const token = response.data.token; // Ensure your backend returns the token
    localStorage.setItem('token', token); // Store token in local storage

    router.push('/dashboard'); // Redirect to dashboard
    toast.success("Login successful!");

  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        const errorMessage = error.response.data.message || "An unknown error occurred";
        toast.error(errorMessage);
      }
    } else {
      toast.error("An unknown error occurred");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card {
  width: 370px;
  max-width: 400px;
  margin-left: auto;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
.btn-submit {
  background-color: #075d80;
  color: white;
}
@media (max-width: 576px) {
  .card {
    width: 90%;
  }
}
homelogo{
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
</style>
