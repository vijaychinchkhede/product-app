<template>
  <div v-if="userStatus ==0">
    <Header />  
  </div>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-show" v-if="userStatus !=0">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline"><img src="/icon.png" class="icon-style" /> Menu</span>
          </a>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="fa fa-home"></i>
              Home</router-link>
            </li>
            <li class="nav-items">
             <!--  <router-link to="/products" class="nav-link">
                
              Products</router-link> -->

              <a class="nav-link dropdown-toggle" href="/products" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-archive"></i>
                Product
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/product/category" @click="productCategory(e=1)">Mobile</a></li>
                <li><a class="dropdown-item" href="/product/category" @click="productCategory(e=2)">Tablet</a></li>
                <!-- <li><hr class="dropdown-divider"></li> -->
              </ul> 
            </li>
            <li class="nav-item" v-if="userStatus == 1">
              <router-link to="/users" class="nav-link">
                <i class="fa fa-users"></i>
                Users
              </router-link>
            </li>
            <li class="nav-item" v-if="userStatus == 1">
              <router-link to="/allorders" class="nav-link">
                <i class="fa fa-truck"></i>
                Orders
              </router-link>
            </li>
            <li class="nav-item" v-if="userStatus == 2">
              <router-link to="/cart" class="nav-link">
                <i class="fa fa-shopping-cart"></i>
                Cart
              </router-link>
            </li>
            <li class="nav-item" v-if="userStatus == 2">
              <router-link to="/order" class="nav-link">
                <i class="fa fa-shopping-bag"></i>
                Order
              </router-link>
            </li>
            <li class="nav-item" v-if="userStatus == 1">
              <router-link to="/products/create" class="nav-link">
                <i class="fa fa-plus-circle"></i> Add Product
              </router-link>
            </li>
            <li class="nav-item" v-if="userStatus != 0">
              <a class="nav-link" @click="logout">
                <i class="fa fa-user-o" aria-hidden="true"></i>
              Logout</a>
            </li>
            <li class="nav-item" v-if="userStatus == 2">
              <router-link to="/about" class="nav-link">
              <i class="fa fa-info-circle"></i>
              About</router-link>
            </li>
            <li class="nav-item" v-if="userStatus == 2">
              <router-link to="/help" class="nav-link">
              <i class="fa fa-question-circle"></i>
              Help</router-link>
            </li>
          </ul>
          <hr>
        </div>
      </div>
      <div class="col py-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap/dist/js/bootstrap.min.js"
  import Footer from "./footer/Footer";
  import Header from "./header/Header";
  export default {
    name: "Layout",
    data() {
      return {
        userDetails: '',
        userStatus: 0,
        header:'',
      };
    },
    props: {
      msg: String,
    },
    components: {
      Header,
      Footer,
    },
    mounted(){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

      if(this.userDetails){
        this.userType = this.userDetails.userType;
        if(this.userType =='admin'){
          this.userStatus = 1;
        }
        if(this.userType =='user'){
          this.userStatus = 2;
        }
      }
    },
    methods: {
      logout(){
        localStorage.clear();
        window.location.href = '/';
       //window.location.reload();
     },
     productCategory(e){
      localStorage.setItem('productCategory',e);
     }
   }
 };
</script>
<style type="text/css">
 .bg-show {
  --bs-bg-opacity: 1;
  background-color: aqua;
}
.icon-style{
    vertical-align: middle; 
    height: 50px;
}
.dropdown-menu {
    position: absolute;
    z-index: 1000;
    display: none;
    min-width: 10rem;
    padding: 0rem 0;
    margin: 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #34eef7;
    background-clip: padding-box;
    border: 1pxsolidrgba(0,0,0,.15);
    border-radius: .25rem;
}
</style>
