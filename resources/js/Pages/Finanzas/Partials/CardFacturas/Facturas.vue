<script setup>
import { ref, watch, onBeforeMount, computed } from 'vue';
import { Inertia } from '@inertiajs/inertia';
import { pickBy } from 'lodash'

import ButtonAdd from '@/Components/ButtonAdd.vue';
import InputSearch from '@/Components/InputSearch.vue';
import ItemObjectShow from '../ItemObjectShow.vue';
import FacturasModal from './FacturasModal.vue';
import OcsFacturaModal from './OcsFacturaModal.vue';
import ItemCliente from '../ItemCliente.vue';
import { formatoMoney } from '../../../../utils/conversiones';
import SkeletonLoader from '../../../../Components/SkeletonLoader.vue';



const emit = defineEmits([''])

const clientes = ref([])
const totalFacturas = ref({ total: 0 });
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
const addFactura = () => {
    search(searchText.value);
}
const addOc = (form) => {
    const finIndexFactura = facturas.value.findIndex((fact) => {
        return fact.id == form.factura_id
    })
    axios.post(route('facturas.ocs.store', form.factura_id), form)
        .then(() => {
            search(searchText.value);
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            })

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
    const resp = await axios.get(route('facturas.index'), { params });
    clientes.value = resp.data.clientesFacturas;
    totalFacturas.value = resp.data.totalFacturas;
}

const facturas = computed(() => {
    let auxFacturas = [];
    clientes.value.forEach(cliente => {
        auxFacturas = auxFacturas.concat(cliente.facturas);
    });
    // DEBIDO A QUE NO ACTUALIZA LAS FACTURAS DENTRO DEL MODAL
    if (showingOcs.value) {
        const findedIndex = auxFacturas.findIndex((fact) => {
            return fact.id == facturaSelect.value.id
        });
        facturaSelect.value = auxFacturas[findedIndex];
    }
    return auxFacturas;
});

onBeforeMount(() => {
    search();
});

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

            <div class="-mx-2 overflow-hidden overflow-y-auto" style="max-height: 65vh;">
                <SkeletonLoader v-if="clientes.length === 0" style="height: 65vh;" />
                <div v-else>
                    <ItemCliente v-for="cliente in clientes" :key="cliente.id" :cliente="cliente">
                        <ItemObjectShow v-for="factura in cliente.facturas" :key="factura.id" :data="factura"
                            @onShow="showOcsFactura($event)">
                            #{{ factura.referencia }}
                        </ItemObjectShow>
                    </ItemCliente>
                </div>
            </div>
            <div class="px-4 py-1 border-t-4 border-gray-600 basis-1/3">
                <span class="text-lg font-bold text-white">
                    Total: {{ formatoMoney(totalFacturas.total) }}
                </span>
            </div>
        </div>
        <!--Modals -->
        <FacturasModal :show="showingFacturas" :facturas="facturas" @add-factura="addFactura($event)"
            @add-oc="addOc($event)" @close="showingFacturas = false" />
        <OcsFacturaModal :show="showingOcs" :factura="facturaSelect" @add-oc="addOc($event)" @close="closeOcsFactura" />
        <!--Ends Modals-->
    </div>
</template>
