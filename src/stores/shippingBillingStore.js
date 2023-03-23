import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShippingBillingStore = defineStore('shippingBillingStore', () => {

    const shippingBillingData = ref();
    const cardType = ref("");

    const resetShippingBilling = () => {
        shippingBillingData.value = null;
        cardType.value = "";
    }

    return { shippingBillingData, cardType, resetShippingBilling };
}, {
    persist: true
});