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
            <th>Sr.No.</th>
            <th>Name</th>
            <th>Details</th>
            <th>Price</th>
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
  export default {
    data() {
      return {
        query: {
          page: 1,
          search: "",
        },
        productsData:[],
        isLoading:false,
      };
    },
    components: {
      ProductDetail,
    },
    mounted(){
      this.isLoading = true;
      this.loadData();
    },

    methods: {
      loadData () {
        axios.post('http://127.0.0.1:8000/api/getallproduct',{
          'name':this.query.search
        }
        ).then((response) => {
          this.isLoading = false;
          if(response.data.status == 200){
            this.productsData = response.data.data;
          }


        })
      },
      searchProducts(){
        if(this.query.search.length >=3 || this.query.search.length ==0 ){
          this.loadData();
        }
      }

    },


  };
</script>
