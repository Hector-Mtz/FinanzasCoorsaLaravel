<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { listMonths } from '../data/calendar';
import ItemMonth from './ItemMonth.vue';



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
    },
    refComponent: {
        type: null,
        required: true,
    }

});

//Show month text
const monthText = ref(listMonths);
const pickerCalendar = ref(null);
const divSlot = ref(null);
let open = ref(false);

const closeOnEscape = (e) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));


onMounted(() => {
    const x = divSlot.value.offsetLeft - (pickerCalendar.value.clientWidth / 2) + (divSlot.value.clientWidth / 2);
    const y = divSlot.value.offsetTop + 45;
    pickerCalendar.value.style.top = `${y}px`;
    pickerCalendar.value.style.left = `${x}px`;
});


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
    <div>
        <div ref="divSlot" @click="open = !open">
            <slot name="trigger" />
        </div>
        <!-- Full Screen Dropdown Overlay -->
        <div v-show="open" class="fixed inset-0 z-40" @click="open = false" />
        <teleport to="body">
            <div id="pickerCalendar" ref="pickerCalendar">
                <transition leave-active-class="duration-200">
                    <div v-show="open">
                        <div class="picker-year">
                            <svg @click="changeYear(props.year - 1)" xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-4 hover:opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span class="text-sm item-picker active-picker">
                                {{ props.year }}
                            </span>
                            <svg @click="changeYear(props.year + 1)" xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-4 hover:opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div class="picker-month">
                            <div class="grid-months">
                                <ItemMonth v-for="(mText, index) in monthText" :key="mText"
                                    @click="changeIndexMes(index)" :current-month="props.month" :month="index">
                                    {{ mText }}
                                </ItemMonth>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </teleport>
    </div>

</template>
<style scoped>
#pickerCalendar {
    background-color: #425A78;
    border-radius: 0.8rem;
    color: white;
    width: 20em;
    position: absolute;
    z-index: 1000;
}

.picker-year {
    display: flex;
    justify-content: center;
    padding: 5px 5px;
    margin: 0px 10px;
    border-bottom: 4px solid #687FA4;
    align-items: center;
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
