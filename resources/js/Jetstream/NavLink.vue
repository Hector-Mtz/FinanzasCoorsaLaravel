<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/inertia-vue3";

const props = defineProps({
    href: String,
    active: Boolean,
});

const classes = computed(() => {
    return props.active
        ? "inline-flex items-center px-8 pt-1 border-b-2 border-aqua-500 text-lg font-medium leading-5 text-white focus:outline-none focus:border-aqua-500 transition"
        : "inline-flex items-center px-8 pt-1 border-b-2 border-transparent text-lg font-medium leading-5 text-nav-500 hover:text-nav-500/80 hover:border-aqua-500/60 focus:outline-none focus:text-nav-500/70 focus:border-aqua-500/60 transition";
});
</script>

<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>
