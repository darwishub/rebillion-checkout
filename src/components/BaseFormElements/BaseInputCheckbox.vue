<template>
    
    <q-field
        :error-message="errorMessage"
        :error="!!errorMessage"
        no-error-icon
        :value="value"
        borderless
        dense
    >

    <q-checkbox
        v-model="value" 
        :val="props.value" 
        :label="props.label"
        @update:model-value="emits('onToggle', value)"  
    />

    </q-field>
    
</template>
  
<script setup>
import { computed, toRefs } from "vue"
import { useField } from 'vee-validate';
import { boolean } from "yup";

const props = defineProps({
    type: {
        type: String,
        default: 'checkbox',
    },
    defaultValue: {
        type: [String, Number, Boolean]
    },
    value: {
        type: [String, Number, Boolean]
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
    },
    required : {
        type: Boolean
    },
});

const emits = defineEmits(['onToggle']);
const { name } = toRefs(props);

const fieldRules = computed(() => {
    return props.required ? boolean()
    .required("You must acknowledge the TOS & Billing terms.")
    .oneOf([true], "You must acknowledge the TOS & Billing terms.") : undefined;
})

const {
  value,
  setValue,
  errorMessage
} = useField(name.value, fieldRules.value, {
  type: 'checkbox',
  checkedValue: props.defaultValue,
  validateOnMount: false,
  initialValue: props.defaultValue
});


</script>
  
<style lang="scss" scoped></style>