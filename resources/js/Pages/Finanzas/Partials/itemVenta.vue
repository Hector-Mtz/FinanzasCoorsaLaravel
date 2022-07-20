<script setup>
import { computed } from "vue";
import { formatoMoney, IVA } from "../../../utils/coversiones";

const ivaChecked = ref(false);

const props = defineProps({
    venta: {
        type: Object,
        required: true
    }
})
const ventaShow = computed(() => {
    const auxVenta = props.venta;
    auxVenta.total = formatoMoney(auxVenta.total);
    if (ivaChecked) {
        const totalIva = auxVenta.total * IVA;
        auxVenta.iva = formatoMoney(totalIva);
        auxVenta.sub_total = formatoMoney(auxVenta.total - totalIva);
    } else {
        auxVenta.iva = "";
        auxVenta.sub_total = "";
    }

    return auxVenta;
});

</script>
<template>
    <tr>
        <td>{{ ventaShow.ceco }}</td>
        <td>
            <div @click="ivaChecked = !ivaChecked" class="px-2 py-1 mx-2 bg-yellow-600 rounded-xl">
                <svg v-if="ivaChecked" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </td>
        <td>{{ ventaShow.iva }}</td>
        <td>{{ ventaShow.sub_total }}</td>
        <td>{{ ventaShow.total }}</td>
    </tr>
</template>

