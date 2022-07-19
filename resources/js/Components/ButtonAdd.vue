<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type"
        class="inline-flex items-center px-2 py-2 text-xs font-semibold tracking-widest uppercase transition border border-green-600 rounded-3xl hover:bg-green-500 active:bg-green-600 focus:outline-none focus:border-green-600 focus:ring focus:ring-green-300 disabled:opacity-25">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5 " viewBox="0 0 16 16">
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <slot />
    </button>
</template>
