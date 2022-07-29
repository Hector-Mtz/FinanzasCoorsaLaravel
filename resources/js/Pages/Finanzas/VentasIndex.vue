<script setup>
import { computed, reactive, ref } from 'vue';
import { Inertia } from '@inertiajs/inertia'
import AppLayout from '@/Layouts/AppLayout.vue';

import Card from '../../Components/Card.vue';
import Calendar from '../../Components/Calendar.vue';
import CalendarHeader from '../../Components/CalendarHeader.vue';
import Ventas from './Partials/CardVenta/Ventas.vue';
import VentasModal from './Partials/CardVenta/VentasModal.vue';
import Facturas from './Partials/CardFacturas/Facturas.vue';
import Depositos from './Partials/CardDepositos/Depositos.vue';
import ButtonCalendar from '../../Components/ButtonCalendar.vue';
import VentasCalendar from './Partials/CardCalendar/VentasCalendar.vue';

const dateNow = new Date();
const showingVentas = ref(false);
const date = ref({
    month: dateNow.getMonth(),
    year: dateNow.getFullYear()
})


const componentFactDep = reactive({
    component: 'Facturas',
    title: 'Por Pagar'
});



const props = defineProps({
    clientes: {
        type: Object,
        required: true,
    },
});


const ventas = computed(() => {
    let auxVentas = [];
    props.clientes.forEach(cliente => {
        let ventas = cliente.ventas
        ventas = ventas.map(venta => {
            venta.total = venta.total * venta.periodos * venta.cantidad
            return venta;
        });
        auxVentas = auxVentas.concat(ventas);
    })
    return auxVentas;
})

const changeDate = (newDate) => {
    date.value = newDate;
}
// FUNCIONES MODAL
const closeModalVentas = () => {
    showingVentas.value = false;
}
// END FUNCIONES MODAL

const chageComponent = () => {
    if (componentFactDep.title === 'Por Pagar') {
        componentFactDep.component = 'Depositos'
        componentFactDep.title = 'Depositos'
    } else {
        componentFactDep.component = 'Facturas'
        componentFactDep.title = 'Por Pagar'
    }
}

</script>

<template>
    <AppLayout title="Finanzas">
        <template #header>
            <div class="flex items-center justify-around">
                <h2 class="text-xl font-bold leading-tight text-white">
                    Finanzas
                </h2>
                <ButtonCalendar :month="date.month" :year="date.year" @change-date="changeDate($event)" />
            </div>
        </template>

        <div class="px-3 py-3 fondo_general">
            <div class="grid-ventas">
                <Card class="h-full">
                    <Ventas :clientes="props.clientes" @show-ventas="showingVentas = true" />
                </Card>
                <div class="grid text-white">
                    <table class="mb-4 md:mx-auto">
                        <thead>
                            <tr class="text-center">
                                <td class="w-3/12">
                                    <span>
                                        VENTAS
                                    </span>
                                </td>
                                <td class="w-3/12">
                                    <span>
                                        PC
                                    </span>
                                </td>
                                <td class="w-3/12">
                                    <span>
                                        PP
                                    </span>
                                </td>
                                <td class="w-3/12">
                                    <span>
                                        C
                                    </span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center">
                                <td class="p-2">
                                    $
                                </td>
                                <td class="p-2">
                                    $
                                </td>
                                <td class="p-2">
                                    $
                                </td>
                                <td class="p-2">
                                    $
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4">
                                    <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="66.22" height="23.82"
                                        viewBox="0 0 66.22 23.82">
                                        <g data-name="Grupo 89" transform="translate(-2229.56 -1215.34)">
                                            <path id="Trazado_155" data-name="Trazado 155" d="M0,0H66.22"
                                                transform="translate(2229.56 1216.84)" fill="none" stroke="#40bb6e"
                                                stroke-width="3" />
                                            <path id="Trazado_154" data-name="Trazado 154"
                                                d="M2241.166,1216.973l22.187,22.187,22.168-22.168" fill="#40bb6e" />
                                        </g>
                                    </svg>
                                </td>
                            </tr>

                        </tfoot>
                    </table>
                    <Card class="">
                        <VentasCalendar :date="date" @change-date="changeDate($event)" />
                    </Card>
                </div>
                <Card>
                    <div class="flex flex-row items-center my-1 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" @click="chageComponent()"
                            class="w-8 h-8 text-green-600 hover:text-green-800" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <h1 class="ml-2 text-lg">{{ componentFactDep.title }}</h1>
                    </div>
                    <Facturas v-if="componentFactDep.component === 'Facturas'" />
                    <Depositos v-else />
                </Card>
            </div>
        </div>
        <!-- Modals -->
        <VentasModal :show="showingVentas" :ventas="ventas" @close="closeModalVentas" />
        <!-- END Modals -->
    </AppLayout>

</template>


<style lang="css" scoped>
.grid-ventas {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 20px;
    height: 95vh;
}
</style>
