<template>
  <td>{{ index + 1 }}</td>
  <td>{{ product.name}}</td>
  <td>{{ product.description}}</td>
  <td>{{ formatNumber(product.price) }}</td>
  <td v-if="userStatus==1" ><router-link :to="{ name: 'ProductEdit', params: { id: product.id } }"
    class="btn btn-primary" title="Edit Product">
    <i class="fa fa-pencil"></i></router-link>
    |
    <button class="btn btn-danger ml-2" @click="deleteProduct(product.id)" title="Delete Product">
     <i class="fa fa-trash"></i>
   </button>
  </td>
  <td v-if="userStatus != 1">
    <button class="btn btn-success ml-2" @click="addToCart(product.id,product.name)" title="Add To Cart">
     <i class="fa fa-shopping-basket"></i>
    </button>
  </td>
</template>

<script>
  import axios from "axios";

  export default {
    name: "ProductDetail",
    props: {
      product: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },


    data() {
      return {
        userDetails:'',
        userStatus:0,
      };
    },

    mounted(){
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
    },
    methods: {
      addToCart(p_id,p_name){
        if(this.userDetails){
          axios.post('http://127.0.0.1:8000/api/addtocart',{
            'user_id':this.userDetails.user_id,
            'product_id':p_id,
            'product_name':p_name,
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
              this.$swal.fire({
                text: "Success, Product has been added to cart successfully !",
                icon: "success",
                position: "center",
                width: 400,
                height: 100,
                padding: '3em',
                timer: 1000,
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                timer: 1000,
              })
            }
          })
        }else{
          window.location.href = '/login';
        }
      },
      deleteProduct(id){
        axios.post('http://127.0.0.1:8000/api/deleteproduct',{
          'product_id' : id,
        }).then((response) => {
          if(response.data.status == 200){
            this.$swal.fire({
              text: "Success, Product has been deleted successfully !",
              icon: "success",
              position: "center",
              width: 400,
              height: 100,
              padding: '3em',
              timer: 1000,
            });
            window.location.href = '/';
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
      formatNumber(number) {
        return Intl.NumberFormat().format(number);
      }

    },
  };
</script>
