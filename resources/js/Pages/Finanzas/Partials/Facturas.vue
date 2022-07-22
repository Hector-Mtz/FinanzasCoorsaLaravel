<script setup>
import { ref, watch } from 'vue';
import { Inertia } from '@inertiajs/inertia';

import { pickBy } from 'lodash'

import ButtonAdd from '../../../Components/ButtonAdd.vue';
import InputSearch from '../../../Components/InputSearch.vue';



const emit = defineEmits([''])


const props = defineProps({

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
            only: ['clientes'],
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
        <div class="flex flex-row items-center my-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-8 w-8 hover:text-green-800" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <h1 class="ml-2 text-lg">Por pagar</h1>
        </div>
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

            </div>
        </div>
        <!--Modals -->
        <!--Ends Modals-->
    </div>
</template>

<style lang="scss" scoped>
</style>
