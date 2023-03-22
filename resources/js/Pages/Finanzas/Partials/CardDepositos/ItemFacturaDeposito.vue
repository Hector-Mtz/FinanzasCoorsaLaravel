<script setup>
import { formatoMoney } from "../../../../utils/conversiones";
import ModalButton from "@/Components/ModalButton.vue";
import del from "../../../../../img/elementos/eliminar.png";

const emit = defineEmits(["remove"]);
const props = defineProps({
    factura: {
        type: Object,
        required: true,
    },
});
</script>
<template>
    <tr class="text-[18px] font-light">
        <td class="px-2 pt-2">#{{ props.factura.referencia }}</td>
        <td class="px-2 pt-2">${{ formatoMoney(props.factura.cantidad) }}</td>
        <td class="px-2 pt-2">{{ props.factura.fechaDePago }}</td>
        <td class="px-2 pt-2">
            <ModalButton
                v-if="$page.props.can['deposito.factura.delete']"
                @click="emit('remove')"
                class="px-1 py-0"
            >
                <img :src="del" alt="" />
            </ModalButton>
        </td>
    </tr>
</template>
