<script setup>
import { computed, onMounted, ref } from "vue";

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
    placeholder: {
        type: String,
        default: "",
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
    <div class="text-fuente-500">
        <input type="text" :list="list"
            class="w-full py-1 rounded-md shadow-sm text-fuente-500 border-aqua-500 focus:border-aqua-500 focus:ring focus:ring-aqua-500/20 focus:ring-opacity-50 disabled:bg-aqua-500/10"
            :class="{ 'border-red-400': error, 'text-red-400': error }" :value="valueText"
            @input="changeText($event.target.value)" ref="inputlist" :disabled="disabled" :placeholder="placeholder" />
        <datalist :id="list">
            <option v-for="opcion in props.options" :key="opcion[props.keyOption]" :value="opcion[props.nameOption]">
                {{ opcion[props.nameOption] }}
            </option>
        </datalist>
    </div>
</template>
