<script setup>
import DangerButton from '../../../Components/DangerButton.vue';

const emit = defineEmits(['onShow'])

const props = defineProps({
    venta: {
        type: Object,
        required: true
    }
})

</script>
<template>
    <div class="p-2 text-white">
        <!-- Header -->
        <h2 class="font-bold">{{ props.venta.cliente }}</h2>
        <div
            class="flex items-center justify-between p-2 m-1 mx-auto overflow-hidden bg-gray-900 shadow-xl sm:rounded-lg">
            <span class="text-sm">{{ props.venta.ceco }}</span>
            <DangerButton class="h-5" @click="emit('onShow', props.venta)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path
                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
            </DangerButton>
        </div>
    </div>
</template>


