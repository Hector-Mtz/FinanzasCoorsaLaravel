<script setup>
import { ref, watch } from 'vue';

import ButtonAdd from '../../../Components/ButtonAdd.vue';
import DialogModal from '../../../Components/DialogModal.vue';
import TableComponent from '../../../Components/Table.vue';
import FormDepositoModal from './FormDepositoModal.vue';
import ItemDepositoDetails from './ItemDepositoDetails.vue';

const emit = defineEmits(["close", "updateDepositos", "addFactura"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    depositos: {
        type: Object,
        required: true,
    }
});
const showingFormDeposito = ref(false);
const deposito = ref({});
const typeForm = ref("create");
const listFacturas = ref([]);

// MODALS FUNCITON
const showFormDeposito = (depositoSelect) => {
    if (depositoSelect === undefined) {
        typeForm.value = "create"
    } else {
        typeForm.value = "update"
        deposito.value = depositoSelect
    }
    showingFormDeposito.value = true
}

const changeStatus = (depositoChange) => {
    axios.put(route('ingresos.status', depositoChange.id))
        .then((resp) => {
            // Es el mismo ya que reconsulta
            emit("updateDepositos");

        }).catch(error => {
            let message;
            if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('message')) {
                message = error.response.data.message
            } else {
                message = "Error DELETE OC"
            };
            alert(message);
        })
}


// EN MODALS FUNCTION
//Facturas del catalogo disponible
const getFacturas = async () => {
    const resp = await axios.get(route('facturas.catalogos'));
    listFacturas.value = resp.data;//ocs del catalogo disponible
}
const close = () => {
    emit('close');
};

watch(props, () => {
    if (props.show) {
        getFacturas();
    }
})

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row">

                <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
                    <span class="block font-bold text-center text-white">
                        Depositos
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
                            <h3 class="mb-1">Deposito</h3>
                            <ButtonAdd class="h-5" @click="showFormDeposito()" />
                        </th>
                        <th>CANTIDAD</th>
                        <th>FACTURA</th>
                        <th>BANCO</th>
                        <th></th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemDepositoDetails v-for="deposito in depositos" :key="deposito.nombre" :deposito="deposito"
                        :facturas="listFacturas" @edit="showFormDeposito($event)"
                        @add-factura="emit('addFactura', $event)" @change-status="changeStatus($event)" />
                </template>
            </TableComponent>
            <!-- MODALS -->
            <FormDepositoModal :show="showingFormDeposito" :type-form="typeForm" :deposito="deposito"
                @add-deposito="emit('updateDepositos', $event)" @close="showingFormDeposito = false" />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
