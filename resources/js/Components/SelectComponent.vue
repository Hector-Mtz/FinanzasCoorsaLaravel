<script setup>
import { onMounted, ref } from "vue";

defineProps({
    modelValue: String | Number,
});

defineEmits(["update:modelValue"]);

const select = ref(null);

onMounted(() => {
    if (select.value.hasAttribute("autofocus")) {
        select.value.focus();
    }
});
defineExpose({ focus: () => input.value.focus() });
</script>
<template>
    <select
        ref="select"
        :value="modelValue"
        class="w-full px-2 py-1 text-fuente-500 border-[1px] border-aqua-500 rounded-md focus:ring-aqua-500/50 active:ring-aqua-500/50 focus:ring-0 focus:ring-opacity-50 text-[14px] font-light"
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <slot />
    </select>
</template>
