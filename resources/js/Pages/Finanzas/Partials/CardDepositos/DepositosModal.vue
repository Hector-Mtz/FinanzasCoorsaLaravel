<script setup>
import { ref, watch, reactive } from "vue";
import { pickBy, throttle } from "lodash";

import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import FormDepositoModal from "./FormDepositoModal.vue";
import ItemDepositoDetails from "./ItemDepositoDetails.vue";
import InputSearch from "@/Components/InputSearch.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import PaginationAxios from "../../../../Components/PaginationAxios.vue";

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
});
const showingFormDeposito = ref(false);
const depositos = ref({ data: [] });
const params = reactive({
    search: '', field: '',
    direction: ''
});
const deposito = ref({});
const typeForm = ref("create");
const listFacturas = ref([]);


const sort = (field) => {
    params.field = field;
    params.direction = params.direction === "asc" ? "desc" : "asc";
};


//Search Depositos
/**
 * Get paginated ventas
 * @param {string} page 
 */
const searchDepositos = async (page) => {
    const paramsAux = pickBy({ ...params, page })
    try {
        const response = await axios.get(route('ingresos.index'), {
            params: paramsAux
        });
        depositos.value = response.data.ingresos;
    } catch (error) {
        if (error.response) {
            let messageError = '';
            const messageServer = error.response.data.message
            if (error.response.status != 500) {
                messageError = messageServer;
            } else {
                messageError = 'Internal Server Error';
            }
            alert(messageError)
        }
    }
};

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
        .then(() => {
            // Es el mismo ya que reconsulta
            refreshDepositos();
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
            refreshDepositos();
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

const refreshDepositos = () => {
    searchDepositos(depositos.value.current_page);
    emit('updateDepositos')
}

watch(props, () => {
    if (props.show) {
        getFacturas();
        searchDepositos();
    }
});

watch(params, throttle(function () {
    if (props.show) {
        searchDepositos();
    }
}, 100));
</script>
<template>
    <DialogModal :show="show" @close="close()" :maxWidth="'3xl'">
        <template #title>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 px-4 py-1 my-6">
                    <span class="block font-semibold text-[28px] text-center text-fuente-500">
                        Depositos
                    </span>

                    <ButtonAdd v-if="$page.props.can['deposito.create']" class="h-[25px] w-[35px]"
                        @click="showFormDeposito()" />
                </div>
                <InputSearch v-model="params.search" class="px-2 py-1" />
                <img :src="cerrar" alt="" class="absolute left-[46.2rem] top-[0.7rem] hover:cursor-pointer"
                    @click="close()" />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="tx-[15px] uppercase font-semibold">
                        <th @click="sort('ingresos.nombre')">
                            <h3 class="mb-1">Deposito</h3>
                            <template v-if="params.field === 'ingresos.nombre'">
                                <svg v-if="params.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="params.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th @click="sort('ingresos.cantidad')">CANTIDAD
                            <template v-if="params.field === 'ingresos.cantidad'">
                                <svg v-if="params.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="params.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th>FACTURA</th>
                        <th @click="sort('banco')">BANCO
                            <template v-if="params.field === 'banco'">
                                <svg v-if="params.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="params.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th>DOCUMENTO</th>
                        <th v-if="$page.props.can['deposito.edit']"></th>
                        <th v-if="$page.props.can['deposito.cerrar']" @click="sort('ingresos.status_id')">
                            CERRAR
                            <template v-if="params.field === 'ingresos.status_id'">
                                <svg v-if="params.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="params.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4 " viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th v-if="$page.props.can['deposito.delete']">
                            ELIMINAR
                        </th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemDepositoDetails v-for="deposito in depositos.data" :key="deposito.nombre" :deposito="deposito"
                        :facturas="listFacturas" @edit="showFormDeposito($event)" @delete="deleteDeposito($event)"
                        @add-factura="emit('addFactura')" @change-status="changeStatus($event)" />
                </template>
            </TableComponent>
            <PaginationAxios :pagination="depositos" @loadPage="searchDepositos($event)" />
            <!-- MODALS -->
            <FormDepositoModal :show="showingFormDeposito" :type-form="typeForm" :deposito="deposito"
                @add-deposito="refreshDepositos()" @close="showingFormDeposito = false" />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
