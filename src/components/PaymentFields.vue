<template>
    <div>
        <q-input name="card_number" v-model="cardNumberValue" rounded outlined label="Card Number" class="has-icon mb-10"
            :error-message="cardNumberErrorMessage || 'Enter valid card number'"
            :error="!!cardNumberErrorMessage || cardNumberHasError" no-error-icon @update:model-value="onCardNumberUpdate"
            v-cardformat:formatCardNumber
            >
            <template v-slot:prepend>
                <q-icon name="icon-credit-card" />
            </template>
        </q-input>

        <BaseInput label="Name on Card" name="name_on_card" class="mb-10" has-icon required>
            <q-icon name="icon-user" />
        </BaseInput>

        <div class="row justify-sm-between items-sm-center mb-10 q-col-gutter-sm">

            <q-input name="card_mm_yy" v-model="cardMMYYValue" rounded outlined label="MM/YY" class="col-sm-6 col-xs-12"
                :error-message="cardMMYYErrorMessage || 'Enter valid expiration date'"
                :error="!!cardMMYYErrorMessage || cardMMYYHasError" no-error-icon @update:model-value="onCardMMYYUpdate"
                v-cardformat:formatCardExpiry
                />

            <q-input name="card_cvv" v-model="cardCVVValue" rounded outlined label="CVV" class="col-sm-6 col-xs-12"
                :error-message="cardCVVErrorMessage || 'Enter valid card number'"
                :error="!!cardCVVErrorMessage || cardCVVHasError" no-error-icon @update:model-value="onCardCVVUpdate"
                v-cardformat:formatCardCVC />

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue"
import { useField } from 'vee-validate';
import { string } from "yup";
import BaseInput from "@/components/BaseFormElements/BaseInput.vue"
import validation from 'vue-credit-card-validation/src/validation';

import { useShippingBillingStore } from "@/stores/shippingBillingStore"
import { storeToRefs } from 'pinia';
const { cardType } = storeToRefs(useShippingBillingStore());

const cardNumberHasError = ref(false);
const cardMMYYHasError = ref(false);
const cardCVVHasError = ref(false);

const {
    value : cardNumberValue,
    errorMessage : cardNumberErrorMessage,
} = useField('card_number', string().required());

const {
    value : cardMMYYValue,
    errorMessage : cardMMYYErrorMessage,
} = useField('card_mm_yy', string().required());

const {
    value : cardCVVValue,
    errorMessage : cardCVVErrorMessage,
} = useField('card_cvv', string().required());


const onCardNumberUpdate = () => {
    if (validation.validateCardNumber(cardNumberValue.value)) {
        cardNumberHasError.value = false;
        cardType.value = validation.cardType(cardNumberValue.value)
    } else {
        cardNumberHasError.value = true;
        cardType.value = "";
    }
}

const onCardMMYYUpdate = () => {
    if(validation.validateCardExpiry(cardMMYYValue.value)){
        cardMMYYHasError.value = false;
    } else {
        cardMMYYHasError.value = true;
    }
}

const onCardCVVUpdate = () => {
    if(validation.validateCardCVC(cardCVVValue.value)){
        cardCVVHasError.value = false;
    } else {
        cardCVVHasError.value = true;
    }
}

</script>

<style scoped>
@media (min-width: 718px) {
    .form-checkout__name {
        width: 100%;
        max-width: 322px;
    }
}
@media (min-width: 1024px) {
    .form-checkout__name {
        width: 100%;
        max-width: 262px;
    }
}
</style>
