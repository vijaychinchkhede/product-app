<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">All Products</h4>
      </div>
      <div class="col-4">
        <input
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
            <!-- <th>Sr.No.</th> -->
            <th>Name</th>
            <th>Details</th>
            <th>Price</th>
            <th v-if="userStatus == 1">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(item, index) in productsData" :key="item.id">
           <product-detail :index="index" :product="item" />
         </tr>
       </tbody>
     </table>
   </div>
   <!-- pagination -->
    <div v-if="userDetails">
      <div class="pagination-centre" v-if="pageCount > 1">
        <paginate
          v-model="page"
          :page-count="pageCount"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        >
        </paginate>
      </div>
    </div>
      <!-- /pagination --> 
   <div class="">
    <div v-if="isLoading" class="text-center mt-5 mb-5">
      Loading Products...
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from "axios";
  import ProductDetail from "../list/ProductDetail";
  import Paginate from "vuejs-paginate-next";
  export default {
    data() {
      return {
        query: {
          page: 1,
          search: "",
        },
        productsData:[],
        isLoading:false,
        userStatus:0,
        page:1,
        total:0,
        pageCount:0,
        userDetails:'',
      };
    },
    components: {
      ProductDetail,
      paginate: Paginate,
    },
    mounted(){
    this.isLoading = true;
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails){
        this.userType = this.userDetails.userType;
        if(this.userType =='admin'){
          this.userStatus = 1;
        }
        if(this.userType =='user'){
          this.userStatus = 2;
        }
      }
      this.loadData();
    },

    methods: {
      clickCallback(){
        this.loadData();
      },
      loadData () {
        if(this.userStatus == 1){
          const url = 'http://127.0.0.1:8000/api/getallproduct';
            axios.post(url,{
            'name':this.query.search,
            'page':this.page,
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
                this.count = response.data.count;
                if(this.count){
                  this.pageCount = this.count/4;
                }else{
                  this.pageCount = 0;
                }
              }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
              }else{
                this.productsData = '';
                this.count = 0;
                this.pageCount = 0;
              }
            })
        }else{
          const url = 'http://127.0.0.1:8000/api/getallactiveproduct';
            axios.post(url,{
            'name':this.query.search,
            'page':this.page,
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
                this.count = response.data.count;
                if(this.count){
                  this.pageCount = this.count/4;
                }else{
                  this.pageCount = 0;
                }
              }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
              }else{
                this.productsData = '';
                this.count = 0;
                this.pageCount = 0;
              }
            })
        }
      },
      searchProducts(){
        if(this.query.search.length >=3 || this.query.search.length ==0 ){
          this.loadData();
        }
      }

    },
};
</script>
<style>
.pagination {
    display: flex;
    padding-left: 415px;
    list-style: none;
}
</style>
