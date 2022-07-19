<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: String,
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <div class="relative text-white border-2 border-gray-800 max-h-7 rounded-3xl">
        <input type="search" aria-label="Search" placeholder="Buscar..."
            class="w-full h-5 pr-1 text-sm bg-transparent border-0 pl-9 focus:ring-0 focus:ring-opacity-50" ref="input"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <button type="submit" class="absolute top-0 left-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline h-4 mr-1" viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            |
        </button>
    </div>
</template>
