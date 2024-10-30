<template>
  <div class="sidebarv1">
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block sidebar">
          <div class="sidebar-header">
            <div class="card1">
              <a href="/dashboard">
                <i class="fa fa-dashboard"></i> Dashboard
              </a>
              <button
                class="navbar-toggler"
                type="button"
                @click="toggleMenu"
                aria-controls="sidebarMenu"
                aria-expanded="isMenuOpen"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
          <div class="sidebar-content" :class="{ 'collapse': !isMenuOpen }" id="sidebarMenu">
            <ul class="nav flex-column" style="margin-top: 30px;">
              <!-- ADMIN role -->
              <template v-if="userRole === 'ADMIN' || userRole === 'MANAGER'">
                <li class="nav-item">
                  <a class="nav-link" href="#" @click.prevent="toggleUsers">
                    <i class="fa fa-users"></i> Users <i class="fa fa-sort-down" style="font-size: 15px;"></i>
                  </a>
                  <ul v-show="showUsers" class="nav flex-column ml-3">
                    <li class="nav-item">
                      <a class="nav-link" href="/users">
                        <i class="fa fa-eye"></i> Manage Users
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#" @click.prevent="toggleRoles">
                    <i class="fa fa-book"></i> Roles <i class="fa fa-sort-down" style="font-size: 15px;"></i>
                  </a>
                  <ul v-show="showRoles" class="nav flex-column ml-3">
                    <li class="nav-item">
                      <a class="nav-link" href="/roles">
                        <i class="fa fa-list"></i> Manage Roles
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#" @click.prevent="togglePermissions">
                    <i class="fa fa-lock"></i> Permissions <i class="fa fa-sort-down" style="font-size: 15px;"></i>
                  </a>
                  <ul v-show="showPermissions" class="nav flex-column ml-3">
                    <li class="nav-item">
                      <a class="nav-link" href="/permissions">
                        <i class="fa fa-list"></i> Manage Permissions
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/audit-trail">
                    <i class="fa fa-history"></i> Audit Trail
                  </a>
                </li>
              </template>

              <!-- PURCHASER role -->
              <template v-if="userRole === 'PURCHASER' || userRole === 'ADMIN' || userRole === 'MANAGER'">
                <li class="nav-item">
                  <a class="nav-link" href="/warehouse">
                    <i class="fa fa-building"></i> Warehouses
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/suppliers">
                    <i class="fa fa-truck"></i> Suppliers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/purchases">
                    <i class="fa fa-shopping-cart"></i> Purchases
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/product-categories">
                    <i class="fa fa-list"></i> Product Categories
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/products">
                    <i class="fa fa-product-hunt"></i> Products
                  </a>
                </li>
              </template>

              <!-- SELLER role -->
              <template v-if="userRole === 'SELLER' || userRole === 'ADMIN' || userRole === 'MANAGER'">
                <li class="nav-item">
                  <a class="nav-link" href="/stock">
                    <i class="fa fa-product-hunt"></i> Stocks
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/sales">
                    <i class="fa fa-shopping-bag"></i> Sales
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/payments">
                    <i class="fa fa-credit-card"></i> Payments
                  </a>
                </li>
              </template>

              <!-- MANAGER role -->
              <template v-if="userRole === 'MANAGER' || userRole === 'ADMIN'">
                <li class="nav-item">
                  <a class="nav-link" href="/reportManagement">
                    <i class="fa fa-print"></i> Purchases Report
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/reportManagement">
                    <i class="fa fa-print"></i> Inventory Report
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/reportManagement">
                    <i class="fa fa-print"></i> Sales Report
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/reportManagement">
                    <i class="fa fa-print"></i> Payments Report
                  </a>
                </li>
              </template>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios'; // Ensure this points to your axios instance

const userRole = ref(''); // Store user role
const showUsers = ref(false);
const showRoles = ref(false);
const showPermissions = ref(false);
const isMenuOpen = ref(true); // Track menu state

// Fetch the user's profile on mount
onMounted(async () => {
  try {
    const response = await axios.get('/api/auth/profile');
    userRole.value = response.data.role; // Assuming the role is available in the response
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
});

// Toggling sidebar sections
const toggleUsers = () => {
  showUsers.value = !showUsers.value;
  showRoles.value = false;
  showPermissions.value = false;
};

const toggleRoles = () => {
  showRoles.value = !showRoles.value;
  showUsers.value = false;
  showPermissions.value = false;
};

const togglePermissions = () => {
  showPermissions.value = !showPermissions.value;
  showUsers.value = false;
  showRoles.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value; // Toggle the menu open state
};
</script>

<style scoped>
#sidebar {
  background-color: white;
  min-height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  position: fixed;
  margin-top: 60px;
  top: 0;
  color: #212f3d;
  font-size: 16px;
  left: 0;
  z-index: 100;
  padding: 1rem;
  height: calc(100vh - 60px);
  overflow-y: auto; /* Enable vertical scrolling */
}

.card1 {
  width: 160px;
  height: 30px;
  margin-top: 20px;
  color: #075d80;
  font-weight: bold;
  font-size: 18px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  text-align: center;
  background-color: white;
}

.nav-link {
  color: #212f3d;
  cursor: pointer;
}

.nav-link.active {
  background-color: #1a242f;
}

.nav-item ul {
  padding-left: 1.5rem;
}

.sidebarv1 {
  font-family: 'Euclid Circular';
  font-size: 12px;
}

.nav-item ul .nav-link {
  color: #212f3d;
}

/* Mobile styles */
@media (max-width: 768px) {
  #sidebar {
    position: absolute;
    left: -100%; /* Hide sidebar off-screen */
    transition: left 0.3s ease;
  }

  #sidebar.show {
    left: 0; /* Show sidebar */
  }

  .navbar-toggler {
    display: block; /* Show toggle button */
  }
}
</style>
