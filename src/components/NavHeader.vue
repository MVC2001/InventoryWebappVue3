<template>
    <header class="header navbar navbar-expand-lg bg-custom">
      <div class="container-fluid">
        <a class="navbar-brand" href="/dashboard">
          <img src="/logo.png" alt="Logo" class="logo" style="width:70px;height:40px">
        </a>
  
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" @click="toggleDropdown">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                aria-expanded="dropdownOpen"
                @click.stop="toggleDropdown"
              >
                <i class="fa fa-user-circle fa-lg" style="color: #212f3d"></i>
                <span class="ms-2 ">{{ userName || 'Loading...' }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" :class="{ show: dropdownOpen }" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="/profile" @click="handleDropdownItemClick">Profile</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </template>
  

  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from '../axios.js'; // Ensure your axios instance is correctly set up
  
  const router = useRouter();
  const dropdownOpen = ref(false);
  const userName = ref(''); // Define userName here
  
  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };
  const handleDropdownItemClick = () => {
    dropdownOpen.value = false; 
  };
  
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout'); // Log out the user
      localStorage.removeItem('token'); // Remove the token from localStorage
      userName.value = ''; // Clear the username
      router.push('/'); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  // Function to fetch the logged-in user's name
  const fetchUserName = async () => {
    const token = localStorage.getItem('token'); // Fetch token from localStorage
    if (!token) {
      router.push('/'); // Redirect to login if no token found
      return;
    }
  
    try {
      const response = await axios.get('/api/auth/current-username'); 
      userName.value = response.data; // Set userName directly
    } catch (error) {
      console.error("Failed to fetch user name:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token'); // Clear token on unauthorized
        router.push('/'); // Redirect to login
      }
    }
  };
  
  onMounted(() => {
    fetchUserName(); // Fetch the username on mount
  });
  </script>
  
  <style scoped>
  .header {
    position: fixed;
    top: 0;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    left: 0;
    font-family: 'Euclid Circular';
    font-size: 15px;
    right: 0;
    z-index: 1000;
    background-color: white;
  }
  
  .navbar-nav .nav-link {
    color: #212f3d;
  }
  
  .navbar-nav .dropdown-menu {
    background-color:#075d80; color:white
  }
  
  .navbar-nav .dropdown-item {
    color: white;
  }
  
  .navbar-nav .dropdown-item:hover {
    background-color: #1a2633;
  }
  
  .dropdown-menu.show {
    display: block;
  }
  </style>
  