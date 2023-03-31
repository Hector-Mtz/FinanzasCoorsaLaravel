<script setup>
import { ref, watch, reactive } from "vue";
import { pickBy, throttle } from 'lodash'
import { formatoMoney } from "../../../../utils/conversiones";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import ItemOcFactura from "./ItemOcFactura.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import { Inertia } from "@inertiajs/inertia";
import ListDataInputOCS from "../../../../Components/ListDataInputOCS.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";

const emit = defineEmits(["close", "addOc", "updateFacturas"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    factura: {
        type: Object,
        required: true,
    },
});

const listOcs = ref([]);
const inputParamOc = reactive({ oc_id: '', text: '' })


// ocs del catalogo disponible
const getOcs = async () => {
    const params = pickBy({ search: inputParamOc.text })
    const resp = await axios.get(route("ocs.catalogos"), { params });
    listOcs.value = resp.data;
};

const deleteOc = (indexOc) => {
    axios
        .delete(route("facturas.ocs.destroy", props.factura.id), {
            params: {
                oc_id: props.factura.ocs[indexOc].id,
            },
        })
        .then(() => {
            const cantidadRest = props.factura.ocs[indexOc].cantidad;
            props.factura.total_ocs = (
                props.factura.total_ocs - cantidadRest
            ).toFixed(2);
            props.factura.ocs.splice(indexOc, 1);
            emit('updateFacturas');
        })
        .catch((error) => {
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("message")
            ) {
                props.factura.error = error.response.data.message;
            } else {
                props.factura.error = "Error DELETE OC";
            }
        });
};

const addOc = () => {
    if (inputParamOc.oc_id !== "") {
        props.factura.error = "";
        const form = {
            oc_id: inputParamOc.oc_id,
            factura_id: props.factura.id,
        };
        inputParamOc.text = "";
        inputParamOc.oc_id = "";
        emit("addOc", form);
    } else {
        props.factura.error = "OC INVALIDO";
    }
};

const close = () => {
    listOcs.value = [];
    props.factura.error = "";
    inputParamOc.text = "";
    inputParamOc.oc_id = "";
    emit("close");
};

watch(props, () => {
    if (props.show == true) {
        getOcs();
    }
});

watch(inputParamOc, throttle(function () {
    const anyList = listOcs.value.some((oc) => oc.nombre.toLowerCase().includes(inputParamOc.text.toLowerCase()));
    if (!anyList) {
        getOcs()
    }
}, 150));

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex justify-between text-[28px] font-semibold my-6 max-w-[38.5rem]">
                <div class="px-4 py-1">
                    <span class="block text-center text-fuente-500">
                        #{{ props.factura.referencia }}
                    </span>
                </div>
                <div class="flex justify-between gap-4 px-2 py-1 border-2 border-aqua-500 rounded-xl">
                    <span class="text-[11px] font-normal">Total</span>
                    <span class="text-center text-fuente-500">
                        $ {{ formatoMoney(props.factura.cantidad) }}
                    </span>
                </div>

                <div class="flex justify-between gap-4 px-2 py-1 border-2 border-aqua-500 rounded-xl">
                    <span class="text-[11px] font-normal">Fecha de Pago</span>
                    <span class="text-center text-fuente-500">
                        {{ props.factura.fechaDePago }}
                    </span>
                </div>
                <img :src="cerrar" alt="" class="absolute left-[40rem] top-[1rem] hover:cursor-pointer" @click="close()" />
            </div>
            <div class="flex flex-col mb-4">
                <h3 class="text-[15px] font-semibold uppercase">Agregar OC</h3>
                <div v-if="$page.props.can['facturas.oc.create']" class="flex">
                    <ListDataInputOCS class="w-50" v-model="inputParamOc.oc_id" :valueText="inputParamOc.text"
                        @value="inputParamOc.text = $event" list="ocs-catalogo" :options="listOcs" />
                    <ButtonAdd class="ml-1 h-7" @click="addOc()" />
                </div>
                <JetInputError :message="props.factura.error" class="mt-2" />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="border-b-[1px] border-aqua-500 text-[15px] uppercase font-semibold text-start">
                        <th>OC</th>
                        <th class="flex justify-center gap-4 min-w-fit">
                            <span>CANTIDAD</span>
                            <span>${{
                                formatoMoney(props.factura.total_ocs)
                            }}</span>
                        </th>
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
