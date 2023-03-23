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
        <td>
            <div v-if="oc.documento">
                <a  class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"
                   v-if="!oc.documento.endsWith('.pdf')" :href="oc.documento" download >
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
                   <a v-else  data-fancybox :href="oc.documento"  class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"  
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
            </div>
        </td>
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
