import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Helper from '../views/Helper.vue';
import NProgress from 'nprogress';
import About from '../views/About.vue';
import ProductList from '../views/products/ProductList.vue';
import ProductCreate from '../views/products/ProductCreate.vue';
import ProductEdit from '../views/products/ProductEdit.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Cart from '../views/products/Cart.vue';
import PaymentCheckout from '../views/PaymentCheckout.vue';
import Order from '../views/products/Order.vue';
import UserList from '../components/user/UserList.vue';
import OrderList from '../components/orders/OrderList.vue';
import ProductListCategory from '../components/products/list/ProductListCategory.vue';
import UserEdit from '../components/user/UserEdit.vue';
import UserProfileEdit from '../components/user/UserProfileEdit.vue';
import Success from '../views/Success.vue';
import Error from '../views/Error.vue';
import NotFound from '../views/NotFound.vue';
import Dashboard from '../components/admin/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/help',
    name: 'Help',
    component: Helper
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductList 
  },
  {
    path: '/products/create',
    name: 'Product Create',
    component: ProductCreate 
  },
  {
    path: '/products/edit/:id',
    name: 'ProductEdit',
    component: ProductEdit
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
   {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Crat',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: PaymentCheckout
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/users',
    name: 'Users',
    component: UserList
  },
  {
    path: '/allorders',
    name: 'All Orders',
    component: OrderList
  },
  {
    path: '/product/category',
    name: 'Product Category',
    component: ProductListCategory
  },
  {
    path: '/user/edit/:id',
    name: 'UserEdit',
    component: UserEdit
  },
  {
    path: '/updateProfile',
    name: 'Update Profile',
    component: UserProfileEdit
  },
  {
    path: '/success',
    name: 'Payment Success',
    component: Success
  },
  {
    path: '/error',
    name: 'Payment Fail',
    component: Error
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/:catchAll(.*)',
    name: 'Page Not Found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const userLogin = JSON.parse(localStorage.getItem('userDetails'));
const requireAuth = userLogin ? 'true' : 'false';
router.beforeEach((to, from, next) => {
    if (userLogin) {
        next(); 
    } else {
       // window.location.href = '/login';
        next();
    } 
});

router.afterEach(() => {
  NProgress.done()
});

export default router
