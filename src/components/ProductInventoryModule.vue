<template>
    <div class="products mt-5 py-5">
      <div class="form-search">
        <div class="main d-flex justify-content-between mb-3">
          <!-- Search Form -->
          <form class="form-inline d-flex" @submit.prevent>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search by product name"
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
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="product.productId">
              <td>{{ index + 1 }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.description }}</td>
              <td><button class="btn btn-block" style="color:white;background-color:#beaa2b ">{{ product.quantity }}</button></td>
              <td>{{ product.price.toFixed(2) }}</td>
              <td>{{ getCategoryName(product.categoryId) }}</td> <!-- Displays category name -->
            </tr>
          </tbody>
        </table>
  
        <!-- Pagination -->
        <nav aria-label="Page navigation example" class="mt-3">
          <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
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
        products: [],
        suppliers: [],
        categories: [],
        searchTerm: '',
      };
    },
    created() {
      this.fetchProducts();
      this.fetchSuppliers(); // Fetch suppliers
      this.fetchCategories(); // Fetch categories
    },
    computed: {
      filteredProducts() {
        return this.products.filter(product =>
          product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('/api/products');
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
          useToast().error('Failed to fetch products');
        }
      },
  
      async fetchSuppliers() {
        try {
          const response = await axios.get('/api/suppliers');
          this.suppliers = response.data; // Store the fetched suppliers
        } catch (error) {
          console.error('Error fetching suppliers:', error);
          useToast().error('Failed to fetch suppliers');
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
  
      editProduct(productId) {
        this.$router.push({ name: 'edit-product', params: { id: productId } });
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
  