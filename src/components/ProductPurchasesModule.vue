<template>
  <div class="purchases mt-5 py-5">
    <div class="form-search">
      <div class="main d-flex justify-content-between mb-3">
        <form class="form-inline d-flex" @submit.prevent>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search by purchase ID or supplier"
              v-model="searchTerm"
              aria-label="Search"
            />
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-search"></i>
              </span>
            </div>
          </div>
        </form>
        <a href="add-purchase">
          <button class="btn" style="background-color:#075d80; color:white;">
            <i class="fa fa-plus"></i> Add Purchase
          </button>
        </a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table text-center table-striped table-bordered" style="width:100%">
        <thead>
          <tr>
            <th>No#</th>
            <th>Supplier</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Purchase Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(purchase, index) in filteredPurchases" :key="purchase.purchaseId">
            <td>{{ index + 1 }}</td>
            <td>{{ getSupplierName(purchase.supplierId) }}</td>
            <td>{{ getCategoryName(purchase.categoryId) }}</td>
            <td style="color:#075d80;font-weight:bold">{{ purchase.quantity }}</td>
            <td>{{ purchase.totalPrice.toFixed(2) }}</td>
            <td>{{ new Date(purchase.purchaseDate).toLocaleDateString() }}</td>
            <td>
              <div class="d-flex">
                <button @click="editPurchase(purchase.purchaseId)" class="btn btn-warning">
                  <i class="fa fa-pencil"></i>
                </button>
                <button @click="confirmDeletePurchase(purchase.purchaseId)" class="btn btn-danger">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      purchases: [],
      suppliers: [],
      categories: [],
      searchTerm: '',
    };
  },
  created() {
    this.fetchPurchases();
    this.fetchSuppliers();
    this.fetchCategories();
  },
  computed: {
    filteredPurchases() {
      return this.purchases.filter(purchase =>
        purchase.purchaseId.toString().includes(this.searchTerm) ||
        this.getSupplierName(purchase.supplierId).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    async fetchPurchases() {
      try {
        const response = await axios.get('/api/purchases');
        this.purchases = response.data;
      } catch (error) {
        console.error('Error fetching purchases:', error);
        useToast().error('Failed to fetch purchases');
      }
    },
    async fetchSuppliers() {
      try {
        const response = await axios.get('/api/suppliers');
        this.suppliers = response.data;
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        useToast().error('Failed to fetch suppliers');
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        useToast().error('Failed to fetch categories');
      }
    },
    getSupplierName(supplierId) {
      const supplier = this.suppliers.find(s => s.supplierId === supplierId);
      return supplier ? supplier.supplierName : 'N/A';
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.categoryId === categoryId);
      return category ? category.categoryName : 'N/A';
    },
    editPurchase(purchaseId) {
      this.$router.push({ name: 'edit-purchase', params: { id: purchaseId } });
    },
    confirmDeletePurchase(purchaseId) {
      const confirmDelete = confirm("Are you sure you want to delete this purchase?");
      if (confirmDelete) {
        this.deletePurchase(purchaseId);
      }
    },
    async deletePurchase(purchaseId) {
      try {
        await axios.delete(`/api/purchases/${purchaseId}`);
        this.purchases = this.purchases.filter(purchase => purchase.purchaseId !== purchaseId);
        useToast().success('Purchase deleted successfully');
      } catch (error) {
        console.error('Error deleting purchase:', error);
        useToast().error('Failed to delete purchase');
      }
    },
  },
};
</script>

<style scoped>
.table {
  font-size: 14px;
}
.d-flex {
  gap: 10px;
}
</style>
