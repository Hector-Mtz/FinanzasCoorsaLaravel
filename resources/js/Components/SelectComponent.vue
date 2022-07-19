<script setup>
import { onMounted, ref } from 'vue';



defineProps({
    modelValue: String | Number,
});

defineEmits(['update:modelValue']);

const select = ref(null);

onMounted(() => {
    if (select.value.hasAttribute('autofocus')) {
        select.value.focus();
    }
});
defineExpose({ focus: () => input.value.focus() });
</script>
<template>
    <select ref="select" :value="modelValue"
        class="w-full px-2 py-1 text-sm border-2 border-gray-800 focus:ring-gray-400 active:ring-gray-400 rounded-3xl focus:ring-0 focus:ring-opacity-50"
        @input="$emit('update:modelValue', $event.target.value)">
        <slot />
    </select>
</template>

