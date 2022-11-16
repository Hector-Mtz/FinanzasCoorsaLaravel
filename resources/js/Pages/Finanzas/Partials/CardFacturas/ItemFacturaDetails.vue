<script setup>
import { ref } from 'vue';

import JetInputError from '@/Jetstream/InputError.vue';
import ListDataInput from "@/Components/ListDataInput.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import { formatoMoney } from "../../../../utils/conversiones";
import ListDataInputOCS from '../../../../Components/ListDataInputOCS.vue';
import DangerButton from '../../../../Components/DangerButton.vue';
import SuccessButton from '../../../../Components/SuccessButton.vue';

const emit = defineEmits(['addOc', 'edit', 'delete']);

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

            <div v-if="$page.props.can['facturas.oc.store']" class="flex flex-row justify-center">

                <ListDataInputOCS class="w-50" v-model="ocIdAdd" list="ocs-catalogo" :options="props.ocs" />
                <ButtonAdd class="ml-1 h-7" @click="addOc()" />
            </div>
            <JetInputError :message="props.factura.error" class="mt-2" />
        </td>
        <td>{{ props.factura.fechaDePago }}</td>
        <td v-if="$page.props.can['facturas.edit']">
            <SuccessButton @click="emit('edit', props.factura)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </SuccessButton>
        </td>
        <td v-if="$page.props.can['facturas.delete']">
            <DangerButton @click="emit('delete', props.factura)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3 h-3" viewBox="0 0 16 16">
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
            </DangerButton>
        </td>
    </tr>
</template>

