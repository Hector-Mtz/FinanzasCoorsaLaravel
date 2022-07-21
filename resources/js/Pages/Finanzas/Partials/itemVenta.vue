<script setup>
import { computed, ref } from "vue";
import { formatoMoney, IVA } from "../../../utils/coversiones";

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
        console.log(auxVenta)
        const totalIva = auxVenta.cantidad * IVA;
        auxVenta.iva = formatoMoney(totalIva);
        auxVenta.sub_total = formatoMoney(auxVenta.cantidad - totalIva);
    } else {
        auxVenta.iva = "";
        auxVenta.sub_total = "";
    }
    auxVenta.cantidad = formatoMoney(auxVenta.cantidad.toFixed(2));

    return auxVenta;
});

</script>
<template>
    <tr>
        <td>{{ ventaShow.ceco }}</td>
        <td>
            <div @click="ivaChecked = !ivaChecked" class="h-5 px-2 mx-2 bg-yellow-600 hover:bg-yellow-500 rounded-xl">
                <svg v-if="ivaChecked" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </td>
        <td>${{ ventaShow.iva }}</td>
        <td>${{ ventaShow.sub_total }}</td>
        <td>${{ ventaShow.cantidad }}</td>
    </tr>
</template>

