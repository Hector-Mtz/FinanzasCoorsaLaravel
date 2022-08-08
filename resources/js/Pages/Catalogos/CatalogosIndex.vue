<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';

import Card from '../../Components/Card.vue';
import InputSearch from '@/Components/InputSearch.vue';
import CardGenerica from './Partials/CardGenerica.vue';
import PaginationAxios from '../../Components/PaginationAxios.vue';
import { pickBy } from 'lodash';


const clientes = ref({ data: [] });
const servicios = ref({ data: [] });
const grupoConceptos = ref({ data: [] });

const searchTextCliente = ref("");
const searchTextServ = ref("");
const searchTextGroup = ref("");

onBeforeMount(async () => {
    const requestCliente = axios.get(route('clientes.listado'));
    const requestServ = axios.get(route('servicios.index'));
    const requestGrupo = axios.get(route('grupo-conceptos.index'));
    const response = await Promise.all([requestCliente, requestServ, requestGrupo]);
    clientes.value = response[0].data;
    servicios.value = response[1].data;
    grupoConceptos.value = response[2].data;
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
                <CardGenerica :data="clientes" route-name="clientes" sub-route="cecos" title="Clientes"
                    @reload="searchClientes(searchTextCliente, clientes.current_page)">
                    <template #search>
                        <InputSearch v-model="searchTextCliente" />
                    </template>
                    <template #pagination>
                        <PaginationAxios :pagination="clientes"
                            @load-page="searchClientes(searchTextCliente, $event)" />
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
            </div>
        </div>
    </AppLayout>

</template>


