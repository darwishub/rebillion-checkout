import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('productsStore', () => {
    
    const products = ref();

    const fetchProducts = async () => {
        const { data, status } = await axios.get("https://my-json-server.typicode.com/darwisari/next-endpoint/products");
        if(status == 200) {
            products.value = data;
        }
    };

    return { products, fetchProducts };
});