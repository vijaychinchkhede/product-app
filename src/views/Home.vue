<template>
  <div class="home">
  <div v-if="userDetails ==''" style="background: skyblue;">
    <div class="text-center" >
      <span class="fs-5 d-none d-sm-inline"><img src="/icon.png" class="icon-style" /> Welcome To Product-Cart !!!</span>
      <hr>
    </div>
  </div>
    <div>
      <product-list-component></product-list-component>
    </div>
  </div>
</template>

<script>
import ProductListComponent from '../components/products/list/ProductListComponent.vue';
export default {
  components: { ProductListComponent },
  name: "Home",
  data() {
      return {
        userDetails: '',
      };
    },
  mounted(){
 this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  },

  methods: {
    
  },

  
};
</script>
