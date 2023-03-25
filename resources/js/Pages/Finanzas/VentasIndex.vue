<script setup>
import { computed, reactive, ref } from "vue";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout.vue";
import cal from "../../../img/elementos/calendario.png";
import Card from "../../Components/Card.vue";
import Calendar from "../../Components/Calendar.vue";
import CalendarHeader from "../../Components/CalendarHeader.vue";
import Ventas from "./Partials/CardVenta/Ventas.vue";
import VentasModal from "./Partials/CardVenta/VentasModal.vue";
import Facturas from "./Partials/CardFacturas/Facturas.vue";
import Depositos from "./Partials/CardDepositos/Depositos.vue";
import ButtonCalendar from "../../Components/ButtonCalendar.vue";
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
    totalOcs: {
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
                    <table class="mx-2 mb-4">
                        <thead>
                            <tr>
                                <td class="flex justify-between py-4">
                                    <span class="text-fuente-500 text-[26px] font-semibold">Reporte Anual</span>
                                    <!-- 
                                                                    <ButtonCalendar
                                                                        :year="date.year"
                                                                        :month="date.month"
                                                                        @change-date="changeDate($event)"
                                                                    >
                                                                        <template #a>
                                                                            <button
                                                                                @click="
                                                                                    changeIndexMes(year - 1)
                                                                                "
                                                                                class="hover:opacity-40"
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    class="w-5 h-5 text-gray-900"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="#1D96F1"
                                                                                    stroke-width="2"
                                                                                >
                                                                                    <path
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round"
                                                                                        d="M15 19l-7-7 7-7"
                                                                                    />
                                                                                </svg>
                                                                            </button>
                                                                        </template>
                                                                        <template #b>
                                                                            <button
                                                                                @click="
                                                                                    changeIndexMes(year + 1)
                                                                                "
                                                                                class="hover:opacity-40"
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    class="w-5 h-5 text-gray-900"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="#1D96F1"
                                                                                    stroke-width="2"
                                                                                >
                                                                                    <path
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round"
                                                                                        d="M9 5l7 7-7 7"
                                                                                    />
                                                                                </svg>
                                                                            </button>
                                                                        </template>
                                                                    </ButtonCalendar>
                                                        -->
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="flex gap-2 py-4 text-center">
                                <td class="w-3/12 px-4 py-1 text-white shadow-md bg-ventas rounded-xl shadow-gray-400">
                                    <div class="flex flex-col">
                                        <span class="text-[13px] uppercase font-normal">
                                            VENTAS
                                        </span>
                                        <span class="font-bold text-[16px]">${{
                                            formatoMoney(
                                                0
                                            )
                                        }}</span>
                                    </div>
                                </td>
                                <td class="w-3/12 px-4 py-1 text-white shadow-md bg-pc rounded-xl shadow-gray-400">
                                    <div class="flex flex-col">
                                        <span class="text-[13px] uppercase font-normal">
                                            Por Cobrar
                                        </span>
                                        <span class="font-bold text-[16px]">${{
                                            formatoMoney(
                                                props.totalOcs.pc.toFixed(2)
                                            )
                                        }}</span>
                                    </div>
                                </td>
                                <td class="w-3/12 px-4 py-1 text-white shadow-md bg-pp rounded-xl shadow-gray-400">
                                    <div class="flex flex-col">
                                        <span class="text-[13px] uppercase font-normal">
                                            Por Pagar
                                        </span>
                                        <span class="font-bold text-[16px]">${{
                                            formatoMoney(
                                                props.totalOcs.pp.toFixed(2)
                                            )
                                        }}</span>
                                    </div>
                                </td>
                                <td class="w-3/12 px-4 py-1 text-white shadow-md bg-cobrado rounded-xl shadow-gray-400">
                                    <div class="flex flex-col">
                                        <span class="text-[13px] uppercase font-normal">
                                            Cobrado
                                        </span>
                                        <span class="font-bold text-[16px]">${{
                                            formatoMoney(
                                                props.totalOcs.c.toFixed(2)
                                            )
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4" class="flex items-center justify-between">
                                    <span class="text-fuente-500 text-[26px] font-semibold">Calendario</span>
                                    <img :src="cal" alt="calendario" class="w-[26px] h-[26px]" />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <VentasCalendar :date="date" @change-date="changeDate($event)" :totalOcs="props.totalOcs" />
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
