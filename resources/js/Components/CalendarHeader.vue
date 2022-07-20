<script setup>
import { ref } from 'vue';
import { listMonths } from '../data/calendar';


const emit = defineEmits(['changeDate']);

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

const mesTest = ref(listMonths);

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


</script>
<template>
    <div class="flex justify-between px-4">
        <h1> Calendario</h1>
        <div class="flex gap-2 ">
            <button @click="changeIndexMes(month - 1)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                </svg>
            </button>
            <h2>{{ mesTest[month] }}</h2>
            <button @click="changeIndexMes(month + 1)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                    <path
                        d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                </svg>
            </button>
        </div>
    </div>
</template>

