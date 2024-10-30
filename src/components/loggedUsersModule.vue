<template>
    <div class="audit-trails mt-5 py-5">
      <div class="form-search">
        <div class="main d-flex justify-content-between mb-3">
          <form class="form-inline d-flex" @submit.prevent>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search by username"
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
              <th>Action</th>
              <th>Username</th>
              <th>Details</th>
              <th>Logged at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trail, index) in filteredAuditTrails" :key="trail.id">
              <td>{{ index + 1 }}</td>
              <td>{{ trail.action }}</td>
              <td>{{ trail.username }}</td>
              <td>{{ trail.details }}</td>
              <td>{{ new Date(trail.createdAt).toLocaleString() }}</td>
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
        auditTrails: [],
        searchTerm: '', 
      };
    },
    created() {
      this.fetchAuditTrails();
    },
    computed: {
      filteredAuditTrails() {
        // Filter audit trails based on the search term
        return this.auditTrails.filter(trail => 
          trail.username.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      async fetchAuditTrails() {
        try {
          const response = await axios.get('/api/audit-trail');
          this.auditTrails = response.data;
        } catch (error) {
          console.error('Error fetching audit trails:', error.response ? error.response.data : error.message);
          useToast().error('Failed to fetch audit trails');
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
  