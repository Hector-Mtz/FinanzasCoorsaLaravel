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
    <div class="text-fuente-500 gap-4 flex flex-col">
        <div class="flex justify-between">
            <h1 class="text-2xl font-semibold">Ventas</h1>
            <img :src="monedas" alt="" />
        </div>
        <div class="flex justify-around">
            <InputSearch v-model="searchText" />
            <ButtonAdd class="h-7" @click="emit('showVentas')" />
        </div>
        <div class="w-full">
            <!-- Header Tabs -->
            <div
                class="flex justify-between border-[1px] border-aqua-500 rounded-3xl h-fit"
            >
                <Tab
                    :class="{ 'bg-aqua-500 hover:bg-aqua-500/90': tab === '' }"
                    class="tab"
                    @click="changeTab('')"
                >
                    TODAS
                </Tab>
                <Tab
                    :class="{ 'bg-aqua-500 hover:bg-aqua-500/90': tab === '1' }"
                    class="tab"
                    @click="changeTab('1')"
                >
                    ABIERTAS
                </Tab>
                <Tab
                    :class="{ 'bg-aqua-500 hover:bg-aqua-500/90': tab === '2' }"
                    class="tab"
                    @click="changeTab('2')"
                >
                    CERRADAS
                </Tab>
            </div>
            <!-- Lista de clientes -->
            <div class="overflow-y-auto pt-4" style="max-height: 65vh">
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
