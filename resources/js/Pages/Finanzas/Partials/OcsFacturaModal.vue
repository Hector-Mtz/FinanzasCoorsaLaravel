<script setup>
import { computed, ref, watch } from 'vue';

import ButtonAdd from '../../../Components/ButtonAdd.vue';
import DialogModal from '../../../Components/DialogModal.vue';
import TableComponent from '../../../Components/Table.vue';
import ItemOcFactura from './ItemOcFactura.vue';
import ListDataInput from '../../../Components/ListDataInput.vue';
import JetInputError from '@/Jetstream/InputError.vue';

const emit = defineEmits(["close", "addOc"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    factura: {
        type: Object,
        required: true
    },
})

const listOcs = ref([])
const textOcs = ref("");
const ocIdAdd = ref("")


// ocs del catalogo disponible
const getOcs = async () => {
    const resp = await axios.get(route('ocs.catalogos'));
    listOcs.value = resp.data;
}

const deleteOc = (indexOc) => {
    axios.delete(route('facturas.ocs.destroy', props.factura.id), {
        params: {
            oc_id: props.factura.ocs[indexOc].id
        }
    })
        .then(() => {
            const cantidadRest = props.factura.ocs[indexOc].cantidad;
            props.factura.total_ocs = (props.factura.total_ocs - cantidadRest).toFixed(2);
            props.factura.ocs.splice(indexOc, 1);
        }).catch(error => {
            if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('message')) {
                props.factura.error = error.response.data.message
            } else {
                props.factura.error = "Error DELETE OC"
            };
        });
}

const addOc = () => {
    if (ocIdAdd.value !== "") {
        props.factura.error = ""
        const form = {
            oc_id: ocIdAdd.value,
            factura_id: props.factura.id
        }
        textOcs.value = "";
        emit("addOc", form);
    } else {
        props.factura.error = "OC INVALIDO"
    }
}



const close = () => {
    listOcs.value = [];
    props.factura.error = ""
    ocIdAdd.value = ""
    emit('close');
};

watch(props, () => {
    if (props.show == true) {
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
                        #{{ props.factura.referencia }}
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex justify-center">

                    </div>
                    <div class="flex justify-between">
                        <span class="font-bold text-center text-gray-300 ">
                            Total: {{ props.factura.cantidad }}
                        </span>
                        <span class="font-bold text-center text-gray-300 ">
                            Fecha Pago: {{ props.factura.fechaDePago }}
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
                            <h3 class="mb-1">OCS</h3>
                            <div class="flex flex-row justify-center">
                                <ListDataInput class="w-50" v-model="ocIdAdd" :value="textOcs" list="ocs-catalogo"
                                    :options="listOcs" />
                                <ButtonAdd class="ml-1 h-7" @click="addOc()" />
                            </div>
                            <JetInputError :message="props.factura.error" class="mt-2" />
                        </th>
                        <th>CANTIDAD <br /> {{ props.factura.total_ocs }}</th>
                        <th>FECHA</th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemOcFactura v-for="(oc, index) in props.factura.ocs" :key="oc.id" :oc="oc"
                        @remove="deleteOc(index)" />
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
