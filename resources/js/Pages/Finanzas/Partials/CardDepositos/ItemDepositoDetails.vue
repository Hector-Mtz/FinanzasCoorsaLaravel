<script setup>
import { ref } from "vue";

import ListDataInput from "@/Components/ListDataInput.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import SuccessButton from "@/Components/SuccessButton.vue";
import DangerButton from "@/Components/DangerButton.vue";
import ButtonPres from "@/Components/ButtonPres.vue";
import { formatoMoney } from "../../../../utils/conversiones";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

const emit = defineEmits(["addFactura", "edit", "delete", "changeStatus"]);

const facturaIdAdd = ref("");
const props = defineProps({
    deposito: {
        type: Object,
        required: true,
    },
    facturas: {
        type: Object,
        required: true,
    },
});

const addFactura = () => {
    if (facturaIdAdd.value !== "") {
        props.deposito.error = "";
        const form = {
            factura_id: facturaIdAdd.value,
            deposito_id: props.deposito.id,
        };
        emit("addFactura", form);
    } else {
        props.deposito.error = "FACTURA INVALIDA";
    }
};
</script>
<template>
    <tr>
        <td>#{{ props.deposito.nombre }}</td>
        <td>${{ formatoMoney(props.deposito.cantidad) }}</td>
        <td>
            <span
                v-for="factura in props.deposito.facturas"
                :key="factura.referencia"
            >
                #{{ factura.referencia }}
            </span>
            <div
                v-if="$page.props.can['deposito.factura.create']"
                class="flex flex-row justify-center"
            >
                <ListDataInput
                    class="w-50"
                    v-model="facturaIdAdd"
                    list="facturas-catalogo"
                    name-option="referencia"
                    :options="props.facturas"
                />
                <ButtonAdd class="ml-1 h-7" @click="addFactura()" />
            </div>
            <JetInputError :message="props.deposito.error" class="mt-2" />
        </td>
        <td>{{ props.deposito.banco }}</td>
        <td>
            <div v-if="deposito.documento">
                <a
                    v-if="deposito.documento.endsWith('.svg') || deposito.documento.endsWith('.png') || deposito.documento.endsWith('.pdf') || deposito.documento.endsWith('.jpg')"
                    data-fancybox
                    :href="deposito.documento"
                    class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="h-4"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        />
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        />
                    </svg>
                </a>
                <a
                    class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"
                    :href="deposito.documento"
                    download
                    v-else
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="h-4"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        />
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        />
                    </svg>
                </a>
            </div>
        </td>
        <td v-if="$page.props.can['deposito.edit']">
            <SuccessButton @click="emit('edit', props.deposito)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                </svg>
            </SuccessButton>
        </td>
        <td v-if="$page.props.can['deposito.cerrar']">
            <ButtonPres
                @click="emit('changeStatus', props.deposito)"
                class="py-1 rounded-full"
            >
                <svg
                    v-if="props.deposito.status_id === 1"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
            </ButtonPres>
        </td>
        <td v-if="$page.props.can['deposito.delete']">
            <DangerButton @click="emit('delete', props.deposito)">
                <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    style="fill: white"
                    viewBox="0 0 96 96"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <path
                        d="m24,78c0,4.968 4.029,9 9,9h30c4.968,0 9-4.032 9-9l6-48h-60l6,48zm33-39h6v39h-6v-39zm-12,0h6v39h-6v-39zm-12,0h6v39h-6v-39zm43.5-21h-19.5c0,0-1.344-6-3-6h-12c-1.659,0-3,6-3,6h-19.5c-2.487,0-4.5,2.013-4.5,4.5s0,4.5 0,4.5h66c0,0 0-2.013 0-4.5s-2.016-4.5-4.5-4.5z"
                    />
                </svg>
            </DangerButton>
        </td>
    </tr>
</template>
