<script setup>
import DangerButton from '../../../Components/DangerButton.vue';
import ItemVentaCliente from './ItemVentaCliente.vue';


const emit = defineEmits(['onShow'])

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
        <ItemVentaCliente v-for="venta in props.cliente.ventas" :key="venta.id" :venta="venta"
            @onShow="emit('onShow', $event)" />
    </div>
</template>


