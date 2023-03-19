<script setup>
defineProps({
    type: {
        type: String,
        default: "button",
    },
});
</script>

<template>
    <button
        :type="type"
        class="inline-flex items-center justify-center py-1 text-xs font-semibold tracking-widest uppercase transition border border-transparent rounded-3xl disabled:opacity-25"
    >
        <slot />
    </button>
</template>
