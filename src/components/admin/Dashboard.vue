<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="card text-center text-dark bg-info mb-3">
        <div class="card-body">
          <h5 class="card-title">Orders</h5>
          <p class="card-text">Total Order : {{totalOrder }} | Placed Orders : {{placedOrder}} | Cancel Orders : {{canceledOrder}}</p>
          <a href="/allorders" class="btn btn-primary">Orders</a>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="card text-center text-dark bg-info mb-3">
        <div class="card-body">
          <h5 class="card-title">Users</h5>
          <p class="card-text">Total Users : {{totalUser}} | Active Users : {{activeUser}} | Inactive Users: {{inactiveUser}}</p>
          <a href="/users" class="btn btn-primary">Users</a>
        </div>
      </div>
    </div>
  </div>
  <div >
    <div class="card border-info mb-3">
      <div class="card-header">Most like Product</div>
      <div class="card-body">
        <h5 class="card-title">{{mostLikeProduct}}</h5>
        <p class="card-text">User Order Count : - {{productCount}}</p>
      </div>
    </div>
    <span></span>
    <div class="card border-info mb-3 ">
      <div class="card-header">Most Order Created User</div>
      <div class="card-body">
        <h5 class="card-title">{{userName}}</h5>
        <p class="card-text"> User Details :- {{userEmail}} | {{userMobile}} </p>
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
        query: {
          page: 1,
          search: "",
        },
        dashboardData:'',
        userDetails:'',
        isLoading:false,
        activeUser:0,
        inactiveUser:0,
        totalUser:0,
        placedOrder:0,
        canceledOrder:0,
        totalOrder:0,
        mostLikeProduct:'',
        productCount:0,
        userName : '',
        userEmail:'',
        userMobile:'',
      };
    },
   
    mounted(){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails.userType =='admin'){
        this.loadData();
      }else{
        this.$router.push({ name: "Login" });
      }
    },

    methods: {
      loadData () {
        this.isLoading = true;
        let formData = new FormData();
        formData.append("name", this.query.search);
        formData.append("category", this.category);
        formData.append("page", this.page);
       
       const url = 'http://127.0.0.1:8000/api/getdashboardcarddata';
            axios.post(url,formData,{
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
                this.dashboardData = response.data.data;
                this.activeUser = this.dashboardData['activeUser'] ? this.dashboardData['activeUser']:'0';
                this.inactiveUser = this.dashboardData['inactiveUser'] ? this.dashboardData['inactiveUser']:'0';
                this.totalUser = this.activeUser + this.inactiveUser ;
                
                this.placedOrder = this.dashboardData['placedOrder'] ? this.dashboardData['placedOrder']:'0';
                this.canceledOrder = this.dashboardData['canceledOrder'] ? this.dashboardData['canceledOrder']:'0';
                this.totalOrder = this.placedOrder + this.canceledOrder ;

                this.mostLikeProduct = this.dashboardData['mostLikeProduct'] ? this.dashboardData['mostLikeProduct']['name']:'N/A';
                this.productCount = this.dashboardData['mostLikeProduct'] ? this.dashboardData['mostLikeProduct']['product_cart_count'] :'0';
                this.userName  = this.dashboardData['userData'] ? this.dashboardData['userData']['name']:'N/A';
                this.userEmail =this.dashboardData['userData'] ? this.dashboardData['userData']['email']:'N/A';
                this.userMobile =this.dashboardData['userData'] ? this.dashboardData['userData']['mobile_number']:'N/A';
              }else if(response.data.status == 401){
                localStorage.clear();
                window.location.href = '/login';
              }else{
                this.dashboardData = '';
                this.count = 0;
                this.pageCount = 0;
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
<style>

</style>
