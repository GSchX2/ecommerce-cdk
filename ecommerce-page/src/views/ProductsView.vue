<template>
  <div class="container-sm">
    <div class="products row mt-5 d-flex">
      <div class="col mt-5"
        v-for="product in products"
        v-bind:key="product.SK"
      >
        <div class="card" style="width: 18rem;">
          <img :src="product.imageSource" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.price }}</p>
            <button type="button" class="btn btn-dark" @click="addItemCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsView",
  components: {},

  data() {
    return {
      products: [],
    };
  },

  mounted() {
    fetch('https://fgvkzh926b.execute-api.us-east-1.amazonaws.com/prod')
      .then(response => response.json())
      .then(res => this.products = res.products);
  },

  methods: {
    addItemCart(product) {
      fetch('https://6524af76ea560a22a4ea0098.mockapi.io/api/cart',
        {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(product)
        })
          .then(response => response.json())
          .then(res => console.log(res));
    },
  },
}
  
</script>

<style scoped>
.products a {
    color: #333;
    text-decoration: none;
}

</style>