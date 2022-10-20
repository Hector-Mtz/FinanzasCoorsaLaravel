<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';

import { Inertia } from '@inertiajs/inertia';
import { pickBy } from 'lodash'

import ButtonAdd from '@/Components/ButtonAdd.vue';
import InputSearch from '@/Components/InputSearch.vue';
import ItemObjectShow from '@/Components/ItemObjectShow.vue';
import DepositosModal from './DepositosModal.vue';
import ItemCliente from '../ItemCliente.vue';
import ItemIngresoC from './ItemIngresoC.vue';
import FacturasDepositoModal from './FacturasDepositoModal.vue';

import { formatoMoney } from '../../../../utils/conversiones';




const emit = defineEmits([''])

const clientes = ref([])
const totalIngresos = ref({ total: 0 })
const tab = ref("1") // Referencia al id
const searchText = ref("")
const showingDepositos = ref(false);
const showingFacturas = ref(false);
const deposito = ref({});

// Modal Methods

const updateDepositos = () => {
    search(searchText.value);
}
const addFacturaToDeposito = (form) => {
    // esto es para el error
    const findedIndex = depositos.value.findIndex((dep) => {
        return dep.id == form.deposito_id
    })
    axios.post(route('ingresos.facturas.store', form.deposito_id), form)
        .then(() => {
            search(searchText.value);
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            });

        }).catch(error => {
            if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('message')) {
                depositos.value[findedIndex].error = error.response.data.message
            } else {
                depositos.value[findedIndex].error = "Error SET FACTURA"
            };
        });
}

const showFacturas = (newDeposito) => {
    deposito.value = newDeposito;
    showingFacturas.value = true
}

const closeFacturasDeposito = () => {
    deposito.value = {};
    showingFacturas.value = false
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
    const resp = await axios.get(route('ingresos.index'), { params })
    clientes.value = resp.data.clientesIngresos;
    totalIngresos.value = resp.data.totalIngresos;
}

onBeforeMount(() => {
    search();
})


const depositos = computed(() => {
    let auxDepositos = [];
    clientes.value.forEach(cliente => {
        auxDepositos = auxDepositos.concat(cliente.ingresos);
    });
    // DEBIDO A QUE NO ACTUALIZA LAS FACTURAS DENTRO DEL MODAL
    if (showingFacturas.value) {
        const findedIndex = auxDepositos.findIndex((dep) => {
            return dep.id == deposito.value.id
        });
        deposito.value = auxDepositos[findedIndex];
    }
    return auxDepositos;
})

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
            <ButtonAdd class="h-7" @click="showingDepositos = true" />
        </div>
        <div class="w-full">
            <!-- Header Tabs -->
            <div class="mx-5 tabs-header">
                <span :class="{ 'active': tab === '1' }" class="tab" @click="changeTab('1')">
                    ABIERTAS
                </span>
                <span :class="{ 'active': tab === '2' }" class="tab" @click="changeTab('2')">
                    CERRADAS
                </span>
            </div>
            <!-- Lista de clientes -->
            <div class="-mx-2 overflow-hidden overflow-y-auto" style="max-height: 65vh;">
                <ItemCliente v-for="cliente in clientes" :key="cliente.id" :cliente="cliente"
                    :total="cliente.ingresos.length">
                    <div
                        class="flex items-center justify-between p-2 m-1 mx-auto overflow-hidden bg-gray-900 shadow-xl sm:rounded-lg">
                        <table class="table-ingresos">
                            <thead>
                                <tr>
                                    <th>
                                        Núm. Deposito
                                    </th>
                                    <th>
                                        Cantidad
                                    </th>
                                    <th>
                                        Factura
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <ItemIngresoC v-for="(ingreso, index) in cliente.ingresos"
                                    :key="ingreso.id + '-' + index" :ingreso="ingreso"
                                    @on-show="showFacturas($event)" />
                            </tbody>
                        </table>
                    </div>
                </ItemCliente>
            </div>
            <div class="px-4 py-1 border-t-4 border-gray-600 basis-1/3">
                <span class="text-lg font-bold text-white">
                    Total: {{ formatoMoney(totalIngresos.total) }}
                </span>
            </div>
        </div>
        <!--Modals -->
        <DepositosModal :show="showingDepositos" :depositos="depositos" @update-depositos="updateDepositos($event)"
            @add-factura="addFacturaToDeposito($event)" @close="showingDepositos = false" />
        <FacturasDepositoModal :show="showingFacturas" :deposito="deposito" @add-factura="addFacturaToDeposito($event)"
            @update-depositos="updateDepositos()" @close="closeFacturasDeposito" />
        <!--Ends Modals-->
    </div>
</template>

<style lang="scss" scoped>

</style>
