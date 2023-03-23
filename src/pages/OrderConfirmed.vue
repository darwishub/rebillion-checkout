<template>
    <div class="base-card rounded-sm row justify-between items-center p-25 p-xs-15 mb-xs-30 mb-sm-30" v-if="$q.screen.width <= 1023">
        <div class="row justify-center items-center">
            <q-avatar square size="24px">
                <img src="/mobile-cart.svg">
            </q-avatar>
            <div class="row justify-center items-center" @click="onCartMobileToggle">
                <p class="q-pa-none fs-16 fs-xs-14 fw-500 text-q-gray q-mb-none ms-15 me-25">Show order summary</p>
                <q-icon size="20px" :name="cartMobileToggleStatus ? 'icon-angle-small-down' : 'icon-angle-small-up'" class="me-10" />
            </div>
        </div>
        <p class="fs-16 fs-xs-14 fw-600 q-pa-none q-mb-none">${{ cartTotal() }}</p>
    </div>

    <div class="bg-gray-4-o-3 rounded-md mb-30 p-30 px-xs-15 py-xs-20" v-if="cartMobileToggleStatus && $q.screen.width <= 1023">
        <CartProductList class="mb-40" :products="cart" :sub-total="cartSubTotal()" :shipping-price="shippingPrice"
            :total="cartTotal()" />
        <div class="base-card rounded-md row column justify-start p-30 p-xs-15">
            <p class="fs-18 fw-600 mb-10 text-q-dark">The ultimate jewellery club</p>
            <p class="fs-14 fw-400 text-q-gray">Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices
                tincidunt. Pulvinar sed justo et viverra pellentesque.</p>
            <div class="row justify-start items-center mb-5" v-for="benefit in benefitList">
                <q-icon size="16px" name="icon-check text-q-gray" class="me-10 me-xs-5" />
                <p class="fs-14 fw-400 q-pa-none q-ma-none text-q-gray">
                    {{ benefit }}
                </p>
            </div>
        </div>
    </div>

    <div class="row column justify-center items-center">
        <q-avatar square size="100px" class="mb-xs-30 mb-40">
            <img src="/like.svg">
        </q-avatar>
        <p class="q-pa-none fs-24 fw-600 text-center mb-5 mb-xs-5 text-q-dark">Thank you for your order</p>
        <p class="fs-16 fw-500 text-q-gray text-center mb-30 mb-xs-20">Your order is confirmed</p>
        <q-badge class="base-badge mb-30">
            Order ID: #10040
        </q-badge>
        <q-btn unelevated flat no-caps color="primary" @click="backToShop" label="Back to Shop" icon="icon-arrow-left"
            size="18px" padding="0px 40px" class="btn-custom bg-dark-light mb-50" text-color="white" to="/" />

        <div class="base-card rounded-md p-sm-40 p-xs-30 w-100" :class="{ 'mb-40' : $q.screen.width <= 1023 }">
            <div class="row column">
                <div class="row justify-between items-center q-col-gutter-lg" v-for="info, index in shippingBilingInfo"
                    :class="{ 'mb-10': index != shippingBilingInfo.length - 1 }">
                    <div class="col-xs-12 col-sm-6 col-md-6" v-for="data in info">
                        <p class="fs-14 fw-400 q-pa-none q-mb-xs text-q-gray">{{ data.info }}</p>
                        <p class="fs-14 fw-500 q-pa-none q-ma-none text-q-dark">{{ data.value }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useShippingBillingStore } from "@/stores/shippingBillingStore"
import { useCartStore } from "@/stores/cartStore"
import { storeToRefs } from 'pinia';
import { AppVisibility, useQuasar } from 'quasar'
import CartProductList from "@/components/CartProductList.vue"

const { shippingBillingData, cardType } = storeToRefs(useShippingBillingStore());
const { resetCart, cartTotal, cartSubTotal } = useCartStore();
const { reservedTime, shippingPrice, cart } = storeToRefs(useCartStore());
const { resetShippingBilling } = useShippingBillingStore();

const backToShop = () => {
    resetCart();
    resetShippingBilling();
}
AppVisibility.appVisible;
const $q = useQuasar();
const shippingBilingInfo = computed(() => {
    return [
        [
            {
                info: 'Name',
                value: `${shippingBillingData.value?.shipping_address_first_name} ${shippingBillingData.value?.shipping_address_last_name}`
            },
            {
                info: 'Email',
                value: `${shippingBillingData.value?.email}`
            }
        ],
        [
            {
                info: 'Shipping Address',
                value: `${shippingBillingData.value?.shipping_address}, ${shippingBillingData.value?.shipping_address_city}, ${shippingBillingData.value?.shipping_address_postal_code}`
            },
            {
                info: 'Billing Address',
                value:  shippingBillingData.value?.is_same_as_shipping_address ? 'Same as shipping' : `${shippingBillingData.value?.billing_address, shippingBillingData.value?.billing_address_city, shippingBillingData.value?.billing_address_postal_code }`
            }
        ],
        [
            {
                info: 'Shipping',
                value: `${shippingBillingData.value?.shipping_method}`
            },
            {
                info: 'Payment Method',
                value: `${cardType.value}`
            }
        ],
    ]
});
const cartMobileToggleStatus = ref(false);
const onCartMobileToggle = () => {
    cartMobileToggleStatus.value = !cartMobileToggleStatus.value;
}

const benefitList = [
    "Extra 10$ off!",
    "Free shipping on marked club items!",
    "Free returns on marked club items!"
];

</script>