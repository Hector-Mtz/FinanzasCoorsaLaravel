<script setup>
import { ref, watch, reactive } from "vue";
import { Inertia } from "@inertiajs/inertia";
import { pickBy, throttle } from "lodash";
import JetLabel from "@/Jetstream/Label.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import InputSearch from "@/Components/InputSearch.vue";
import OcsModal from "./OcsModal.vue";
import ItemObjectShow from "@/Components/ItemObjectShow.vue";
import SelectComponent from "@/Components/SelectComponent.vue";
import Tab from "../../../../Components/Tab.vue";
import monedas from "../../../../../img/elementos/monedas-de-un-dolar.png";
import ItemClientePaginate from "../ItemClientePaginate.vue";
import Input from "../../../../Jetstream/Input.vue";
import HeaderTab from "../../../../Components/HeaderTab.vue";

const emit = defineEmits(["showVentas", "updateCalendar"]);

const props = defineProps({
    clientes: {
        type: Object,
    },
    lineasNegocios: {
        type: Object,
    },
    filters: {
        type: Object,
    }
});


const params = reactive({
    search: props.filters.search,
    status_id: props.filters.status_id,
    lineas_negocio_id: props.filters.lineas_negocio_id,
    fecha_inicio: props.filters.fecha_inicio,
    fecha_fin: props.filters.fecha_fin,
});
//Evitar consultar cuando no se tiene una fecha fin
const paramsVentas = ref({ ...params });

const showingOcs = ref(false);
const ventaSelect = ref({ id: -1 });

// Modal Methods
const showOcs = (venta) => {
    ventaSelect.value = venta;
    showingOcs.value = true;
};
const closeOcs = () => {
    ventaSelect.value = { id: -1 };
    showingOcs.value = false;
};
// End Methos Modal

const changeTab = (status_id) => {
    params.status_id = status_id;
    if (params.search !== "") {
        params.search = "";
    }
};
const search = () => {
    const filters = pickBy(params);
    //En caso de querer filtar por range de fechas ambas deberan estar presentes
    if (filters.hasOwnProperty('fecha_inicio') || filters.hasOwnProperty('fecha_fin')) {
        if (!filters.hasOwnProperty('fecha_fin') || !filters.hasOwnProperty('fecha_inicio')) {
            return;
        }
    }
    paramsVentas.value = filters;
    Inertia.visit(route("finanzas.index"), {
        replace: true,
        data: filters,
        preserveState: true,
        preserveScroll: true,
        only: ["clientes", "totalVentasStatus"],
    });
};

const clearRageDates = () => {
    params.fecha_inicio = null;
    params.fecha_fin = null;
}


watch(params, throttle(function () {
    search();
}), 100);
</script>
<template>
    <div class="text-fuente-500 gap-4 flex flex-col border-b-[1px] border-gris-500 pb-2">
        <div class="flex items-center justify-between">
            <h1 class="text-[26px] font-semibold">Ventas</h1>
            <img :src="monedas" alt="" class="h-[25px]" />
        </div>

        <div class="flex justify-around">
            <InputSearch v-model="params.search" class="px-2 py-1" />
            <ButtonAdd class="h-7" @click="emit('showVentas')" />
        </div>
        <!--Form Search Filters-->
        <div class="px-1 border rounded-md">

            <JetLabel value="Rango de Fechas" class="inline" />
            <button @click="clearRageDates()" class="px-1 text-xs text-aqua-500 hover:opacity-80">Limpiar Fechas</button>
            <div class="grid grid-cols-2 gap-1 mb-2 text-sm text-gray-500">
                <span>Incio:</span>
                <span>Fin:</span>
                <Input class="px-1 py-0" name="fecha_inicio" type="date" v-model="params.fecha_inicio" />

                <Input class="px-1 py-0" name="fecha_fin" type="date" v-model="params.fecha_fin"
                    :min="params.fecha_inicio" />

            </div>
            <JetLabel value="Linea de Negocio" />
            <SelectComponent id="tipo" name="tipo" v-model="params.lineas_negocio_id">
                <option value="" class="font-semibold">--TODAS--</option>
                <option v-for="lineasNegocio in props.lineasNegocios" :key="lineasNegocio.name" :value="lineasNegocio.id">
                    {{ lineasNegocio.name }}
                </option>
            </SelectComponent>
        </div>
        <div class="w-full h-">

            <!-- Header Tabs -->
            <HeaderTab>
                <Tab :active="params.status_id === null" @click="changeTab(null)">
                    TODAS
                </Tab>
                <Tab :active="params.status_id === '1'" @click="changeTab('1')">
                    ABIERTAS
                </Tab>
                <Tab :active="params.status_id === '2'" @click="changeTab('2')">
                    CERRADAS
                </Tab>
            </HeaderTab>

            <!-- Lista de clientes -->
            <div class="pt-4 overflow-y-auto" style="max-height: 50vh">
                <ItemClientePaginate v-for="cliente in props.clientes" :key="cliente.id" :cliente="cliente"
                    :total="cliente.total_ventas" :filters="paramsVentas"
                    :ruta="route('clientes.ventas.index', cliente.id)">
                    <template #default="{ data }">
                        <ItemObjectShow v-for="venta in data" :key="venta.id" :data="venta" @onShow="showOcs($event)">
                            {{ venta.ceco + "-" + venta.servicio }}
                            <br />
                            {{ venta.fechaInicial }}
                        </ItemObjectShow>
                    </template>

                </ItemClientePaginate>
            </div>
        </div>
        <!--Modals -->
        <OcsModal :show="showingOcs" :venta="ventaSelect" @close="closeOcs" @updateCalendar="emit('updateCalendar')" />

        <!--Ends Modals-->
    </div>
</template>
