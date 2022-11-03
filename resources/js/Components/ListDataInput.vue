<script setup>
import { type } from '@amcharts/amcharts5';
import { computed, onMounted, ref, watch } from 'vue';
import { formatoMoney } from "../../js/utils/conversiones";

const emit = defineEmits(['update:modelValue', 'value']);


const props = defineProps({
    'modelValue': {
        require: true
    },
    'list': {
        require: true
    },
    'disabled': {
        default: false
    },
    'options': {
        default: []
    },
    'keyOption': {
        type: String,
        default: 'id'
    },
    'nameOption': {
        type: String,
        default: 'nombre'
    },
    'value': {
        default: ''
    },
    'cantidad': {
        default:'nombre',
        type:String
    }
})


const valueText = ref("");

const changeText = (text) => {
    valueText.value = text
}



const error = computed(() => {
    if (valueText.value !== "" || props.modelValue != "") {
        if (valueText.value !== "") {
            const selectOpcion = props.options.find(opcion => {
                return opcion[props.nameOption] == valueText.value
            });
            if (selectOpcion !== undefined) {
                emit('update:modelValue', selectOpcion[props.keyOption]);
            } else {
                emit('update:modelValue', "");
                return true;
            }
        } else {
            const selectOpcion = props.options.find(opcion => {
                return opcion[props.keyOption] == props.modelValue
            });
            if (selectOpcion !== undefined) {
                valueText.value = selectOpcion[props.nameOption]
            }
        }
    } else {
        emit('update:modelValue', '');
    }
    return false
})


const inputlist = ref(null);

watch((props), () => {
    valueText.value = props.value
})

onMounted(() => {
    if (inputlist.value.hasAttribute('autofocus')) {
        inputlist.value.focus();
    }
});

defineExpose({ focus: () => inputlist.value.focus() });

</script>
<template>
    <div class="text-gray-600">
        <input type="text" :list="list"
            class="w-full py-1 text-sm text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 disabled:bg-gray-300"
            :class="{ 'border-red-400': error, 'text-red-400': error }" :value="valueText"
            @keyup="emit('value', valueText)" @input="changeText($event.target.value)" ref="inputlist"
            :disabled="disabled">
        <datalist :id="list">
            <option v-for="opcion in props.options" :key="opcion[props.keyOption]">
                {{ opcion[props.nameOption] }}
            </option>
        </datalist>
    </div>
</template>

