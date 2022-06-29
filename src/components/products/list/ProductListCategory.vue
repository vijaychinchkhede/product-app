<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2" v-if="category ==1">Mobiles</h4>
        <h4 class="text-left mb-2" v-if="category ==2">Tablets</h4>
      </div>
      <div class="col-4">
        <input
        :disabled="productsData==''"
        type="text"
        class="form-control"
        placeholder="Search Products..."
        @input="searchProducts"
        v-model="query.search"
        />
      </div>
    </div>
    <div class="container mt-3">
      <table class="table table-striped">
        <thead class="text-center">
          <tr>
            <th>Sr.No.</th>
            <th>Name</th>
            <th>Details</th>
            <th>Price</th>
            <th v-if="userStatus == 1">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(product, index) in productsData" :key="product.id">
            <td>{{ index + 1 }}</td>
            <td>{{ product.name}}</td>
            <td>{{ product.description}}</td>
            <td>{{ formatNumber(product.price) }}</td>
            <td v-if="userStatus == 1">{{ formatString(product.status)}}</td>
            <td v-if="userStatus==1" ><router-link :to="{ name: 'ProductEdit', params: { id: product.id } }"
              class="btn btn-primary" title="Edit Product">
              <i class="fa fa-pencil"></i></router-link>
              <button class="btn btn-danger ml-2 ms-2" @click="deleteProduct(product.id)" title="Delete Product">
               <i class="fa fa-trash"></i>
             </button>
           </td>
           <td v-if="userStatus != 1">
            <button class="btn btn-success ml-2" @click="addToCart(product.id,product.name)" title="Add To Cart">
             <i class="fa fa-shopping-basket"></i>
           </button>
         </td>
       </tr>
     </tbody>
   </table>
 </div>
 <div v-if="!isLoading">
  <div class="text-center" v-if="productsData ==''" >
    <span > No data found </span>
  </div>
</div>
<div v-if="isLoading" class="text-center mt-5 mb-5">
  Loading Cart Products...
  <div class="spinner-grow" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
</div>
</template>

<script>
  import axios from "axios";
  import { StripeCheckout } from '@vue-stripe/vue-stripe';
  export default {
    data() {
      return {
        loading: false,
        query: {
          page: 1,
          search: "",
        },
        productsData:'',
        userDetails:'',
        isLoading:false,
        userStatus:0,
        category:0,
      };
    },

    mounted(){
      this.category = localStorage.productCategory;
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails){
        if(this.userDetails.userType =='admin'){
          this.userStatus = 1;
        }
        if(this.userType =='user'){
          this.userStatus = 2;
        }
        this.isLoading = true;
        this.loadData();
      }else{
        this.$router.push({ name: "Login" });
      }
    },

    methods: {
      loadData () {
        if(this.userStatus == 1){
          const url = 'http://127.0.0.1:8000/api/getallproduct';
            axios.post(url,{
            'name':this.query.search,
            'category':this.category,
            "token" : localStorage.token,
            },{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              "Allow": "POST",
              "Content-type": "Application/json",
            }
          }).then((response) => {
              this.isLoading = false;
              if(response.data.status == 200){
                this.productsData = response.data.data;
              }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
              }
            })
        }else{
          const url = 'http://127.0.0.1:8000/api/getallactiveproduct';
            axios.post(url,{
            'name':this.query.search,
            'category':this.category,
            "token" : localStorage.token,
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
              this.isLoading = false;
              if(response.data.status == 200){
                this.productsData = response.data.data;
              }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
              }
            })
        }
        
        
      },
      addToCart(p_id,p_name){
        if(this.userDetails){
          axios.post('http://127.0.0.1:8000/api/addtocart',{
            'user_id':this.userDetails.user_id,
            'product_id':p_id,
            'product_name':p_name,
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
              this.$swal.fire({
                text: "Success, Product has been added to cart successfully !",
                icon: "success",
                position: "center",
                width: 400,
                height: 100,
                padding: '3em',
                timer: 1000,
              });
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
        }else{
          window.location.href = '/login';
        }
      },
      deleteProduct(id){
        axios.post('http://127.0.0.1:8000/api/deleteproduct',{
          'product_id' : id,
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
              text: "Success, Product has been deleted successfully !",
              icon: "success",
              position: "center",
              width: 400,
              height: 100,
              padding: '3em',
              timer: 1000,
            });
            window.location.href = '/';
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
      },
      searchProducts(){
        if(this.query.search.length >=3 || this.query.search.length ==0 ){
          this.loadData();
        }
      },
      formatNumber(number) {
         return Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(number);
      },
      formatString(string){
        return string.toUpperCase();  
      }

    },


};
</script>
