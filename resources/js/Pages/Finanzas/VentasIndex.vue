<script setup>
import { reactive, ref } from "vue";
import AppLayout from "@/Layouts/AppLayout.vue";

import Card from "../../Components/Card.vue";
import Ventas from "./Partials/CardVenta/Ventas.vue";
import VentasModal from "./Partials/CardVenta/VentasModal.vue";
import Facturas from "./Partials/CardFacturas/Facturas.vue";
import Depositos from "./Partials/CardDepositos/Depositos.vue";
import VentasCalendar from "./Partials/CardCalendar/VentasCalendar.vue";
import { formatoMoney } from "../../utils/conversiones";

const dateNow = new Date();
const showingVentas = ref(false);
const date = ref({
    month: dateNow.getMonth(),
    year: dateNow.getFullYear(),
});

const componentFactDep = reactive({
    component: "Facturas",
    title: "Por Pagar",
});

const props = defineProps({
    clientes: {
        type: Object,
        required: true,
    },
    totalVentasStatus: {
        type: Object,
        required: true,
    },
    lineasNegocios: {
        type: Object,
        required: true,
    },
    filters: {
        type: Object,
        required: true,
    },
});

// const ventas = computed(() => {
//     let auxVentas = [];
//     props.clientes.forEach((cliente) => {
//         let ventas = cliente.ventas;
//         ventas = ventas.map((venta) => {
//             venta.sub_total = venta.monto * venta.periodos * venta.cantidad;
//             return venta;
//         });
//         auxVentas = auxVentas.concat(ventas);
//     });
//     return auxVentas;
// });

const changeDate = (newDate) => {
    date.value = newDate;
};
// FUNCIONES MODAL
const closeModalVentas = () => {
    showingVentas.value = false;
};
// END FUNCIONES MODAL

const chageComponent = () => {
    if (componentFactDep.title === "Por Pagar") {
        componentFactDep.component = "Depositos";
        componentFactDep.title = "Depositos";
    } else {
        componentFactDep.component = "Facturas";
        componentFactDep.title = "Por Pagar";
    }
};
</script>

<template>
    <AppLayout title="Finanzas">
        <template #header>
            <div class="flex items-center">
                <h2 class="text-4xl font-bold leading-tight text-fuente-500">
                    Finanzas
                </h2>
            </div>
        </template>

        <div class="px-3 py-3">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <Ventas :clientes="props.clientes" :filters="props.filters" @show-ventas="showingVentas = true"
                        class="border-b-[1px] border-white" :lineas-negocios="props.lineasNegocios" />
                    <div class="flex flex-col px-4 py-2 mt-4 font-bold text-fuente-500">
                        <span class="text-[12px] uppercase font-medium">
                            Total
                        </span>
                        <span class="text-[28px]">
                            $
                            {{
                                formatoMoney(totalVentasStatus.total.toFixed(2))
                            }}
                        </span>
                    </div>
                </Card>
                <div class="grid col-span-2 px-4 py-4 bg-white text-fuente-500 rounded-2xl">

                    <VentasCalendar :date="date" @change-date="changeDate($event)" />
                </div>
                <Card>
                    <div class="flex items-center justify-between my-1 mb-4 text-fuente-500">
                        <h1 class="ml-2 text-[26px] font-semibold">
                            {{ componentFactDep.title }}
                        </h1>
                        <svg xmlns="http://www.w3.org/2000/svg" @click="chageComponent()"
                            class="w-6 h-6 text-aqua-500 hover:text-aqua-500/70 hover:cursor-pointer" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <Facturas v-if="componentFactDep.component === 'Facturas'" />
                    <Depositos v-else />
                </Card>
            </div>
        </div>
        <!-- Modals -->
        <VentasModal :show="showingVentas" :filters="props.filters" @close="closeModalVentas" />
        <!-- END Modals -->
    </AppLayout>
</template>

<style lang="css" scoped>
.grid-ventas {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 20px;
    min-height: 95vh;
}
</style>
