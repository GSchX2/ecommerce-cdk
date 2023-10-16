<template>
    <div class="container-sm">
        <div class="row">
            <div class="col mt-5"
                v-for="cartProduct in cartProducts"
                v-bind:key="cartProduct.SK"
            >
                <div class="card" style="width: 18rem;">
                    <img :src="cartProduct.imageSource" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ cartProduct.name }}</h5>
                        <p class="card-text">{{ cartProduct.price }}</p>
                        <button type="button" class="btn btn-dark" @click="removeItemCart(cartProduct.id)">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ShoppingCartView",
    components: {},

    data() {
        return {
            cartProducts: [],
        };
    },

    mounted() {
        fetch('https://im5b2hgmqc.execute-api.us-east-1.amazonaws.com/prod/cart')
            .then(response => response.json())
            .then(res => this.cartProducts = res.products);
    },

    methods: {
        removeItemCart(productId) {
            fetch(`https://6524af76ea560a22a4ea0098.mockapi.io/api/cart/${productId}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(() => {
                const cartProducts = this.cartProducts;
                const index = cartProducts.findIndex(e => e.id === productId);
                cartProducts.splice(index, 1);
            });
            console.log("removed");
        },

    }   
}
</script>

<style scoped>

</style>