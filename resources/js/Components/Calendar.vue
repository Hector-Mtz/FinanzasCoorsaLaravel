<script setup>
import { ref, computed } from "vue";
import { listDaysSem } from "../data/calendar";

defineEmits(["onSpecialDays"]);

const props = defineProps({
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        default: 2022,
    },
    specialDays: {
        type: Object,
        default: [],
    },
});

const diasText = ref(listDaysSem);
const weeks = computed(() => {
    const fechaInicial = new Date(props.year, props.month);
    let days = [];
    let semanaDay = 0;
    let start = 0;
    const auxWeek = [];
    const lastDay = new Date(props.year, props.month + 1, 0).getDate();
    for (let day = 1; day <= lastDay; day++) {
        // i reresenta el dia
        fechaInicial.setDate(day);
        semanaDay = fechaInicial.getDay();
        if (start === 0) {
            // esto es para recorrer los dias (unicamente lo deberia realizar la primvera vez)
            start = semanaDay + 1; // ya que empieza en 0
        }
        let plusData = []; // data adicional a los dias
        props.specialDays.forEach((specialDay) => {
            if (specialDay.data[day] !== undefined) {
                plusData.push({
                    ...specialDay,
                    date: day + "/" + (props.month + 1) + "/" + props.year,
                    data: specialDay.data[day],
                    title: specialDay.data[day].title,
                });
            }
            // for (let i = 0; i < specialDay.data.length; i++) {
            //     if (specialDay.data[i].day == day) {
            //         // Unicamnte deberia agregar uno por especial
            //         plusData.push({
            //             object: day,
            //             color: specialDay.color,
            //         });
            //         break;
            //     }
            // }
        });

        days.push({ dayText: day, plusData: plusData });
        if (semanaDay == 6) {
            // Al finnzalizar la semana agragamos sus respectivos dias
            auxWeek.push({
                days: [...days],
                start,
            });
            start = 1;
            days = [];
        }
    }
    if (days.length > 0) {
        auxWeek.push({
            days: [...days],
        });
    }

    // console.log(auxWeek);
    return auxWeek;
});
</script>

<template>
    <div class="w-full calendar">
        <div
            class="grid grid-cols-7 gap-[5px] text-center text-gris-900 text-[13px] font-bold uppercase"
        >
            <div v-for="diaText in diasText" :key="diaText">
                {{ diaText }}
            </div>
        </div>
        <div class="grid grid-rows-[7] gap-[5px]">
            <!-- Weeks -->
            <div
                class="grid grid-cols-7 gap-[5px] text-center text-[14px] font-normal text-[#1A1E3A]"
                v-for="(week, indexWeek) in weeks"
                :key="indexWeek"
            >
                <!-- Days -->
                <div
                    v-for="(day, dayIndex) in week.days"
                    :key="dayIndex"
                    :class="{ ['col-start-' + week.start]: dayIndex == 0 }"
                >
                    {{ day.dayText }}
                    <!-- Special Days -->
                    <div
                        v-for="(data, indexData) in day.plusData"
                        :key="dayIndex + '-' + indexData"
                    >
                        <div
                            @click="$emit('onSpecialDays', data)"
                            class="w-full my-1 px-1 py-1 rounded-lg text-white text-[13px] font-semibold text-ellipsis overflow-hidden"
                            :style="{ 'background-color': data.color }"
                        >
                            <span class="py-1 cursor-pointer"
                                >${{ data.title }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
