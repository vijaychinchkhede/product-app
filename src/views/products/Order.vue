<template>
  <div class="container">
    <div class="container mt-3">
      <h2> My Orders</h2>
      <table class="table table-striped">
        <thead class="text-center">
          <tr>
            <th>Sr.No.</th>
            <th>Details</th>
            <th>Status</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(data, index) in orderData" :key="data.id">
            <td>{{ index + 1 }}</td>
            <td>{{ data.products ? data.products :'--' }}</td>
            <td>{{ data.status }}</td>
            <td>{{ formatNumber(data.amount_paid) }}</td>
            <td>{{ data.order_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="" v-if="!isLoading">
      <div class="text-center" v-if='orderData.length == 0'>
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
      localStorage.setItem('header','My Orders');
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
   formatNumber(number) {
    return Intl.NumberFormat().format(number);
  }
},


};
</script>
