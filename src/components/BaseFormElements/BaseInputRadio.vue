<template>
    
    <q-radio 
        v-model="value" 
        :val="props.value" 
        :label="props.label"   
    />

</template>
  
<script setup>
import { computed, toRefs, onMounted } from "vue"
import { useField } from 'vee-validate';
import { string } from "yup";

const props = defineProps({
    type: {
        type: String,
        default: 'radio',
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
});

const { name } = toRefs(props);


const {
  value,
  setValue
} = useField(name.value, undefined, {
  type: 'radio',
  checkedValue: props.defaultValue,
});

onMounted(() => {
    setValue(props.defaultValue);
});


</script>
  
<style lang="scss" scoped></style>