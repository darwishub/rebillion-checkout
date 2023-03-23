import { createWebHistory, createRouter } from 'vue-router'

import MainLayouts from '@/layouts/MainLayouts.vue'
import UpSell from '@/pages/UpSell.vue'
import Checkout from '@/pages/Checkout.vue'
import ShippingBilling from '@/pages/ShippingBilling.vue'
import OrderConfirmed from '@/pages/OrderConfirmed.vue'

import { useShippingBillingStore } from "@/stores/shippingBillingStore"
import { useCartStore } from "@/stores/cartStore"

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/upsell'
  },
  {
    path: '/',
    redirect: '/upsell'
  },
  {
    path: '/checkout/',
    redirect: '/checkout/shipping-billing',
  },
  {
    path: '/',
    component: MainLayouts,
    name: 'MainLayouts',
    children: [
      {
        path: '/upsell',
        component: UpSell,
        name: "UpSell"
      },
      {
        path: '/checkout/',
        component: Checkout,
        children: [
          {
            path: 'shipping-billing',
            component: ShippingBilling,
            name: 'ShippingBilling'
          },
          {
            path: 'order-confirmed',
            component: OrderConfirmed,
            name: "OrderConfirmed"
          },
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'instant'
    }
  },
});

router.beforeEach((to, from, next) => {
  
  const cartData = useCartStore();
  const shippingBillingData = useShippingBillingStore();

  if (to.name === 'ShippingBilling' && cartData.cart.length == 0 && cartData.reservedTime == undefined
    || to.name === 'OrderConfirmed' && cartData.cart.length == 0 && cartData.reservedTime == undefined
    || to.name === 'ShippingBilling' && cartData.cart.length != 0 && cartData.reservedTime == undefined
  ) {
    next({ name: 'UpSell' });
  }

  else if (to.name === 'UpSell' && cartData.cart.length > 0 && cartData.reservedTime != undefined && shippingBillingData.shippingBillingData == null && from.name != 'MainLayouts'
    || to.name === 'OrderConfirmed' && cartData.cart.length > 0 && cartData.reservedTime != undefined && shippingBillingData.shippingBillingData == null) {
    next({ name: 'ShippingBilling' });
  }

  else if (to.name === 'UpSell' && cartData.cart.length > 0 && shippingBillingData.shippingBillingData != null && cartData.reservedTime != undefined && from.name != 'MainLayouts'
    || to.name === 'ShippingBilling' && cartData.cart.length > 0 && cartData.reservedTime != undefined && shippingBillingData.shippingBillingData != null) {
    next({ name: 'OrderConfirmed' });
  } else {
    next();
  }



});

export default router