<template>
    <div class="dashboard">
      <NavHeader @logout="logout" />
      <FixedBar />
    
      <main class="content" style="margin-left: 170px; width: 1010px; margin-top: 10px;">
        <div class="mainbody">
          <UserProfileComponent/>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  
  import NavHeader from '@/components/NavHeader.vue';
  import FixedBar from '@/components/FixedBar.vue';
  import UserProfileComponent from '@/components/UserProfileComponent.vue'
  
  </script>
  
  <style scoped>
  .dashboard {
    font-family: 'Euclid Circular';
    font-size:12px;
  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  </style>
  