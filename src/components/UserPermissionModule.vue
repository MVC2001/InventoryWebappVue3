<template>
  <div class="permissions mt-5 py-5">
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

        <a href="add-permission">
          <button class="btn btn" data-toggle="modal" data-target=".bd-example-modal-lg" style="background-color:#075d80; color:white;">
            <i class="fa fa-plus"></i> Add Permission
          </button>
        </a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table text-center table-striped table-bordered" style="width:100%">
        <thead>
          <tr>
            <th>No#</th>
            <th>Permission Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(permission, index) in filteredPermissions" :key="permission.id"> <!-- Use filteredPermissions -->
            <td>{{ index + 1 }}</td>
            <td>{{ permission.name }}</td>
            <td>{{ permission.description }}</td>
            <td>
              <div class="d-flex">
                <button @click="editPermission(permission.id)" class="btn btn-warning">
                  <i class="fa fa-pencil"></i>
                </button>
                <button @click="confirmDeletePermission(permission.id)" class="btn btn-danger">
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
      permissions: [],
      searchTerm: '', // Initialize search term
    };
  },
  created() {
    this.fetchPermissions(); // Fetch permissions on component creation
  },
  computed: {
    filteredPermissions() {
      // Filter permissions based on the search term
      return this.permissions.filter(permission => 
        permission.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    async fetchPermissions() {
      try {
        const response = await axios.get('/api/auth/permissions');
        this.permissions = response.data; // Update the permissions array with fetched data
      } catch (error) {
        console.error('Error fetching permissions:', error.response ? error.response.data : error.message);
        useToast().error('Failed to fetch permissions');
      }
    },
    editPermission(permissionId) {
      this.$router.push({ name: 'edit-permission', params: { id: permissionId } });
    },
    confirmDeletePermission(permissionId) {
      const confirmDelete = confirm("Are you sure you want to delete this permission?");
      if (confirmDelete) {
        this.deletePermission(permissionId);
      }
    },
    async deletePermission(permissionId) {
      try {
        await axios.delete(`/api/auth/permissions/${permissionId}`);
        this.permissions = this.permissions.filter(permission => permission.id !== permissionId);
        useToast().success('Permission deleted successfully');
      } catch (error) {
        console.error('Error deleting permission:', error.response ? error.response.data : error.message);
        useToast().error('Failed to delete permission');
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
