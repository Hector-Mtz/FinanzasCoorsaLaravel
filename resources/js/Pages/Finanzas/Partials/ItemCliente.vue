<script setup>
import DangerButton from '../../../Components/DangerButton.vue';
import ItemObjectShow from './ItemObjectShow.vue';


const props = defineProps({
    cliente: {
        type: Object,
        required: true
    }
})

</script>
<template>
    <div class="p-2 text-white">
        <!-- Header -->
        <h2 class="font-bold">{{ props.cliente.nombre }}</h2>
        <slot>
        </slot>

    </div>
</template>


