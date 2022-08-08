<script setup>
import { watch, ref, computed } from 'vue';
const emit = defineEmits(['loadPage'])
const props = defineProps({
    pagination: Object,
})

const page = ref(props.pagination.current_page);
const current_page = computed(() => {
    return props.pagination.current_page
})
watch(current_page,
    (newPage) => {
        page.value = newPage;
    }
);

const noPreviousPage = computed(() =>
    props.pagination.current_page - 1 <= 0
);
const noNextPage = computed(() =>
    props.pagination.current_page + 1 > props.pagination.last_page
);


</script>

<template>
    <div class="inline-flex items-center justify-center px-1">
        <div class="hidden mr-2 text-xs text-gray-500 lg:block">{{ pagination.total }} elementos</div>

        <div class="flex space-x-1 items-top" v-if="pagination.last_page > 1">
            <button :disabled="noPreviousPage" :class="{ 'opacity-10': noPreviousPage }" @click="$emit('loadPage', 1)"
                class="inline-flex items-center justify-center text-xs text-gray-500 bg-gray-900 border border-gray-200 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
            </button>
            <button :disabled="noPreviousPage" :class="{ 'opacity-10': noPreviousPage }"
                @click="$emit('loadPage', pagination.current_page - 1)"
                class="inline-flex items-center justify-center text-gray-500 bg-gray-900 border border-gray-200 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-1">
                <input type="number" @keydown.enter="$emit('loadPage', page)" v-model="page"
                    class="w-5 h-6 px-2 text-xs text-center bg-transparent border border-gray-900 rounded sm:h-6 sm:w-10 focus:ring-blue-500 focus:border-blue-500" />
                <div class="px-2 text-xs text-gray-600">de {{ pagination.last_page }}</div>
            </div>

            <button :disabled="noNextPage" :class="{ 'opacity-10': noNextPage }"
                @click="$emit('loadPage', pagination.current_page + 1)"
                class="inline-flex items-center justify-center text-gray-500 bg-gray-900 border border-gray-300 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <button :disabled="noNextPage" :class="{ 'opacity-10': noNextPage }"
                @click="$emit('loadPage', pagination.last_page)"
                class="inline-flex items-center justify-center text-gray-500 bg-gray-900 border border-gray-300 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</template>


