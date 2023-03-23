<template>
    
    <q-select rounded outlined 
        v-model="value" 
        :options="options" 
        :class="{'has-icon' : props.hasIcon }"
        :label="props.label" 
        :error-message="errorMessage"
        :error="!!errorMessage"
        no-error-icon
        :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
        :option-label="opt => Object(opt) === opt && 'label' in opt ? opt.label : '- Null -'"
        emit-value
        map-options
        @filter="filterFn"
        use-input
        input-debounce="0"
        >
            <template v-slot:prepend>
                <slot/>
            </template>
    </q-select>

</template>
  
<script setup>
import { computed, toRefs, ref } from "vue"
import { useField } from 'vee-validate';
import { string } from "yup";
import { countries } from "i18n-iso-countries/langs/en.json"

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

const options = ref();

const fieldRules = computed(() => {
    return props.required ? string().ensure().required() : undefined;
});

const CountriesList = computed(() => {
  return Object.keys(countries).map((key) => ({ value: key, label: Array.isArray(countries[key]) ? countries[key][0] : countries[key] }));
});

const filterFn = (val, update) => {

if (val === '') {
    update(() => {
        options.value = CountriesList.value
    })
    return
}

update(() => {
    const needle = val.toLowerCase()
    options.value = CountriesList.value.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
})
}

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