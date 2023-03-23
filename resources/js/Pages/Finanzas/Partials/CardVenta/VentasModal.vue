<script setup>
import { ref, watch } from "vue";
import { pickBy } from "lodash";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import ItemVentaDatials from "./ItemVentaDatials.vue";
import TableComponent from "@/Components/Table.vue";
import FormVentaModal from "./FormVentaModal.vue";
import InputSearch from "@/Components/InputSearchVentas.vue";
import { Inertia } from "@inertiajs/inertia";
import cerrar from "../../../../../img/elementos/cerrar.png";

const emit = defineEmits(["close"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    ventas: {
        type: Object,
        required: true,
    },
});
const searchText = ref("");
const showingFormVenta = ref(false);
const venta = ref({});
const typeForm = ref("create");

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
            Inertia.visit(route("ventas.index"), {
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
        .then(() => {})
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

const search = (newSearch) => {
    const params = pickBy({ search: newSearch });
    Inertia.visit(route("ventas.index"), {
        data: params,
        preserveState: true,
        preserveScroll: true,
        only: ["clientes", "totalVentasStatus"],
    });
};

let timeout;
watch(searchText, (newSearch) => {
    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    //Bounce de busqueda
    timeout = setTimeout(() => {
        search(newSearch);
    }, 300);
});

const close = () => {
    emit("close");
};
</script>
<template>
    <DialogModal :show="show" @close="close()" maxWidth="6xl">
        <template #title>
            <div
                class="flex text-fuente-500 gap-4 items-center justify-between px-8 mb-8 py-2 max-w-[69rem]"
            >
                <div class="flex items-center gap-4 pl-8">
                    <div class="">
                        <span class="block text-3xl font-bold text-start">
                            Ventas
                        </span>
                    </div>
                    <div class="">
                        <div class="flex justify-center">
                            <ButtonAdd
                                v-if="$page.props.can['ventas.create']"
                                @click="showFormVentas()"
                                class="text-sm text-white h-7"
                            />
                        </div>
                    </div>
                </div>

                <InputSearch v-model="searchText" class="px-2 py-1 w-96" />

                <img
                    :src="cerrar"
                    alt=""
                    class="absolute left-[70rem] hover:cursor-pointer"
                    @click="close()"
                />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr
                        class="text-fuente-500 text-md border-b-[2px] border-aqua-500"
                    >
                        <th>CLIENTE</th>
                        <th>COMENTARIO</th>
                        <th>IVA</th>
                        <th>SUBTOTAL</th>
                        <th>TOTAL IVA</th>
                        <th>TOTAL</th>
                        <th>FECHA INICIAL</th>
                        <th>DOCUMENTO</th>
                        <th v-if="$page.props.can['ventas.edit']">REVISADO</th>
                        <th v-if="$page.props.can['ventas.delete']">
                        </th>
                    </tr>
                    <tr>
                        <td colspan="5"></td>
                    </tr>
                </template>
                <template #tbody>
                    <ItemVentaDatials
                        v-for="(venta, index) in props.ventas"
                        :key="venta.id + '' + index"
                        :venta="venta"
                        @edit="showFormVentas($event)"
                        @activeIva="activeIva($event)"
                        @changeRevisado="changeRevisado($event)"
                    />
                </template>
            </TableComponent>
            <!-- MODALS -->
            <FormVentaModal
                :show="showingFormVenta"
                :type-form="typeForm"
                :venta="venta"
                @close="showingFormVenta = false"
            />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
