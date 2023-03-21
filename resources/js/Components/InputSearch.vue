<script setup>
import { onMounted, ref } from "vue";
import search from "/resources/img/elementos/buscar.png";

defineProps({
    modelValue: String,
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <div
        class="relative text-white border-[1px] border-gris-900 max-h-6 rounded-lg"
    >
        <input
            type="search"
            aria-label="Search"
            placeholder="Buscar..."
            class="w-full h-5 pr-1 text-sm bg-transparent border-0 px-2 py-1 focus:ring-0 focus:ring-opacity-50"
            ref="input"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <button
            type="submit"
            class="w-full flex justify-end absolute top-[.3rem] right-[.2rem]"
        >
            <img :src="search" alt="" />
        </button>
    </div>
</template>
