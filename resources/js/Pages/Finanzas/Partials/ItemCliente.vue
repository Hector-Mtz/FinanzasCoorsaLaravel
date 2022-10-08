<script setup>
import { computed } from 'vue';
const emit = defineEmits(['update:checked']);

const props = defineProps({
    cliente: {
        type: Object,
        required: true
    },
    checked: {
        type: [Array, Boolean],
        default: false,
    },
    total: {
        type: Number,
        default: 0
    }

})

const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit('update:checked', val);
    },
});


</script>
<template>
    <div class="text-white border-b border-white">
        <div class="relative border-l-2 border-transparent">
            <input class="absolute z-10 w-full h-8 opacity-0 cursor-pointer top-1" type="checkbox"
                :id="'check-'+cliente.id" v-model="proxyChecked">
            <header class="flex items-center justify-between cursor-pointer select-none tab-label"
                :for="'check-'+cliente.id">
                <span class="font-bold uppercase text-md">
                    {{ props.cliente.nombre }}
                </span>
                <div class="flex items-center">
                    <div class="px-1 text-sm bg-blue-300 rounded-full">
                        {{total}}
                    </div>
                    <div class="flex items-center justify-center w-7 h-7">
                        <!-- icon by feathericons.com -->
                        <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#606F7B"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24"
                            width="24" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="6 9 12 15 18 9">
                            </polyline>
                        </svg>
                    </div>
                </div>
            </header>
            <div class="overflow-y-auto tab-content">
                <div class="px-1 pb-5">
                    <slot>

                    </slot>
                </div>
            </div>
        </div>


    </div>
</template>


