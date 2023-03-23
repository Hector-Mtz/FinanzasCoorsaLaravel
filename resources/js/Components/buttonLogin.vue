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
        class="flex justify-center items-center px-4 py-2 rounded-md font-semibold text-[14px] text-white uppercase bg-aqua-500 shadow-md shadow-aqua-500/70 mt-1 w-full tracking-widest hover:bg-aqua-500/90 active:bg-aqua-500 disabled:opacity-25 transition"
    >
        <slot />
    </button>
</template>
