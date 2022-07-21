<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: String | Number,
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
    <input ref="input"
        class="w-full py-1 text-sm text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 disabled:bg-gray-300"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>
