<script setup>
import { computed, onMounted, ref } from "vue";
import { formatoMoney } from "../utils/conversiones";

const emit = defineEmits(["update:modelValue", "value"]);

const props = defineProps({
    modelValue: {
        require: true,
    },
    list: {
        require: true,
    },
    disabled: {
        default: false,
    },
    options: {
        default: [],
    },
    keyOption: {
        type: String,
        default: "id",
    },
    nameOption: {
        type: String,
        default: "nombre",
    },
    valueText: {
        default: "",
    },
    cantidad: {
        default: "nombre",
        type: String,
    },
});


const changeText = (text) => {
    emit('value', text);
};

const error = computed(() => {
    if (props.valueText !== "" || props.modelValue != "") {
        if (props.valueText !== "") {
            const selectOpcion = props.options.find((opcion) => {
                return opcion[props.nameOption] == props.valueText;
            });
            if (selectOpcion !== undefined) {
                emit("update:modelValue", selectOpcion[props.keyOption]);
            } else {
                emit("update:modelValue", "");
                return true;
            }
        } else {
            const selectOpcion = props.options.find((opcion) => {
                return opcion[props.keyOption] == props.modelValue;
            });
            if (selectOpcion !== undefined) {
                emit('value', selectOpcion[props.nameOption]);
            }
        }
    } else {
        emit("update:modelValue", "");
    }
    return false;
});

const inputlist = ref(null);

onMounted(() => {
    if (inputlist.value.hasAttribute("autofocus")) {
        inputlist.value.focus();
    }
});

defineExpose({ focus: () => inputlist.value.focus() });
</script>
<template>
    <div class="">
        <input type="text" :list="list"
            class="w-full py-1 text-sm rounded-md shadow-sm text-fuente-500 border-aqua-500 focus:border-aqua-500 focus:ring focus:ring-aqua-500/20 focus:ring-opacity-50 disabled:bg-aqua-500/50"
            :class="{ 'border-red-400': error, 'text-red-400': error }" :value="valueText"
            @input="changeText($event.target.value)" ref="inputlist" :disabled="disabled" />
        <datalist :id="list">
            <option v-for="opcion in props.options" :key="opcion[props.keyOption]" :value="opcion[props.nameOption]">
                {{ opcion[props.nameOption] + "-" + formatoMoney(opcion.cantidad) }}
            </option>
        </datalist>
    </div>
</template>
