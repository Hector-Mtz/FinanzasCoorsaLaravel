<script setup>
import { ref, watch, onBeforeMount, computed } from "vue";
import { Inertia } from "@inertiajs/inertia";
import { pickBy } from "lodash";
import Tab from "../../../../Components/Tab.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import InputSearch from "@/Components/InputSearch.vue";
import ItemObjectShow from "@/Components/ItemObjectShow.vue";
import FacturasModal from "./FacturasModal.vue";
import OcsFacturaModal from "./OcsFacturaModal.vue";
import ItemCliente from "../ItemCliente.vue";
import { formatoMoney } from "../../../../utils/conversiones";
import SkeletonLoader from "../../../../Components/SkeletonLoader.vue";

const emit = defineEmits([""]);

const clientes = ref([]);
const totalFacturas = ref({ total: 0 });
const tab = ref(""); // Referencia al id
const searchText = ref("");
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
const addFactura = () => {
    search(searchText.value);
};
const addOc = (form) => {
    const finIndexFactura = facturas.value.findIndex((fact) => {
        return fact.id == form.factura_id;
    });
    axios
        .post(route("facturas.ocs.store", form.factura_id), form)
        .then(() => {
            search(searchText.value);
            Inertia.visit(route("ventas.index"), {
                preserveState: true,
                preserveScroll: true,
                only: ["totalOcs"],
            });
        })
        .catch((error) => {
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("message")
            ) {
                facturas.value[finIndexFactura].error =
                    error.response.data.message;
            } else {
                facturas.value[finIndexFactura].error = "Error add OC";
            }
        });
};

// End Methos Modal

const changeTab = (status_id) => {
    tab.value = status_id;
    if (searchText.value !== "") {
        searchText.value = "";
        search();
    } else {
        search(searchText.value);
    }
};
const search = async (newSearch) => {
    const params = pickBy({ status_id: tab.value, search: newSearch });
    const resp = await axios.get(route("facturas.index"), { params });
    clientes.value = resp.data.clientesFacturas;
    totalFacturas.value = resp.data.totalFacturas;
};

const facturas = computed(() => {
    let auxFacturas = [];
    clientes.value.forEach((cliente) => {
        auxFacturas = auxFacturas.concat(cliente.facturas);
    });
    // DEBIDO A QUE NO ACTUALIZA LAS FACTURAS DENTRO DEL MODAL
    if (showingOcs.value) {
        const findedIndex = auxFacturas.findIndex((fact) => {
            return fact.id == facturaSelect.value.id;
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
        search(newSearch);
    }, 300);
});
</script>
<template>
    <div class="text-fuente-500 flex flex-col gap-4 pb-2">
        <div class="flex justify-around">
            <InputSearch v-model="searchText" class="px-2 py-1" />
            <ButtonAdd class="h-7" @click="showingFacturas = true" />
        </div>
        <div class="w-full">
            <!-- Header Tabs -->
            <div
                class="flex justify-between rounded-3xl bg-gris-500 h-[32px] text-gris-900 mb-4 text-[10px] font-semibold items-center"
            >
                <Tab
                    :class="{
                        'bg-aqua-500 hover:bg-aqua-500/90 text-white shadow-md shadow-gray-400 font-extrabold h-[32px]':
                            tab === '',
                    }"
                    class="tab flex items-center"
                    @click="changeTab('')"
                >
                    TODAS
                </Tab>
                <Tab
                    :class="{
                        'bg-aqua-500 hover:bg-aqua-500/90 text-white shadow-md shadow-gray-400 h-[32px]':
                            tab === '1',
                    }"
                    class="tab flex items-center"
                    @click="changeTab('1')"
                >
                    ABIERTAS
                </Tab>
                <Tab
                    :class="{
                        'bg-aqua-500 hover:bg-aqua-500/90 text-white shadow-md shadow-gray-400 h-[32px]':
                            tab === '2',
                    }"
                    class="tab flex items-center"
                    @click="changeTab('2')"
                >
                    CERRADAS
                </Tab>
            </div>
            <!-- Lista de clientes -->

            <div
                class="overflow-y-auto pt-4 border-b-[1px] border-gris-500"
                style="max-height: 41.1vh"
            >
                <SkeletonLoader
                    v-if="clientes.length === 0"
                    style="height: 41.1vh"
                />
                <div v-else>
                    <ItemCliente
                        v-for="cliente in clientes"
                        :key="cliente.id"
                        :cliente="cliente"
                        :total="cliente.facturas.length"
                    >
                        <ItemObjectShow
                            v-for="factura in cliente.facturas"
                            :key="factura.id"
                            :data="factura"
                            @onShow="showOcsFactura($event)"
                        >
                            #{{ factura.referencia }}
                        </ItemObjectShow>
                    </ItemCliente>
                </div>
            </div>
            <div class="px-4 py-2 mt-4 flex flex-col font-bold text-fuente-500">
                <span class="text-[12px] uppercase font-medium"> Total </span>
                <span class="text-[28px]">
                    $ {{ formatoMoney(totalFacturas.total.toFixed(2)) }}
                </span>
            </div>
        </div>
        <!--Modals -->
        <FacturasModal
            :show="showingFacturas"
            :facturas="facturas"
            @add-factura="addFactura($event)"
            @add-oc="addOc($event)"
            @close="showingFacturas = false"
        />
        <OcsFacturaModal
            :show="showingOcs"
            :factura="facturaSelect"
            @add-oc="addOc($event)"
            @close="closeOcsFactura"
        />
        <!--Ends Modals-->
    </div>
</template>
