<template>
    <div class="dashboard">
      <NavHeader @logout="logout" />
      <FixedBar />
    
      <main class="contentv1" style="margin-left: 170px; width: 1010px; margin-top: 30px;">
        <div class="mainbody">
          <AddProductPurchaseForm/>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  
  import NavHeader from '@/components/NavHeader.vue';
  import FixedBar from '@/components/FixedBar.vue';
  import AddProductPurchaseForm from '@/components/AddProductPurchaseForm.vue'
  
  </script>
  
  <style scoped>
  .dashboard {
    font-family: 'Euclid Circular';
    font-size:12px;
  }
  
  .contentv1 {
    flex: 1;
    padding: 20px;
  }
  </style>
  