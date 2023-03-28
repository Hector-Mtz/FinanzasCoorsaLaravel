<script setup>
import { onBeforeMount, ref, watch, reactive } from "vue";

import { Inertia } from "@inertiajs/inertia";
import { pickBy, throttle } from "lodash";
import Tab from "../../../../Components/Tab.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import InputSearch from "@/Components/InputSearch.vue";
import DepositosModal from "./DepositosModal.vue";
import ItemIngresoC from "./ItemIngresoC.vue";
import FacturasDepositoModal from "./FacturasDepositoModal.vue";

import { formatoMoney } from "../../../../utils/conversiones";
import ItemClientePaginate from "../ItemClientePaginate.vue";
import HeaderTab from "../../../../Components/HeaderTab.vue";

const emit = defineEmits(["updateCalendar"]);

const clientes = ref([]);
const totalIngresos = ref({ total: 0 });
const params = reactive({ search: '', status_id: '1' });
const showingDepositos = ref(false);
const showingFacturas = ref(false);
const deposito = ref({});

// Modal Methods

const updateDepositos = () => {
    search();
    emit("updateCalendar");
};
const addFacturaToDeposito = (form) => {
    // esto es para el error
    const findedIndex = depositos.value.findIndex((dep) => {
        return dep.id == form.deposito_id;
    });
    axios
        .post(route("ingresos.facturas.store", form.deposito_id), form)
        .then(() => {
            search(searchText.value);
            Inertia.visit(route("finanzas.index"), {
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
                depositos.value[findedIndex].error =
                    error.response.data.message;
            } else {
                depositos.value[findedIndex].error = "Error SET FACTURA";
            }
        });
};

const showFacturas = (newDeposito) => {
    deposito.value = newDeposito;
    showingFacturas.value = true;
};

const closeFacturasDeposito = () => {
    deposito.value = {};
    showingFacturas.value = false;
};
// End Methos Modal

const changeTab = (status_id) => {
    params.status_id = status_id;
    if (params.search !== "") {
        params.search = "";
    }
};


const search = async () => {
    const paramsAux = pickBy({ ...params });
    try {

        const resp = await axios.get(route("ingresos-total.clientes.index"), { params: paramsAux });
        clientes.value = resp.data.clientesIngresos;
        totalIngresos.value = resp.data.totalIngresos;
    } catch (error) {
        let message;
        if (
            error.hasOwnProperty("response") &&
            error.response.data.hasOwnProperty("message")
        ) {
            message = error.response.data.message;
        } else {
            message = "Error GET DEPOSITOS";
        }
        alert(message);
    }

};

onBeforeMount(() => {
    search();
});


watch(params, throttle((newSearch) => {
    search(newSearch);
}), 100);
</script>
<template>
    <div class="flex flex-col gap-4 pb-2 text-fuente-500">
        <div class="flex items-center justify-around">
            <InputSearch v-model="params.search" class="px-2" />
            <ButtonAdd class="h-7" @click="showingDepositos = true" />
        </div>
        <div class="w-full">
            <!-- Header Tabs -->
            <HeaderTab>
                <Tab :active="params.status_id === ''" @click="changeTab('')">
                    TODOS
                </Tab>
                <Tab :active="params.status_id === '1'" @click="changeTab('1')">
                    ABIERTOS
                </Tab>
                <Tab :active="params.status_id === '2'" @click="changeTab('2')">
                    CERRAD0S
                </Tab>
            </HeaderTab>
            <!-- Lista de clientes -->
            <div class="-mx-2 overflow-hidden overflow-y-auto" style="max-height: 41.1vh">

                <ItemClientePaginate v-for="cliente in clientes" :key="'cd' + cliente.id" :cliente="cliente"
                    :total="cliente.total_ingresos" :filters="params"
                    :ruta="route('ingresos-by-cliente.index', { cliente: cliente.id })">
                    <template #default="{ data }">
                        <div
                            class="flex items-center justify-between p-2 m-1 mx-auto overflow-hidden overflow-x-auto shadow-xl bg-gris-500 sm:rounded-lg">
                            <table class="overflow-hidden mr-[.5rem] w-full">
                                <thead>
                                    <tr class="text-[9px] font-bold px-2 border-b-[1px] border-aqua-500">
                                        <th class="pb-1 px-[0.5rem]">
                                            Núm. Deposito
                                        </th>
                                        <th class="pb-1 px-[0.5rem]">Cantidad</th>
                                        <th class="pb-1 px-[0.5rem]">Factura</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ItemIngresoC v-for="(ingreso, index) in data" :key="ingreso.id + '-' + index"
                                        :ingreso="ingreso" @on-show="showFacturas($event)" />
                                </tbody>
                            </table>
                        </div>
                    </template>

                </ItemClientePaginate>
            </div>
            <div class="flex flex-col px-4 py-1">
                <span class="text-[12px] font-medium uppercase">Total</span>
                <span class="text-[28px] font-bold text-fuente-500">
                    $ {{ formatoMoney(totalIngresos.total.toFixed(2)) }}
                </span>
            </div>
        </div>
        <!--Modals -->
        <DepositosModal :show="showingDepositos" @update-depositos="updateDepositos($event)"
            @delete-deposito="updateDepositos()" @add-factura="addFacturaToDeposito($event)"
            @close="showingDepositos = false" />
        <FacturasDepositoModal :show="showingFacturas" :deposito="deposito" @add-factura="addFacturaToDeposito($event)"
            @update-depositos="updateDepositos()" @close="closeFacturasDeposito" />
        <!--Ends Modals-->
    </div>
</template>

<style lang="scss" scoped></style>
