<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:checked']);

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        default: false,
    },
    value: {
        type: String,
        default: null,
    },
});

const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit('update:checked', val);
    },
});
</script>
<template>
    <div class="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none ">

        <input type="checkbox" :value="value" v-model="proxyChecked"
            class="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox" />
        <label class="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label">
        </label>
    </div>
</template>
<style scoped>
.toggle-checkbox:checked {
    /* @apply: right-0 border-green-400; */
    right: 0;
}

.toggle-checkbox:checked+.toggle-label {
    z-index: -1;
}
</style>

