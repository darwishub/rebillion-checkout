<template>
    <q-page class="pb-60 split-screen-gradient " :class="$q.screen.width <= 599.99 ? 'pt-30' : 'pt-60'">
    <div class="container">

        <div class="row justify-between">
            <div class="col-xs-12 col-sm-12 col-md-6">

                <router-view />

            </div>
            <div class="col-xs-12 col-sm-12 col-md-5">

                <div class="sticky-on-scroll">

                    <CartProductList
                        v-if="$q.screen.width >= 1024"
                        class="mb-40"
                        :products="cart"
                        :sub-total="cartSubTotal()"
                        :shipping-price="shippingPrice"
                        :total="cartTotal()"
                    />

                    <GuaranteedInfo 
                        v-if="$q.screen.width >= 600"
                        class="mb-15"   
                    />
                    <div class="base-card rounded-md row column justify-start bg-white p-30 p-xs-15" v-if="showClubInfo && $q.screen.width >= 1024">
                        <p class="fs-18 fw-600 mb-10 text-q-dark">The ultimate jewellery club</p>
                        <p class="fs-14 fw-400 text-q-gray">Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices
                            tincidunt. Pulvinar sed justo et viverra pellentesque.</p>
                        <div class="row justify-start items-center mb-5" v-for="benefit in benefitList">
                            <q-icon size="20px" name="icon-check" class="me-10 text-q-gray" />
                            <p class="fs-14 fw-400 q-pa-none q-ma-none text-q-gray">
                                {{ benefit }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </q-page>
</template>

<script setup>
import { watchEffect, onMounted, computed, ref } from "vue";
import { useCartStore } from "@/stores/cartStore"
import { storeToRefs } from 'pinia';
import { useRoute } from "vue-router";
import { AppVisibility, useQuasar } from 'quasar'

import CartProductList from "@/components/CartProductList.vue"
import GuaranteedInfo from "@/components/GuaranteedInfo.vue"

const { cart, shippingPrice } = storeToRefs(useCartStore());
const { cartSubTotal, cartTotal } = useCartStore();

const route = useRoute();
const showClubInfo = ref(false);
AppVisibility.appVisible;
const $q = useQuasar();
const shippingMethodPrice = {
    "free": 10,
    "DHL": 20
}

const benefitList = [
    "Extra 10$ off!",
    "Free shipping on marked club items!",
    "Free returns on marked club items!"
];

onMounted(() => {
    if (route.name == 'ShippingBilling') {
        showClubInfo.value = true;
    } else {
        showClubInfo.value = false;
    }
})

</script>

<style scoped>
.sticky-on-scroll {
    position: sticky;
    top: 125px;
}
</style>