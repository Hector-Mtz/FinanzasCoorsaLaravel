<script setup>
import { ref } from "vue";
import ModalButton from "@/Components/ModalButton.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import { formatoMoney } from "../../../../utils/conversiones";
import ListDataInputOCS from "../../../../Components/ListDataInputOCS.vue";
import del from "../.././../../../img/elementos/eliminar.png";
import edit from "../.././../../../img/elementos/editar.png";
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

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
        <td>
            <div v-if="factura.documento">
                   <a  v-if="factura.documento.endsWith('.svg') || factura.documento.endsWith('.png') || factura.documento.endsWith('.pdf') || factura.documento.endsWith('.jpg')"
                     data-fancybox :href="factura.documento"  class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"  
                   >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="h-4"
                          viewBox="0 0 16 16"
                      >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path
                              d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                          />
                      </svg>
                   </a>
                   <a  class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"
                      v-else :href="factura.documento" download >
                         <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor"
                         class="h-4"
                         viewBox="0 0 16 16"
                     >
                         <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                         <path
                             d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                         />
                     </svg>
                   </a>
            </div>
        </td>
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
