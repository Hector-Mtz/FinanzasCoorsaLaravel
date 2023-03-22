<script setup>
defineProps({
    type: {
        type: String,
        default: "submit",
    },
});
</script>

<template>
    <button
        :type="type"
        class="items-center w-full px-4 py-2 bg-aqua-500 border border-transparent rounded-md font-semibold text-xl text-white capitalize tracking-widest hover:bg-aqua-500/90 active:bg-aqua-500/80 focus:outline-none disabled:opacity-25 transition shadow-md shadow-gray-400"
    >
        <slot />
    </button>
</template>
