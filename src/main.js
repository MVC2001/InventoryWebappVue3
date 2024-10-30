import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavHeader from './components/NavHeader.vue'
import CountCard from './components/CountCard.vue'
import UsersModule from './components/UsersModule.vue'
import FormSearch from './components/FormSearch.vue'
import AddUserForm from './components/AddUserForm.vue'
import UserProfileComponent from './components/UserProfileComponent.vue'
import EditUserComponent  from './components/EditUserComponent.vue'
import UserRoleModule from './components/UserRoleModule.vue'
import AddRoleForm from './components/AddRoleForm.vue'
import RolesFormSearch from './components/RolesFormSearch.vue'
import EditRoleComponent  from './components/EditRoleComponent.vue'
import EditPermissionComponent from './components/EditPermissionComponent.vue'
import AddPermissionForm from './components/AddPermissionForm.vue'
import UserPermissionModule from './components/UserPermissionModule.vue'
import PermissionFormSearch  from './components/PermissionFormSearch.vue'
import WareHouseModule from './components/WareHouseModule.vue'
import AddWareHouseForm from './components/AddWareHouseForm.vue'
import  EditWareHouseComponent from './components/EditWareHouseComponent.vue'
import SupplierModule from './components/SupplierModule.vue'
import AddSupplierForm from './components/AddSupplierForm.vue'
import ProductCategoriesModule from  './components/ProductCategoriesModule.vue'
import AddProductCategoryForm from './components/AddProductCategoryForm.vue'
import ProductInventoryModule  from './components/ProductInventoryModule.vue'
import SalesModule from './components/SalesModule.vue'
import SaleProductComponent from './components/SaleProductComponent.vue'
import AllPaymentsModule from './components/AllPaymentsModule.vue'
import loggedUsersModule from './components/loggedUsersModule.vue'


// Import Toastification
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.component('NavHeader',NavHeader)
app.component('CountCard',CountCard)
app.component('UsersModule',UsersModule)
app.component('FormSearch',FormSearch)
app.component('AddUserForm',AddUserForm)
app.component('UserProfileComponent',UserProfileComponent)
app.component('EditUserComponent',EditUserComponent)
app.component('UserRoleModule',UserRoleModule)
app.component('AddRoleForm',AddRoleForm)
app.component('RolesFormSearch',RolesFormSearch)
app.component('EditRoleComponent',EditRoleComponent)
app.component('EditPermissionComponent',EditPermissionComponent)
app.component('AddPermissionForm',AddPermissionForm)
app.component('UserPermissionModule',UserPermissionModule)
app.component('PermissionFormSearch',PermissionFormSearch)
app.component('WareHouseModule',WareHouseModule)
app.component('AddWareHouseForm',AddWareHouseForm)
app.component('EditWareHouseComponent',EditWareHouseComponent)
app.component('SupplierModule',SupplierModule)
app.component('AddSupplierForm',AddSupplierForm)
app.component('ProductCategoriesModule',ProductCategoriesModule)
app.component('AddProductCategoryForm',AddProductCategoryForm)
app.component('ProductInventoryModule',ProductInventoryModule)
app.component('SalesModule',SalesModule)
app.component('SaleProductComponent',SaleProductComponent)
app.component('AllPaymentsModule',AllPaymentsModule)
app.component('loggedUsersModule',loggedUsersModule)


app.use(router)
// Use Toastification with custom options (optional)
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
})

app.mount('#app')