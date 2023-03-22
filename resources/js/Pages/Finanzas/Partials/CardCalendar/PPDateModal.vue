<script setup>
import { computed, ref } from "vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import InputSearch from "@/Components/InputSearch.vue";

const emit = defineEmits(["close", "addOc"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    dataCalendar: {
        type: Object,
        required: true,
    },
});


const close = () => {
    emit("close");
};
</script>
<template>
    <DialogModal :show="show" @close="close()" :maxWidth="'8xl'">
        <template #title>
            <div class="flex mb-8 mt-4 items-center justify-between relative w-[80rem]">
                <div class="flex">
                    <div class="px-4 py-1">
                        <span class="block font-bold text-center text-fuente-500 text-[26px] uppercase">
                            VENTAS
                        </span>
                    </div>
                    <div class="px-4 py-1 border-gray-600">
                        <span
                            class="block px-4 text-[24px] font-bold text-center border-2 text-fuente-500 border-aqua-500 rounded-3xl">
                            {{ dataCalendar.date }}
                        </span>
                    </div>
                </div>
                <!-- <div>
                                                                                    <InputSearch v-model="searchText" class="flex items-center p-4 w-80" />
                                                                                </div>
                                                                                <img :src="cerrar" alt="" class="absolute left-[87.5rem] w-[17px] h-[17px] hover:cursor-pointer"
                                                                                    @click="close()" /> -->
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="uppercase border-b-2 border-aqua-500 text-[15px] font-semibold">
                        <th class=""></th>
                        <th class="">NOMBRE</th>
                        <th class="">SUBTOTAL</th>
                        <th class="">TOTAL</th>
                        <th class="">COMENTARIO</th>
                    </tr>
                </template>
                <template #tbody>
                    <tr v-for="(venta, index) in dataCalendar.data" :key="index" :class="{
                        'bg-aqua-500 text-white':
                            !venta.revisado,
                    }">
                        <td>
                            <span class="block w-full hover:opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5 mx-auto"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </span>

                        </td>
                        <td>{{ venta.nombre }}</td>
                        <td>{{ venta.subtotal }}</td>
                        <td>{{ venta.total }}</td>
                        <td>{{ venta.comentario }}</td>
                    </tr>
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
<style>
.tooltip {
    display: block;
    padding-bottom: 4rem;
    align-items: center;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: auto;
    background-color: #0a0f2c;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>
