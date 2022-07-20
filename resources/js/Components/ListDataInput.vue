<script setup>
import { onMounted, ref } from 'vue';


const emit = defineEmits(['update:modelValue', 'value']);

const valueText = ref("");
const error = ref(false);

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
    }
})

const changeText = (text) => {
    error.value = false;
    setValuekey(text);
    valueText.value = text
}

const setValuekey = (text) => {

    if (text !== "") {
        const selectOpcion = props.options.find(opcion => {
            return opcion[props.nameOption] === text
        });
        if (selectOpcion !== undefined) {
            emit('update:modelValue', selectOpcion[props.keyOption]);
        } else {
            error.value = true;
            emit('update:modelValue', "");
        }
    } else {
        emit('update:modelValue', '');
    }

}


const inputlist = ref(null);

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

