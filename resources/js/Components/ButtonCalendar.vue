<script setup>
import { ref } from "vue";
import PickerCalendar from "./PickerCalendar.vue";

const emit = defineEmits(["changeDate"]);
const props = defineProps({
    type: {
        type: String,
        default: "button",
    },
    year: {
        type: Number,
        required: true,
    },
});
const buttonCalendar = ref(null);
</script>

<template>
    <PickerCalendar
        @changeDate="emit('changeDate', $event)"
        :refComponent="buttonCalendar"
        :year="props.year"
    >
        <template #trigger>
            <div class="">
                <button
                    ref="buttonCalendar"
                    :type="type"
                    class="items-center w-full px-4 py-2 text-[15px] font-semibold uppercase transition text-fuente-500 rounded-2xl bg-gris-500 disabled:opacity-25 flex justify-between gap-4"
                >
                    <slot name="a" />
                    {{ year }}
                    <slot name="b" />
                </button>
            </div>
        </template>
    </PickerCalendar>
</template>
