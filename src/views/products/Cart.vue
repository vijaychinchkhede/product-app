<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">Cart Items</h4>
      </div>
      <div class="col-4">
        <input
        :disabled="cartData.length == 0 && this.query.search.length ==0"
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
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="text-center" v-if="!isLoading">
          <tr v-for="(data, index) in cartData" :key="data.cart_id">
            <td>{{ index + 1 }}</td>
            <td>{{ data.product_name }}</td>
            <td class="col-4">{{ data.description }}</td>
            <td>{{ formatNumber(data.price) }}</td>
            <td class="text-end"><a class="btn" @click="updateQuantity(e=2,data.cart_id)" v-if="data.quantity >1"><i class="fa fa-minus" aria-hidden="true"></i>  </a>{{ data.quantity }}<a class="btn" @click="updateQuantity(e=1,data.cart_id)"> <i class="fa fa-plus" aria-hidden="true"></i>
            </a></td>
            <td class="text-end">{{ formatNumber(data.price*data.quantity) }}</td>
            <td>
              <button  class="btn btn-danger ml-2" @click="removeProductFromCart(data.product_id)" title="Remove Product From Cart">
                 <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!isLoading">
      <div class="text-center" v-if='cartData.length == 0'>
        <span > No data found </span>
      </div>
    </div>
    <div class="text-center" v-if='cartData.length != 0'>
      <button class="btn btn-success " @click="checkout">Checkout [ Total Price : {{formatNumber(total)}}]</button>
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
        cartData:[],
        userDetails:'',
        total:0,
        isLoading:false,
      };
    },

    mounted(){
      localStorage.setItem('header','My Cart');
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
      this.isLoading = true;
      this.total = 0;
      axios.post('http://127.0.0.1:8000/api/getusercartitems',{
        'user_id' :this.userDetails.user_id,
        'name' : this.query.search,
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
   formatNumber(number) {
     return Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(number); 
  },
  removeProductFromCart(id){
      axios.post('http://127.0.0.1:8000/api/removeproductfromcart',{
          'product_id' : id,
          'user_id':this.userDetails.user_id,
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
              text: "Product has been removed from cart successfully !",
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
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              timer: 1000,
            })
          }
        })
    },
    updateQuantity(e,id){
      this.isLoading = true;
      axios.put('http://127.0.0.1:8000/api/updatecartproductquantity',{
          'cart_id' : id,
          'updateStatus':e,
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
              text: "Product quantity has been updated successfully !",
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
