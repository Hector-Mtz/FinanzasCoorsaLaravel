<script setup>
import { computed, ref } from "vue";
import { formatoMoney, IVA } from "../../../utils/conversiones";
import SuccessButton from "../../../Components/SuccessButton.vue";

const emit = defineEmits(['edit'])
const ivaChecked = ref(false);

const props = defineProps({
    venta: {
        type: Object,
        required: true
    }
})
const ventaShow = computed(() => {
    const auxVenta = { ...props.venta };
    if (ivaChecked.value) {
        const totalIva = (auxVenta.total * IVA).toFixed(2);
        auxVenta.iva = formatoMoney(totalIva);
        auxVenta.sub_total = formatoMoney(auxVenta.total - totalIva);
    } else {
        auxVenta.iva = "";
        auxVenta.sub_total = "";
    }
    auxVenta.total = formatoMoney(auxVenta.total.toFixed(2));

    return auxVenta;
});

</script>
<template>
    <tr>
        <td>{{ ventaShow.ceco + "-" + ventaShow.nombre }}</td>
        <td>
            <div @click="ivaChecked = !ivaChecked"
                class="w-10 h-5 px-2 mx-2 bg-yellow-600 hover:bg-yellow-500 rounded-xl">
                <svg v-if="ivaChecked" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </td>
        <td>${{ ventaShow.iva }}</td>
        <td>${{ ventaShow.sub_total }}</td>
        <td>${{ ventaShow.total }}</td>
        <td>
            <SuccessButton v-if="ventaShow.status_id == 1" @click="emit('edit', props.venta)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </SuccessButton>
        </td>
    </tr>
</template>

