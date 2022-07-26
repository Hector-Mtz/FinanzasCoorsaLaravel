<script setup>
import DangerButton from '../../../Components/DangerButton.vue';
import ItemObjectShow from './ItemObjectShow.vue';
import { formatoMoney } from '../../../utils/coversiones';

const emit = defineEmits(['onShow'])

const props = defineProps({
    ingreso: {
        type: Object,
        required: true
    }
})

</script>
<template>
    <tr>
        <td>
            #{{ ingreso.nombre }}
        </td>
        <td>
            ${{ formatoMoney(ingreso.cantidad) }}
        </td>
        <td>
            #{{ ingreso.referencia }}
        </td>
    </tr>
</template>


