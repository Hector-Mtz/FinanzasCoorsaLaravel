<script setup>
import { computed } from "vue";
const emit = defineEmits(["update:checked"]);

const props = defineProps({
    cliente: {
        type: Object,
        required: true,
    },
    checked: {
        type: [Array, Boolean],
        default: false,
    },
    total: {
        type: Number,
        default: 0,
    },
});

const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit("update:checked", val);
    },
});
</script>
<template>
    <div class="text-fuente-500">
        <div class="relative">
            <input
                class="absolute z-10 w-full h-4 opacity-0 cursor-pointer top-1"
                type="checkbox"
                :id="'check-' + cliente.id"
                v-model="proxyChecked"
            />
            <header
                class="flex items-center justify-between cursor-pointer select-none tab-label"
                :for="'check-' + cliente.id"
            >
                <span class="uppercase text-xs font-light">
                    {{ props.cliente.nombre }}
                </span>
                <div class="flex items-center justify-self-end">
                    <div
                        class="px-1 text-sm bg-aqua-500 w-12 text-center rounded-full text-white"
                    >
                        {{ total }}
                    </div>
                    <div class="flex items-center justify-center w-7 h-7">
                        <!-- icon by feathericons.com -->
                        <svg
                            aria-hidden="true"
                            class=""
                            data-reactid="266"
                            fill="none"
                            height="24"
                            stroke="#58BFB9"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewbox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </header>
            <div class="overflow-y-auto tab-content">
                <div class="px-1 pb-5">
                    <slot> </slot>
                </div>
            </div>
        </div>
    </div>
</template>
