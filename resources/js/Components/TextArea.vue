<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: String | Number,
});

defineEmits(['update:modelValue']);

const textarea = ref(null);

onMounted(() => {
    if (textarea.value.hasAttribute('autofocus')) {
        textarea.value.focus();
    }
});

defineExpose({ focus: () => textarea.value.focus() });
</script>

<template>
    <textarea ref="textarea"
        class="w-full py-1 text-sm text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 disabled:bg-gray-300"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>
