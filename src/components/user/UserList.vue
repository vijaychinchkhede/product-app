<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">Users</h4>
      </div>
      <div class="col-4">
        <input
        :disabled="userData.length == 0"
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
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(data, index) in userData" :key="data.id">
            <td>{{ index + 1 }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.type }}</td>
            <td>{{ data.status }}</td>
            <td>
              <button :disabled="data.type=='admin'" class="btn btn-danger ml-2" @click="deleteUser(data.id)" title="Delete User">
                 <i class="fa fa-trash"></i>
              </button>
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
        lineItems: [],
        userData:[],
        userDetails:'',
        total:0,
        isLoading:false,
      };
    },

    mounted(){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails && this.userDetails.type =='admin'){
        this.isLoading = true;
        this.loadData();
      }else{
        this.$router.push({ name: "Login" });
      }
    },

    methods: {
     loadData () {
      this.isLoading = true;
      axios.post('http://127.0.0.1:8000/api/getalluser',{
      'name':this.query.search,
      }
      ).then((response) => {
        if(response.data.status == 200){
          this.userData = response.data.data;
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
    deleteUser(id){
      axios.post('http://127.0.0.1:8000/api/deleteuser',{
          'user_id' : id,
        }).then((response) => {
          if(response.data.status == 200){
            this.$swal.fire({
              text: "Success, User has been deleted successfully !",
              icon: "success",
              position: "center",
              width: 400,
              height: 100,
              padding: '3em',
              timer: 1000,
            });
            this.loadData();
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


};
</script>
