<script setup>
import { computed, ref } from 'vue';
import { Inertia } from '@inertiajs/inertia'
import AppLayout from '@/Layouts/AppLayout.vue';

import Card from '../../Components/Card.vue';
import Calendar from '../../Components/Calendar.vue';
import CalendarHeader from '../../Components/CalendarHeader.vue';
import Ventas from './Partials/Ventas.vue';
import VentasModal from './Partials/VentasModal.vue';

const date = new Date();
const year = ref(date.getFullYear());
const showingVentas = ref(false);
const month = ref(date.getMonth());



const props = defineProps({
    ventas: {
        type: Object,
        required: true,
    },
});

const ventas = computed(() => {
    return props.ventas.map(venta => {
        venta.total = venta.total * venta.periodos * venta.cantidad
        return venta;
    })
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

</script>

<template>
    <AppLayout title="Finanzas">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Finanzas
            </h2>
        </template>

        <div class="px-3 py-3 fondo_general">
            <div class="grid-ventas">
                <Card class="h-full">
                    <Ventas :ventas="ventas" @show-ventas="showingVentas = true" />
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
                    <h1>Por pagar</h1>
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
    height: 100vh;
}
</style>
