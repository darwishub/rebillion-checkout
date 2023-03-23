import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cartStore', () => {

    const cart = ref([]);
    const reservedTime = ref();
    const shippingPrice = ref(0);

    const addProductToCart = (productData) => {
        return cart.value.push(productData);
    }

    const isProductExistOnCart = (productId) => {
        return cart.value.find(i => i.id == productId);
    }

    const ExistingProductIndex = (productData) => {
        return cart.value.indexOf(productData);
    }

    const getProductDataOnCart = (productId) => {

        if (isProductExistOnCart(productId) != undefined) {

            const getExistingProductData = isProductExistOnCart(productId);
            const getExistingProductIndex = ExistingProductIndex(getExistingProductData);

            return cart.value[getExistingProductIndex];
        } else {
            return;
        }

    }

    const isCartNotEmpty = () => {
        return cart.value.length > 0;
    }

    const cartSubTotal = () => {
        if (isCartNotEmpty()) {

            const result = cart.value.map(i => i.qty * i.price_after_disc);
            const result_Total = result.reduce((a, b) => a + b, 0);
            return result_Total;

        } else {
            return 0;
        }
    }

    const cartTotal = () => {
        return cartSubTotal() + shippingPrice.value;
    }

    const resetCart = () => {
        cart.value = [];
        reservedTime.value = null;
        shippingPrice.value = 0;
    }

    return { cart, reservedTime, shippingPrice, addProductToCart, isProductExistOnCart, ExistingProductIndex, getProductDataOnCart, isCartNotEmpty, cartSubTotal, cartTotal, resetCart };
}, {
    persist: true
});