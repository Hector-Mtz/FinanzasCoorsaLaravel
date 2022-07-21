<script setup>
import { ref, watch, watchEffect } from 'vue';
import { Inertia } from '@inertiajs/inertia';

import { pickBy } from 'lodash'

import ButtonAdd from '../../../Components/ButtonAdd.vue';
import InputSearch from '../../../Components/InputSearch.vue';
import ItemCliente from './ItemCliente.vue';
import OcsModal from './OcsModal.vue';


const emit = defineEmits(['showVentas'])


const props = defineProps({
    "clientes": {
        type: Object
    }
})

const tab = ref("") // Referencia al id
const searchText = ref("")
const showingOcs = ref(false);
const ventaSelect = ref({ id: -1 });


// Modal Methods
const showOcs = (venta) => {
    ventaSelect.value = venta
    showingOcs.value = true
}
const closeOcs = () => {
    ventaSelect.value = { id: -1 }
    showingOcs.value = false
}
// End Methos Modal

const changeTab = (status_id) => {
    tab.value = status_id
    if (searchText.value !== "") {
        searchText.value = ""
    } else {
        const params = pickBy({ status_id })
        Inertia.visit(route('ventas.index'), {
            data: params,
            preserveState: true,
            preserveScroll: true,
            only: ['ventas'],
        })
    }
}
const search = (newSearch) => {
    const params = pickBy({ status_id: tab.value, search: newSearch })
    Inertia.visit(route('ventas.index'), {
        data: params,
        preserveState: true,
        preserveScroll: true,
        only: ['clientes'],
    })
}


let timeout;
watch(searchText, (newSearch) => {
    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    //Bounce de busqueda
    timeout = setTimeout(() => {
        search(newSearch)
    }, 300);

});


</script>
<template>
    <div class="text-white">
        <h1>Ventas</h1>
        <div class="flex justify-around">
            <InputSearch v-model="searchText" />
            <ButtonAdd class="h-7" @click="emit('showVentas')" />
        </div>
        <div class="w-full">
            <!-- Header Tabs -->
            <div class="tabs-header">
                <span :class="{ 'active': tab === '' }" class="tab" @click="changeTab('')">
                    TODAS
                </span>
                <span :class="{ 'active': tab === '1' }" class="tab" @click="changeTab('1')">
                    ABIERTAS
                </span>
                <span :class="{ 'active': tab === '2' }" class="tab" @click="changeTab('2')">
                    CERRADAS
                </span>
            </div>
            <!-- Lista de clientes -->
            <div>

                <ItemCliente v-for="cliente in props.clientes" :key="cliente.id" :cliente="cliente"
                    @on-show="showOcs($event)" />
            </div>
        </div>
        <!--Modals -->
        <OcsModal :show="showingOcs" :venta="ventaSelect" @close="closeOcs" />

        <!--Ends Modals-->
    </div>
</template>

<style lang="scss" scoped>
</style>
