<template>
  <div class="container">
  <h4>Add Product</h4>
    <div class="card">
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema">
          <div class="form-group row">
            <div class="col-6">
              <label>Product Name: <span class="text-danger">*</span></label>
              <Field
                id="name"
                name="name"
                type="text"
                class="form-control"
                v-model="product.name"
              />
              <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="col-6">
              <label>Product Price: <span class="text-danger">*</span></label>
              <Field
                name="price"
                type="number"
                class="form-control"
                v-model="product.price"
              />
              <ErrorMessage name="price" class="text-danger" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-6">
              <label>Product Details: <span class="text-danger">*</span></label>
              <Field
                name="description"
                as="textarea"
                class="form-control"
                v-model="product.description"
               />
              <ErrorMessage name="description" class="text-danger" />
            </div>
            <div class="col-6">
              <label>Product Category:  <span class="text-danger">*</span></label>
              <vue-select
              v-model="productCategory"
              :options="options"
              label-by="label"
              index="value" 
              close-on-select
              ></vue-select>
              <ErrorMessage name="productCategory" class="text-danger" />
              <span class="text-danger">{{categoryError}}</span>
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
                value="Add Product"
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
      product: {},
      isCreating:false,
      productCategory:'',
      options:[{'value':1,'label':'Mobile'},
        {'value':2,'label':'Tablet'},
        ],
        categoryError:'',
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },
   watch: {
     productCategory(val){
      if(val){
        localStorage.setItem('productCategory',val.value);
        this.categoryError = '';
      }else{
        this.categoryError = 'Please select product category';
      }
    }
  },

  methods: {
    
    onSubmit() {
      if(this.categoryError ==''){
        axios.post('http://127.0.0.1:8000/api/addproduct',{
            'name':this.product.name,
            'price':this.product.price,
            'description':this.product.description,
            'category':this.productCategory.value,
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
                text: "Success, Product has been added successfully !",
                icon: "success",
                position: "center",
                width: 400,
                height: 100,
                padding: '3em',
                timer: 1000,
              });
               this.$router.push({ path: "/product/category" });
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
