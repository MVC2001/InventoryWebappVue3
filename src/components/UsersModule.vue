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

        <a href="add-user">
          <button class="btn btn" data-toggle="modal" data-target=".bd-example-modal-lg" style="background-color:#075d80; color:white;">
            <i class="fa fa-plus"></i> Add User
          </button>
        </a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table text-center table-striped table-bordered" style="width:100%">
        <thead>
          <tr>
            <th>No#</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status ? user.status : 'N/A' }}</td>
            <td>
              <div class="d-flex">
                <button @click="editUser(user.id)" class="btn btn-warning">
                  <i class="fa fa-pencil"></i>
                </button>
                <button @click="confirmDeleteUser(user.id)" class="btn btn-danger">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      users: [],
      searchTerm: '', 
    };
  },
  created() {
    this.fetchUsers();
  },
  computed: {
    filteredUsers() {
      // Filter users based on the search term
      return this.users.filter(user => 
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/auth/users');
        this.users = response.data;
        userSet(response.data); // Call userSet with fetched users
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
        useToast().error('Failed to fetch users or not your resource');
      }
    },

    editUser(id) {
      this.$router.push({ name: 'edit-user', params: { id: id } });
    },
    
    confirmDeleteUser(userId) {
      const confirmDelete = confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        this.deleteUser(userId);
      }
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`/api/auth/users/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
        useToast().success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        useToast().error('Failed to delete user');
      }
    }
  }
};

// Function to handle user data
const userSet = (userData) => {
  // Store user data in local storage or a state management solution
  localStorage.setItem('users', JSON.stringify(userData));
  // Additional logic can be added here if needed
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
