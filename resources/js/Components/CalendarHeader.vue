<script setup>
import { ref } from "vue";
import { listMonths } from "../data/calendar";

const emit = defineEmits(["changeDate"]);

const props = defineProps({
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        default: 2022,
    },
});

const mesTest = ref(listMonths);

const changeIndexMes = (newMonth) => {
    let newDate = { month: 0, year: props.year };
    switch (newMonth) {
        case 12:
            newDate.month = 0;
            newDate.year = props.year + 1;
            break;
        case -1:
            newDate.month = 11;
            newDate.year = props.year - 1;
            break;
        default:
            newDate.month = newMonth;
    }
    emit("changeDate", newDate);
};
</script>
<template>
    <div class="flex justify-center px-4 py-1">
        <div class="flex gap-2 items-center justify-between w-full">
            <button @click="changeIndexMes(month - 1)" class="hover:opacity-40">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#1D96F1"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <h2 class="text-[17px] font-semibold uppercase">
                {{ mesTest[month] }}
            </h2>
            <button @click="changeIndexMes(month + 1)" class="hover:opacity-40">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#1D96F1"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>
