<template>
  <h1 class="text-center"> Payment successfuly !!!</h1>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      cartData:'',
      userDetails:'',
      totalPrice:0,
      productIDs:[],
      products:[],
    };
  },

  mounted(){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      this.cartData = JSON.parse(localStorage.getItem('cartData'));

      if(this.cartData){
      this.totalPrice = localStorage.getItem('totalPrice');
        const arrayLength = this.cartData.length;
            var i = 0;
            for(i;i<arrayLength;i++){
                const obj = this.cartData[i].product_id;
                this.productIDs.push(obj);
                const obj1 = this.cartData[i].product_name;
                this.products.push(obj1);
            }
       this.onLoad();
      }
  },

  
  methods: {
    
    onLoad() {
      let formData = new FormData();
        formData.append("user_id", this.userDetails.user_id);
        formData.append("product_ids", this.productIDs);
        formData.append("amount_paid", this.totalPrice);
        formData.append("products", this.products);
        formData.append("email", this.userDetails.email);
        formData.append("email_status", this.userDetails.email_status);
        formData.append("user_name", this.userDetails.name);

      axios.post('http://127.0.0.1:8000/api/createorder',formData,{
        headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              "Allow": "POST",
              "Content-type": "Application/json",
            }}).then((response) => {
            if(response.data.status == 200){
                this.$swal.fire({
                 text: "Success, Your order placed successfully !",
                icon: "success",
                 position: "center",
                width: 400,
                 height: 100,
                 padding: '3em',
                 timer: 1000,
                });
             this.$router.push({ name: "Order" });
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
