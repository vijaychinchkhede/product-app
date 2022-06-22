<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2"> 
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
    };
  },
  components: {
    StripeCheckout,
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
  },

 
};
</script>