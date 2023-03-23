<template>
    <q-page class="pb-60 split-screen-gradient " :class="$q.screen.width <= 599.99 ? 'pt-30' : 'pt-60'">
    <div class="upsell-wrapper row justify-center">

        <q-carousel animated swipeable control-type="regular" control-text-color="dark" control-color="white"
        v-model="slide" arrows infinite class="upsell-carousel">
            <q-carousel-slide :name="product?.id" class="rounded-md upsell-carousel__slide" :img-src="product?.image_url"
                v-for="product in products" />
        </q-carousel>

        <div class="base-card rounded-sm mt-30 w-100 row column justify-center items-center price p-40 py-xs-40 px-xs-15">
            <div class="row inline justify-center items-center">
                <div class="fs-20 q-pa-none fw-500 me-10 text-q-dark">Price:</div>
                <div class="fs-30 fw-600 me-10 text-q-dark">${{ currentSlideData.price_after_disc }}</div>
                <div class="fs-20 fw-500 bg-gray rounded-xs price__label text-q-dark">-{{ currentSlideData.disc_percentage
                }}%</div>
            </div>
            <div class="row inline justify-center items-center bg-gray-o-5 rounded-sm mt-30 py-xs-15 px-xs-20 price__quantity-wrapper">
                <div class="fs-20 fs-xs-16 q-pa-none fw-500 text-q-gray me-40 me-xs-10">Quantity:</div>
                <div class="row justify-center items-center">

                    <q-btn flat class="rounded-sm bg-white text-q-dark price__quantity-btn" size="12px" icon="icon-minus"
                        @click="onSubProductQty" />
                    <div class="mx-30 mx-xs-20 fs-20 fw-600 text-q-dark">{{ getProductDataOnCart(slide) != undefined ?
                        getProductDataOnCart(slide).qty : 0 }}</div>
                    <q-btn flat class="rounded-sm bg-white text-q-dark price__quantity-btn" size="12px" icon="icon-plus"
                        @click="onAddProductQty" />
                </div>
            </div>
        </div>

        <div class="mt-40">
            <p class="p-0 fw-500 fs-18 text-q-gray q-ma-none fs-xs-14">
                Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices tincidunt. Pulvinar sed justo et viverra
                pellentesque. <br /><br />Mauris augue nulla proin vel a. Facilisis fringilla molestie dignissim elit orci
                malesuada. Lorem sit sagittis vitae nulla id. Mauris ipsum sed sed faucibus. Nulla amet metus gravida orci
                faucibus nisl eros arcu lorem. Nullam ornare molestie nam id gravida volutpat bibendum sem feugiat. Neque
                vulputate in et maecenas porta mi tellus. In massa porttitor urna quis volutpat at.
            </p>
        </div>

        <div class="upsell__info mt-40 mb-sm-70 mb-xs-40 row justify-start items-start">
            <GuaranteedInfo class="upsell__info-left me-sm-20 h-100" />
            <div class="base-card row justify-xs-start justify-sm-start justify-md-center items-center upsell__info-right rounded-sm p-35 h-100" v-if="$q.screen.width > 600">
                <img src="/support 1.svg" class="me-xs-25 me-sm-25 me-md-30" />
                <div class="row column">
                    <p class="q-pa-none q-ma-none fs-20 fw-600 text-q-dark">24/7</p>
                    <p class="q-pa-none q-ma-none fs-20 text-q-gray fw-400">Support</p>
                </div>
            </div>

        </div>

        <div class="row column justify-center items-center">
            <q-btn unelevated flat no-caps color="primary" label="Yes, I want" icon-right="icon-arrow-right" align="right"
                size="xl" padding="0px 40px" class="btn-custom bg-dark-light mb-20 q-px-xl q-py-xs" text-color="white"
                @click="beforeToCheckout" />
            <q-btn unelevated flat no-caps color="dark" label="No, Thanks" size="18px" class="text-q-gray" />
        </div>

        <q-dialog v-model="emptyCartPopup" @hide="onPopupHide">
            <q-card style="width: 300px">
                <q-card-section>
                    <div class="text-h6 fs-16 fw-600 text-center">Your cart is empty</div>
                </q-card-section>
                <div class="row justify-center items-center">
                    <q-avatar rounded size="64px">
                        <img src="/empty-cart.png">
                    </q-avatar>
                </div>
                <q-card-section class="text-center">
                    Looks like you haven't added any products to your cart yet.
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" v-close-popup color="dark" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="commitToCheckoutPopup" @hide="onPopupHide">
            <q-card style="width: 300px">
                <q-card-section>
                    <div class="text-h6 fs-16 fw-600 text-center">Continue to Checkout</div>
                </q-card-section>
                <div class="row justify-center items-center">
                    <q-avatar rounded size="64px">
                        <img src="/shopping-bag.png">
                    </q-avatar>
                </div>
                <q-card-section class="text-center">
                    Your cart will be reserved for 10 Minutes, you can't update the cart during that period.
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="Continue" @click="toCheckout" v-close-popup color="dark" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useProductsStore } from "@/stores/productsStore"
import { useCartStore } from "@/stores/cartStore"
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import GuaranteedInfo from "@/components/GuaranteedInfo.vue"
import { AppVisibility, useQuasar } from 'quasar'

//== products store
const { products } = storeToRefs(useProductsStore());
const { fetchProducts } = useProductsStore();
//== cart store
const { cart, reservedTime } = storeToRefs(useCartStore());
const { addProductToCart, isProductExistOnCart,
    ExistingProductIndex, getProductDataOnCart, isCartNotEmpty } = useCartStore();

const router = useRouter();
AppVisibility.appVisible;
const $q = useQuasar();
const slide = ref(1);
const emptyCartPopup = ref(false);
const commitToCheckoutPopup = ref(false);

const currentSlideData = computed(() => {
    return products.value != undefined ? products.value[slide.value - 1] : [];
});

const onSubProductQty = () => {

    //check when reduce a product quantity, if the product exists on the cart or not.
    if (isProductExistOnCart(slide.value) != undefined) {

        const getExistingProductData = isProductExistOnCart(slide.value);
        const getExistingProductIndex = ExistingProductIndex(getExistingProductData);
        const getExistingProductRemainingQty = cart.value[getExistingProductIndex].qty;

        if (getExistingProductIndex > -1 && getExistingProductRemainingQty > 1) {
            cart.value[getExistingProductIndex].qty -= 1;
        } else {
            cart.value.splice(getExistingProductIndex, 1);
        }

    }

}

const onAddProductQty = () => {

    //check when adding a product quantity, if the product exists on the cart or not.
    if (isProductExistOnCart(slide.value) != undefined) {

        const getExistingProductData = isProductExistOnCart(slide.value);
        const getExistingProductIndex = ExistingProductIndex(getExistingProductData);

        if (getExistingProductIndex > -1) {
            cart.value[getExistingProductIndex].qty += 1;
        }

    } else {
        const productToAdd = currentSlideData.value;
        productToAdd.qty = 1;
        addProductToCart(productToAdd);
    }

}

const onPopupHide = () => {
    emptyCartPopup.value = false;
    commitToCheckoutPopup.value = false;
}

const beforeToCheckout = () => {

    if (isCartNotEmpty()) {
        commitToCheckoutPopup.value = true;
    } else {
        emptyCartPopup.value = true;
    }
}

const toCheckout = () => {

    var time = new Date();
    time.setSeconds(time.getSeconds() + 600);
    reservedTime.value = time;

    return router.push("/checkout/shipping-billing");
}

onMounted(async () => {
    await fetchProducts();
});

</script>

<style lang="scss" scoped>
$sm-breakpoint: 600px;
$md-breakpoint: 1024px;
$lg-breakpoint: 1440px;
$xl-breakpoint: 1920px;

.price {
    .price__label {
        padding: 3px 15px;
    }

    .price__quantity-btn {
        height: 50px;
    }
}
@media (max-width: 717.99px) {
    .upsell-wrapper {
        max-width: 343px;
        margin: 0 auto;
    }
    .upsell-carousel {
        width: 100%;
        max-height: 226px;
    }
}
@media (min-width: 718px) {
    .container {
        max-width: 664px;
    }
    .price {
        .price__quantity-wrapper {
            width: 100%;
            height: 80px;
        }
    }
    .upsell-wrapper {
        max-width: 664px;
        margin: 0 auto;
    }

    .upsell-carousel {
        .upsell-carousel__slide {
            width: 664px;
        }
    }
    .upsell__info {
        .upsell__info-left {
            width: 394px;
        }

        .upsell__info-right {
            width: 250px;
        }
    }
}

@media (min-width: $md-breakpoint) {
    .container {
        max-width: 1080px;
    }

    .upsell-wrapper {
        max-width: 790px;
        margin: 0 auto;
    }

    .upsell-carousel {
        .upsell-carousel__slide {
            width: 790px;
        }
    }

    .upsell__info {
        .upsell__info-left {
            width: 475px;
        }

        .upsell__info-right {
            width: 285px;
        }
    }
}

</style>