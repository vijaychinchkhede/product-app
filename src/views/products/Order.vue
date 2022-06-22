<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">My Orders</h4>
      </div>
      
    </div>
    <div class="">
      <div class="" v-if="!isLoading">
        <div class="row border-bottom border-top p-2 bg-light">
          <div class="col-1">Sl</div>
          <div class="col-3">Order Details </div>
          <div class="col-2">Price</div>
          <div class="col-2">Order Date </div>
          <div class="col-2">Order Status </div>
        </div>

          <div v-for="(data, index) in orderData" :key="data.id">
            <div class="row border-1 p-2">
            <div class="col-1 text-left">{{ index + 1 }}</div>
            <div class="col-3">
              <span class="text-left">{{ data.products ? data.products :'--' }} </span>
            </div>
            <div class="col-2">{{ data.amount_paid }}</div>
            <div class="col-2">
              <span class="text-left">{{ data.order_at }} </span>
            </div>
             <div class="col-2">
              <span class="text-left">{{ data.status }} </span>
            </div>
          </div>
        </div>
        <div v-if='orderData.length == 0'>
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
 </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      orderData:[],
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
        axios.post('http://127.0.0.1:8000/api/getallorderofuser',{
        'user_id': this.userDetails.user_id,
        }
        ).then((response) => {
          if(response.data.status == 200){
            this.orderData = response.data.data;
           console.log(this.orderData);
            
          }else{
           this.orderData = [];
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
