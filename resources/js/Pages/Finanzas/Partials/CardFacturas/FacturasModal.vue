<script setup>
import { ref, watchEffect, watch, reactive } from "vue";
import { pickBy, throttle } from 'lodash'
import InputSearch from "@/Components/InputSearchVentas.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import PaginationAxios from "@/Components/PaginationAxios.vue";
import ItemFacturaDetails from "./ItemFacturaDetails.vue";
import FormFacturaModal from "./FormFacturaModal.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";

const emit = defineEmits(["close", "updateFacturas", "addOc"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});
const showingFormFactura = ref(false);
const facturas = ref({ data: [] });
const params = reactive({
    search: '', field: '',
    direction: ''
});
const factura = ref({});
const typeForm = ref("create");
const listOcs = ref([]);


const sort = (field) => {
    params.field = field;
    params.direction = params.direction === "asc" ? "desc" : "asc";
};


//Search Facturas
/**
 * Get paginated ventas
 * @param {string} page 
 */
const searchFacturas = async (page) => {
    const paramsAux = pickBy({ ...params, page })
    try {
        const response = await axios.get(route('facturas.index'), {
            params: paramsAux
        });
        facturas.value = response.data.facturas;
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
const showFormFactura = (facturaSelect) => {
    if (facturaSelect === undefined) {
        typeForm.value = "create";
    } else {
        typeForm.value = "update";
        factura.value = facturaSelect;
    }
    console.log("Deberia abrir formulario");
    showingFormFactura.value = true;
};

// EN MODALS FUNCTION
//ocs del catalogo disponible
const getOcs = async () => {
    const resp = await axios.get(route("ocs.catalogos"));
    listOcs.value = resp.data; //ocs del catalogo disponible
};

const deleteFactura = (facturaSelected) => {
    const facturaIndex = props.facturas.findIndex((facturaFind) => {
        return facturaFind.id === facturaSelected.id;
    });
    axios
        .delete(route("facturas.destroy", facturaSelected.id))
        .then(() => {
            emit("updateFacturas");
        })
        .catch((error) => {
            console.log(error);
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("message")
            ) {
                alert(error.response.data.message);
            } else {
                alert("ERROR DELETE FACTURA");
            }
        });
};

const close = () => {
    emit("close");
};

const refreshFacturas = () => {
    searchFacturas(facturas.value.current_page);
    emit('updateFacturas')
}

watchEffect(() => {
    if (props.show) {
        getOcs();
        searchFacturas();
    }
});

watch(params, throttle(function () {
    if (props.show) {
        searchFacturas();
    }
}, 100));

</script>
<template>
    <DialogModal :show="show" @close="close()" :maxWidth="'4xl'">
        <template #title>
            <div class="flex justify-between items-center py-6 max-w-[52rem]">
                <div class="flex items-center justify-around gap-4 px-4 py-1">
                    <span class="block font-semibold text-[28px] text-center text-fuente-500">
                        Facturas
                    </span>

                    <ButtonAdd v-if="$page.props.can['facturas.create']" class="w-[35px] h-[25px]"
                        @click="showFormFactura()" />
                </div>
                <div>
                    <InputSearch v-model="params.search" class="px-2 py-1" />
                </div>

                <img :src="cerrar" alt="" class="absolute left-[54rem] hover:cursor-pointer" @click="close()" />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="text-[15px] font-semibold border-b-2 border-aqua-500">
                        <th class="pb-2" @click="sort('facturas.referencia')">
                            <h3 class="mb-1">FACTURA
                                <template v-if="params.field === 'facturas.referencia'">
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
                            </h3>
                        </th>
                        <th class="pb-2" @click="sort('cantidad')">CANTIDAD
                            <template v-if="params.field === 'cantidad'">
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
                        <th class="pb-2" @click="sort('total_ocs')">TOTAL OCS
                            <template v-if="params.field === 'total_ocs'">
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
                        <th class="pb-2">OCS</th>
                        <th class="pb-2" @click="sort('facturas.fechaDePago')">FECHA
                            <template v-if="params.field === 'facturas.fechaDePago'">
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
                        <th class="pb-2">DOCUMENTO</th>
                        <th class="pb-2" v-if="$page.props.can['facturas.edit']"></th>
                        <th class="pb-2" v-if="$page.props.can['facturas.delete']"></th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemFacturaDetails v-for="(factura, index) in facturas.data" :key="factura.id + '' + index"
                        :factura="factura" :ocs="listOcs" @edit="showFormFactura($event)" @delete="deleteFactura($event)"
                        @addOc="emit('addOc', $event)" />
                </template>
            </TableComponent>
            <PaginationAxios :pagination="facturas" @loadPage="searchFacturas($event)" />
            <!-- MODALS -->
            <FormFacturaModal :show="showingFormFactura" :type-form="typeForm" :factura="factura"
                @update-facturas="refreshFacturas()" @close="showingFormFactura = false" />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
