<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">All Order</h4>
      </div>
      <div class="col-4">
        <!-- <input
        :disabled="userData.length == 0"
        type="text"
        class="form-control"
        placeholder="Search Products..."
        @input="searchProducts"
        v-model="query.search"
        /> -->
      </div>
    </div>
    <div class="container mt-3">
      <table class="table table-striped">
        <thead class="text-center">
          <tr>
            <th>Sr.No.</th>
            <th>User Name</th>
            <th>Order Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(data, index) in userData" :key="data.id">
            <td>{{ index + 1 }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.products }}</td>
            <td>{{ formatNumber(data.amount_paid) }}</td>
            <td class ="text-capitalize">
                {{data.status}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!isLoading">
      <div class="text-center" v-if='userData.length == 0'>
        <span > No data found </span>
      </div>
    </div>
    <div v-if="isLoading" class="text-center mt-5 mb-5">
      Loading Orders...
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
        options:[
        'order','cancel'
        ],
        data:[
        'status'
        ],
        lineItems: [],
        userData:[],
        userDetails:'',
        total:0,
        isLoading:false,
      };
    },

    mounted(){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails && this.userDetails.userType =='admin'){
        this.isLoading = true;
        this.loadData();
      }else{
        this.$router.push({ name: "Login" });
      }
    },

    methods: {
     loadData () {
      this.isLoading = true;
      axios.post('http://127.0.0.1:8000/api/getalluserorder',{
      'name':this.query.search,
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
          this.userData = response.data.data;
        }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
              }else{
         this.userData = [];
       }
       this.isLoading = false;
     })
    },

    searchProducts(){
      if(this.query.search.length >=2 || this.query.search.length ==0 ){
        this.loadData();
      }
    },
    formatNumber(number) {
       return Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(number);
    },
},


};
</script>
<style type="text/css">

</style>
