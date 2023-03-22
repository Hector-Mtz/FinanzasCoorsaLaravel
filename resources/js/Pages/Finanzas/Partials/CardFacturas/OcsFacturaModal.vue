<script setup>
import { ref, watch } from "vue";

import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import ItemOcFactura from "./ItemOcFactura.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import { Inertia } from "@inertiajs/inertia";
import ListDataInputOCS from "../../../../Components/ListDataInputOCS.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";

const emit = defineEmits(["close", "addOc"]);
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
const textOcs = ref("");
const ocIdAdd = ref("");

// ocs del catalogo disponible
const getOcs = async () => {
    const resp = await axios.get(route("ocs.catalogos"));
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
            Inertia.visit(route("ventas.index"), {
                preserveState: true,
                preserveScroll: true,
                only: ["totalOcs"],
            });
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
    if (ocIdAdd.value !== "") {
        props.factura.error = "";
        const form = {
            oc_id: ocIdAdd.value,
            factura_id: props.factura.id,
        };
        textOcs.value = "";
        emit("addOc", form);
    } else {
        props.factura.error = "OC INVALIDO";
    }
};

const close = () => {
    listOcs.value = [];
    props.factura.error = "";
    ocIdAdd.value = "";
    emit("close");
};

watch(props, () => {
    if (props.show == true) {
        getOcs();
    }
});
</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div
                class="flex justify-between text-[28px] font-semibold my-6 max-w-[38.5rem]"
            >
                <div class="px-4 py-1">
                    <span class="block text-center text-fuente-500">
                        #{{ props.factura.referencia }}
                    </span>
                </div>
                <div
                    class="flex gap-4 justify-between border-2 border-aqua-500 rounded-xl px-2 py-1"
                >
                    <span class="text-[11px] font-normal">Total</span>
                    <span class="text-center text-fuente-500">
                        $ {{ props.factura.cantidad }}
                    </span>
                </div>

                <div
                    class="flex gap-4 justify-between border-2 border-aqua-500 rounded-xl px-2 py-1"
                >
                    <span class="text-[11px] font-normal">Fecha de Pago</span>
                    <span class="text-center text-fuente-500">
                        {{ props.factura.fechaDePago }}
                    </span>
                </div>
                <img
                    :src="cerrar"
                    alt=""
                    class="absolute left-[40rem] top-[1rem] hover:cursor-pointer"
                    @click="close()"
                />
            </div>
            <div class="flex flex-col mb-4">
                <h3 class="text-[15px] font-semibold uppercase">Agregar OC</h3>
                <div v-if="$page.props.can['facturas.oc.create']" class="flex">
                    <ListDataInputOCS
                        class="w-50"
                        v-model="ocIdAdd"
                        :value="textOcs"
                        list="ocs-catalogo"
                        :options="listOcs"
                    />
                    <ButtonAdd class="ml-1 h-7" @click="addOc()" />
                </div>
                <JetInputError :message="props.factura.error" class="mt-2" />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr
                        class="border-b-[1px] border-aqua-500 text-[15px] uppercase font-semibold text-start"
                    >
                        <th>OC</th>
                        <th class="flex justify-center gap-4 min-w-fit">
                            <span>CANTIDAD</span>
                            <span>${{ props.factura.total_ocs }}</span>
                        </th>
                        <th>FECHA</th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemOcFactura
                        v-for="(oc, index) in props.factura.ocs"
                        :key="oc.id"
                        :oc="oc"
                        @remove="deleteOc(index)"
                    />
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
