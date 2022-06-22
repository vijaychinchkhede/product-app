<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">Cart Items</h4>
      </div>
      <div class="col-4">
        <input
          :disabled="cartData.length == 0"
          type="text"
          class="form-control"
          placeholder="Search Products..."
          @input="searchProducts"
          v-model="query.search"
        />
      </div>
    </div>
    <div class="">
      <div class="" v-if="!isLoading">
        <div class="row border-bottom border-top p-2 bg-light">
          <div class="col-1">Sl</div>
          <div class="col-2">Product Name</div>
          <div class="col-2">Product Price</div>
          <div class="col-1">Product Quantity</div>
          <div class="col-3">Product Details</div>
          <div class="col-2">Total Price</div>
        </div>

        <div v-for="(data, index) in cartData" :key="data.id">
            <div class="row border-1 p-2">
            <div class="col-1 text-left">{{ index + 1 }}</div>
            <div class="col-2">{{ data.product_name }}</div>
            <div class="col-2">
              <strong class="text-danger">{{ data.price }} </strong>
            </div>
             <div class="col-1">
              <strong class="text-danger">{{ data.quantity }} </strong>
            </div>
            <div class="col-3">
              <span class="col-3">{{ data.description }}</span>
            </div>
             <div class="col-2">
              <strong class="text-danger">{{data.price*data.quantity }} </strong>
            </div>
          </div>
        </div>
        <div v-if='cartData.length == 0'>
        <span > No data found </span>
        </div>
      </div>
      <div v-if='cartData.length != 0'>
        <button class="btn btn-success " @click="checkout">Checkout [ Total Price : {{total}}]</button>
      </div>
      <div v-if="isLoading" class="text-center mt-5 mb-5">
        Loading Cart Products...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
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
      lineItems: [],
      cartData:[],
      userDetails:'',
      total:0,
      isLoading:false,
    };
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
     loadData () {
        axios.post('http://127.0.0.1:8000/api/getusercartitems',{
          'user_id' :this.userDetails.user_id,
          'name' : this.query.search,
        }
        ).then((response) => {
          if(response.data.status == 200){
            this.cartData = response.data.data;
            if(this.cartData){
            this.arrayLength = this.cartData.length;
             var i = 0;
             for(i;i<this.arrayLength;i++){
                const obj = {'price': this.cartData[i].stripe_price_code, 
                            'quantity': this.cartData[i].quantity,};
                this.lineItems.push(obj);
                this.total = this.total+(this.cartData[i].price *this.cartData[i].quantity);
                localStorage.setItem("cartData", JSON.stringify(this.cartData));
                localStorage.setItem("lineItems", JSON.stringify(this.lineItems));
                localStorage.setItem("totalPrice", this.total);
              }
           }
            
          }else{
           this.cartData = [];
          }
          this.isLoading = false;
        })
      },
     
      searchProducts(){
        if(this.query.search.length >=3 || this.query.search.length ==0 ){
          this.loadData();
        }
      },
      checkout(){
         this.$router.push({ name: "Checkout" });
      },
  },

 
};
</script>
