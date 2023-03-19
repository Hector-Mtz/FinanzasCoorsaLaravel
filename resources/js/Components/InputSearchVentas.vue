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
        class="relative text-fuente-500 border-[2px] border-aqua-500 max-h-18 text-xl rounded-lg"
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
        <button type="submit" class="absolute top-[5px] left-40">
            <img :src="search" alt="" />
        </button>
    </div>
</template>
