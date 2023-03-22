<script setup>
import { formatoMoney } from "../../../../utils/conversiones";
import DangerButton from "@/Components/DangerButton.vue";

const emit = defineEmits(["remove"]);
const props = defineProps({
    oc: {
        type: Object,
        required: true,
    },
});
</script>
<template>
    <tr class="text-[18px] font-light">
        <td>
            <DangerButton
                v-if="$page.props.can['facturas.oc.delete']"
                @click="emit('remove')"
                class="px-1 py-0"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="w-3 h-3"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                    />
                </svg>
            </DangerButton>
            #{{ props.oc.nombre }}
        </td>
        <td>${{ formatoMoney(props.oc.cantidad) }}</td>
        <td>{{ props.oc.created_at }}</td>
    </tr>
</template>
