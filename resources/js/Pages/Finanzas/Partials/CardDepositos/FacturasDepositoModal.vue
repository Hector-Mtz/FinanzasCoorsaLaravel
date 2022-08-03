<script setup>
import { computed, ref, watch } from 'vue';
import { Inertia } from '@inertiajs/inertia';

import ButtonAdd from '@/Components/ButtonAdd.vue';
import DialogModal from '@/Components/DialogModal.vue';
import TableComponent from '@/Components/Table.vue';
import ListDataInput from '@/Components/ListDataInput.vue';
import JetInputError from '@/Jetstream/InputError.vue';
import ItemFacturaDeposito from './ItemFacturaDeposito.vue';
import { formatoMoney } from '../../../../utils/conversiones';

const emit = defineEmits(["close", "addFactura", "updateDepositos"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    deposito: {
        type: Object,
        required: true
    },
})

const listFacturas = ref([])
const textFactura = ref("");
const facturaIdAdd = ref("")


// ocs del catalogo disponible
const getFacturas = async () => {
    const resp = await axios.get(route('facturas.catalogos'));
    listFacturas.value = resp.data;//ocs del catalogo disponible
}
const deleteFactura = (indexFactura) => {
    axios.delete(route('ingresos.facturas.destroy', props.deposito.id), {
        params: {
            factura_id: props.deposito.facturas[indexFactura].id
        }
    })
        .then(() => {
            props.deposito.error = "";
            props.deposito.facturas.splice(indexFactura, 1);
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            });
            emit('updateDepositos');
        }).catch(error => {
            if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('message')) {
                props.deposito.error = error.response.data.message
            } else {
                props.deposito.error = "Error DELETE OC"
            };
        });
}

const addFactura = () => {
    if (facturaIdAdd.value !== "") {
        props.deposito.error = ""
        const form = {
            factura_id: facturaIdAdd.value,
            deposito_id: props.deposito.id
        }
        textFactura.value = "";
        emit("addFactura", form);
    } else {
        props.deposito.error = "FACTURA INVALIDA"
    }
}

const totalFacturas = computed(() => {
    let total = 0;
    props.deposito.facturas.forEach(fact => {
        total += fact.cantidad;
    });
    return total;
})


const close = () => {
    listFacturas.value = [];
    props.deposito.error = ""
    facturaIdAdd.value = ""
    emit('close');
};

watch(props, () => {
    if (props.show == true) {
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
                        #{{ props.deposito.nombre }}
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex justify-center">

                    </div>
                    <div class="flex justify-between">
                        <span class="font-bold text-center text-gray-300 ">
                            Cantidad: {{ formatoMoney(props.deposito.cantidad) }}
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
                            <h3 class="mb-1">FACTURAS</h3>
                            <div class="flex flex-row justify-center">
                                <ListDataInput class="w-50" v-model="facturaIdAdd" :value="textFactura"
                                    list="facturas-catalogo" name-option="referencia" :options="listFacturas" />
                                <ButtonAdd class="ml-1 h-7" @click="addFactura()" />
                            </div>
                            <JetInputError :message="props.deposito.error" class="mt-2" />
                        </th>
                        <th>CANTIDAD <br />${{ totalFacturas }}</th>
                        <th>FECHA</th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemFacturaDeposito v-for="(factura, index) in props.deposito.facturas" :key="factura.referencia"
                        :factura="factura" @remove="deleteFactura(index)" />
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
