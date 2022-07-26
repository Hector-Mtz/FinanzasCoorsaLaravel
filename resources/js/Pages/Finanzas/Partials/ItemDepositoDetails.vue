<script setup>
import { ref, watch } from 'vue';
import ListDataInput from "../../../Components/ListDataInput.vue";
import { formatoMoney } from "../../../utils/coversiones";
import ButtonAdd from "../../../Components/ButtonAdd.vue";
import JetInputError from '@/Jetstream/InputError.vue';

const emit = defineEmits(['addFactura']);

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
            <!-- <span v-for="factura  in props.deposito.facturas" :key="factura.referencia"> #{{ factura.referencia }}</span> -->
            <span>{{ props.deposito.referencia }}</span>
            <div class="flex flex-row justify-center">
                <ListDataInput class="w-50" v-model="facturaIdAdd" list="facturas-catalogo" name-option="referencia"
                    :options="props.facturas" />
                <ButtonAdd class="ml-1 h-7" @click="addFactura()" />
            </div>
            <JetInputError :message="props.deposito.error" class="mt-2" />
        </td>
        <td>{{ props.deposito.banco }}</td>
    </tr>
</template>

