<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container">
      <div> </div>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
              <router-link to="/" class="nav-link">
              <i class="fa fa-home"></i>
              Home</router-link>
         </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">
          <i class="fa fa-info-circle"></i>
          About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/help" class="nav-link">
          <i class="fa fa-question-circle"></i>
          Help</router-link>
        </li>
        <li class="nav-item" v-if="userStatus == 0">
          <router-link to="/login" class="nav-link">
          <i class="fa fa-user"></i>
          Login</router-link>
        </li>
        
      </div>
    </div>
  </nav>
  
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      userDetails: '',
      userStatus: 0,
      header:'',
    };
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
   }
  }
};
</script>
