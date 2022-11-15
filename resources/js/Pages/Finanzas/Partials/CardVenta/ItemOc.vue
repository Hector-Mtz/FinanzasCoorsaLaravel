<script setup>
import { formatoMoney } from "../../../../utils/conversiones";
import SuccessButton from "@/Components/SuccessButton.vue";
import DangerButton from "@/Components/DangerButton.vue";

const emit = defineEmits(['edit', 'delete'])
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
        <td v-if="$page.props.can['ocs.edit']">
            <SuccessButton @click="emit('edit', props.oc)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </SuccessButton>
        </td>
        <td v-if="$page.props.can['ocs.delete']">
            <DangerButton @click="emit('delete', props.oc)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3 h-3" viewBox="0 0 16 16">
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
            </DangerButton>
        </td>
    </tr>
</template>

