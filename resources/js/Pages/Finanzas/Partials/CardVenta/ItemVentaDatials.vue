<script setup>
import { computed, ref } from "vue";
import { formatoMoney, IVA } from "../../../../utils/conversiones";
import ModalButton from "@/Components/ModalButton.vue";
import SwitchButton from "@/Components/SwitchButton.vue";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-vue3";
import edit from "../../../../../img/elementos/editar.png";
import del from "../../../../../img/elementos/eliminar.png";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

const emit = defineEmits(["edit", "activeIva", "changeRevisado"]);

const props = defineProps({
    venta: {
        type: Object,
        required: true,
    },
});
const ivaChecked = ref(props.venta.iva);

const ventaShow = computed(() => {
    const auxVenta = { ...props.venta };
    if (ivaChecked.value) {
        const totalIva = auxVenta.sub_total * IVA;
        auxVenta.iva = formatoMoney(totalIva.toFixed(2));
        auxVenta.total = formatoMoney(
            (auxVenta.sub_total + totalIva).toFixed(2)
        );
    } else {
        auxVenta.iva = "";
        auxVenta.total = formatoMoney(auxVenta.sub_total.toFixed(2));
    }
    auxVenta.sub_total = formatoMoney(auxVenta.sub_total.toFixed(2));

    return auxVenta;
});

const isEditable = computed(() => {
    return props.venta.status_id == 1;
});

const activeIva = () => {
    if (isEditable) {
        ivaChecked.value = !ivaChecked.value;
        emit("activeIva", props.venta.id);
    }
};

const eliminarVenta = (id) => {
    Inertia.delete(route("ventas.destroy", id));
};

const show = ref(false);
const showing = () => {
    show.value = true;
};
const closeConf = () => {
    show.value = false;
};
</script>
<template>
    <tr
        class="text-light"
        :class="{
            'bg-aqua-500 text-white border-y-[1px] border-white':
                venta.revisado,
        }"
    >
        <td>{{ ventaShow.ceco + "-" + ventaShow.servicio }}</td>
        <td>{{ ventaShow.comentario }}</td>
        <td>
            <div
                @click="activeIva()"
                class="w-10 h-5 px-2 mx-2 bg-verde-500 hover:bg-verde-500/80 rounded-xl"
            >
                <svg
                    v-if="ivaChecked"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#FFFFFF"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
        </td>
        <td>${{ ventaShow.sub_total }}</td>
        <td>${{ ventaShow.iva }}</td>
        <td>${{ ventaShow.total }}</td>
        <td>{{ ventaShow.fechaInicial }}</td>
        <td>
            <div v-if="ventaShow.documento">
                <a
                    class="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-blue-500 border border-transparent rounded-3xl disabled:opacity-25"
                    v-if="!ventaShow.documento.endsWith('.svg')"
                    :href="ventaShow.documento"
                    download
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
                    v-else
                    data-fancybox
                    :href="ventaShow.documento"
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
            </div>
        </td>
        <td v-if="$page.props.can['ventas.edit']" class="flex items-center">
            <SwitchButton
                v-model:checked="venta.revisado"
                @change="$emit('changeRevisado', venta)"
            />
            <ModalButton v-if="isEditable" @click="emit('edit', props.venta)">
                <img :src="edit" alt="" />
            </ModalButton>
        </td>
        <td v-if="$page.props.can['ventas.delete']" class="w-6">
            <ModalButton
                v-if="isEditable"
                class="flex items-center"
                @click="eliminarVenta(ventaShow.id)"
            >
                <img :src="del" alt="" />
            </ModalButton>
        </td>
    </tr>
</template>
