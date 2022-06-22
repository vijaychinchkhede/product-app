<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Add Product</h6>
      </div>
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema">
          <div class="form-group row">
            <div class="col-6">
              <label>Product Name:</label>
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
              <label>Product Price:</label>
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
            <div class="col-12">
              <label>Product Details:</label>
              <Field
                name="description"
                as="textarea"
                class="form-control"
                v-model="product.description"
               />
              <ErrorMessage name="description" class="text-danger" />
            </div>
          </div>
          <div class="form-group">
            <router-link to="/products" class="btn btn-secondary mr-2"
              >Cancel</router-link
            >
            <input
              type="submit"
              class="btn btn-primary"
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
      product: {}
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },

  
  methods: {
    
    onSubmit() {

      axios.post('http://127.0.0.1:8000/api/addproduct',{
          'name':this.product.name,
      'price':this.product.price,
      'description':this.product.description,
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

  watch: {
   
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      name: yup.string().required().min(5),
      price: yup.string().required(),
      description: yup.string().required().min(5),
    });

    return {
      schema
    };
  },
};
</script>
