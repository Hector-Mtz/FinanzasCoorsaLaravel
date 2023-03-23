<script setup>
import { onMounted, ref } from "vue";

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
    <input
        style="background: transparent"
        ref="input"
        class="block w-full mt-1 rounded-xl border-2 border-aqua-500"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
