<template>
    <div class="editSupplierForm">
      <div class="container">
        <div class="card" style="width:100%">
          <div class="card-header">
            Edit Supplier
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="card-body">
            <div class="container">
              <form @submit.prevent="updateSupplier">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="inputSupplierName" class="form-label">Supplier Name</label>
                    <input type="text" class="form-control" id="inputSupplierName" v-model="supplierData.supplierName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="inputContactPerson" class="form-label">Contact Person</label>
                    <input type="text" class="form-control" id="inputContactPerson" v-model="supplierData.contactPerson" required>
                  </div>
                </div>
                
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail" v-model="supplierData.email" required>
                  </div>
                </div>
                
                <div class="row g-3">
                  <div class="col-12 py-3">
                    <button type="submit" class="btn btn-block" style="background-color:#075d80; width:180px;color:white;">
                      Update Supplier
                    </button>
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
  import axios from '@/axios'; 
  import { useToast } from 'vue-toastification';
  
  // Define toast instance for notifications
  const toast = useToast();
  const route = useRoute(); 
  const router = useRouter();
  
  // Define supplier data object
  const supplierData = ref({
    supplierId: null,
    supplierName: '',
    contactPerson: '',
    email: ''
  });
  
  // Fetch supplier data on component mount using the ID from the route parameters
  onMounted(async () => {
    const supplierId = route.params.id;
    try {
      const { data } = await axios.get(`/api/suppliers/${supplierId}`);
      supplierData.value = {
        supplierId: data.supplierId, 
        supplierName: data.supplierName,
        contactPerson: data.contactPerson,
        email: data.email
      };
    } catch (error) {
      handleError(error);
    }
  });
  
  // Function to update supplier data
  async function updateSupplier() {
    try {
      await axios.put(`/api/suppliers/${supplierData.value.supplierId}`, supplierData.value);
      toast.success('Supplier updated successfully!');
      router.push('/suppliers'); // Redirect to suppliers list after successful update
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
  .editSupplierForm {
    font-family: 'Euclid Circular', sans-serif;
    font-size: 12px;
  }
  </style>
  