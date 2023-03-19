<script setup>
import { ref } from "vue";
import { formatoMoney } from "../../../../utils/conversiones";
import ConfirmarModal from "./ConfirmarModal.vue";
import ModalButton from "@/Components/ModalButton.vue";
import edit from "../../../../../img/elementos/editar.png";
import del from "../../../../../img/elementos/eliminar.png";

const emit = defineEmits(["edit", "delete"]);
const props = defineProps({
    oc: {
        type: Object,
        required: true,
    },
});
const show = ref(false);
const showing = () => {
    show.value = true;
};
const closeConf = () => {
    show.value = false;
};
</script>
<template>
    <tr class="pt-4 text-lg font-light text-fuente-500">
        <td>#{{ props.oc.nombre }}</td>
        <td>${{ formatoMoney(props.oc.cantidad) }}</td>
        <td>{{ props.oc.fecha_alta }}</td>
        <td v-if="$page.props.can['ocs.edit']">
            <ModalButton @click="emit('edit', props.oc)">
                <img :src="edit" alt="" />
            </ModalButton>
        </td>
        <td v-if="$page.props.can['ocs.delete']">
            <ModalButton @click="showing">
                <img :src="del" alt="" />
            </ModalButton>
        </td>
    </tr>
    <ConfirmarModal
        :show="show"
        :max-width="'md'"
        :oc="props.oc"
        @close="closeConf"
        @delete="emit('delete', props.oc)"
    ></ConfirmarModal>
</template>
