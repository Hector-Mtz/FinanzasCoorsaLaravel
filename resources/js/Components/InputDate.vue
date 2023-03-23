<script setup>
import { onMounted, ref } from "vue";

defineProps({
    modelValue: String | Number,
});

defineEmits(["update:modelValue"]);

const input = ref(null);
const type = "date";

onMounted(() => {
    if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input
        ref="input"
        class="w-full py-1 text-fuente-500 font-light border-aqua-500 rounded-md shadow-sm focus:border-aqua-500 focus:ring focus:ring-aqua-500/10 disabled:bg-aqua-500"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
    />
</template>
