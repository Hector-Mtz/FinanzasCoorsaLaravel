<script setup>
import { onBeforeMount, reactive, ref, watch } from "vue";

import CalendarHeader from "@/Components/CalendarHeader.vue";
import Calendar from "@/Components/Calendar.vue";
import CalendarModal from "./CalendarModal.vue";
import { formatoMoney } from "../../../../utils/conversiones";

const emit = defineEmits(["changeDate"]);

const props = defineProps({
    date: { month: Number, year: Number },
    totalVentas: {
        type: Object,
        required: true,
    },
    totalOcs: {
        type: Object,
        required: true,
    },
});
const totalsVentas = ref({
    ventas: 0,
    pc: 0,
    pp: 0,
    c: 0,
});

const showsStatus = reactive(["ventas"]); // Ya que debe ser profundo el watch
const specialDays = ref([]);
const showingModal = ref(false);
const dataCalendar = ref([]);

// no es renderizable
const colorsStatus = ["#44BFFC", "#697FEA", "#B66BF5", "#57D38C"];

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
};

const isActive = (status) => {
    return showsStatus.includes(status);
};

const getVentasDays = async (date) => {
    const resp = await axios.get(route("ventas.month"), {
        params: date,
    });
    specialDays.value.push({ data: resp.data, color: "red" });
};

async function getDaysStatus() {
    const date = {
        month: props.date.month + 1,
        year: props.date.year,
    };
    const axiosDaysStatus = [];
    // colores
    let series = [];
    let colors = [];
    showsStatus.forEach((st) => {
        series.push(st);
        if (st === "ventas") {
            const respVentas = axios.get(route("ventas.month"), {
                params: date,
            });
            axiosDaysStatus.push(respVentas);
            colors.push(colorsStatus[0]);
        } else {
            const respVentas = axios.get(route("ocs.month"), {
                params: { ...date, status: st },
            });
            axiosDaysStatus.push(respVentas);
            //logica para establecer el color
            switch (st) {
                case "pc":
                    colors.push(colorsStatus[1]);
                    break;
                case "pp":
                    colors.push(colorsStatus[2]);
                    break;
                case "c":
                    colors.push(colorsStatus[3]);
                    break;
            }
        }
    });

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
                obj.total = "$" + formatoMoney(obj.total.toFixed(2));
                if (obj.hasOwnProperty("subtotal")) {
                    obj.subtotal = "$" + formatoMoney(obj.subtotal.toFixed(2));
                }
            });
            resp.data[d].data = resp.data[d];
            resp.data[d].title = formatoMoney(total.toFixed(2));
        }
        // total = formatoMoney(total);
        return { data: resp.data, color: colors[index], serie: series[index] };
    });
    specialDays.value = daysStatus;
}

async function getTotalsMonth() {
    const date = {
        month: props.date.month + 1,
        year: props.date.year,
    };
    const respOcs = axios.get(route("ocs.totals-status"), {
        params: date,
    });
    const respVentas = axios.get(route("ventas.totals"), {
        params: date,
    });
    const resp = await Promise.all([respOcs, respVentas]);
    const auxResponse = {
        ventas: formatoMoney(resp[1].data.total.toFixed(2)),
        c: formatoMoney(resp[0].data.c.toFixed(2)),
        pc: formatoMoney(resp[0].data.pc.toFixed(2)),
        pp: formatoMoney(resp[0].data.pp.toFixed(2)),
    };
    totalsVentas.value = auxResponse;
    await getDaysStatus();
}

const showCalendarModal = (data) => {
    dataCalendar.value = data;
    console.log(data);
    showingModal.value = true;
};

// show status months
watch(showsStatus, async () => {
    await getDaysStatus();
});

onBeforeMount(() => {
    getTotalsMonth();
});

//Change totals months
watch(props, () => {
    getTotalsMonth();
});
</script>
<template>
    <div class="max-h-screen mx-2 overflow-x-auto">
        <!-- Interacion -->
        <div class="py-4">
            <table class="w-full">
                <thead>
                    <tr class="flex justify-around gap-16 px-4 text-center">
                        <td
                            class="hover:cursor-pointer hover:bg-ventas/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                            :class="{
                                'bg-ventas text-white': isActive('ventas'),
                            }"
                            @click="addStatus('ventas')"
                        >
                            <span> VENTAS </span>
                        </td>
                        <td
                            @click="addStatus('pc')"
                            class="hover:cursor-pointer hover:bg-pc/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                            :class="{ 'bg-pc text-white': isActive('pc') }"
                        >
                            <span> PC </span>
                            <span>${{ totalsVentas.pc }}</span>
                        </td>
                        <td
                            @click="addStatus('pp')"
                            class="hover:cursor-pointer hover:bg-pp/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                            :class="{ 'bg-pp text-white': isActive('pp') }"
                        >
                            <span> PP </span>
                        </td>
                        <td
                            @click="addStatus('c')"
                            class="hover:cursor-pointer hover:bg-cobrado/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                            :class="{
                                'bg-cobrado text-white': isActive('c'),
                            }"
                        >
                            <span> C </span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="flex gap-2 py-4 text-center">
                        <td
                            class="w-3/12 px-4 py-1 text-white shadow-md bg-ventas rounded-xl shadow-gray-400"
                        >
                            <div class="flex flex-col">
                                <span class="text-[13px] uppercase font-normal">
                                    VENTAS
                                </span>
                                <span class="font-bold text-[16px]"
                                    >${{ totalsVentas.ventas }}</span
                                >
                            </div>
                        </td>
                        <td
                            class="w-3/12 px-4 py-1 text-white shadow-md bg-pc rounded-xl shadow-gray-400"
                        >
                            <div class="flex flex-col">
                                <span class="text-[13px] uppercase font-normal">
                                    Por Cobrar
                                </span>
                                <span class="font-bold text-[16px]"
                                    >${{ totalsVentas.pc }}</span
                                >
                            </div>
                        </td>
                        <td
                            class="w-3/12 px-4 py-1 text-white shadow-md bg-pp rounded-xl shadow-gray-400"
                        >
                            <div class="flex flex-col">
                                <span class="text-[13px] uppercase font-normal">
                                    Por Pagar
                                </span>
                                <span class="font-bold text-[16px]"
                                    >${{ totalsVentas.pp }}</span
                                >
                            </div>
                        </td>
                        <td
                            class="w-3/12 px-4 py-1 text-white shadow-md bg-cobrado rounded-xl shadow-gray-400"
                        >
                            <div class="flex flex-col">
                                <span class="text-[13px] uppercase font-normal">
                                    Cobrado
                                </span>
                                <span class="font-bold text-[16px]"
                                    >${{ totalsVentas.c }}</span
                                >
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- End Interacion -->
        <div class="px-4 py-2 mt-4 bg-gris-500 rounded-xl">
            <CalendarHeader
                class="text-fuente-500 border-b-[1px] border-b-gris-900 mb-4"
                :month="props.date.month"
                :year="props.date.year"
                @change-date="emit('changeDate', $event)"
            />
            <Calendar
                :month="props.date.month"
                :special-days="specialDays"
                :year="props.date.year"
                @on-special-days="showCalendarModal($event)"
                class="text-fuente-500"
            >
            </Calendar>
        </div>
        <!--Modals-->

        <CalendarModal
            :data-calendar="dataCalendar"
            :show="showingModal"
            @close="showingModal = false"
        />
        <!--End Modals-->
    </div>
</template>
