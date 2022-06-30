<template>
  <div class="container">
  <h4>Update Profile.</h4>
    <div class="card">
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema">
          <div class="form-group row">
            <div class="col-6">
              <label>User Name: <span class="text-danger">*</span></label>
              <Field
                id="name"
                name="name"
                type="text"
                class="form-control"
                v-model="name"
              />
              <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="col-6">
              <label>Mobile Number: <span class="text-danger">*</span></label>
              <Field
                name="mobileNumber"
                type="number"
                class="form-control"
                v-model="mobileNumber"
              />
              <ErrorMessage name="mobileNumber" class="text-danger" />
              <span class="text-danger">{{mobileError}}</span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-6">
              <label>Email ID: <span class="text-danger">*</span></label>
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                v-model="email"
                @input="isEmailValid(email)"
              />
              <ErrorMessage name="email" class="text-danger"/>
              <span class="text-danger">{{emailerror}}</span>
            </div>
            <!-- <div class="col-6">
              <label>Upload Image: </label>
              <input class="form-control" ref="fileInput" type="file" @input="pickFile">
            </div> -->
          </div>
          <div class="text-center">
            <br>
            <div class="form-group">
              <router-link to="/users" class="btn btn-secondary mr-2">Cancel</router-link>
              <input
                type="submit"
                class="btn btn-primary ms-2"
                value="Update" 
                v-if="!isCreating"
              />
              <button class="btn btn-primary" type="button" disabled v-if="isCreating">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving...
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      isCreating:false,
      name:'',
      mobileNumber:"",
      email:'',
      userType:'',
      userTypeError:'',
      emailerror:'',
      mobileError:'',
      userData:'',
      profileImage:'',
      options:[
        'admin','user'
        ],
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },
   watch: {
     userType(val){
      if(val){
        this.userTypeError = '';
      }else{
        this.userTypeError = 'Please select user type';
      }
    },
    mobileNumber(val){
      if(val){
        const mobile = val.toString();
        if(mobile.length > 0 && (mobile.length > 10 || mobile.length < 10)){
          this.mobileError = "Mobile number should be 10 digit";
        }else{
          this.mobileError = "";
        }
      }
    },
  },
  mounted(){
    
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails){
        this.isLoading = true;
        this.loadData();
      }else{
        this.$router.push({ name: "Login" });
      }
    
    
  },

  methods: {
    pickFile () {
        let input = this.$refs.fileInput;
        let file = input.files;
        this.profileImage = file[0];
        console.log(this.profileImage);
        
      },
    loadData(){
      axios.post('http://127.0.0.1:8000/api/getuserdetailsbyid',{
            'user_id':this.userDetails.user_id,
            },{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              "Allow": "POST",
              "Content-type": "Application/json",
            }
          }).then((response) => {
            if(response.data.status == 200){
             this.userData = response.data.data; 
             this.name = this.userData.name;
             this.mobileNumber = this.userData.mobile_number;
             this.email = this.userData.email;
             this.userType = this.userData.type;  
            }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
            }
          })
    },

    onSubmit() {
      let formData = new FormData();
      // formData.append("file", this.profileImage);
      formData.append("user_id", this.userDetails.user_id);
      formData.append("name", this.name);
      formData.append("mobile_number", this.mobileNumber);
      formData.append("email", this.email);
      

      if(this.userTypeError =='' && this.emailerror == '' && this.mobileError == ''){
        axios.post('http://127.0.0.1:8000/api/updateuserprofile',formData,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              "Allow": "POST",
              "Content-type": "Application/json",
            }
          }).then((response) => {
            if(response.data.status == 200){
              this.$swal.fire({
                text: "Success, User has been updated successfully !",
                icon: "success",
                position: "center",
                width: 400,
                height: 100,
                padding: '3em',
                timer: 1000,
              });
               this.$router.push({ path: "/" });
            }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                timer: 1000,
              })
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
      },
   
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      name: yup.string().required('User name is required').min(3),
      mobileNumber: yup.string().required('Mobile number is required'),
      email: yup.string().required(),
    });

    return {
      schema
    };
  },
};
</script>
<style type="text/css">
  .vue-select {
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 364px;
    height: 40px;
    border-radius: 2px;
    /* border: 1px solid #999; */
    box-sizing: border-box;
    outline: 0;
  }
  .vue-select[data-is-focusing=false][aria-disabled=false] .vue-input input, input[readonly] {
    cursor: default;
    height: 21px;
    text-align: center;
  }
  .vue-input input[readonly], .vue-select-header .vue-input input[disabled] {
    background-color: unset;
  }
  .vue-input input {
    border: 0;
    outline: 0;
    font-size: 1.0rem;
  }
  .vue-dropdown, .vue-input input {
    width: 100%;
    min-width: 0;
    padding: 0;
  }
</style>
