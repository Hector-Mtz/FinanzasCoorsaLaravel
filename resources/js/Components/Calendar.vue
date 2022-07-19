<script setup>
import { ref, computed } from 'vue'
import { listDaysSem } from '../data/calendar';


const props = defineProps({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        default: 2022
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
    for (let i = 1; i <= lastDay; i++) { // i reresenta el dia
        fechaInicial.setDate(i)
        semanaDay = fechaInicial.getDay()
        if (i == 1) {
            start = semanaDay + 1;
        }
        days.push(i);
        if (semanaDay == 6) {
            if (auxWeek.length !== 0) {
                start = 1
            }
            auxWeek.push({
                days: [...days],
                start
            });
            days = [];
        }
    }
    if (days.length > 0) {
        auxWeek.push({
            days: [...days],
        });
    }

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
            <div class="grid-calendar" v-for="(week, indexWeek) in weeks" :key="indexWeek">
                <div v-for="(day, dayIndex) in week.days" :key="indexWeek + '' + day"
                    :class="{ ['col-start-' + week.start]: dayIndex == 0 }">
                    {{ day }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.grid-calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 20px;
}

.grid-calendar-week {
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    gap: 20px;
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
