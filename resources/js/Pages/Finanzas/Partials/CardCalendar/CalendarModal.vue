<script setup>
import { Inertia } from '@inertiajs/inertia';

import DialogModal from '@/Components/DialogModal.vue';
import TableComponent from '@/Components/Table.vue';

const emit = defineEmits(["close", "addOc"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    dataCalendar: {
        type: Object,
        required: true
    },
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
                    <span class="block font-bold text-center text-white uppercase">
                        {{ dataCalendar.serie }}
                    </span>
                </div>
                <div class="px-4 py-1 border-gray-600">
                    <span class="block font-bold text-center text-white uppercase">
                        {{ dataCalendar.date }}
                    </span>
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>

                    <tr>
                        <th>
                        </th>
                        <th>
                            Cantidad
                        </th>
                    </tr>
                </template>
                <template #tbody>
                    <tr v-for="(obj, index) in dataCalendar.data" :key="index">
                        <td>
                            {{ obj.nombre }}
                        </td>
                        <td>
                            ${{ obj.total }}
                        </td>
                    </tr>
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
