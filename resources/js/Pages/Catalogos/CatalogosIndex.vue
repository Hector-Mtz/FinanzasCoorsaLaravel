<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';

import Card from '../../Components/Card.vue';
import InputSearch from '@/Components/InputSearch.vue';
import CardGenerica from './Partials/CardGenerica.vue';
import PaginationAxios from '../../Components/PaginationAxios.vue';
import { pickBy } from 'lodash';
import ClienteCecoModal from './Partials/ClienteCecoModal.vue';
import FormModal from './Partials/FormModal.vue';


const clientes = ref({ data: [] });
const servicios = ref({ data: [] });
const grupoConceptos = ref({ data: [] });
const listLineasNegocios = ref({ data: [] });
const lineasNegocios = ref({ data: [] });

const searchTextCliente = ref("");
const searchTextServ = ref("");
const searchTextGroup = ref("");
const searchTextLineasNegocios = ref("");
//modals show
const showingClienteCecoModal = ref(false);
const clienteSelected = ref({});
//modals show
const showingFormlineasNegocio = ref(false);
const lineasnegocioSelect = ref({});


onBeforeMount(async () => {
    const requestCliente = axios.get(route('clientes.listado'));
    const requestServ = axios.get(route('servicios.index'));
    const requestGrupo = axios.get(route('grupo-conceptos.index'));
    const requestLineasNegocios = axios.get(route('lineas-negocios.index'));
    const response = await Promise.all([requestCliente, requestServ, requestGrupo, requestLineasNegocios]);
    clientes.value = response[0].data;
    servicios.value = response[1].data;
    grupoConceptos.value = response[2].data;
    lineasNegocios.value = response[3].data.pagination;
    listLineasNegocios.value = response[3].data.list;
})


// Clientes searchs
const searchClientes = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page })
    const resp = await axios.get(route('clientes.listado'), { params });
    clientes.value = resp.data;
}



// Servicios searchs
const searchServicios = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page })
    const resp = await axios.get(route('servicios.index'), { params });
    servicios.value = resp.data;
}


// Grupos search

const searchGrupos = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page })
    const resp = await axios.get(route('grupo-conceptos.index'), { params });
    grupoConceptos.value = resp.data;
}
// LineasNegocio search

const searchLineasNegocios = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page })
    const resp = await axios.get(route('lineas-negocios.index'), { params });
    lineasNegocios.value = resp.data.pagination;
    listLineasNegocios.value = resp.data.list;
}

const showCleinteCecoModal = (obj) => {
    clienteSelected.value = obj;
    showingClienteCecoModal.value = true;
}
const showFormLineaNegocioModal = (obj) => {
    lineasnegocioSelect.value = obj;
    showingFormlineasNegocio.value = true;
}

let timeoutCliente;
watch(searchTextCliente, (newSearch) => {
    if (timeoutCliente !== undefined) {
        clearTimeout(timeoutCliente);
    }
    //Bounce de busqueda
    timeoutCliente = setTimeout(() => {
        searchClientes(newSearch)
    }, 300);
});

let timeoutSer;
watch(searchTextServ, (newSearch) => {
    if (timeoutSer !== undefined) {
        clearTimeout(timeoutSer);
    }
    //Bounce de busqueda
    timeoutSer = setTimeout(() => {
        searchServicios(newSearch)
    }, 300);
});
let timeoutGrupo;
watch(searchTextGroup, (newSearch) => {
    if (timeoutGrupo !== undefined) {
        clearTimeout(timeoutGrupo);
    }
    //Bounce de busqueda
    timeoutGrupo = setTimeout(() => {
        searchGrupos(newSearch)
    }, 300);
});

</script>

<template>
    <AppLayout title="Finanzas">
        <template #header>
            <div class="flex items-center justify-around">
                <h2 class="text-xl font-bold leading-tight text-white">
                    Catalogos
                </h2>
            </div>
        </template>

        <div class="px-3 py-3 fondo_general">
            <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
                <CardGenerica :data="clientes" route-name="clientes" title="Clientes"
                    @reload="searchClientes(searchTextCliente, clientes.current_page)"
                    @showSubCatalogo="showCleinteCecoModal($event)">
                    <template #search>
                        <InputSearch v-model="searchTextCliente" />
                    </template>
                    <template #pagination>
                        <PaginationAxios :pagination="clientes"
                            @load-page="searchClientes(searchTextCliente, $event)" />
                    </template>
                    <template #modals>
                        <ClienteCecoModal title="Cecos" :show="showingClienteCecoModal"
                            :lineas-negocios="listLineasNegocios" :cliente="clienteSelected"
                            @close="showingClienteCecoModal = false" />
                    </template>

                </CardGenerica>
                <CardGenerica :data="servicios" route-name="servicios" sub-route="montos" title="Servicios"
                    @reload="searchServicios(searchTextServ, servicios.current_page)">
                    <template #search>
                        <InputSearch v-model="searchTextServ" />
                    </template>
                    <template #pagination>
                        <PaginationAxios :pagination="servicios" @load-page="searchServicios(searchTextServ, $event)" />
                    </template>
                </CardGenerica>
                <CardGenerica :data="grupoConceptos" route-name="grupo-conceptos" sub-route="conceptos" title="Grupos"
                    @reload="searchGrupos(searchTextGroup, grupoConceptos.current_page)">
                    <template #search>
                        <InputSearch v-model="searchTextGroup" />
                    </template>
                    <template #pagination>
                        <PaginationAxios :pagination="grupoConceptos"
                            @load-page="searchGrupos(searchTextGroup, $event)" />
                    </template>
                </CardGenerica>
                <CardGenerica :data="lineasNegocios" route-name="lineas-negocios" title="Lineas de Negocios"
                    @reload="searchLineasNegocios(searchTextLineasNegocios, lineasNegocios.current_page)"
                    @showSubCatalogo="showFormLineaNegocioModal($event)">
                    <template #search>
                        <InputSearch v-model="searchTextLineasNegocios" />
                    </template>
                    <template #pagination>
                        <PaginationAxios :pagination="lineasNegocios"
                            @load-page="searchLineasNegocios(searchTextLineasNegocios, $event)" />
                    </template>
                    <template #modals>
                        <FormModal route-name="lineas-negocios" title="Lineas de Negocios"
                            :show="showingFormlineasNegocio" type-form="update" :object="lineasnegocioSelect"
                            @add="searchLineasNegocios(searchTextLineasNegocios, lineasNegocios.current_page)"
                            @edit="searchLineasNegocios(searchTextLineasNegocios, lineasNegocios.current_page)"
                            @close="showingFormlineasNegocio = false" />
                    </template>
                </CardGenerica>
            </div>
        </div>
    </AppLayout>

</template>


