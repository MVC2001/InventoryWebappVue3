<template>
    <div class="warehouses mt-5 py-5">
      <div class="form-search">
        <div class="main d-flex justify-content-between mb-3">
          <!-- Search Form -->
          <form class="form-inline d-flex" @submit.prevent>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search by name"
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
              <th>Warehouse Name</th>
              <th>Location</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(warehouse, index) in filteredWarehouses" :key="warehouse.warehouseId">
              <td>{{ index + 1 }}</td>
              <td>{{ warehouse.warehouseName }}</td>
              <td>{{ warehouse.location }}</td>
              <td>{{ warehouse.capacity }}</td>
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
        warehouses: [],
        searchTerm: '', // Initialize search term
      };
    },
    created() {
      this.fetchWarehouses(); // Fetch warehouses on component creation
    },
    computed: {
      filteredWarehouses() {
        // Filter warehouses based on the search term
        return this.warehouses.filter(warehouse => 
          warehouse.warehouseName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      async fetchWarehouses() {
        try {
          const response = await axios.get('/api/warehouses');
          this.warehouses = response.data; // Update the warehouses array with fetched data
        } catch (error) {
          console.error('Error fetching warehouses:', error.response ? error.response.data : error.message);
          useToast().error('Failed to fetch warehouses');
        }
      },
    }
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
  