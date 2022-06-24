import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Helper from '../views/Helper.vue';
import NProgress from 'nprogress';

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
    component: () => import('../views/About.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/products/ProductList.vue')
  },
  {
    path: '/products/create',
    name: 'Product Create',
    component: () => import('../views/products/ProductCreate.vue')
  },
  {
    path: '/products/edit/:id',
    name: 'ProductEdit',
    component: () => import('../views/products/ProductEdit.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
   {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/cart',
    name: 'Crat',
    component: () => import('../views/products/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/PaymentCheckout.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/products/Order.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../components/user/UserList.vue')
  },
  // {
  //   path: '/allorders',
  //   name: 'All Orders',
  //   component: () => import('../components/order/OrderList.vue')
  // },
 {
    path: '/success',
    name: 'Payment Success',
    component: () => import('../views/Success.vue')
  },
   {
    path: '/error',
    name: 'Payment Fail',
    component: () => import('../views/Error.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'Page Not Found',
    component: () => import('../views/NotFound.vue')
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
