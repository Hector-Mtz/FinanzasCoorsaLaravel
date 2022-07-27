<script setup>
import { ref } from "vue";
import { listMonths } from "../data/calendar";
import PickerCalendar from "./PickerCalendar.vue";


const props = defineProps({
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
const monthText = ref(listMonths);
</script>

<template>
    <div>
        <button :type="type"
            class="inline-flex items-center px-4 py-2 text-xs font-semibold text-white uppercase transition border border-blue-800 rounded-2xl hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-gray-300 disabled:opacity-25">
            <slot />
            {{ monthText[month] }} {{ year }}
        </button>
        <PickerCalendar :month="props.month" :year="props.year" />
    </div>
</template>
