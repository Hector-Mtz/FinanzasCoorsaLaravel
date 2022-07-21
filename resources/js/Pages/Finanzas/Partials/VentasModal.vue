<script setup>
import DialogModal from '../../../Components/DialogModal.vue';
import ButtonAdd from '../../../Components/ButtonAdd.vue';
import TableComponent from '../../../Components/Table.vue';
import ItemVenta from './itemVenta.vue';

const emit = defineEmits(["close", "showAddVenta"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    ventas: {
        type: Object,
        required: true
    }
})


const close = () => {
    emit('close');
};

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row">
                <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
                    <span class="block font-bold text-center text-white">
                        Ventas
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex justify-center">
                        <ButtonAdd @click="emit('showAddVenta')" class="text-sm text-white h-7">
                            Agregar
                        </ButtonAdd>
                    </div>
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr>
                        <th>CLIENTE</th>
                        <th>IVA</th>
                        <th>TOTAL IVA</th>
                        <th>SUBTOTAL</th>
                        <th>TOTAL</th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemVenta v-for="(venta, index) in props.ventas" :key="venta.id + '' + index" :venta="venta" />
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
