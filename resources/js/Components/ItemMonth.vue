<script setup>
import { computed } from "@vue/runtime-core";

const props = defineProps({
    month: {
        type: Number,
    },
    currentMonth: {
        type: Number,
    },
});

const active = computed(() => {
    return props.month === props.currentMonth
})
</script>

<template>
    <div class="text-xs item-picker" :class="{ 'active-picker': active }">
        <slot />
    </div>
</template>
<style scoped>
</style>
