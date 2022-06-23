<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="/login.png" /> 
      </div>
      <div class="col">
        <div class="row justify-content-center mt-2 mb-2"> 
          <div class="text-center">
           <input v-model="username" placeholder="username">
          </div>
          <span>  ...</span>
         <div class="text-center">
          <input v-model="password" placeholder="password" type="password">
         </div>
         <div class="text-center">
          <br>
          <button class="btn btn-success " @click="login">Login</button>
         </div>
         <span class="text-danger">{{errormsg}} </span><br>
         <div class="text-center">
          <span > Dont have account, Please <a @click ="register" class="text-danger">click here</a> to register</span>
         </div>
        </div>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "App",
    data() {
      return {
        username: "",
        password: "",
        errormsg:"",
      };
    },
    mounted(){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails){
        window.location.href = '/';
      }

    },
    methods: {
     login() {
       this.fields =[];
       this.fields.username = this.username;
       this.fields.password = this.password;
       axios.post('http://127.0.0.1:8000/api/login',{
         'username':this.username,
         'password':this.password,
       }
       ).then((response) => {
        if(response.data.status =='success'){
         this.userDetails = response.data.userDetails;
         localStorage.setItem("userDetails", JSON.stringify(this.userDetails));
         localStorage.setItem("token", response.data.token);
         window.location.href = '/';
       }else{
        this.errormsg ="Invalid Credential"
      }
    })
     },
     register(){
      this.$router.push({ name: "Register" });
    },
  }
};
</script>
<style>

</style>