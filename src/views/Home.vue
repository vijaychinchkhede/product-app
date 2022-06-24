<template>
  <div class="home">
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

  mounted(){
 
  },

  methods: {
    
  },

  
};
</script>
