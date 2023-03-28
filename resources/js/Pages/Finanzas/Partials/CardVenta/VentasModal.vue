<script setup>
import { ref, watch, reactive, watchEffect } from "vue";
import { pickBy, throttle } from "lodash";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import ItemVentaDatials from "./ItemVentaDatials.vue";
import TableComponent from "@/Components/Table.vue";
import FormVentaModal from "./FormVentaModal.vue";
import InputSearch from "@/Components/InputSearchVentas.vue";
import PaginationAxios from "@/Components/PaginationAxios.vue";
import { Inertia } from "@inertiajs/inertia";
import cerrar from "../../../../../img/elementos/cerrar.png";

const emit = defineEmits(["close"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});
const paramsVentas = reactive({
    search: '', field: '',
    direction: ''
});
const showingFormVenta = ref(false);
const ventas = ref({ data: [] });
const venta = ref({});
const typeForm = ref("create");



const sort = (field) => {
    paramsVentas.field = field;
    paramsVentas.direction = paramsVentas.direction === "asc" ? "desc" : "asc";
};


// MODALS FUNCITON
const showFormVentas = (ventaSelect) => {
    if (ventaSelect === undefined) {
        typeForm.value = "create";
    } else {
        typeForm.value = "update";
        venta.value = ventaSelect;
    }
    showingFormVenta.value = true;
};
// EN MODALS FUNCTION

const activeIva = (ventaId) => {
    axios
        .put(route("ventas.iva", ventaId))
        .then(() => {
            Inertia.visit(route("finanzas.index"), {
                preserveScroll: true,
                preserveState: true,
                only: ["clientes", "totalVentas", "errors"],
            });
        })
        .catch((err) => {
            if (
                err.hasOwnProperty("errors") &&
                err.response.data.hasOwnProperty("errors")
            ) {
                alert(err.response.data.message);
            } else {
                alert("ERROR ACTIVE IVA");
            }
        });
};

const changeRevisado = (venta) => {
    axios
        .put(route("ventas.revisado", venta.id), {
            revisado: venta.revisado,
        })
        .then(() => { })
        .catch((err) => {
            venta.revisado = !venta.revisado;
            if (
                err.hasOwnProperty("errors") &&
                err.response.data.hasOwnProperty("errors")
            ) {
                alert(err.response.data.message);
            } else {
                alert("ERROR ACTIVE IVA");
            }
        });
};

/**
 * Get paginated ventas
 * @param {string} page 
 */
const searchVentas = async (page) => {
    const params = pickBy({ ...paramsVentas, page })
    try {
        const response = await axios.get(route('ventas.index'), {
            params
        });
        ventas.value = response.data.ventas;
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

const refreshVentas = () => {
    searchVentas(ventas.value.current_page)
}

watchEffect(() => {
    if (props.show) {
        searchVentas();
    }
});

watch(paramsVentas, throttle(function () {
    if (props.show) {
        searchVentas();
    }
}, 100));

const close = () => {
    emit("close");
};
</script>
<template>
    <DialogModal :show="show" @close="close()" maxWidth="6xl">
        <template #title>
            <div class="flex text-fuente-500 gap-4 items-center justify-between px-8 mb-8 py-2 max-w-[69rem]">
                <div class="flex items-center gap-4 pl-8">
                    <div class="">
                        <span class="block text-3xl font-bold text-start">
                            Ventas
                        </span>
                    </div>
                    <div class="">
                        <div class="flex justify-center">
                            <ButtonAdd v-if="$page.props.can['ventas.create']" @click="showFormVentas()"
                                class="text-sm text-white h-7" />
                        </div>
                    </div>
                </div>
                <InputSearch v-model="paramsVentas.search" class="px-2 py-1 w-96" />

                <img :src="cerrar" alt="" class="absolute left-[70rem] hover:cursor-pointer" @click="close()" />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="text-fuente-500 text-md border-b-[2px] border-aqua-500">
                        <th @click="sort('ceco')">CLIENTE
                            <template v-if="paramsVentas.field === 'ceco'">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th @click="sort('comentario')">COMENTARIO
                            <template v-if="paramsVentas.field === 'comentario'">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th @click="sort('ventas.iva')">IVA
                            <template v-if="paramsVentas.field === 'ventas.iva'">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th @click="sort('sub_total')">SUBTOTAL
                            <template v-if="paramsVentas.field === 'sub_total'">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th @click="sort('iva ' + (paramsVentas.direction === 'asc' ? 'desc' : 'asc') + ', sub_total')">
                            TOTAL IVA

                            <template v-if="paramsVentas.field.endsWith(', sub_total')">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th @click="sort('sub_total ' + (paramsVentas.direction === 'asc' ? 'desc' : 'asc') + ', iva')">
                            TOTAL
                            <template v-if="paramsVentas.field.endsWith(', iva')">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th @click="sort('ventas.fechaInicial')">FECHA INICIAL
                            <template v-if="paramsVentas.field === 'ventas.fechaInicial'">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th>DOCUMENTO</th>
                        <th v-if="$page.props.can['ventas.edit']" @click="sort('ventas.revisado')">REVISADO
                            <template v-if="paramsVentas.field === 'ventas.revisado'">
                                <svg v-if="paramsVentas.direction === 'asc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>
                                <svg v-if="paramsVentas.direction === 'desc'" xmlns="http://www.w3.org/2000/svg"
                                    class="inline w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                </svg>
                            </template>
                        </th>
                        <th v-if="$page.props.can['ventas.delete']">
                        </th>
                    </tr>
                    <tr>
                        <td colspan="5"></td>
                    </tr>
                </template>
                <template #tbody>
                    <ItemVentaDatials v-for="(venta) in ventas.data" :key="venta.id" :venta="venta"
                        @edit="showFormVentas($event)" @activeIva="activeIva($event)"
                        @changeRevisado="changeRevisado($event)" />
                </template>
            </TableComponent>
            <PaginationAxios :pagination="ventas" @loadPage="searchVentas($event)" />
            <!-- MODALS -->
            <FormVentaModal :show="showingFormVenta" :type-form="typeForm" :venta="venta" @close="showingFormVenta = false"
                @refreshVentas="refreshVentas()" />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
