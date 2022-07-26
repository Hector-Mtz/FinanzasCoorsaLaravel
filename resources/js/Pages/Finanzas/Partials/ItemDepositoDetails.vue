<script setup>
import { ref, watch } from 'vue';
import ListDataInput from "../../../Components/ListDataInput.vue";
import { formatoMoney } from "../../../utils/conversiones";
import ButtonAdd from "../../../Components/ButtonAdd.vue";
import JetInputError from '@/Jetstream/InputError.vue';
import SuccessButton from '@/Components/SuccessButton.vue';
import DangerButton from '@/Components/DangerButton.vue';

const emit = defineEmits(['addFactura', 'edit', 'changeStatus']);

const facturaIdAdd = ref("")
const props = defineProps({
    deposito: {
        type: Object,
        required: true
    },
    facturas: {
        type: Object,
        required: true,
    }
});

const addFactura = () => {
    if (facturaIdAdd.value !== "") {
        props.deposito.error = ""
        const form = {
            factura_id: facturaIdAdd.value,
            deposito_id: props.deposito.id
        }
        emit("addFactura", form);
    } else {
        props.deposito.error = "FACTURA INVALIDA"
    }
}

</script>
<template>
    <tr>
        <td>#{{ props.deposito.nombre }}</td>
        <td>${{ formatoMoney(props.deposito.cantidad) }}</td>
        <td>
            <span v-for="factura  in props.deposito.facturas" :key="factura.referencia"> #{{ factura.referencia }}
            </span>
            <div class="flex flex-row justify-center">
                <ListDataInput class="w-50" v-model="facturaIdAdd" list="facturas-catalogo" name-option="referencia"
                    :options="props.facturas" />
                <ButtonAdd class="ml-1 h-7" @click="addFactura()" />
            </div>
            <JetInputError :message="props.deposito.error" class="mt-2" />
        </td>
        <td>{{ props.deposito.banco }}</td>
        <td>
            <div class="flex justify-between">

                <SuccessButton @click="emit('edit', props.deposito)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </SuccessButton>
                <DangerButton @click="emit('changeStatus', props.deposito)" class="ml-2 w-8 px-0 py-0">
                    <svg v-if="props.deposito.status_id === 1" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </DangerButton>
            </div>

        </td>
    </tr>
</template>

