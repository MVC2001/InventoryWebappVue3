<template>
  <div class="cards">
    <div class="container-fluid">
      <div class="row mt-5">
        <!-- Users Column (visible only to ADMIN) -->
        <div v-if="userRole === 'ADMIN'" class="col-md-4">
          <div class="card">
            <div class="card-header" style="background-color: white; color: #212f3d;">
              Users
            </div>
            <div class="card-body py-5">
              <i class="fa fa-users" aria-hidden="true" style="font-size: 30px;"></i> {{ userCount }}
            </div>
          </div>
        </div>
        
        <!-- Roles Column (visible only to ADMIN) -->
        <div v-if="userRole === 'ADMIN'" class="col-md-4">
          <div class="card">
            <div class="card-header" style="background-color: white; color: #212f3d;">
              Roles
            </div>
            <div class="card-body py-5">
              <i class="fa fa-book" aria-hidden="true" style="font-size: 30px;"></i> {{ roleCount }}
            </div>
          </div>
        </div>
        
        <!-- Permissions Column (visible only to ADMIN) -->
        <div v-if="userRole === 'ADMIN'" class="col-md-4">
          <div class="card">
            <div class="card-header" style="background-color: white; color: #212f3d;">
              Permissions
            </div>
            <div class="card-body py-5">
              <i class="fa fa-lock" aria-hidden="true" style="font-size: 30px;"></i> {{ permissionCount }}
            </div>
          </div>
        </div>

        <!-- Permissions Column (visible only to MANAGER) -->
        <div v-if="userRole === 'MANAGER'" class="col-md-12">
          <div class="card-header text-center" style="box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
            <h5>Welcome <b>manager</b> to the Dashboard!</h5>
          </div>
              <div class="card-body py-5 text-center">
               <div class="container">
                <div class="row">
                  <div class="col-md-3">
                    <div class="card" style="width:200px;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
                      <div class="card-header" style="font-size: 23px;background-color:#21618c ;color:white">
                        <h4 style="font-size: 16px;">Purchases Summary</h4>
                      </div>
                      <div class="card-body">
                        <h4 class="py-3" style="font-size: 20px">Total purchases: 122</h4>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="card" style="width:200px;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
                      <div class="card-header" style="font-size: 23px;background-color:#976a12 ;color:white">
                        <h4 style="font-size: 16px;">Sales Summary</h4>
                      </div>
                      <div class="card-body">
                        <h4 class="py-1" style="font-size: 20px">Total sales: 122</h4>
                        <p class="" style="font-size: 18px;color:#976a12;font-weight:bold">Most Sold-product: (Male-shirt)</p>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="card" style="width:200px;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
                      <div class="card-header" style="font-size: 23px;background-color:#94af46 ;color:white">
                        <h4 style="font-size: 16px;">Payments Summary</h4>
                      </div>
                      <div class="card-body">
                        <h4 class="py-3" style="font-size: 20px">Total payments: 122</h4>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-3">
                    <div class="card" style="width:200px;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
                      <div class="card-header" style="font-size: 23px;background-color:#224534 ;color:white">
                        <h4 style="font-size: 16px;">Revenue Summary</h4>
                      </div>
                      <div class="card-body">
                        <h4 class="py-3" style="font-size: 20px">Total revenue: 122</h4>
                      </div>
                    </div>
                  </div>
                </div>
               </div>
          </div>
        </div>

        
        <!-- Permissions Column (visible only to PURCHASER) -->
        <div v-if="userRole === 'PURCHASER'" class="col-md-12">
              <div class="card-body py-5 text-center">
                <h5>Welcome <b>purchaser</b> to the Dashboard!</h5>
                <p>This is your page enjoy to access all resources.</p>
          </div>
        </div>

        <!-- Permissions Column (visible only to SELLER) -->
        <div v-if="userRole === 'SELLER'" class="col-md-12">
              <div class="card-body py-5 text-center">
                <h5>Welcome <b>seller</b> to the Dashboard!</h5>
                <p>This is your page enjoy to access all resources.</p>
            </div>
        </div>

        <!-- Welcome message for non-admin users -->
        <div v-if="userRole === ''" class="col-md-12">
        <div class="col-md-12">
            <div class="card-body py-5 text-center">
              <h5>Welcome to the Dashboard!</h5>
              <p>You do not have access to the any features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'; // Import your custom axios instance
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'CountCard',
  setup() {
    const userRole = ref(''); // Store user role
    const userCount = ref(0);
    const roleCount = ref(0);
    const permissionCount = ref(0);
    const toast = useToast();

    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get('/api/auth/users/count');
        userCount.value = userResponse.data;

        const roleResponse = await axios.get('/api/auth/roles/count');
        roleCount.value = roleResponse.data;

        const permissionResponse = await axios.get('/api/auth/permissions/count');
        permissionCount.value = permissionResponse.data;
      } catch (error) {
        handleError(error);
      }
    };

    const handleError = (error) => {
      let message = 'An unexpected error occurred';
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else {
          message = error.response.statusText;
        }
      } else if (error.request) {
        message = 'No response from the server. Please check your connection.';
      } else {
        message = error.message;
      }
      toast.error(message); // Use Toast to display error message
    };

    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        userRole.value = response.data.role; // Assuming the role is available in the response
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    onMounted(() => {
      fetchUserRole(); // Fetch user role on mount
      fetchCounts(); // Fetch counts when the component is mounted
    });

    return {
      userCount,
      roleCount,
      permissionCount,
      userRole
    };
  }
};
</script>

<style scoped>
.card {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  width: 260px;
  font-family: 'Euclid Circular';
  font-size: 17px;
  text-align: center;
  height: 190px;
  margin-bottom: 30px; /* Adjusted margin for better spacing */
}
</style>
