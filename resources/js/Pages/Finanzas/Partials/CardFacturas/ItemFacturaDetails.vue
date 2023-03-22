<script setup>
import { ref } from "vue";
import ModalButton from "@/Components/ModalButton.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import { formatoMoney } from "../../../../utils/conversiones";
import ListDataInputOCS from "../../../../Components/ListDataInputOCS.vue";
import del from "../.././../../../img/elementos/eliminar.png";
import edit from "../.././../../../img/elementos/editar.png";

const emit = defineEmits(["addOc", "edit", "delete"]);

const ocIdAdd = ref("");
const props = defineProps({
    factura: {
        type: Object,
        required: true,
    },
    ocs: {
        type: Object,
        required: true,
    },
});

const addOc = () => {
    if (ocIdAdd.value !== "") {
        props.factura.error = "";
        const form = {
            oc_id: ocIdAdd.value,
            factura_id: props.factura.id,
        };
        emit("addOc", form);
    } else {
        props.factura.error = "OC INVALIDO";
    }
};
</script>
<template>
    <tr class="text-fuente-500 text-[18px] font-light table-ingresos">
        <td>#{{ props.factura.referencia }}</td>
        <td>${{ formatoMoney(props.factura.cantidad) }}</td>
        <td>${{ formatoMoney(props.factura.total_ocs) }}</td>
        <td>
            <span v-for="oc in props.factura.ocs" :key="oc.nombre">
                #{{ oc.nombre }}</span
            >

            <div
                v-if="$page.props.can['facturas.oc.store']"
                class="flex flex-row justify-center"
            >
                <ListDataInputOCS
                    class="w-50"
                    v-model="ocIdAdd"
                    list="ocs-catalogo"
                    :options="props.ocs"
                />
                <ButtonAdd class="ml-1 h-7" @click="addOc()" />
            </div>
            <JetInputError :message="props.factura.error" class="mt-2" />
        </td>
        <td>{{ props.factura.fechaDePago }}</td>
        <td v-if="$page.props.can['facturas.edit']">
            <ModalButton @click="emit('edit', props.factura)">
                <img :src="edit" alt="" />
            </ModalButton>
        </td>
        <td v-if="$page.props.can['facturas.delete']">
            <ModalButton @click="emit('delete', props.factura)">
                <img :src="del" alt="" />
            </ModalButton>
        </td>
    </tr>
</template>
