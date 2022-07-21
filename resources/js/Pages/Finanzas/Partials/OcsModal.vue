<script setup>
import { computed } from 'vue';

import ButtonAdd from '../../../Components/ButtonAdd.vue';
import DialogModal from '../../../Components/DialogModal.vue';
import ItemVenta from './itemVenta.vue';
import TableComponent from '../../../Components/Table.vue';

const emit = defineEmits(["close", "showAddVenta"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    venta: {
        type: Object,
        required: true
    },
})

const title = computed(() => {
    switch (props.venta) {
        case "1":
            return "Por Pagar"
        case "2":
            return "Cerrado"
        default:
            return "Por Pagar"
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
                        {{ title }}
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex justify-center">
                        <span class="block font-bold text-center text-gray-300">
                            Agregar
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr>
                        <th>
                            <h3 class="mb-1">FACTURA</h3>
                            <ButtonAdd class="h-5" />
                        </th>
                        <th>OC</th>
                        <th>FECHA</th>
                    </tr>
                </template>
                <template #tbody>

                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
