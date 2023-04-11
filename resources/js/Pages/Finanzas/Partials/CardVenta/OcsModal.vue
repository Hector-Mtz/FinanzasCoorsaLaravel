<script setup>
import { computed, ref, watch } from "vue";
import { formatoMoney } from "../../../../utils/conversiones";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import FormOcModal from "./FormOcModal.vue";
import ItemOc from "./ItemOc.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";

const emit = defineEmits(["close", "updateCalendar"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    venta: {
        type: Object,
        required: true,
    },
});

const ocs = ref([]);
const showingFormOc = ref(false);
const oc = ref({ id: -1 });
const typeForm = ref("create");

const title = computed(() => {
    switch (props.venta) {
        case "1":
            return "Por Pagar";
        case "2":
            return "Cerrado";
        default:
            return "Por Pagar";
    }
});

const getOcs = async () => {
    const resp = await axios.get(
        route("ocs.index") + `?venta_id=${props.venta.id}`
    );
    ocs.value = resp.data;
};

// Methos Modal
const showFormOc = (ocSelected) => {
    if (ocSelected != undefined) {
        oc.value = ocSelected;
        typeForm.value = "update";
    } else {
        oc.value = { id: -1 };
        typeForm.value = "create";
    }
    showingFormOc.value = true;
};

const addOc = (newOc) => {
    ocs.value.unshift(newOc);
    emit('updateCalendar');
};

const editOc = (newOc) => {
    const findIndex = ocs.value.findIndex((ocFind) => {
        return newOc.id == ocFind.id;
    });
    if (findIndex !== -1) {
        ocs.value[findIndex] = newOc;
    }
    emit('updateCalendar');
};

const deleteOc = (ocSelected) => {
    const ocIndex = ocs.value.findIndex((ocFind) => {
        return ocFind.id === ocSelected.id;
    });
    axios
        .delete(route("ocs.destroy", ocSelected.id))
        .then(() => {
            ocs.value.splice(ocIndex, 1);
            emit('updateCalendar');
        })
        .catch((error) => {
            if (error.response.data.hasOwnProperty("message")) {
                alert(error.response.data.message);
            } else {
                alert("ERROR DELETE OC");
            }
        });
};

// End Methos Modal

const close = () => {
    ocs.value = [];
    emit("close");
};

const montosVenta = computed(() => {
    if (props.venta.iva) 
    {
        return { iva: formatoMoney(Math.round(props.venta.monto * 0.16)), total: formatoMoney(props.venta.monto + props.venta.monto * 0.16) }
    }
    return { iva: 0, total: formatoMoney(props.venta.monto) }
});

watch(props, () => {
    if (props.show == true) {
        getOcs();
    }
});
</script>
<template>
    <DialogModal :maxWidth="'2xl'" :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row gap-8 py-4">
                <div class="px-4 py-1 basis-1/3">
                    <span class="block text-3xl font-bold text-center text-fuente-500">
                        {{ title }}
                    </span>
                </div>
                <div class="px-2 py-1">
                    <div
                        class="flex justify-center items-center gap-4 border-[2px] border-aqua-500 w-fit px-8 rounded-xl py-1">
                        <span class="block text-sm font-light text-center text-fuente-500">
                            Fecha Incial
                        </span>
                        <span class="text-[28px] font-semibold">
                            {{ venta.fechaInicial }}
                        </span>
                    </div>
                </div>
                <div class="absolute left-[95.5%] top-[5%] hover:cursor-pointer" @click="close">
                    <img :src="cerrar" alt="" />
                </div>
            </div>
            <div class="flex flex-row justify-between gap-4 px-4 mt-4 text-center text-fuente-500">
                <div class="py-1 px-2 border-[2px] border-aqua-500 rounded-xl">
                    <span class="block text-xs text-start px-[2.6rem]">
                        Subtotal
                    </span>
                    <span class="text-3xl font-bold">${{ formatoMoney(venta.monto) }}</span>
                </div>
                <div class="py-1 px-2 border-[2px] border-aqua-500 rounded-xl">
                    <span lass="block font-bold text-center tetx-black">
                        <p class="flex flex-col">
                            <span class="text-xs text-start px-[2.6rem]">
                                IVA
                            </span>
                            <span class="px-4 text-3xl font-bold">
                                ${{ montosVenta.iva }}
                            </span>
                        </p>
                    </span>
                </div>
                <div class="py-1 px-2 border-[2px] border-aqua-500 rounded-xl">
                    <span class="block text-xs text-start px-[2.6rem]">
                        Total
                    </span>
                    <span class="text-3xl font-bold">
                        ${{ montosVenta.total }}
                    </span>
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent class="mt-4">
                <template #thead>
                    <tr class="border-b-[2px] border-aqua-500 text-fuente-500">
                        <th class="flex items-center text-lg justify-evenly">
                            <h3 class="mb-1">OC</h3>
                            <ButtonAdd v-if="$page.props.can['ocs.create']" class="h-6 shadow-md shadow-gray-300"
                                @click="showFormOc()" />
                        </th>
                        <th class="text-lg">CANTIDAD</th>
                        <th class="text-lg">FECHA</th>
                        <th class="text-lg">Documento</th>
                        <th v-if="$page.props.can['ocs.edit']"></th>
                        <th v-if="$page.props.can['ocs.delete']"></th>
                    </tr>
                </template>
                <template #tbody>
                    <ItemOc v-for="oc in ocs" :key="oc.id" :oc="oc" @edit="showFormOc($event)" @delete="deleteOc($event)" />
                </template>
            </TableComponent>
            <!--Modals-->
            <FormOcModal :show="showingFormOc" :type-form="typeForm" :venta="props.venta" :oc="oc" @add-oc="addOc($event)"
                @edit-oc="editOc($event)" @close="showingFormOc = false" />
            <!-- Ends Mondals -->
        </template>
    </DialogModal>
</template>
