<script setup>
import { ref, watch } from "vue";

import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import FormDepositoModal from "./FormDepositoModal.vue";
import ItemDepositoDetails from "./ItemDepositoDetails.vue";
import InputSearch from "@/Components/InputSearch.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";

const emit = defineEmits([
    "close",
    "updateDepositos",
    "deleteDeposito",
    "addFactura",
]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    depositos: {
        type: Object,
        required: true,
    },
});
const showingFormDeposito = ref(false);
const deposito = ref({});
const typeForm = ref("create");
const listFacturas = ref([]);

// MODALS FUNCITON
const showFormDeposito = (depositoSelect) => {
    if (depositoSelect === undefined) {
        typeForm.value = "create";
    } else {
        typeForm.value = "update";
        deposito.value = depositoSelect;
    }
    showingFormDeposito.value = true;
};

const changeStatus = (depositoChange) => {
    axios
        .put(route("ingresos.status", depositoChange.id))
        .then((resp) => {
            // Es el mismo ya que reconsulta
            emit("updateDepositos");
        })
        .catch((error) => {
            let message;
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("message")
            ) {
                message = error.response.data.message;
            } else {
                message = "Error DELETE OC";
            }
            alert(message);
        });
};

const deleteDeposito = (deposito) => {
    axios
        .delete(route("ingresos.destroy", deposito.id))
        .then(() => {
            emit("deleteDeposito");
        })
        .catch((error) => {
            let message;
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("message")
            ) {
                message = error.response.data.message;
            } else {
                message = "Error DELETE OC";
            }
            alert(message);
        });
};

// EN MODALS FUNCTION
//Facturas del catalogo disponible
const getFacturas = async () => {
    const resp = await axios.get(route("facturas.catalogos"));
    listFacturas.value = resp.data; //ocs del catalogo disponible
};
const close = () => {
    emit("close");
};

watch(props, () => {
    if (props.show) {
        getFacturas();
    }
});
</script>
<template>
    <DialogModal :show="show" @close="close()" :maxWidth="'3xl'">
        <template #title>
            <div class="flex justify-between items-center">
                <div class="px-4 py-1 my-6 flex gap-4 items-center">
                    <span
                        class="block font-semibold text-[28px] text-center text-fuente-500"
                    >
                        Depositos
                    </span>

                    <ButtonAdd
                        v-if="$page.props.can['deposito.create']"
                        class="h-[25px] w-[35px]"
                        @click="showFormDeposito()"
                    />
                </div>
                <InputSearch v-model="searchText" class="py-1 px-2" />
                <img
                    :src="cerrar"
                    alt=""
                    class="absolute left-[46.2rem] top-[0.7rem] hover:cursor-pointer"
                    @click="close()"
                />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="tx-[15px] uppercase font-semibold">
                        <th>
                            <h3 class="mb-1">Deposito</h3>
                        </th>
                        <th>CANTIDAD</th>
                        <th>FACTURA</th>
                        <th>BANCO</th>
                        <th v-if="$page.props.can['deposito.edit']"></th>
                        <th v-if="$page.props.can['deposito.cerrar']">
                            CERRAR
                        </th>
                        <th v-if="$page.props.can['deposito.delete']">
                            ELIMINAR
                        </th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemDepositoDetails
                        v-for="deposito in depositos"
                        :key="deposito.nombre"
                        :deposito="deposito"
                        :facturas="listFacturas"
                        @edit="showFormDeposito($event)"
                        @delete="deleteDeposito($event)"
                        @add-factura="emit('addFactura', $event)"
                        @change-status="changeStatus($event)"
                    />
                </template>
            </TableComponent>
            <!-- MODALS -->
            <FormDepositoModal
                :show="showingFormDeposito"
                :type-form="typeForm"
                :deposito="deposito"
                @add-deposito="emit('updateDepositos', $event)"
                @close="showingFormDeposito = false"
            />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
