<script setup>
import add from "../../img/elementos/+.png";

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
        class="inline-flex items-center px-2 py-2 text-xs font-semibold tracking-widest uppercase transition rounded-3xl focus:outline-none disabled:opacity-25 bg-aqua-500"
    >
        <img :src="add" alt="" />
        <slot />
    </button>
</template>
