<script setup>
import { computed, ref, watch } from "vue";
import { Inertia } from "@inertiajs/inertia";
import { pickBy, throttle } from 'lodash'
import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import ListDataInput from "@/Components/ListDataInput.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import ItemFacturaDeposito from "./ItemFacturaDeposito.vue";
import { formatoMoney } from "../../../../utils/conversiones";

const emit = defineEmits(["close", "addFactura", "updateDepositos"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    deposito: {
        type: Object,
        required: true,
    },
});

const listFacturas = ref([]);
const textFactura = ref("");
const facturaIdAdd = ref("");

// ocs del catalogo disponible
const getFacturas = async (search = '') => {
    const params = pickBy({ search })
    const resp = await axios.get(route("facturas.catalogos"), { params });
    listFacturas.value = resp.data; //ocs del catalogo disponible
};
const deleteFactura = (indexFactura) => {
    axios
        .delete(route("ingresos.facturas.destroy", props.deposito.id), {
            params: {
                factura_id: props.deposito.facturas[indexFactura].id,
            },
        })
        .then(() => {
            props.deposito.error = "";
            props.deposito.facturas.splice(indexFactura, 1);
            Inertia.visit(route("ventas.index"), {
                preserveState: true,
                preserveScroll: true,
                only: ["totalOcs"],
            });
            emit("updateDepositos");
        })
        .catch((error) => {
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("message")
            ) {
                props.deposito.error = error.response.data.message;
            } else {
                props.deposito.error = "Error DELETE OC";
            }
        });
};

const addFactura = () => {
    if (facturaIdAdd.value !== "") {
        props.deposito.error = "";
        const form = {
            factura_id: facturaIdAdd.value,
            deposito_id: props.deposito.id,
        };
        textFactura.value = "";
        emit("addFactura", form);
    } else {
        props.deposito.error = "FACTURA INVALIDA";
    }
};

const totalFacturas = computed(() => {
    let total = 0;
    props.deposito.facturas.forEach((fact) => {
        total += fact.cantidad;
    });

    return formatoMoney(total.toFixed(2));
});

const close = () => {
    listFacturas.value = [];
    props.deposito.error = "";
    facturaIdAdd.value = "";
    emit("close");
};

watch(props, () => {
    if (props.show == true) {
        getFacturas();
    }
});

watch(textFactura, throttle(function () {
    const anyList = listFacturas.value.some((factura) => factura.referencia.toLowerCase().includes(textFactura.value.toLowerCase()));
    if (!anyList) {
        getFacturas(textFactura.value)
    }
}, 150));

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex justify-between font-semibold text-[28px] my-6">
                <div class="px-4 py-1">
                    <span class="block text-fuente-500">
                        #{{ props.deposito.nombre }}
                    </span>
                </div>
                <div class="px-2 py-1 border-2 rounded-xl border-aqua-500">
                    <div class="flex justify-between gap-4">
                        <span class="text-[11px] font-normal"> Total </span>
                        <span>
                            $ {{ formatoMoney(props.deposito.cantidad) }}</span>
                    </div>
                </div>
            </div>
            <div class="my-4">
                <h3 class="text-[15px] font-semibold uppercase">
                    Agregar Factruas
                </h3>
                <div v-if="$page.props.can['deposito.factura.create']" class="flex items-center gap-4">
                    <div class="grid">
                        <ListDataInput class="w-50" v-model="facturaIdAdd" :value="textFactura"
                            @value="textFactura = $event" list="facturas-catalogo" name-option="referencia"
                            :options="listFacturas" />

                        <JetInputError :message="props.deposito.error" class="mt-2" />
                    </div>
                    <ButtonAdd class="h-[25px] w-[35px]" @click="addFactura()" />
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="text-[15px] font-semibold uppercase border-b-[1px] border-aqua-500">
                        <th class="pb-2">
                            <h3 class="mb-1">FACTURAS</h3>
                        </th>
                        <th class="pb-2">CANTIDAD ${{ totalFacturas }}</th>
                        <th class="pb-2">FECHA</th>
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
