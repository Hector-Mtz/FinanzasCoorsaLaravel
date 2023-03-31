<script setup>
import { onBeforeMount, reactive, ref, watch } from "vue";
import { pickBy, throttle } from "lodash";
import CalendarHeader from "@/Components/CalendarHeader.vue";
import JetLabel from "@/Jetstream/Label.vue";
import SelectComponent from "@/Components/SelectComponent.vue";
import Calendar from "@/Components/Calendar.vue";
import ButtonCalendar from "@/Components/ButtonCalendar.vue";
import cal from "../../../../../img/elementos/calendario.png";
import CalendarModal from "./CalendarModal.vue";
import { formatoMoney } from "../../../../utils/conversiones";
import VentasDateModal from "./VentasDateModal.vue";

const props = defineProps({
    listClientes: {
        type: Object,
    },
    lineasNegocios: {
        type: Object,
    },

});

const totalsGlobalStatus = ref({
    ventas: 0,
    pc: 0,
    pp: 0,
    c: 0,
});

const totalsMesStatus = ref({
    ventas: 0,
    pc: 0,
    pp: 0,
    c: 0,
});

const showsStatus = reactive(["ventas"]); // Ya que debe ser profundo el watch
const specialDays = ref([]);
const showingModal = ref(false);
const showingVentasModal = ref(false);
const dataCalendar = ref([]);

// no es renderizable
const colorsStatus = ["#44BFFC", "#697FEA", "#B66BF5", "#57D38C"];
const dateNow = new Date();

const paramsFilter = reactive({
    month: dateNow.getMonth(),
    year: dateNow.getFullYear(),
    lineas_negocio_id: '',
    cliente_id: '',
});

const changeDate = (newDate) => {
    paramsFilter.month = newDate.month;
    paramsFilter.year = newDate.year;
};

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

async function getDaysStatus() {
    const params = pickBy({
        ...paramsFilter,
        month: paramsFilter.month + 1,
    });
    const axiosDaysStatus = [];
    // colores
    let series = [];
    let colors = [];
    showsStatus.forEach((st) => {
        series.push(st);
        if (st === "ventas") {
            const respVentas = axios.get(route("ventas.month"), {
                params,
            });
            axiosDaysStatus.push(respVentas);
            colors.push(colorsStatus[0]);
        } else {
            const respVentas = axios.get(route("ocs.month"), {
                params: { ...params, status: st },
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


        console.log(resp.data);
        if (series[index] === 'ventas') {//En caso de ser centas
            for (let d in resp.data) {
                total = 0;
                //Recorre los dias
                let allFinish = true;
                resp.data[d].forEach((obj) => {
                    //Total para el titulo
                    total += obj.total;
                    // formato total
                    obj.total = "$" + formatoMoney(obj.total.toFixed(2));
                    obj.subtotal = "$" + formatoMoney(obj.subtotal.toFixed(2));
                    allFinish = allFinish && 1 === obj.finalizado;

                });
                if (allFinish) {
                    resp.data[d].titleHTML = `<div class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"  fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>`
                } else {
                    resp.data[d].titleHTML = `<div class="flex"><svg xmlns="http://www.w3.org/2000/svg"  width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>`
                }

                resp.data[d].titleHTML += '<div class="overflow-hidden text-ellipsis">$' + formatoMoney(total.toFixed(2)) + '</div></div>';
            }

        } else {
            // Se recorren los attributos en este caso los dias
            for (let d in resp.data) {
                total = 0;
                //Recorre los dias
                resp.data[d].forEach((obj) => {
                    //Total para el titulo
                    total += obj.total;
                    // formato total
                    obj.total = "$" + formatoMoney(obj.total.toFixed(2));
                    if (obj.hasOwnProperty("subtotal")) {
                        obj.subtotal = "$" + formatoMoney(obj.subtotal.toFixed(2));
                    }
                });

                resp.data[d].titleHTML = '$' + formatoMoney(total.toFixed(2));
            }
        }

        // total = formatoMoney(total);
        return { data: resp.data, color: colors[index], serie: series[index] };

    });
    specialDays.value = daysStatus;
}

async function getTotalsStatus() {
    const params = pickBy({
        ...paramsFilter,
        month: paramsFilter.month + 1,
    });

    let paramsGlobal = { ...params };
    delete paramsGlobal.month;
    const respGlobal = axios.get(route("finanzas.totales-globales"), {
        params: paramsGlobal,
    });

    const respOcs = axios.get(route("finanzas.totales-globales"), {
        params,
    });
    const resp = await Promise.all([respGlobal, respOcs]);

    totalsGlobalStatus.value = {
        ventas: formatoMoney(resp[0].data.ventas.toFixed(2)),
        c: formatoMoney(resp[0].data.c.toFixed(2)),
        pc: formatoMoney(resp[0].data.pc.toFixed(2)),
        pp: formatoMoney(resp[0].data.pp.toFixed(2)),
    };
    const auxResponse = {
        ventas: formatoMoney(resp[1].data.ventas.toFixed(2)),
        c: formatoMoney(resp[1].data.c.toFixed(2)),
        pc: formatoMoney(resp[1].data.pc.toFixed(2)),
        pp: formatoMoney(resp[1].data.pp.toFixed(2)),
    };
    // console.log(resp[0].data);

    totalsMesStatus.value = auxResponse;
    await getDaysStatus();
}

const showCalendarModal = (data) => {
    dataCalendar.value = data;
    switch (data.serie) {
        case "ventas":
            showingVentasModal.value = true;
            break;
        default:
            showingModal.value = true;
            break;
    }

};

// show status months
watch(showsStatus, async () => {
    await getDaysStatus();
});

onBeforeMount(() => {
    getTotalsStatus();
});

//Change totals months
watch(paramsFilter, throttle(() => {
    getTotalsStatus();
}), 100);

defineExpose({ update: () => { getTotalsStatus() } });

</script>
<template>
    <div>
        <table class="w-full mx-2 mb-4">
            <thead>
                <tr>
                    <td class="flex justify-between py-4">
                        <span class="text-fuente-500 text-[26px] font-semibold">Reporte Anual</span>
                        <ButtonCalendar :year="paramsFilter.year" :month="paramsFilter.month"
                            @change-date="changeDate($event)" />
                    </td>
                </tr>
                <tr>
                    <td class="flex justify-between py-4">
                        <div>
                            <JetLabel value="Lineas de negocios" />
                            <SelectComponent name="lineas_negocio_id" v-model="paramsFilter.lineas_negocio_id">
                                <option value="" class="font-semibold">--TODAS--</option>
                                <option v-for="lineasNegocio in props.lineasNegocios" :key="lineasNegocio.name"
                                    :value="lineasNegocio.id">
                                    {{ lineasNegocio.name }}
                                </option>
                            </SelectComponent>
                        </div>
                        <div>
                            <JetLabel value="Cliente" />
                            <SelectComponent name="cliente_id" v-model="paramsFilter.cliente_id">
                                <option value="" class="font-semibold">--TODOS--</option>
                                <option v-for="cliente in props.listClientes" :key="'c' + cliente.id" :value="cliente.id">
                                    {{ cliente.nombre }}
                                </option>
                            </SelectComponent>
                        </div>

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
                            <span class="font-bold text-[16px]">${{ totalsGlobalStatus.ventas }}</span>
                        </div>
                    </td>
                    <td class="w-3/12 px-4 py-1 text-white shadow-md bg-pc rounded-xl shadow-gray-400">
                        <div class="flex flex-col">
                            <span class="text-[13px] uppercase font-normal">
                                Por Cobrar
                            </span>
                            <span class="font-bold text-[16px]">${{ totalsGlobalStatus.pc }}</span>
                        </div>
                    </td>
                    <td class="w-3/12 px-4 py-1 text-white shadow-md bg-pp rounded-xl shadow-gray-400">
                        <div class="flex flex-col">
                            <span class="text-[13px] uppercase font-normal">
                                Por Pagar
                            </span>
                            <span class="font-bold text-[16px]">${{ totalsGlobalStatus.pp }}</span>
                        </div>
                    </td>
                    <td class="w-3/12 px-4 py-1 text-white shadow-md bg-cobrado rounded-xl shadow-gray-400">
                        <div class="flex flex-col">
                            <span class="text-[13px] uppercase font-normal">
                                Cobrado
                            </span>
                            <span class="font-bold text-[16px]">${{ totalsGlobalStatus.c }}</span>
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

        <div class="mx-2 overflow-x-auto">

            <!-- Interacion -->
            <div class="py-4">
                <table class="w-full">
                    <thead>
                        <tr class="flex justify-around gap-16 px-4 text-center">
                            <td class="hover:cursor-pointer hover:bg-ventas/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                                :class="{
                                    'bg-ventas text-white': isActive('ventas'),
                                }" @click="addStatus('ventas')">
                                <span> VENTAS </span>
                            </td>
                            <td @click="addStatus('pc')"
                                class="hover:cursor-pointer hover:bg-pc/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                                :class="{ 'bg-pc text-white': isActive('pc') }">
                                <span> PC </span>
                            </td>
                            <td @click="addStatus('pp')"
                                class="hover:cursor-pointer hover:bg-pp/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                                :class="{ 'bg-pp text-white': isActive('pp') }">
                                <span> PP </span>
                            </td>
                            <td @click="addStatus('c')"
                                class="hover:cursor-pointer hover:bg-cobrado/70 rounded-2xl bg-gris-500 shadow-md shadow-gray-400 text-[13px] font-bold w-full py-2"
                                :class="{
                                    'bg-cobrado text-white': isActive('c'),
                                }">
                                <span> C </span>
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
                                    <span class="font-bold text-[16px]">${{ totalsMesStatus.ventas }}</span>
                                </div>
                            </td>
                            <td class="w-3/12 px-4 py-1 text-white shadow-md bg-pc rounded-xl shadow-gray-400">
                                <div class="flex flex-col">
                                    <span class="text-[13px] uppercase font-normal">
                                        Por Cobrar
                                    </span>
                                    <span class="font-bold text-[16px]">${{ totalsMesStatus.pc }}</span>
                                </div>
                            </td>
                            <td class="w-3/12 px-4 py-1 text-white shadow-md bg-pp rounded-xl shadow-gray-400">
                                <div class="flex flex-col">
                                    <span class="text-[13px] uppercase font-normal">
                                        Por Pagar
                                    </span>
                                    <span class="font-bold text-[16px]">${{ totalsMesStatus.pp }}</span>
                                </div>
                            </td>
                            <td class="w-3/12 px-4 py-1 text-white shadow-md bg-cobrado rounded-xl shadow-gray-400">
                                <div class="flex flex-col">
                                    <span class="text-[13px] uppercase font-normal">
                                        Cobrado
                                    </span>
                                    <span class="font-bold text-[16px]">${{ totalsMesStatus.c }}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- End Interacion -->
            <div class="px-4 py-2 mt-4 bg-gris-500 rounded-xl">
                <CalendarHeader class="text-fuente-500 border-b-[1px] border-b-gris-900 mb-4" :month="paramsFilter.month"
                    :year="paramsFilter.year" @change-date="changeDate($event)" />
                <Calendar :month="paramsFilter.month" :special-days="specialDays" :year="paramsFilter.year"
                    @on-special-days="showCalendarModal($event)" class="text-fuente-500">
                </Calendar>
            </div>
            <!--Modals-->

            <CalendarModal :data-calendar="dataCalendar" :show="showingModal" @close="showingModal = false" />
            <VentasDateModal :data-calendar="dataCalendar" :show="showingVentasModal" @close="showingVentasModal = false" />
            <!--End Modals-->
        </div>
    </div>
</template>
