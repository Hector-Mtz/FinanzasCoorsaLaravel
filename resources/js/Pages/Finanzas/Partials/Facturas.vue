<script setup>
import { ref, watch } from 'vue';
import { Inertia } from '@inertiajs/inertia';

import { pickBy } from 'lodash'

import ButtonAdd from '../../../Components/ButtonAdd.vue';
import InputSearch from '../../../Components/InputSearch.vue';
import ItemObjectShow from './ItemObjectShow.vue';
import FacturasModal from './FacturasModal.vue';
import OcsFacturaModal from './OcsFacturaModal.vue';



const emit = defineEmits([''])

const facturas = ref([])
const tab = ref("") // Referencia al id
const searchText = ref("")
const showingFacturas = ref(false);
const showingOcs = ref(false);
const facturaSelect = ref({ id: -1 });


// Modal Methods

const showOcsFactura = (factura) => {
    facturaSelect.value = factura
    showingOcs.value = true
}
const closeOcsFactura = () => {
    showingOcs.value = false
    facturaSelect.value = { id: -1 }
}
const addFactura = (newFactura) => {
    facturas.value.unshift(newFactura);
}
const addOc = (form) => {
    const finIndexFactura = facturas.value.findIndex((fact) => {
        return fact.id == form.factura_id
    })
    axios.post(route('facturas.ocs.store', form.factura_id), form)
        .then((resp) => {
            facturas.value[finIndexFactura] = resp.data
            if (facturaSelect.value.id !== -1) { // lo actualimos ya que no lo realiza en el modal ocs
                facturaSelect.value = facturas.value[finIndexFactura]
            }
        }).catch(error => {
            if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('message')) {
                facturas.value[finIndexFactura].error = error.response.data.message
            } else {
                facturas.value[finIndexFactura].error = "Error add OC"
            };
        });
}


// End Methos Modal

const changeTab = (status_id) => {
    tab.value = status_id
    if (searchText.value !== "") {
        searchText.value = ""
        search()
    } else {
        search(searchText.value)
    }
}
const search = async (newSearch) => {
    const params = pickBy({ status_id: tab.value, search: newSearch })
    const resp = await axios.get(route('facturas.index'), { params })
    facturas.value = resp.data;
}

search();
let timeout;
watch(searchText, (newSearch) => {
    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    //Bounce de busqueda
    timeout = setTimeout(() => {
        search(newSearch)
    }, 500);
});


</script>
<template>
    <div class="text-white">
        <div class="flex flex-row items-center my-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-600 hover:text-green-800" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <h1 class="ml-2 text-lg">Por pagar</h1>
        </div>
        <div class="flex justify-around">
            <InputSearch v-model="searchText" />
            <ButtonAdd class="h-7" @click="showingFacturas = true" />
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
                <ItemObjectShow v-for="factura in facturas" :key="factura.id" :data="factura"
                    @onShow="showOcsFactura($event)">
                    #{{ factura.referencia }}
                </ItemObjectShow>
            </div>
        </div>
        <!--Modals -->
        <FacturasModal :show="showingFacturas" :facturas="facturas" @add-factura="addFactura($event)"
            @add-oc="addOc($event)" @close="showingFacturas = false" />
        <OcsFacturaModal :show="showingOcs" :factura="facturaSelect" @add-oc="addOc($event)" @close="closeOcsFactura" />
        <!--Ends Modals-->
    </div>
</template>

<style lang="scss" scoped>
</style>
