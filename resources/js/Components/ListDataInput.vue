<script setup>
import { computed, onMounted, ref, watch } from "vue";
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
    value: {
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
});

const valueText = ref("");

const changeText = (text) => {
    valueText.value = text;
};

const error = computed(() => {
    if (valueText.value !== "" || props.modelValue != "") {
        if (valueText.value !== "") {
            const selectOpcion = props.options.find((opcion) => {
                return opcion[props.nameOption] == valueText.value;
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
                valueText.value = selectOpcion[props.nameOption];
            }
        }
    } else {
        emit("update:modelValue", "");
    }
    return false;
});

const inputlist = ref(null);

watch(props, () => {
    valueText.value = props.value;
});

onMounted(() => {
    if (inputlist.value.hasAttribute("autofocus")) {
        inputlist.value.focus();
    }
});

defineExpose({ focus: () => inputlist.value.focus() });
</script>
<template>
    <div class="text-fuente-500">
        <input
            type="text"
            :list="list"
            class="w-full py-1 text-fuente-500 border-aqua-500 rounded-md shadow-sm focus:border-aqua-500 focus:ring focus:ring-aqua-500/20 focus:ring-opacity-50 disabled:bg-aqua-500/10"
            :class="{ 'border-red-400': error, 'text-red-400': error }"
            :value="valueText"
            @keyup="emit('value', valueText)"
            @input="changeText($event.target.value)"
            ref="inputlist"
            :disabled="disabled"
            :placeholder="placeholder"
        />
        <datalist :id="list">
            <option
                v-for="opcion in props.options"
                :key="opcion[props.keyOption]"
                :value="opcion[props.nameOption]"
            >
                {{ opcion[props.nameOption] }}
            </option>
        </datalist>
    </div>
</template>
