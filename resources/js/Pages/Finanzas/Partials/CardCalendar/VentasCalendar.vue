<script setup>
import { onBeforeMount, reactive, ref, watch } from 'vue';

import CalendarHeader from '@/Components/CalendarHeader.vue';
import Calendar from '@/Components/Calendar.vue';
import CalendarModal from './CalendarModal.vue';
import { formatoMoney } from '../../../../utils/conversiones';

const emit = defineEmits(['changeDate'])

const props = defineProps({
    date: { month: Number, year: Number },
    totalVentas: {
        type: Object,
        required: true
    },
    totalOcs: {
        type: Object,
        required: true,
    }
});
const totalsVentas = ref({
    ventas: 0,
    pc: 0,
    pp: 0,
    c: 0
});


const showsStatus = reactive(['ventas']);// Ya que debe ser profundo el watch
const specialDays = ref([]);
const showingModal = ref(false);
const dataCalendar = ref([]);

// no es renderizable
const colorsStatus = ['#A16207', '#CA8A04', '#E4B308', '#FDE047'];


const addStatus = (status) => {
    if (showsStatus.length >= 1) {
        // Determinamos si existe
        const indexStatus = showsStatus.findIndex((st) => st === status);
        if (indexStatus !== -1) {
            showsStatus.splice(indexStatus, 1);
        } else {
            if (showsStatus.length > 1) {
                showsStatus.shift();
            }
            showsStatus.push(status);
        }
    } else {
        showsStatus.push(status);
    }
}

const isActive = (status) => {
    return showsStatus.includes(status)

}

const getVentasDays = async (date) => {
    const resp = await axios.get(route('ventas.month'), {
        params: date
    });
    specialDays.value.push({ data: resp.data, color: 'red', });
}

async function getDaysStatus() {
    const date = {
        month: props.date.month + 1,
        year: props.date.year
    }
    const axiosDaysStatus = [];
    // colores
    let series = [];
    let colors = [];
    showsStatus.forEach(st => {
        series.push(st);
        if (st === 'ventas') {
            const respVentas = axios.get(route('ventas.month'), {
                params: date
            });
            axiosDaysStatus.push(respVentas);
            colors.push(colorsStatus[0]);
        } else {
            const respVentas = axios.get(route('ocs.month'), {
                params: { ...date, status: st }
            });
            axiosDaysStatus.push(respVentas);
            //logica para establecer el color
            switch (st) {
                case 'pc':
                    colors.push(colorsStatus[1]);
                    break;
                case 'pp':
                    colors.push(colorsStatus[2]);
                    break;
                case 'c':
                    colors.push(colorsStatus[3]);
                    break;
            }
        }
    })


    const responses = await Promise.all(axiosDaysStatus);

    var total = 0;
    // Genera el titulo de la data
    const daysStatus = responses.map((resp, index) => {
        // Se recorren los attributos

        // console.log(resp.data);
        for (let d in resp.data) {
            total = 0;
            resp.data[d].forEach((obj) => {
                total += obj.total;
                // subtotal += obj.subtotal;
                obj.total = '$' + formatoMoney(obj.total.toFixed(2));
                if (obj.hasOwnProperty('subtotal')) {
                    obj.subtotal = '$' + formatoMoney(obj.subtotal.toFixed(2));
                }
            });
            resp.data[d].data = resp.data[d];
            resp.data[d].title = formatoMoney(total.toFixed(2));
        }
        // total = formatoMoney(total);
        return { data: resp.data, color: colors[index], serie: series[index] }
    });
    specialDays.value = daysStatus;
}

async function getTotalsMonth() {
    const date = {
        month: props.date.month + 1,
        year: props.date.year
    }
    const respOcs = axios.get(route('ocs.totals-status'), {
        params: date
    });
    const respVentas = axios.get(route('ventas.totals'), {
        params: date
    });
    const resp = await Promise.all([respOcs, respVentas]);
    const auxResponse = {
        'ventas': formatoMoney(resp[1].data.total.toFixed(2)),
        'c': formatoMoney(resp[0].data.c.toFixed(2)),
        'pc': formatoMoney(resp[0].data.pc.toFixed(2)),
        'pp': formatoMoney(resp[0].data.pp.toFixed(2)),
    }
    totalsVentas.value = auxResponse;
    await getDaysStatus();

}

const showCalendarModal = (data) => {
    dataCalendar.value = data;
    console.log(data);
    showingModal.value = true;
}


// show status months
watch(showsStatus, async () => {
    await getDaysStatus()
});

onBeforeMount(() => {
    getTotalsMonth();
});

//Change totals months
watch(props, () => {
    getTotalsMonth();
})

</script>
<template>
    <div class="max-h-screen mx-8 overflow-x-auto">
        <CalendarHeader class="text-fuente-500" :month="props.date.month" :year="props.date.year"
            @change-date="emit('changeDate', $event)" />
        <!-- Interacion -->
        <div class="py-2 border-b-2 border-gray-900 text-fuente-500">
            <table class="w-full">
                <thead>
                    <tr class="text-center">
                        <td class="w-3/12">
                            <span @click="addStatus('ventas')" class="action-ventas"
                                :class="{ 'bg-yellow-700': isActive('ventas') }"> 
                                VENTAS
                            </span>
                        </td>
                        <td class="w-3/12">
                            <span @click="addStatus('pc')" class="action-ventas"
                                :class="{ 'bg-yellow-600': isActive('pc') }">
                                PC
                            </span>
                        </td>
                        <td class="w-3/12">
                            <span @click="addStatus('pp')" class="action-ventas"
                                :class="{ 'bg-yellow-500': isActive('pp') }">
                                PP
                            </span>
                        </td>
                        <td class="w-3/12">
                            <span @click="addStatus('c')" class="action-ventas" :class="{ 'bg-yellow-300': isActive('c') }">
                                C
                            </span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center">
                        <td class="p-2">
                            ${{ totalsVentas.ventas }}
                        </td>
                        <td class="p-2">
                            ${{ totalsVentas.pc }}
                        </td>
                        <td class="p-2">
                            ${{ totalsVentas.pp }}
                        </td>
                        <td class="p-2">
                            ${{ totalsVentas.c }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- End Interacion -->
        <div class="px-4 py-2">
            <Calendar :month="props.date.month" :special-days="specialDays" :year="props.date.year"
                @on-special-days="showCalendarModal($event)" class="text-fuente-500">
            </Calendar>
        </div>
        <!--Modals-->
        <CalendarModal :data-calendar="dataCalendar" :show="showingModal" @close="showingModal = false" />
        <!--End Modals-->
    </div>
</template>
<style scoped>
.action-ventas {
    padding: 1px 15px;
    border-radius: 50px;
    cursor: pointer;
}

.action-ventas:hover {
    background-color: #CA8A04;
}

.active {
    background-color: #CA8A04;
}
</style>
