<template>
  <div class="editWarehouseForm">
    <div class="container">
      <div class="card" style="width:100%">
        <div class="card-header">
          Edit Warehouse
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="card-body">
          <div class="container">
            <form @submit.prevent="updateWarehouse">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputWarehouseName" class="form-label">Warehouse Name</label>
                  <input type="text" class="form-control" id="inputWarehouseName" v-model="warehouseData.warehouseName" required>
                </div>
                <div class="col-md-6">
                  <label for="inputLocation" class="form-label">Location</label>
                  <input type="text" class="form-control" id="inputLocation" v-model="warehouseData.location" required>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputCapacity" class="form-label">Capacity</label>
                  <input type="text" class="form-control" id="inputCapacity" v-model="warehouseData.capacity" required>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-12 py-3">
                  <button type="submit" class="btn btn-block" style="background-color:#075d80; width:180px;color:white;">Update Warehouse</button>
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

// Define warehouse data object
const warehouseData = ref({
  warehouseId: null,
  warehouseName: '',
  location: '',
  capacity: ''
});

// Fetch warehouse data on component mount using the ID from the route parameters
onMounted(async () => {
  const warehouseId = route.params.id;
  try {
    const { data } = await axios.get(`/api/warehouses/${warehouseId}`);
    warehouseData.value = {
      warehouseId: data.warehouseId, 
      warehouseName: data.warehouseName,
      location: data.location,
      capacity: data.capacity
    };
  } catch (error) {
    handleError(error);
  }
});

// Function to update warehouse data
async function updateWarehouse() {
  try {
    await axios.put(`/api/warehouses/${warehouseData.value.warehouseId}`, {
      warehouseName: warehouseData.value.warehouseName, 
      location: warehouseData.value.location,
      capacity: warehouseData.value.capacity  
    });
    toast.success('Warehouse updated successfully!');
    router.push('/warehouses'); // Redirect to warehouse list after successful update
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
.editWarehouseForm {
  font-family: 'Euclid Circular', sans-serif;
  font-size: 12px;
}
</style>
