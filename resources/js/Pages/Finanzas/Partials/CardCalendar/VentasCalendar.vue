<script setup>
import CalendarHeader from '@/Components/CalendarHeader.vue';
import Calendar from '@/Components/Calendar.vue';

const emit = defineEmits(['changeDate'])

const props = defineProps({
    date: { month: Number, year: Number }
});
</script>
<template>
    <div class="mx-4">
        <CalendarHeader class="mb-4 text-white" :month="props.date.month" :year="props.date.year"
            @change-date="emit('changeDate', $event)" />
        <Calendar :month="props.date.month" :year="props.date.year" class="text-white">
        </Calendar>
    </div>
</template>
<style lang="scss" scoped>
</style>
