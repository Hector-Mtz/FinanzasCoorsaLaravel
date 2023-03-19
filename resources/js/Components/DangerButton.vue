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
        class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"
    >
        <slot />
    </button>
</template>
