<script setup>
import { ref, watch } from 'vue';

import ButtonAdd from '@/Components/ButtonAdd.vue';
import DialogModal from '@/Components/DialogModal.vue';
import TableComponent from '@/Components/Table.vue';
import ItemFacturaDetails from './ItemFacturaDetails.vue';
import FormFacturaModal from './FormFacturaModal.vue';

const emit = defineEmits(["close", "addFactura", "addOc"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    facturas: {
        type: Object,
        required: true,
    }
});
const showingFormFactura = ref(false);
const factura = ref({});
const typeForm = ref("create");
const listOcs = ref([]);

// MODALS FUNCITON
const showFormFactura = (facturaSelect) => {
    if (facturaSelect === undefined) {
        typeForm.value = "create"
    } else {
        typeForm.value = "update"
        factura.value = facturaSelect
    }
    showingFormFactura.value = true
}



// EN MODALS FUNCTION
//ocs del catalogo disponible
const getOcs = async () => {
    const resp = await axios.get(route('ocs.catalogos'));
    listOcs.value = resp.data;//ocs del catalogo disponible
}

const deleteFactura = (facturaSelected) => {
    const facturaIndex = props.facturas.findIndex(facturaFind => {
        return facturaFind.id === facturaSelected.id;
    })
    axios.delete(route('facturas.destroy', facturaSelected.id))
        .then(() => {
            emit('addFactura');
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            })
        }).catch(error => {
            console.log(error);
            if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('message')) {
                alert(error.response.data.message)
            } else {
                alert("ERROR DELETE FACTURA");
            }
        })
}





const close = () => {
    emit('close');
};

watch(props, () => {
    if (props.show) {
        getOcs();
    }
})

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row">
                <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
                    <span class="block font-bold text-center text-white">
                        Facturas
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
                            <ButtonAdd v-if="$page.props.can['facturas.create']" class="h-5"
                                @click="showFormFactura()" />
                        </th>
                        <th>CANTIDAD</th>
                        <th>TOTAL OCS</th>
                        <th>OCS</th>
                        <th>FECHA</th>
                        <th v-if="$page.props.can['facturas.edit']"></th>
                        <th v-if="$page.props.can['facturas.delete']"></th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemFacturaDetails v-for="(factura, index) in props.facturas" :key="factura.id + '' + index"
                        :factura="factura" :ocs="listOcs" @edit="showFormFactura($event)"
                        @delete="deleteFactura($event)" @addOc="emit('addOc', $event)" />
                </template>
            </TableComponent>
            <!-- MODALS -->
            <FormFacturaModal :show="showingFormFactura" :type-form="typeForm" :factura="factura"
                @add-factura="emit('addFactura')" @edit-factura="emit('addFactura')"
                @close="showingFormFactura = false" />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
