<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2"> 
      <div>
        <div class="card-body">
        <span>Username :  </span>
          <input v-model="username" placeholder="xyz@gmail.com">
        </div>
        <div class="card-body">
        <span>Password :  </span>
           <input v-model="password" placeholder="password" type="password">
        </div>
        <div class="card-body">
          <button class="btn btn-success " @click="login">Login</button>
        </div>
      </div>
      <span class="text-danger">{{errormsg}} </span>
    </div>
    <span> Dont have account, Please <a @click ="register" class="text-danger">click here</a> to register</span>
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