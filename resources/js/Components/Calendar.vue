<script setup>
import { ref, computed } from 'vue'
import { listDaysSem } from '../data/calendar';


defineEmits(['onSpecialDays']);

const props = defineProps({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        default: 2022
    },
    specialDays: {
        type: Object,
        default: [],
    }
});


const diasText = ref(listDaysSem)
const weeks = computed(() => {
    const fechaInicial = new Date(props.year, props.month);
    let days = [];
    let semanaDay = 0;
    let start = 0;
    const auxWeek = [];
    const lastDay = new Date(props.year, props.month + 1, 0).getDate();
    for (let day = 1; day <= lastDay; day++) { // i reresenta el dia
        fechaInicial.setDate(day)
        semanaDay = fechaInicial.getDay()
        if (start === 0) { // esto es para recorrer los dias (unicamente lo deberia realizar la primvera vez)
            start = semanaDay + 1;// ya que empieza en 0
        }
        let plusData = [] // data adicional a los dias
        props.specialDays.forEach(specialDay => {
            if (specialDay.data[day] !== undefined) {
                plusData.push({
                    ...specialDay,
                    date: day + '/' + (props.month + 1) + '/' + props.year,
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
        if (semanaDay == 6) { // Al finnzalizar la semana agragamos sus respectivos dias
            auxWeek.push({
                days: [...days],
                start
            });
            start = 1
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
})


</script>

<template>
    <div class="w-full calendar">
        <div class="grid-calendar">
            <div v-for="diaText in diasText" :key="diaText">
                {{ diaText }}
            </div>
        </div>
        <div class="grid-calendar-week">
            <!-- Weeks -->
            <div class="grid-calendar" v-for="(week, indexWeek) in weeks" :key="indexWeek">
                <!-- Days -->
                <div v-for="(day, dayIndex) in week.days" :key="dayIndex"
                    :class="{ ['col-start-' + week.start]: dayIndex == 0 }">
                    {{ day.dayText }}
                    <!-- Special Days -->
                    <div v-for="(data, indexData) in day.plusData" :key="dayIndex + '-' + indexData">
                        <div @click="$emit('onSpecialDays', data)" class="w-full my-1 rounded-lg"
                            :style="{ 'background-color': data.color }">
                            <span class="py-1 cursor-pointer text-fuente-500">{{ data.title }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.grid-calendar-week {
    display: grid;
    grid-template-rows: repeat(7, auto);
    row-gap: 5px;
}

.grid-calendar {

    text-align: center;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: 5px;
}

.col-start-1 {
    grid-column-start: 1;
}

.col-start-2 {
    grid-column-start: 2;
}

.col-start-3 {
    grid-column-start: 3;
}

.col-start-4 {
    grid-column-start: 4;
}

.col-start-5 {
    grid-column-start: 5;
}

.col-start-6 {
    grid-column-start: 6;
}

.col-start-7 {
    grid-column-start: 7;
}
</style>
