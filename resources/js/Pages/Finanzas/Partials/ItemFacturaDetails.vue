<script setup>
import { ref, watch } from 'vue';
import ListDataInput from "../../../Components/ListDataInput.vue";
import { formatoMoney } from "../../../utils/coversiones";
import ButtonAdd from "../../../Components/ButtonAdd.vue";
import JetInputError from '@/Jetstream/InputError.vue';

const emit = defineEmits(['addOc']);

const ocIdAdd = ref("")
const props = defineProps({
    factura: {
        type: Object,
        required: true
    },
    ocs: {
        type: Object,
        required: true,
    }
});

const addOc = () => {
    if (ocIdAdd.value !== "") {
        props.factura.error = ""
        const form = {
            oc_id: ocIdAdd.value,
            factura_id: props.factura.id
        }
        emit("addOc", form);
    } else {
        props.factura.error = "OC INVALIDO"
    }
}

</script>
<template>
    <tr>
        <td>#{{ props.factura.referencia }}</td>
        <td>${{ formatoMoney(props.factura.cantidad) }}</td>
        <td>${{ formatoMoney(props.factura.total_ocs) }}</td>
        <td>
            <span v-for="oc  in props.factura.ocs" :key="oc.nombre"> #{{ oc.nombre }}</span>

            <div class="flex flex-row justify-center">
                <ListDataInput class="w-50" v-model="ocIdAdd" list="ocs-catalogo" :options="props.ocs" />
                <ButtonAdd class="ml-1 h-7" @click="addOc()" />
            </div>
            <JetInputError :message="props.factura.error" class="mt-2" />
        </td>
        <td>{{ props.factura.fechaDePago }}</td>
    </tr>
</template>

