<template>
  <div class="editPurchaseForm">
    <div class="container">
      <div class="card" style="width:100%">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Edit Purchase</span>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span>&times;</span>
          </button>
        </div>
        <div class="card-body">
          <div class="container">
            <form @submit.prevent="updatePurchase">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputCategory" class="form-label">Select Category</label>
                  <select id="inputCategory" class="form-control" v-model="purchaseData.categoryId" required>
                    <option disabled value="">-- Select Category --</option>
                    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                      {{ category.categoryName }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputSupplier" class="form-label">Select Supplier</label>
                  <select id="inputSupplier" class="form-control" v-model="purchaseData.supplierId" required>
                    <option disabled value="">-- Select Supplier --</option>
                    <option v-for="supplier in suppliers" :key="supplier.supplierId" :value="supplier.supplierId">
                      {{ supplier.supplierName }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputQuantity" class="form-label">Quantity</label>
                  <input type="number" class="form-control" id="inputQuantity" v-model="purchaseData.quantity" required>
                </div>
                <div class="col-md-6">
                  <label for="inputTotalPrice" class="form-label">Total Price</label>
                  <input type="number" class="form-control" id="inputTotalPrice" v-model="purchaseData.totalPrice" step="0.01" required>
                </div>
              </div>

              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputPurchaseDate" class="form-label">Purchase Date</label>
                  <input type="date" class="form-control" id="inputPurchaseDate" v-model="formattedPurchaseDate" required>
                </div>
              </div>

              <div class="row g-3">
                <div class="col-12 py-3">
                  <button type="submit" class="btn btn-block" style="background-color:#075d80; color:white;">
                    Update Purchase
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
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/axios'; 
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute(); 
const router = useRouter();

const purchaseData = ref({
  purchaseId: null,
  categoryId: null, 
  supplierId: null, 
  quantity: '',
  totalPrice: '',
  purchaseDate: '',
});

const categories = ref([]);
const suppliers = ref([]);

onMounted(async () => {
  const purchaseId = route.params.id;
  await fetchCategories();
  await fetchSuppliers();
  await fetchPurchase(purchaseId);
});

async function fetchCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    handleError(error);
  }
}

async function fetchSuppliers() {
  try {
    const response = await axios.get('/api/suppliers');
    suppliers.value = response.data;
  } catch (error) {
    handleError(error);
  }
}

async function fetchPurchase(purchaseId) {
  try {
    const { data } = await axios.get(`/api/purchases/${purchaseId}`);
    purchaseData.value = {
      purchaseId: data.purchaseId,
      categoryId: data.category.categoryId, 
      supplierId: data.supplier.supplierId, 
      quantity: data.quantity,
      totalPrice: data.totalPrice,
      purchaseDate: data.purchaseDate,
    };
  } catch (error) {
    handleError(error);
  }
}

const formattedPurchaseDate = computed(() => {
  return purchaseData.value.purchaseDate ? purchaseData.value.purchaseDate.split('T')[0] : '';
});

async function updatePurchase() {
  console.log('Data being sent to the server:', purchaseData.value); 
  try {
    await axios.put(`/api/purchases/${purchaseData.value.purchaseId}`, {
      categoryId: purchaseData.value.categoryId, 
      supplierId: purchaseData.value.supplierId, 
      quantity: purchaseData.value.quantity,
      totalPrice: purchaseData.value.totalPrice,
      purchaseDate: purchaseData.value.purchaseDate,
    });
    toast.success('Purchase updated successfully!');
    router.push('/purchases');
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  let message = 'An unexpected error occurred';

  if (error.response) {
    message = error.response.data && error.response.data.message 
              ? error.response.data.message 
              : error.response.statusText;
  } else if (error.request) {
    message = 'No response from the server. Please check your connection.';
  } else {
    message = error.message;
  }

  toast.error(message);
}

function closeModal() {
  router.push('/purchases'); 
}
</script>

<style scoped>
.editPurchaseForm {
  font-family: 'Euclid Circular', sans-serif;
  font-size: 12px;
}
</style>
