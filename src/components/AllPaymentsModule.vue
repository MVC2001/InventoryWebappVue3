<template>
    <div class="sales mt-5 py-5">
      <div class="form-search">
        <div class="main d-flex justify-content-between mb-3">
          <!-- Search Form -->
          <form class="form-inline d-flex" @submit.prevent>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search by customer name"
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
        </div>
      </div>
  
      <div class="table-responsive">
        <table class="table text-center table-striped table-bordered" style="width:100%">
          <thead>
            <tr>
              <th>No#</th>
              <th>Quantity Sold</th>
              <th>Amount Sold</th>
              <th>Category</th>
              <th>Customer Name</th>
              <th>Payment Method</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sale, index) in filteredSales" :key="sale.saleId">
              <td>{{ index + 1 }}</td>
              <td style="color:#075d80;font-weight:bold">{{ sale.quantity_sold }}</td>
              <td><button class="btn btn-block" style="color:white;background-color:#beaa2b ">{{ sale.amount_sold.toFixed(2) }}</button></td> 
              <td>{{ getCategoryName(sale.categoryId) }}</td> 
              <td>{{ sale.customerName }}</td>
              
              <td><button class="btn btn-block" style="color:white;background-color:#224534">{{ sale.paymentMethod }}</button></td> 
            </tr>
          </tbody>
        </table>
  
        <!-- Pagination -->
        <nav aria-label="Page navigation example" class="mt-3">
          <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/axios';
  import { useToast } from 'vue-toastification';
  
  export default {
    data() {
      return {
        sales: [], 
        categories: [],
        searchTerm: '',
      };
    },
    created() {
      this.fetchSales(); 
      this.fetchCategories(); 
    },
    computed: {
      filteredSales() {
        return this.sales.filter(sale =>
          sale.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) // Search by customer name
        );
      },
    },
    methods: {
      async fetchSales() {
        try {
          const response = await axios.get('/api/sales'); // Fetch sales
          this.sales = response.data;
        } catch (error) {
          console.error('Error fetching sales:', error);
          useToast().error('Failed to fetch sales');
        }
      },
  
      async fetchCategories() {
        try {
          const response = await axios.get('/api/categories');
          this.categories = response.data; // Store the fetched categories
        } catch (error) {
          console.error('Error fetching categories:', error);
          useToast().error('Failed to fetch categories');
        }
      },
  
      getCategoryName(categoryId) {
        const category = this.categories.find(c => c.categoryId === categoryId);
        return category ? category.categoryName : 'N/A'; // Return category name or 'N/A' if not found
      },
  
      editSale(saleId) {
        this.$router.push({ name: 'sale-product', params: { id: saleId } });
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
  