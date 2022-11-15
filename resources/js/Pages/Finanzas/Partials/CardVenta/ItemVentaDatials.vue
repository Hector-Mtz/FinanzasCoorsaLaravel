<script setup>
import { computed, ref } from "vue";
import { formatoMoney, IVA } from "../../../../utils/conversiones";
import SuccessButton from "@/Components/SuccessButton.vue";
import DangerButton from "@/Components/DangerButton.vue";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-vue3";
const emit = defineEmits(['edit', 'activeIva'])

const props = defineProps({
    venta: {
        type: Object,
        required: true
    },
})
const ivaChecked = ref(props.venta.iva);

const ventaShow = computed(() => {
    const auxVenta = { ...props.venta };
    if (ivaChecked.value) {
        const totalIva = auxVenta.sub_total * IVA;
        auxVenta.iva = formatoMoney(totalIva.toFixed(2));
        auxVenta.total = formatoMoney((auxVenta.sub_total + totalIva).toFixed(2));

    } else {
        auxVenta.iva = "";
        auxVenta.total = formatoMoney(auxVenta.sub_total.toFixed(2));
    }
    auxVenta.sub_total = formatoMoney(auxVenta.sub_total.toFixed(2));

    return auxVenta;
});

const isEditable = computed(() => {
    return props.venta.status_id == 1;
})

const activeIva = () => {
    if (isEditable) {
        ivaChecked.value = !ivaChecked.value
        emit('activeIva', props.venta.id);
    }
}

const eliminarVenta = (id) => {
    Inertia.delete(route("ventas.destroy", id));
}

</script>
<template>
    <tr>
        <td>{{ ventaShow.ceco + "-" + ventaShow.servicio }}</td>
        <td>{{ ventaShow.comentario }}</td>
        <td>
            <div @click="activeIva()" class="w-10 h-5 px-2 mx-2 bg-yellow-600 hover:bg-yellow-500 rounded-xl">
                <svg v-if="ivaChecked" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </td>
        <td>${{ ventaShow.sub_total }}</td>
        <td>${{ ventaShow.iva }}</td>
        <td>${{ ventaShow.total }}</td>
        <td>{{ ventaShow.fechaInicial }}</td>
        <td v-if="$page.props.can['ventas.edit']">
            <SuccessButton v-if="isEditable" @click="emit('edit', props.venta)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </SuccessButton>
        </td>
        <td v-if="$page.props.can['ventas.delete']">
            <DangerButton v-if="isEditable" @click="eliminarVenta(ventaShow.id)">
                <svg width="20" xmlns="http://www.w3.org/2000/svg" height="20" style="fill:white" viewBox="0 0 96 96"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path
                        d="m24,78c0,4.968 4.029,9 9,9h30c4.968,0 9-4.032 9-9l6-48h-60l6,48zm33-39h6v39h-6v-39zm-12,0h6v39h-6v-39zm-12,0h6v39h-6v-39zm43.5-21h-19.5c0,0-1.344-6-3-6h-12c-1.659,0-3,6-3,6h-19.5c-2.487,0-4.5,2.013-4.5,4.5s0,4.5 0,4.5h66c0,0 0-2.013 0-4.5s-2.016-4.5-4.5-4.5z" />
                </svg>
            </DangerButton>
        </td>
    </tr>
</template>

