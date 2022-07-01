<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">Users</h4>
      </div>
      <div class="col-4">
        <input
        :disabled="userData.length == 0 && this.query.search.length ==0"
        type="text"
        class="form-control"
        placeholder="Search User..."
        @input="searchUser"
        v-model="query.search"
        />
      </div>
    </div>
    <div class="container mt-3" v-if="!isLoading">
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
            <td class="text-capitalize">{{ data.type }}</td>
            <td class="text-capitalize">{{ data.status }}
              <div class="form-check form-switch" v-if="data.type !='admin'">
                <input v-if="data.status == 'active'" class="form-check-input" @click="userStatusAction(data,status='inactive')"  value="true" type="checkbox" id="flexSwitchCheckChecked" checked>
                <input v-if="data.status != 'active'" class="form-check-input" @click="userStatusAction(data,status='active')"  value="false" type="checkbox" id="flexSwitchCheckChecked">
              </div>
            </td>
            <td class="">
              <router-link :to="{ name: 'UserEdit', params: { id: data.id } }"
              class="btn btn-primary" title="Edit User">
              <i class="fa fa-pencil"></i></router-link>
              <button :disabled="data.type =='admin'" class="btn btn-danger ml-2 ms-2" @click="deleteUser(data.id)" title="Delete User">
               <i class="fa fa-trash"></i>
             </button>
           </td>
         </tr>
       </tbody>
     </table>
   </div>
   <!-- pagination -->
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
      <!-- /pagination -->
   <div v-if="!isLoading">
    <div class="text-center" v-if='userData.length == 0'>
      <span > No data found </span>
    </div>
  </div>
  <div v-if="isLoading" class="text-center mt-5 mb-5">
    Loading Users...
    <div class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>
</template>

<script>
  import axios from "axios";
  import Paginate from "vuejs-paginate-next";
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
        page:1,
        total:0,
        pageCount:0,
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
    components: {
      paginate: Paginate,
    },

    methods: {
      clickCallback(){
        this.loadData();
      },
      userStatusAction(data,status){
        this.isLoading = true;
        axios.put('http://127.0.0.1:8000/api/updateuserstatus',{
          'user_id' : data.id,
          'status':status,
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
              text: "Success, User status has been updated successfully !",
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
      },

      loadData () {
        this.isLoading = true;
        axios.post('http://127.0.0.1:8000/api/getalluser',{
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
          if(response.data.status == 200){
            this.userData = response.data.data;
            this.count = response.data.count;
            if(this.count){
              this.pageCount = this.count/10;
            }else{
              this.pageCount = 0;
            }
          }else if(response.data.status == 401){
            localStorage.clear();
            window.location.href = '/login';
          }else{
           this.userData = [];
           this.pageCount = 0;
         }
         this.isLoading = false;
       })
      },

      searchUser(){
        if(this.query.search.length >=2 || this.query.search.length ==0 ){
          this.loadData();
        }
      },
      deleteUser(id){
        axios.post('http://127.0.0.1:8000/api/deleteuser',{
          'user_id' : id,
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
<style type="text/css">
  .form-check .form-check-input {
   float: RIGHT; 
   margin-left: -1.5em;
 }
</style>
