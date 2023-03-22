<script setup>
import { onMounted, ref } from "vue";

defineProps({
    modelValue: String | Number,
    placeholder: String,
});

defineEmits(["update:modelValue"]);

const textarea = ref(null);

onMounted(() => {
    if (textarea.value.hasAttribute("autofocus")) {
        textarea.value.focus();
    }
});

defineExpose({ focus: () => textarea.value.focus() });
</script>

<template>
    <textarea
        ref="textarea"
        class="w-full py-1 text-fuente-500 border-aqua-500 rounded-md shadow-sm focus:border-aqua-500 focus:ring focus:ring-aqua-500/20 focus:ring-opacity-50 disabled:bg-aqua-500/20"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
    ></textarea>
</template>
