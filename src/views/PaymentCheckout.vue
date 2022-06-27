<template>
  <div class="container">
  <div class="text-align-center">
      <span> Name : {{userDetails.name}}</span>
    <div>
      <span> Email : {{userDetails.email}} </span>
    </div>
    <div>
    <br>
    <div> <dt class="col-sm-3">Term and Condition : </dt>  </div>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </span>
    </div>
    <div>
    <input
      v-model="status"
      type="checkbox"
      value="1"
      name="status"/>
      <span> I accept the term and condition</span>
  </div>
  </div>  
    <div class="row justify-content-center mt-2 mb-2" v-if="status == 1"> 
        <stripe-checkout
          ref="checkoutRef"
          mode="payment"
          :pk="publishableKey"
          :line-items="lineItems"
          :success-url="successURL"
          :cancel-url="cancelURL"
          @loading="v => loading = v"
        />
        <button class="btn btn-success " @click="submit">Buy now [ Total Price : {{totalPrice}}]</button>
    </div>
    <div v-if="showError ==1" class="alert alert-danger"><strong>Error</strong>! please accept the term and condition.</div>
    <div class="row justify-content-center mt-2 mb-2" v-if="status != 1"> 
        <button class="btn btn-success " @click="submitError">Buy now [ Total Price : {{totalPrice}}]</button>
    </div>
  </div> 
</template>
<script>
import axios from "axios";
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  data() {
  this.publishableKey = "pk_test_51LD3fmSGqessEHXPZpuCRp6Z0uICrYmzw3djieqa88u8S7Qqr96dJKMqgWYqtJqu81vpUuK1W2ILj3cD9SQwLc4Y00zPUhGYtI";
    return {
      loading: false,
      lineItems: [],
      successURL: 'http://localhost:8080/success',
      cancelURL: 'http://localhost:8080/error',
      userDetails:'',
      totalPrice:0,
      status:'',
      showError:0,
    };
  },
  components: {
    StripeCheckout,
  },
  watch:{
  status(val){
    if(val == true){
    this.showError = 0;
    }
  }
  },
  mounted(){
  
  this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  this.loadData();
  },
 
  methods: {
      submit () {
      this.$refs.checkoutRef.redirectToCheckout();
      },
      loadData () {
        axios.post('http://127.0.0.1:8000/api/getusercartitems',{
          'user_id' :this.userDetails.user_id,
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
                this.totalPrice = this.totalPrice+(this.cartData[i].price *this.cartData[i].quantity);
              }
           }
            
          }else{
           this.cartData = [];
          }
          this.isLoading = false;
        })
      },
      submitError(){
        this.showError = 1;
      }
  },

 
};
</script>