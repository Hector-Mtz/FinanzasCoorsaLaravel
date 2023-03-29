<script setup>
import DangerButton from "@/Components/DangerButton.vue";
import ItemObjectShow from "@/Components/ItemObjectShow.vue";
import { formatoMoney } from "../../../../utils/conversiones";

const emit = defineEmits(["onShow"]);

const props = defineProps({
    ingreso: {
        type: Object,
        required: true,
    },
});
</script>
<template>
    <tr class="text-[10.5px] text-fuente-500 font-normal">
        <td class="px-2 py-1 break-all">#{{ ingreso.nombre }}</td>
        <td class="px-2 py-1">
            ${{ formatoMoney(ingreso.cantidad) }}
        </td>
        <td class="px-2 py-1">
            <DangerButton class="h-5" @click="emit('onShow', props.ingreso)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
            </DangerButton>
        </td>
    </tr>
</template>
