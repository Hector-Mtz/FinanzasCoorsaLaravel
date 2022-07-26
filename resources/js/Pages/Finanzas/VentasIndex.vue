<script setup>
import { computed, reactive, ref } from 'vue';
import { Inertia } from '@inertiajs/inertia'
import AppLayout from '@/Layouts/AppLayout.vue';

import Card from '../../Components/Card.vue';
import Calendar from '../../Components/Calendar.vue';
import CalendarHeader from '../../Components/CalendarHeader.vue';
import Ventas from './Partials/Ventas.vue';
import VentasModal from './Partials/VentasModal.vue';
import Facturas from './Partials/Facturas.vue';
import Depositos from './Partials/Depositos.vue';

const date = new Date();
const year = ref(date.getFullYear());
const showingVentas = ref(false);
const month = ref(date.getMonth());
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
    year.value = newDate.year;
    month.value = newDate.month;
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
            <h2 class="text-xl font-semibold leading-tight text-white">
                Finanzas
            </h2>
        </template>

        <div class="px-3 py-3 fondo_general">
            <div class="grid-ventas">
                <Card class="h-full">
                    <Ventas :clientes="props.clientes" @show-ventas="showingVentas = true" />
                </Card>
                <Card>
                    <div class="mx-4">
                        <CalendarHeader class="mb-4 text-white" :month="month" :year="year"
                            @change-date="changeDate($event)" />
                        <Calendar :month="month" :year="year" class="text-white">
                        </Calendar>
                    </div>
                </Card>
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
