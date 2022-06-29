<template>
  <div class="container">
    <h4>Edit Product</h4>
    <div class="card">
      <div class="card-body">
        <div v-if="productDetail !== null">
          <div class="form-group row">
            <div class="col-6">
              <label>Product Name: <span class="text-danger">*</span></label>
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
              <label>Product Price: <span class="text-danger">*</span></label>
              <Field
              name="price"
              type="number"
              class="form-control"
              v-model="price"
              />
              <ErrorMessage name="price" class="text-danger" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-6">
              <label>Product Details:  <span class="text-danger">*</span></label>
              <Field
              name="description"
              as="textarea"
              class="form-control"
              v-model="description"
              />
              <ErrorMessage name="description" class="text-danger" />
            </div>
            <div class="col-6">
              <label>Product Status:  <span class="text-danger">*</span></label>
              <vue-select
              v-model="productStatus"
              :options="options"
              close-on-select
              ></vue-select>
              <span class="text-danger">{{statusError}}</span>
            </div>

          </div>
          <div class="text-center">
            <br>
            <div class="form-group">
              <router-link to="/products" class="btn btn-secondary mr-2"
              >Cancel</router-link
              >
              <input
              type="submit"
              class="btn btn-primary ms-2"
              value="Update"
              v-if="!isUpdating"
              @click="updateProduct"
              />
              <button class="btn btn-primary" type="button" disabled v-if="isUpdating">
                <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
                ></span>
                Saving...
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { Field, Form, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { reactive, ref, createApp } from 'vue';

  export default {
    data() {
      return {
        id: null,
        productDetail:'',
        isUpdating:false,
        name:'',
        price:'',
        description:'',
        productStatus:'',
        options:[
        'ACTIVE','INACTIVE'
        ],
        statusError:'',
      };
    },
    components: {
      Field,
      Form,
      ErrorMessage,
    },
    watch: {
     productStatus(val){
      if(val){
        this.statusError = '';
      }else{
        this.statusError = 'Please select product status';
      }
    }
  },
  

  mounted(){
    this.id = this.$route.params.id;
    this.getproductdetailsbyid();
  },

  methods: {
    getproductdetailsbyid(){
      axios.post('http://127.0.0.1:8000/api/getproductdetailsbyid',{
        'product_id' : this.id
      },{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              "Allow": "POST",
              "Content-type": "Application/json",
            }
          }
      ).then((response) => {
        if(response.data.status == 200){
         this.productDetail = response.data.data;
         this.name = this.productDetail.name;
         this.price = this.productDetail.price;
         this.description = this.productDetail.description;
         this.productStatus = this.productDetail.status.toUpperCase();
       }

     })
    },
    updateProduct(){
      if(this.statusError == '' && this.priceError == ''){
        axios.post('http://127.0.0.1:8000/api/updateproductdetails',{
          'product_id' : this.id,
          'name': this.name,
          'price': this.price,
          'description': this.description,
          'status':this.productStatus ? this.productStatus.toLowerCase() :'',
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
            this.$swal.fire({
              text: "Success, Product has been updated successfully !",
              icon: "success",
              position: "center",
              width: 400,
              height: 100,
              padding: '3em',
              timer: 1000,
            });
            this.$router.push({ name: "Products" });
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
  
  },

  

  setup() {
    // Define a validation schema
    const schema = yup.object({
      name: yup.string().required().min(3),
      price: yup.number().required().positive().integer(),
      description: yup.string().required().min(5),
    });

    return {
      schema,
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