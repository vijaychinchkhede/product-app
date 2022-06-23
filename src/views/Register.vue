<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="/login.png" /> 
      </div>
      <div class="col">
        <div class="row justify-content-center mt-2 mb-2"> 
          <div class="text-center">
           <div class="card-body">
            <input v-model="name" placeholder="Name">
          </div>
          <span class="text-danger">{{nameError}} </span>
          <div class="card-body">
            <input v-model="email" @input="isEmailValid(email)" placeholder="Email">
          </div>
          <div class="card-body">
            <input v-model="mobile" placeholder="Mobile Number" type="number">
          </div>
          <span class="text-danger">{{mobileError}} </span>
          <div class="card-body">
           <input v-model="password" placeholder="password" type="password">
         </div>
         <div class="card-body">
          <button class="btn btn-success " @click="register" :disabled="password ==''">Register</button>
        </div>
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
        name: "",
        email:"",
        password: "",
        emailerror:'',
        errormsg:'',
        mobile:'',
        userDetails:'',
        mobileError:'',
        nameError:'',
      };
    },
    watch: {
     mobile(val){
      if(val){
        const mobile = val.toString();
        if(mobile.length > 0 && (mobile.length > 10 || mobile.length < 10)){
          this.mobileError = "Mobile number should be 10 digit";
        }else{
          this.mobileError = "";
        }
      }
    },
    name(val){
      if(val){
        this.nameError ='';
      }else{
        this.nameError = 'Please enter the name';
      }
    }
  },

  mounted(){
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails){
      window.location.href = '/';
    }
  },
  methods: {
   register() {
     if(this.emailerror == '' && this.password !='' && this.mobile !='' && this.email !='' && this.name!='' && this.mobileError == ''){
      axios.post('http://127.0.0.1:8000/api/register',{
       'name':this.name,
       'email':this.email,
       'mobile_number':this.mobile,
       'password':this.password,
     }
     ).then((response) => {
      if(response.data.status =='200'){
        this.$swal.fire({
                text: "Usre registered successfuly !",
                icon: "success",
                position: "center",
                width: 400,
                height: 100,
                padding: '3em',
                timer: 1000,
              });
        window.location.href = '/login';
      }else{
        const errors = response.data.errors;
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