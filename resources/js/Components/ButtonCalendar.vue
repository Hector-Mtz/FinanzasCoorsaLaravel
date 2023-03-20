<script setup>
import { ref } from "vue";
import { listMonths } from "../data/calendar";
import PickerCalendar from "./PickerCalendar.vue";


const emit = defineEmits(["changeDate"]);
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
const buttonCalendar = ref(null)


</script>

<template>
    <PickerCalendar @changeDate="emit('changeDate', $event)" :refComponent="buttonCalendar" :month="props.month"
        :year="props.year">
        <template #trigger>
            <div class="w-36">
                <button ref="buttonCalendar" :type="type"
                    class="items-center inline-block w-full px-4 py-2 text-xs font-semibold uppercase transition border border-blue-800 text-fuente-500 rounded-2xl hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 ring-button disabled:opacity-25">
                    <slot />
                    {{ monthText[month] }} {{ year }}
                </button>
            </div>
        </template>
    </PickerCalendar>
</template>
