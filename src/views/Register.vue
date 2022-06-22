<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2"> 
      <div>
         <div class="card-body">
        <span>Name :  </span>
          <input v-model="name" placeholder="xyz">
        </div>
        <div class="card-body">
          <span>Email :  </span>
          <input v-model="email" @input="isEmailValid(email)" placeholder="xyz@gmail.com">
         </div>
         <div class="card-body">
          <span>Mobile :  </span>
          <input v-model="mobile" placeholder="Mobile Number" type="number">
         </div>
        <!-- <span class="text-danger">{{emailerror}} </span> -->
        <div class="card-body">
        <span>Password :  </span>
           <input v-model="password" placeholder="password" type="password">
        </div>
        <div class="card-body">
          <button class="btn btn-success " @click="register">Register</button>
        </div>
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
      name: "",
      email:"",
      password: "",
      emailerror:'',
      errormsg:'',
      mobile:'',
      userDetails:''
    };
  },
  mounted(){
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails){
        window.location.href = '/';
    }
  },
  methods: {
   register() {
   if(this.emailerror == ''){
      axios.post('http://127.0.0.1:8000/api/register',{
       'name':this.name,
       'email':this.email,
       'mobile_number':this.mobile,
      'password':this.password,
      }
      ).then((response) => {
      if(response.data.status =='200'){
          window.location.href = '/login';
      }
      })
      }
    },

     isEmailValid(email) {
        const emailRegexp = new RegExp(
          /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
        )

        if(email){
          if(emailRegexp.test(email)){
            this.emailerror = "";
          }else{
            this.emailerror = "Please enter valid email";
          }
        }else{
          this.emailerror = "Please enter email";
        }
  return emailRegexp.test(email)
}
   
  }
};
</script>
<style>

</style>