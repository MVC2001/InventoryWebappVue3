import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '@/views/auth/AdminDashboard.vue';
import AuthPage from '@/views/AuthPage.vue';
import UsersPage from '../views/users/UsersPage.vue';
import AddUserPage from '../views/users/AddUserPage.vue'
import UserProfile from '../views/users/UserProfile.vue'
import EditUser from '../views/users/EditUser.vue'
import  UserRoles from '../views/roles/UserRoles.vue'
import AddRole from '../views/roles/AddRole.vue'
import EditRole from '../views/roles/EditRole.vue'
import AddPermission from '../views/permissions/AddPermission.vue'
 import EditPermission from '../views/permissions/EditPermission.vue'
import UserPermission from '../views/permissions/UserPermission.vue'
import wareHouses from '../views/wareHouse/wareHouses.vue'
import viewWareHouse from '../views/wareHouse/viewWareHouse.vue'
import addWareHouse from '../views/wareHouse/addWareHouse.vue'
import editWareHouse from '../views/wareHouse/editWareHouse.vue'
import AllSuppliers from '../views/suppliers/AllSuppliers.vue'
import addSupplier from '../views/suppliers/addSupplier.vue'
import editSupplier from '../views/suppliers/editSupplier.vue'
import ProductCategories from '../views/productCategories/ProductCategories.vue'
import addProductCategory from '../views/productCategories/addProductCategory.vue'
import editProductCategory from '../views/productCategories/editProductCategory.vue';
import ProductPurchases from '../views/purchases/ProductPurchases.vue'
import addProductPurchase from '../views/purchases/addProductPurchase.vue'
import editProductPurchase from '../views/purchases/editProductPurchase.vue'
import  ResetPasswordRequest from '../views/ResetPasswordRequest.vue'
import ResetPasswordPage from '../views/ResetPasswordPage.vue'
import ProductsPage from '../views/products/ProductsPage.vue'
import addProduct from '../views/products/addProduct.vue'
import editProduct from '../views/products/editProduct.vue'
import ProductInventory from '../views/inventory/ProductInventory.vue'
import SalesPage from '../views/sales/SalesPage.vue'
import addSale from '../views/sales/addSale.vue'
import AllPayments from '../views/payments/AllPayments.vue'
import loggedUsers from '../views/audit_trail/loggedUsers.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: AuthPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/audit-trail',
      name: 'audit-trail',
      component: loggedUsers,
      meta: { requiresAuth: true }
    },
    
    {
      path: '/add-user',
      name: 'add-user',
      component: AddUserPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-user/:id',  
      name: 'edit-user',
      component: EditUser,
      props: true,
      meta: { requiresAuth: true }
    },

    {
      path: '/roles',
      name: 'roles',
      component:  UserRoles,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-role',
      name: 'add-role',
      component: AddRole,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-role/:id', 
      name: 'edit-role',
      component: EditRole,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/permissions',
      name: 'permissions',
      component:  UserPermission,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-permission',
      name: 'add-permission',
      component: AddPermission,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-permission/:id',  
      name: 'edit-permission',
      component: EditPermission,
      props: true,
      meta: { requiresAuth: true }
    },
   
    { path: '/reset-password', component: ResetPasswordRequest },
    { path: '/update-password', component: ResetPasswordPage },
    

    {
      path: '/warehouse',
      name: 'warehouse',
      component: wareHouses,
      meta: { requiresAuth: true }
    },
    
    {
      path: '/warehouses',
      name: 'warehouses',
      component: viewWareHouse,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-warehouse',
      name: 'add-warehouse',
      component: addWareHouse,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-warehouse/:id',  
      name: 'edit-warehouse',
      component: editWareHouse,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: AllSuppliers,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-supplier',
      name: 'add-supplier',
      component: addSupplier,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-supplier/:id',  
      name: 'edit-supplier',
      component: editSupplier,
      props: true,
      meta: { requiresAuth: true }
    },
    
    
    {
      path: '/product-categories',
      name: 'product-categories',
      component: ProductCategories,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-category',
      name: 'add-category',
      component: addProductCategory,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-category/:id',  
      name: 'edit-category',
      component: editProductCategory,
      props: true,
      meta: { requiresAuth: true }
    },

    {
      path: '/purchases',
      name: 'purchases',
      component: ProductPurchases,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-purchase',
      name: 'add-purchase',
      component: addProductPurchase,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-purchase/:id',  
      name: 'edit-purchase',
      component: editProductPurchase,
      props: true,
      meta: { requiresAuth: true }
    },

    {
      path: '/products',
      name: 'products',
      component: ProductsPage,
      meta: { requiresAuth: true }
    },

    {
      path: '/add-product',
      name: 'add-product',
      component: addProduct,
      meta: { requiresAuth: true }
    },
    
    {
      path: '/edit-product/:id',  
      name: 'edit-product',
      component: editProduct,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/stock',
      name: 'stock',
      component: ProductInventory,
      meta: { requiresAuth: true }
    },
    {
      path: '/sales',
      name: 'sales',
      component: SalesPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/create-sale',
      name: 'create-sale',
      component: addSale,
      meta: { requiresAuth: true }
    },
    {
      path: '/payments',
      name: 'payments',
      component: AllPayments,
      meta: { requiresAuth: true }
    },
   
    
    
  ]
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Check if token exists

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
