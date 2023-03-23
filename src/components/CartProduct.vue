<template>
    <div class="row justify-between items-center">
        <div class="row justify-start items-center">
            <q-avatar rounded size="70px" class="me-20">
                <img :src="props.img_url">
                <q-badge floating rounded class="fw-500 gray">
                    {{ props.product_qty }}
                </q-badge>
            </q-avatar>
            <p class="fs-16 fw-400 q-pa-none q-ma-none">{{ props.product_name }}</p>
        </div>
        <p class="fs-16 fw-400 q-pa-none q-ma-none">${{ props.total_price }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    img_url : {
        type: String
    },
    product_name: {
        type: String
    },
    product_qty : {
        type: [String, Number]
    },
    total_price : {
        type: Number
    }
});
</script>