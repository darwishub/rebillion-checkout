<template>
    <div class="cart-product-list">
        <CartProduct class="mb-20" v-for="product in props.products" :img_url="product?.image_url" :product_name="product?.name"
            :product_qty="product?.qty" :total_price="product?.qty * product?.price_after_disc" />
        <q-separator color="bg-gray-light-3 mb-15 mb-xs-15" />

        <div class="row justify-between items-center mb-10">
            <p class="fs-16 fw-400 q-pa-none q-ma-none text-q-dark">Subtotal:</p>
            <p class="fs-16 fw-400 q-pa-none q-ma-none text-q-dark">${{ props.subTotal }}</p>
        </div>

        <div class="row justify-between items-center mb-10">
            <p class="fs-16 fw-400 q-pa-none q-ma-none text-q-dark">Shipping:</p>
            <p class="fs-16 fw-400 q-pa-none q-ma-none text-q-dark">${{ props.shippingPrice }}</p>
        </div>

        <q-separator color="bg-gray-light-3 mb-15 mb-xs-15" />

        <div class="row justify-between items-center mb-10">
            <p class="fs-16 fw-500 q-pa-none q-ma-none text-q-dark">Total</p>
            <p class="fs-16 fw-600 q-pa-none q-ma-none text-q-dark">${{ props.total }}</p>
        </div>
    </div>
</template>

<script setup>
import CartProduct from "@/components/CartProduct.vue"

const props = defineProps({
    products: {
        type: Array
    },
    subTotal: {
        type: Number
    },
    shippingPrice: {
        type: Number
    },
    total: {
        type: Number
    }
});

</script>