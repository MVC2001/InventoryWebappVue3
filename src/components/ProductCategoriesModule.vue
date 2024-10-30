<template>
    <div class="categories mt-5 py-5">
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
  
          <a href="add-category">
            <button class="btn btn" style="background-color:#075d80; color:white;">
              <i class="fa fa-plus"></i> Add Category
            </button>
          </a>
        </div>
      </div>
  
      <div class="table-responsive">
        <table class="table text-center table-striped table-bordered" style="width:100%">
          <thead>
            <tr>
              <th>No#</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in filteredCategories" :key="category.categoryId">
              <td>{{ index + 1 }}</td>
              <td>{{ category.categoryName }}</td>
              <td>{{ category.categoryDescription }}</td>
              <td>
                <div class="d-flex">
                  <button @click="editCategory(category.categoryId)" class="btn btn-warning">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button @click="confirmDeleteCategory(category.categoryId)" class="btn btn-danger">
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
        categories: [],
        searchTerm: '', // Initialize search term
      };
    },
    created() {
      this.fetchCategories(); // Fetch categories on component creation
    },
    computed: {
      filteredCategories() {
        // Filter categories based on the search term
        return this.categories.filter(category =>
          category.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('/api/categories');
          this.categories = response.data; // Update the categories array with fetched data
        } catch (error) {
          console.error('Error fetching categories:', error.response ? error.response.data : error.message);
          useToast().error('Failed to fetch categories');
        }
      },
  
      editCategory(categoryId) {
        this.$router.push({ name: 'edit-category', params: { id: categoryId } });
      },
  
      confirmDeleteCategory(categoryId) {
        const confirmDelete = confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
          this.deleteCategory(categoryId);
        }
      },
  
      async deleteCategory(categoryId) {
        try {
          await axios.delete(`/api/categories/${categoryId}`);
          this.categories = this.categories.filter(category => category.categoryId !== categoryId);
          useToast().success('Category deleted successfully');
        } catch (error) {
          console.error('Error deleting category:', error.response ? error.response.data : error.message);
          useToast().error('Failed to delete category');
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
  