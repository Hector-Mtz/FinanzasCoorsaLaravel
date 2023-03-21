<script setup>
import { ref, watch } from "vue";
import { Inertia } from "@inertiajs/inertia";
import { pickBy } from "lodash";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import InputSearch from "@/Components/InputSearch.vue";
import OcsModal from "./OcsModal.vue";
import ItemCliente from "../ItemCliente.vue";
import ItemObjectShow from "@/Components/ItemObjectShow.vue";
import Tab from "../../../../Components/Tab.vue";
import monedas from "../../../../../img/elementos/monedas-de-un-dolar.png";

const emit = defineEmits(["showVentas"]);

const props = defineProps({
    clientes: {
        type: Object,
    },
});

const tab = ref(""); // Referencia al id
const searchText = ref("");
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
    tab.value = status_id;
    if (searchText.value !== "") {
        searchText.value = "";
    } else {
        const params = pickBy({ status_id });
        Inertia.visit(route("ventas.index"), {
            data: params,
            preserveState: true,
            preserveScroll: true,
            only: ["clientes", "totalVentasStatus"],
        });
    }
};
const search = (newSearch) => {
    const params = pickBy({ status_id: tab.value, search: newSearch });
    Inertia.visit(route("ventas.index"), {
        data: params,
        preserveState: true,
        preserveScroll: true,
        only: ["clientes", "totalVentasStatus"],
    });
};

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
    <div
        class="text-fuente-500 gap-4 flex flex-col border-b-[1px] border-gris-500 pb-2"
    >
        <div class="flex justify-between items-center">
            <h1 class="text-[26px] font-semibold">Ventas</h1>
            <img :src="monedas" alt="" class="h-[25px]" />
        </div>
        <div class="flex justify-around">
            <InputSearch v-model="searchText" />
            <ButtonAdd class="h-7" @click="emit('showVentas')" />
        </div>
        <div class="w-full h-">
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
            <div class="overflow-y-auto pt-4" style="max-height: 41.2vh">
                <ItemCliente
                    v-for="cliente in props.clientes"
                    :key="cliente.id"
                    :cliente="cliente"
                    :total="cliente.ventas.length"
                >
                    <ItemObjectShow
                        v-for="venta in cliente.ventas"
                        :key="venta.id"
                        :data="venta"
                        @onShow="showOcs($event)"
                    >
                        {{ venta.ceco + "-" + venta.servicio }}
                        <br />
                        {{ venta.fechaInicial }}
                    </ItemObjectShow>
                </ItemCliente>
            </div>
        </div>
        <!--Modals -->
        <OcsModal :show="showingOcs" :venta="ventaSelect" @close="closeOcs" />

        <!--Ends Modals-->
    </div>
</template>
