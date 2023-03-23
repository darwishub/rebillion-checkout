<template>
    <div>
        <p class="fs-36 fs-xs-30 text-q-dark fw-700 mb-10">Checkout</p>
        <q-breadcrumbs class="text-q-dark fw-500 mb-sm-40 mb-50 mb-xs-30">
            <template v-slot:separator>
                <q-icon size="10px" name="icon-angle-right" class="text-q-gray-light" />
            </template>

            <q-breadcrumbs-el label="Cart" class="text-q-gray-light" />
            <q-breadcrumbs-el label="Shipping & Billing" class="" />
        </q-breadcrumbs>

        <div class="base-card rounded-sm row justify-between items-center p-25 p-xs-15 mb-xs-30 mb-sm-30"
            v-if="$q.screen.width <= 1023">
            <div class="row justify-center items-center">
                <q-avatar square size="24px">
                    <img src="/mobile-cart.svg">
                </q-avatar>
                <div class="row justify-center items-center" @click="onCartMobileToggle">
                    <p class="q-pa-none fs-16 fs-xs-14 fw-500 text-q-gray q-mb-none ms-15 me-25 text-q-dark">Show order
                        summary</p>
                    <q-icon size="20px" :name="cartMobileToggleStatus ? 'icon-angle-small-down' : 'icon-angle-small-up'" class="me-10" />
                </div>
            </div>
            <p class="fs-16 fs-xs-14 fw-600 q-pa-none q-mb-none text-q-dark">${{ cartTotal() }}</p>
        </div>

        <div class="bg-gray-4-o-3 rounded-md mb-30 p-30 px-xs-15 py-xs-20" v-if="cartMobileToggleStatus && $q.screen.width <= 1023">
            <CartProductList class="mb-40" :products="cart" :sub-total="cartSubTotal()" :shipping-price="shippingPrice"
                :total="cartTotal()" />
            <div class="base-card rounded-md row column justify-start p-30 p-xs-15">
                <p class="fs-18 fw-600 mb-10 text-q-dark">The ultimate jewellery club</p>
                <p class="fs-14 fw-400 text-q-gray">Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices
                    tincidunt. Pulvinar sed justo et viverra pellentesque.</p>
                <div class="row justify-start items-center mb-5" v-for="benefit in benefitList">
                    <q-icon size="16px" name="icon-check" class="me-10 text-q-gray" />
                    <p class="fs-14 fw-400 q-pa-none q-ma-none text-q-gray">
                        {{ benefit }}
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-gray-light-2 rounded-md p-30 mb-30">
            <div class="row column">
                <p class="q-pa-none fs-18 fs-xs-16 fw-500 mb-15 text-q-dark text-xs-center">🔥 Your cart is reserved for
                    <span class="fw-700">10:00</span>
                    minutes
                </p>
                <div class="row justify-start justify-xs-center items-start cart-timer">
                    <div class="fs-18 fw-500 row justify-center items-center">
                        <div class="cart-timer__times rounded-xs-12px">{{ reservedTimer.hours }}</div>
                        <div class="mx-8">:</div>
                    </div>
                    <div class="fs-18 fw-500 row justify-center items-center">
                        <div class="cart-timer__times rounded-xs-12px">{{ reservedTimer.minutes }}</div>
                        <div class="mx-8">:</div>
                    </div>
                    <div class="fs-18 fw-500 row justify-center items-center">
                        <div class="cart-timer__times rounded-xs-12px">{{ reservedTimer.seconds }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="base-card rounded-md p-30 mb-50 px-xs-15 py-xs-20">
            <p class="text-q-dark mb-20 fs-20 fw-600">Express Checkout</p>
            <div class="row justify-start items-center ">
                <img src="/Group 1000004415.svg" style="width:145px" class="me-xs-10 mb-xs-10 mb-sm-10 me-sm-20 me-md-10" />
                <img src="/Group 1000004416.svg" style="width:145px" class="me-xs-10 mb-xs-10 mb-sm-10 me-sm-20 me-md-10" />
                <img src="/Group 1000004417.svg" style="width:145px" class="me-xs-10 mb-xs-10 mb-sm-10 me-sm-20 me-md-10" />
            </div>
        </div>

        <div class="form-checkout">
            <form @submit="onFinishCheckout">
                <div class="mb-50">
                    <p class="text-q-dark mb-30 fs-24 fw-600 text-q-dark">Contact Information</p>
                    <BaseInput label="Email Address" has-icon name="email" type="email" required>
                        <q-icon name="icon-envelope" class="text-q-gray-light" />
                    </BaseInput>
                </div>
                <div class="mb-50">
                    <p class="text-q-dark mb-20 fs-24 fw-600 text-q-dark">Shipping Address</p>
                    <BaseSelectCountries class="mb-10" label="Country" has-icon name="shipping_address_country" required>
                        <q-icon name="icon-location-alt" class="text-q-gray-light" />
                    </BaseSelectCountries>

                    <div class="row justify-sm-between items-sm-center mb-10 q-col-gutter-sm">
                        <BaseInput class="col-sm-6 col-xs-12" label="First Name" has-icon
                            name="shipping_address_first_name" required>
                            <q-icon name="icon-user" />
                        </BaseInput>
                        <BaseInput class="col-sm-6 col-xs-12" label="Last Name" has-icon name="shipping_address_last_name"
                            required>
                            <q-icon name="icon-user" />
                        </BaseInput>
                    </div>
                    <BaseInput label="Address" class="mb-10" has-icon name="shipping_address" required>
                        <q-icon name="icon-home-location" />
                    </BaseInput>

                    <div class="row justify-sm-between items-sm-center mb-10 q-col-gutter-sm">
                        <BaseInput class="col-sm-6 col-xs-12" label="City" name="shipping_address_city" required />
                        <BaseInput class="col-sm-6 col-xs-12" label="Postal Code"
                            name="shipping_address_postal_code" required v-cardformat:restrictNumeric maxlength="16"/>
                    </div>

                </div>
                <div class="mb-50">
                    <p class="text-q-dark mb-20 fs-24 fw-600 text-q-dark">Shipping Method</p>
                    <div class="row column">
                        <div class="row justify-between items-center" v-for="method in shippingMethod"
                            v-if="$q.screen.width >= 1024">
                            <BaseInputRadio :name="method.name" :value="method.value" :label="method.label"
                                :default-value="method.default_value" />
                            <p class="q-pa-none q-ma-none fs-16 fw-600">${{ shippingMethodPrice[method.value] }}</p>
                        </div>
                        <div class="row justify-between items-center" v-if="$q.screen.width <= 1023">
                            <div class="row column">
                                <BaseInputRadio :name="method.name" :value="method.value" :label="method.label"
                                    v-for="method in shippingMethod" :default-value="method.default_value" />
                            </div>
                            <p class="q-pa-none q-ma-none fs-36 fw-600">${{ shippingPrice }}</p>
                        </div>
                    </div>
                </div>

                <div class="mb-50">
                    <p class="text-q-dark mb-5 fs-24 fw-600 text-q-dark">Payment Method</p>
                    <p class="fs-14 fw-400 text-q-gray-light mb-30">All transaction are secured and encryted</p>

                    <PaymentFields />

                    <q-item tag="label" class="mb-50 q-pa-none no-control">
                        <q-item-section avatar top>
                            <BaseInputCheckbox name="agree_with_TOS" :value="true" :default-value="false" required
                                label="By checking this box, I acknowledge that I have read and agree to the Terms of Service, and Monthly Billing Terms of this website and want to opt-in for the monthly billed Dream Collection Club®" />
                        </q-item-section>
                    </q-item>

                    <div class="mb-50">
                        <p class="text-q-dark mb-5 fs-24 fw-600 text-q-dark">Billing Address</p>
                        <p class="fs-14 fw-400 text-q-gray-light mb-20">Specify the address for your payment option
                        </p>
                        <div class="row column mb-20">
                            <div class="row justify-between items-center" v-for="option in billingAddressOptions">
                                <BaseInputRadio :name="option.name" :value="option.value" :label="option.label"
                                    :default-value="option.default_value" />
                            </div>
                        </div>
                        <template v-if="!values.is_same_as_shipping_address">
                            <BaseSelectCountries class="mb-10" label="Country" has-icon name="billing_address_country"
                                required>
                                <q-icon name="icon-location-alt" />
                            </BaseSelectCountries>

                            <div class="row justify-sm-between items-sm-center mb-10 q-col-gutter-sm">
                                <BaseInput class="col-sm-6 col-xs-12" label="First Name" has-icon
                                    name="billing_address_first_name" required>
                                    <q-icon name="icon-user" />
                                </BaseInput>
                                <BaseInput class="col-sm-6 col-xs-12" label="Last Name" has-icon
                                    name="billing_address_last_name" required>
                                    <q-icon name="icon-user" />
                                </BaseInput>
                            </div>
                            <BaseInput label="Address" has-icon name="billing_address" class="mb-10" required>
                                <q-icon name="icon-home-location" />
                            </BaseInput>

                            <div class="row justify-sm-between items-sm-center mb-10 q-col-gutter-sm">
                                <BaseInput class="col-sm-6 col-xs-12" label="City" name="billing_address_city"
                                    required/>
                                <BaseInput class="col-sm-6 col-xs-12" label="Postal Code"
                                    name="billing_address_postal_code" required v-cardformat:restrictNumeric maxlength="16"/>
                            </div>
                        </template>

                    </div>

                    <q-btn unelevated flat no-caps color="primary" label="Complete Order" icon-right="icon-arrow-right"
                        align="center" size="18px" padding="0px 40px" class="btn-custom bg-dark-light mb-20 w-100-xs"
                        text-color="white" type="submit" />

                </div>
            </form>
        </div>

        <q-dialog v-model="cartReversedTimeOver" persistent @hide="onPopupHide">
            <q-card style="width: 300px">
                <q-card-section>
                    <div class="text-h6 fs-16 fw-600 text-center">Whoops! Cart Reserved Expired</div>
                </q-card-section>
                <div class="row justify-center items-center">
                    <q-avatar rounded size="64px">
                        <img src="/sad.png">
                    </q-avatar>
                </div>
                <q-card-section class="text-center">
                    You haven't completed the payment after 10 Minutes, the order can't be continued.
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="Back to Shop" to="/" @click="backToShop" v-close-popup color="dark" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import BaseInput from "@/components/BaseFormElements/BaseInput.vue"
import BaseSelectCountries from "@/components/BaseFormElements/BaseSelectCountries.vue"
import BaseInputRadio from "@/components/BaseFormElements/BaseInputRadio.vue"
import BaseInputCheckbox from "@/components/BaseFormElements/BaseInputCheckbox.vue"
import PaymentFields from "@/components/PaymentFields.vue";
import CartProductList from "@/components/CartProductList.vue"
import { watchEffect, onMounted, ref } from "vue";

import { useCartStore } from "@/stores/cartStore"
import { useShippingBillingStore } from "@/stores/shippingBillingStore"
import { storeToRefs } from 'pinia';
import { useTimer } from 'vue-timer-hook';
import { useRouter } from "vue-router";
import { useForm } from 'vee-validate';
import { AppVisibility, useQuasar } from 'quasar'

const { reservedTime, shippingPrice, cart } = storeToRefs(useCartStore());
const { shippingBillingData } = storeToRefs(useShippingBillingStore());
const { cartTotal, cartSubTotal, resetCart } = useCartStore();
const { resetShippingBilling } = useShippingBillingStore();

const router = useRouter();
const reservedTimer = useTimer(new Date(reservedTime.value));

const { handleSubmit, values } = useForm();
const cartReversedTimeOver = ref(false);

const onFinishCheckout = handleSubmit(async values => {
    shippingBillingData.value = values;
    return router.push("/checkout/order-confirmed");

});

AppVisibility.appVisible;
const $q = useQuasar();

const shippingMethod = [
    {
        name: "shipping_method",
        value: "free",
        label: "Free shipping",
        default_value: "free"
    },
    {
        name: "shipping_method",
        value: "DHL",
        label: "DHL with price",
        default_value: "free"
    }
];

const billingAddressOptions = [
    {
        name: "is_same_as_shipping_address",
        value: true,
        label: "Same as shipping address",
        default_value: true
    },
    {
        name: "is_same_as_shipping_address",
        value: false,
        label: "Use a different billing address",
        default_value: true
    }
];

const benefitList = [
    "Extra 10$ off!",
    "Free shipping on marked club items!",
    "Free returns on marked club items!"
];

const shippingMethodPrice = {
    "free": 0,
    "DHL": 20
}
const cartMobileToggleStatus = ref(false);
const onCartMobileToggle = () => {
    cartMobileToggleStatus.value = !cartMobileToggleStatus.value;
}

const onPopupHide = () => {
    cartReversedTimeOver.value = false;
}

const backToShop = () => {
    resetCart();
    resetShippingBilling();
}

onMounted(() => {
    cartReversedTimeOver.value = false;
    watchEffect(async () => {

        if (reservedTimer.isExpired.value) {
            cartReversedTimeOver.value = true;
            resetCart();
            resetShippingBilling();
        }

        shippingPrice.value = shippingMethodPrice[values.shipping_method]

    })
});

</script>

<style lang="scss" scoped>
.cart-timer {
    .cart-timer__times {
        background: #fff;
        padding: 5px 11px;
    }
}

@media (min-width: 718px) {
    .form-checkout {
        .form-checkout__name {
            width: 100%;
            max-width: 322px;
        }
    }
}
@media (min-width: 1024px) {
    .form-checkout {
        .form-checkout__name {
            width: 100%;
            max-width: 262px;
        }
    }
}
</style>