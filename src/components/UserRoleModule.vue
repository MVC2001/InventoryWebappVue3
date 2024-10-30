<template>
  <div class="users mt-5 py-5">
    <div class="form-search">
      <div class="main d-flex justify-content-between mb-3">
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

        <a href="add-role">
          <button class="btn btn" data-toggle="modal" data-target=".bd-example-modal-lg" style="background-color:#075d80; color:white;">
            <i class="fa fa-plus"></i> Add Role
          </button>
        </a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table text-center table-striped table-bordered" style="width:100%">
        <thead>
          <tr>
            <th>No#</th>
            <th>Role Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, index) in filteredRoles" :key="role.id"> <!-- Use filteredRoles -->
            <td>{{ index + 1 }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.description }}</td>
            <td>
              <div class="d-flex">
                <button @click="editRole(role.id)" class="btn btn-warning">
                  <i class="fa fa-pencil"></i>
                </button>
                <button @click="confirmDeleteRole(role.id)" class="btn btn-danger">
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
      roles: [],
      searchTerm: '', // Initialize search term
    };
  },
  created() {
    this.fetchRoles(); // Fetch roles on component creation
  },
  computed: {
    filteredRoles() {
      // Filter roles based on the search term
      return this.roles.filter(role => 
        role.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await axios.get('/api/auth/roles');
        this.roles = response.data; // Update the roles array with the fetched data
      } catch (error) {
        console.error('Error fetching roles:', error.response ? error.response.data : error.message);
        useToast().error('Failed to fetch roles');
      }
    },
    editRole(roleId) {
      this.$router.push({ name: 'edit-role', params: { id: roleId } });
    },
    confirmDeleteRole(roleId) {
      const confirmDelete = confirm("Are you sure you want to delete this role?");
      if (confirmDelete) {
        this.deleteRole(roleId);
      }
    },
    async deleteRole(roleId) {
      try {
        await axios.delete(`/api/auth/roles/${roleId}`);
        this.roles = this.roles.filter(role => role.id !== roleId);
        useToast().success('Role deleted successfully');
      } catch (error) {
        console.error('Error deleting role:', error.response ? error.response.data : error.message);
        useToast().error('Failed to delete role');
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
