<template>
  <div class="home">
    <div class="p-4">
      <div class="row">
        <div class="col-md-2">
         
        </div>
       
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

  mounted(){
 
  },

  methods: {
    
  },

  
};
</script>
