<template>
    <div class="createSaleForm">
        <div class="container">
            <div class="card" style="width:100%">
                <div class="card-header">
                    Create New Sale
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <div class="container">
                        <form @submit.prevent="submitForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputCategory" class="form-label">Select Category</label>
                                    <select id="inputCategory" class="form-control" v-model="saleData.categoryId" required>
                                        <option disabled value="">-- Select Category --</option>
                                        <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                                            {{ category.categoryName }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputQuantity" class="form-label">Quantity Sold</label>
                                    <input type="number" class="form-control" id="inputQuantity" v-model="saleData.quantity_sold" required>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputPrice" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="inputPrice" v-model="saleData.price" step="0.01" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputAmountSold" class="form-label">Amount Sold</label>
                                    <input type="number" class="form-control" id="inputAmountSold" v-model="saleData.amount_sold" step="0.01" required>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputCustomerName" class="form-label">Customer Name</label>
                                    <input type="text" class="form-control" id="inputCustomerName" v-model="saleData.customerName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCustomerPhone" class="form-label">Customer Phone</label>
                                    <input type="text" class="form-control" id="inputCustomerPhone" v-model="saleData.customerPhone" required>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputCustomerEmail" class="form-label">Customer Email</label>
                                    <input type="email" class="form-control" id="inputCustomerEmail" v-model="saleData.customerEmail" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPaymentMethod" class="form-label">Payment Method</label>
                                    <select id="inputPaymentMethod" class="form-control" v-model="saleData.paymentMethod" required>
                                        <option value="credit">Credit</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputSaleStatus" class="form-label">Sale Status</label>
                                    <select id="inputSaleStatus" class="form-control" v-model="saleData.saleStatus" required>
                                        <option value="Pending">Pending</option>
                                        <option value="Sold">Sold</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-12 py-3">
                                    <button type="submit" class="btn btn-block" style="background-color:#075d80; width:150px;color:white;">
                                        <i class="fa fa-plus"></i> Create Sale
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
import axios from '@/axios'; // Ensure this points to your axios instance
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const saleData = ref({
    categoryId: null,
    quantity_sold: null,
    price: null,
    amount_sold: null,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    saleStatus: 'Pending',
    paymentMethod: 'credit',
});

const categories = ref([]);

// Fetch categories on component mount
onMounted(async () => {
    await fetchCategories();
});

// Fetch categories from the API
async function fetchCategories() {
    try {
        const response = await axios.get('/api/categories');
        categories.value = response.data;
    } catch (error) {
        handleError(error);
    }
}

// Function to handle form submission
async function submitForm() {
    try {
        const postData = { ...saleData.value };

        const response = await axios.post('/api/sales', postData);
        if (response.status === 201) {
            toast.success('Sale created successfully!');
            console.log('Sale created successfully:', response.data); // Log success
            resetForm();
            router.push('/sales'); // Redirect to sales page
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
        console.error('Error response:', error.response); // Log the error response
    } else if (error.request) {
        message = 'No response from the server. Please check your connection.';
        console.warn('Error request:', error.request); // Log the error request
    } else {
        message = error.message;
        console.error('Error message:', error.message); // Log the error message
    }

    toast.error(message);
}

// Function to reset the form after successful submission
function resetForm() {
    saleData.value = { 
        categoryId: null, 
        quantity_sold: null, 
        price: null, 
        amount_sold: null, 
        customerName: '', 
        customerPhone: '', 
        customerEmail: '', 
        saleStatus: 'Pending', 
        paymentMethod: 'credit' 
    };
}
</script>

<style scoped>
.createSaleForm {
    font-family: 'Euclid Circular', sans-serif;
    font-size: 12px;
}
</style>
