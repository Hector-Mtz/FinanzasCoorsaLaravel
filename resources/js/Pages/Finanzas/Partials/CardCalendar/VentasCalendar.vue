<script setup>
import CalendarHeader from '@/Components/CalendarHeader.vue';
import Calendar from '@/Components/Calendar.vue';

const emit = defineEmits(['changeDate'])

const props = defineProps({
    date: { month: Number, year: Number }
});
</script>
<template>
    <div class="mx-8">
        <CalendarHeader class=" text-white" :month="props.date.month" :year="props.date.year"
            @change-date="emit('changeDate', $event)" />
        <!-- Interacion -->
        <div class="text-white py-2 border-b-2 border-gray-900">
            <table class="w-full">
                <thead>
                    <tr class="text-center">
                        <td class="w-3/12">
                            VENTAS
                        </td>
                        <td class="w-3/12">
                            PC
                        </td>
                        <td class="w-3/12">
                            PP
                        </td>
                        <td class="w-3/12">
                            C
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center">
                        <td class="p-2">
                            10,000
                        </td>
                        <td class="p-2">
                            5,000
                        </td>
                        <td class="p-2">
                            2,000
                        </td>
                        <td class="p-2">
                            5,000
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- End Interacion -->
        <div class="px-4 py-2">
            <Calendar :month="props.date.month" :year="props.date.year" class="text-white">
            </Calendar>
        </div>
    </div>
</template>
<style lang="scss" scoped>
</style>
