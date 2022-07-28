<script setup>
import { ref } from 'vue';
import { listMonths } from '../data/calendar';



const emit = defineEmits("changeDate");

defineProps({
    type: {
        type: String,
        default: 'button',
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

//Show month text
const monthText = ref(listMonths);


const changeIndexMes = (newMonth) => {
    let newDate = { month: 0, year: props.year };
    switch (newMonth) {
        case 12:
            newDate.month = 0
            newDate.year = props.year + 1
            break;
        case -1:
            newDate.month = 11;
            newDate.year = props.year - 1
            break;
        default:
            newDate.month = newMonth;
    }
    emit("changeDate", newDate);

}
const changeYear = (newYear) => {
    emit("changeDate", { month: props.month, year: newYear });
}


</script>

<template>
    <div id="pickerCalendar">
        <div class="picker-year">

        </div>
        <div class="picker-month">
            <div class="grid-months">
                <div v-for="(month, index) in monthText" :key="month" @click="changeIndexMes(index)">
                    {{ month }}
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
#pickerCalendar {
    background-color: #425A78;
    border-radius: 0.8rem;
    color: white;
    width: 20em;
}

.picker-month {
    width: 100%;
    padding: 10px 20px;
}

.grid-months {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
}
</style>
