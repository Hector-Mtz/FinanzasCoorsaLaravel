<script setup>
import { computed } from 'vue';

const props = defineProps({
    active: Boolean,
});

const classes = computed(() => {
    return props.active
        ? "bg-aqua-500 hover:bg-aqua-500/90 text-white shadow-md shadow-gray-400 font-extrabold h-[32px]"
        : "hover:bg-aqua-500/10";
});
</script>
<template>
    <div class="flex items-center px-2 py-1 text-sm border-transparent cursor-pointer border-b-2px rounded-2xl tab"
        :class="classes">
        <span>
            <slot />
        </span>
    </div>
</template>
