<template>
    <div class="suppliers mt-5 py-5">
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
  
          <a href="add-supplier">
            <button class="btn btn" style="background-color:#075d80; color:white;">
              <i class="fa fa-plus"></i> Add Supplier
            </button>
          </a>
        </div>
      </div>
  
      <div class="table-responsive">
        <table class="table text-center table-striped table-bordered" style="width:100%">
          <thead>
            <tr>
              <th>No#</th>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(supplier, index) in filteredSuppliers" :key="supplier.supplierId">
              <td>{{ index + 1 }}</td>
              <td>{{ supplier.supplierName }}</td>
              <td>{{ supplier.contactPerson }}</td>
              <td>{{ supplier.email }}</td>
              <td>
                <div class="d-flex">
                  <button @click="editSupplier(supplier.supplierId)" class="btn btn-warning">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button @click="confirmDeleteSupplier(supplier.supplierId)" class="btn btn-danger">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </td>
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
        suppliers: [],
        searchTerm: '', // Initialize search term
      };
    },
    created() {
      this.fetchSuppliers(); // Fetch suppliers on component creation
    },
    computed: {
      filteredSuppliers() {
        // Filter suppliers based on the search term
        return this.suppliers.filter(supplier =>
          supplier.supplierName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      async fetchSuppliers() {
        try {
          const response = await axios.get('/api/suppliers');
          this.suppliers = response.data; // Update the suppliers array with fetched data
        } catch (error) {
          console.error('Error fetching suppliers:', error.response ? error.response.data : error.message);
          useToast().error('Failed to fetch suppliers');
        }
      },


      editSupplier(supplierId) {
        this.$router.push({ name: 'edit-supplier', params: { id: supplierId } });
      },

      confirmDeleteSupplier(supplierId) {
        const confirmDelete = confirm("Are you sure you want to delete this supplier?");
        if (confirmDelete) {
          this.deleteSupplier(supplierId);
        }
      },
      async deleteSupplier(supplierId) {
        try {
          await axios.delete(`/api/suppliers/${supplierId}`);
          this.suppliers = this.suppliers.filter(supplier => supplier.supplierId !== supplierId);
          useToast().success('Supplier deleted successfully');
        } catch (error) {
          console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
          useToast().error('Failed to delete supplier');
        }
      }
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
  