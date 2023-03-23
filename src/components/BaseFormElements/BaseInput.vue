<template>
    <q-input rounded outlined 
        :label="props.label" 
        :class="{'has-icon' : props.hasIcon }"
        v-model="value"
        :error-message="errorMessage"
        :error="!!errorMessage"
        no-error-icon
        >
        <template v-slot:prepend v-if="props.hasIcon">
            <slot/>
        </template>
    </q-input>
</template>
  
<script setup>
import { computed, toRefs } from "vue"
import { useField } from 'vee-validate';
import { string } from "yup";

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    value: {
        type: [String, Number]
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
    },
    required: {
        type: Boolean,
    },
    hasIcon: {
        type: Boolean,
    }
});

const { name } = toRefs(props);

const typeRules = {
    'text' : string().nullable().required(),
    'email' : string().nullable().email().required(),
}

const fieldRules = computed(() => {
    return props.required ? props.type != "" || props.type != undefined ? typeRules[props.type] : typeRules['text'] : undefined;
});

const {
    value,
    errorMessage,
    handleBlur,
    handleChange,
} = useField(name.value, fieldRules.value, {
    initialValue: props.value,
});


</script>
  
<style lang="scss" scoped></style>