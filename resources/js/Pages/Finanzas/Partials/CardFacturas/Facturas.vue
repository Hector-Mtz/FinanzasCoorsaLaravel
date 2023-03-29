<script setup>
import { ref, reactive, watch, onBeforeMount } from "vue";
import { pickBy } from "lodash";
import Tab from "../../../../Components/Tab.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import InputSearch from "@/Components/InputSearch.vue";
import ItemObjectShow from "@/Components/ItemObjectShow.vue";
import FacturasModal from "./FacturasModal.vue";
import OcsFacturaModal from "./OcsFacturaModal.vue";
import ItemClientePaginate from "../ItemClientePaginate.vue";
import { formatoMoney } from "../../../../utils/conversiones";
import SkeletonLoader from "../../../../Components/SkeletonLoader.vue";
import HeaderTab from "../../../../Components/HeaderTab.vue";

const emit = defineEmits(["updateCalendar"]);

const clientes = ref([]);
const totalFacturas = ref({ total: 0 });
const paramsFacturas = reactive({ search: '', status_id: '' });
const loading = ref(true);
const showingFacturas = ref(false);
const showingOcs = ref(false);
const facturaSelect = ref({ id: -1 });

// Modal Methods

const showOcsFactura = (factura) => {
    facturaSelect.value = factura;
    showingOcs.value = true;
};
const closeOcsFactura = () => {
    showingOcs.value = false;
    facturaSelect.value = { id: -1 };
};
const updateFacturas = () => {
    search();
    emit("updateCalendar");
};
const addOc = (form) => {
    axios.post(route("facturas.ocs.store", form.factura_id), form)
        .then((resp) => {
            facturaSelect.value = resp.data;
            search();
            emit('updateCalendar');
        })
        .catch((error) => {
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("message")
            ) {
                facturaSelect.value.error = error.response.data.message;
            } else {
                facturaSelect.value.error = "Error add OC";
            }
        });
};

// End Methos Modal
const changeTab = (status_id) => {
    paramsFacturas.status_id = status_id;
    if (paramsFacturas.search !== "") {
        paramsFacturas.search = "";
    }
};
const search = async () => {

    loading.value = true;
    const params = pickBy({ ...paramsFacturas });
    const resp = await axios.get(route("facturas-total.clientes.index"), { params });
    clientes.value = resp.data.clientesFacturas;
    totalFacturas.value = resp.data.totalFacturas;
    loading.value = false;
};



onBeforeMount(() => {
    search();
});

let timeout;
watch(paramsFacturas, () => {
    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    //Bounce de busqueda
    timeout = setTimeout(() => {
        search();
    }, 300);
});
</script>
<template>
    <div class="flex flex-col gap-4 pb-2 text-fuente-500">
        <div class="flex justify-around">
            <InputSearch v-model="paramsFacturas.search" class="px-2 py-1" />
            <ButtonAdd class="h-7" @click="showingFacturas = true" />
        </div>
        <div class="w-full">
            <!-- Header Tabs -->
            <HeaderTab>
                <Tab :active="paramsFacturas.status_id === ''" @click="changeTab('')">
                    TODAS
                </Tab>
                <Tab :active="paramsFacturas.status_id === '1'" @click="changeTab('1')">
                    ABIERTAS
                </Tab>
                <Tab :active="paramsFacturas.status_id === '2'" @click="changeTab('2')">
                    CERRADAS
                </Tab>
            </HeaderTab>
            <!-- Lista de clientes -->

            <div class="overflow-y-auto pt-4 border-b-[1px] border-gris-500" style="max-height: 41.1vh">
                <SkeletonLoader v-show="loading" style="height: 41.1vh" />
                <div>
                    <ItemClientePaginate v-for="cliente in clientes" :key="'cf' + cliente.id" :cliente="cliente"
                        :total="cliente.total_facturas" :filters="paramsFacturas"
                        :ruta="route('facturas-by-cliente.index', { cliente: cliente.id })">
                        <template #default="{ data }">
                            <ItemObjectShow v-for="factura in data" :key="factura.id" :data="factura"
                                @onShow="showOcsFactura($event)">
                                #{{ factura.referencia }}
                            </ItemObjectShow>
                        </template>
                    </ItemClientePaginate>
                </div>
            </div>
            <div class="flex flex-col px-4 py-2 mt-4 font-bold text-fuente-500">
                <span class="text-[12px] uppercase font-medium"> Total </span>
                <span class="text-[28px]">
                    $ {{ formatoMoney(totalFacturas.total.toFixed(2)) }}
                </span>
            </div>
        </div>
        <!--Modals -->
        <FacturasModal :show="showingFacturas" @update-facturas="updateFacturas($event)" @add-oc="addOc($event)"
            @close="showingFacturas = false" />
        <OcsFacturaModal :show="showingOcs" :factura="facturaSelect" @add-oc="addOc($event)"
            @update-facturas="updateFacturas($event)" @close="closeOcsFactura" />
        <!--Ends Modals-->
    </div>
</template>
