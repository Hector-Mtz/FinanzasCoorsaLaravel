<script setup>
import { formatoMoney } from "../../../../utils/conversiones";
import SuccessButton from "@/Components/SuccessButton.vue";

const emit = defineEmits(['edit'])
const props = defineProps({
    oc: {
        type: Object,
        required: true
    }
})


</script>
<template>
    <tr>
        <td>#{{ props.oc.nombre }}</td>
        <td>${{ formatoMoney(props.oc.cantidad) }}</td>
        <td>{{ props.oc.fecha_alta }}</td>
        <td>
            <SuccessButton @click="emit('edit', props.oc)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </SuccessButton>
        </td>
    </tr>
</template>

