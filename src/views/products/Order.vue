<template>
  <div class="container">
    <div class="container mt-3">
      <h4> My Orders</h4>
      <table class="table table-striped">
        <thead class="text-center">
          <tr>
            <th>Sr.No.</th>
            <th>Details</th>
            <th>Status</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(data, index) in orderData" :key="data.id">
            <td>{{ index + 1 }}</td>
            <td>{{ data.products ? data.products :'--' }}</td>
            <td class="text-capitalize">{{ data.status }}</td>
            <td>{{ formatNumber(data.amount_paid) }}</td>
            <td>{{ data.order_at }}</td>
            <td>
              <button v-if="data.status =='order'"  class="btn btn-danger ml-2" @click="cancelOrder(data.id)" title="Cancel Order"> <i class="fa fa-close"></i>
              </button>
            </td>
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
     return Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(number);
  },
  cancelOrder(id){
    axios.put('http://127.0.0.1:8000/api/updateorderstatus',{
        'order_id': id,
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
              text: "Order has been cancelled successfully !",
              icon: "success",
              position: "center",
              width: 400,
              height: 100,
              padding: '3em',
              timer: 1000,
            });
            this.loadData();
        }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
        }else{
         this.orderData = [];
       }
       this.isLoading = false;
     })
  }
},


};
</script>
