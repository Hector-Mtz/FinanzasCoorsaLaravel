<script setup>
import ButtonAdd from '../../../Components/ButtonAdd.vue';
import InputSearch from '../../../Components/InputSearch.vue';
import ItemCliente from './ItemCliente.vue';


const emit = defineEmits(['showVentas'])


</script>
<template>
    <div class="text-white">
        <h1>Ventas</h1>
        <div class="flex justify-around">
            <InputSearch />
            <ButtonAdd class="h-7" @click="emit('showVentas')" />
        </div>
        <div class="w-full">
            <!-- Header Tabs -->
            <div class="tabs-header">
                <span class="tab active">TODAS</span>
                <span class="tab">ABIERTAS</span>
                <span class="tab">CERRADAS</span>
            </div>
            <!-- Lista de clientes -->
            <div>
                <ItemCliente />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
