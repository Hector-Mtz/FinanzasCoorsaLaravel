<script setup>
import { reactive } from "vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import InputSearch from "@/Components/InputSearch.vue";
import SubModal from "./SubModal.vue";

const emit = defineEmits(["close"]);
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


const ocsModal = reactive({
    showing: false,
    ruta: "",
    title: ""
})

const showOcs = (venta) => {
    ocsModal.ruta = route('ventas.ocs.index', venta.id),
        ocsModal.title = 'OCS',
        ocsModal.showing = true;
}

const closeOcs = () => {
    ocsModal.ruta = "",
        ocsModal.title = 'Venta ',
        ocsModal.showing = false;
}


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
                        <th class="">FINALIZADO</th>
                    </tr>
                </template>
                <template #tbody>
                    <tr v-for="(venta, index) in dataCalendar.data" :key="index" :class="{
                        'bg-aqua-500 text-white':
                            venta.revisado,
                    }">
                        <td>
                            <span class="block w-full hover:opacity-60" @click="showOcs(venta)">
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
                        <td>
                            <svg v-if="venta.finalizado" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="mx-auto" viewBox="0 0 16 16">
                                <path
                                    d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                <path
                                    d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="mx-auto"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            </svg>
                        </td>
                    </tr>
                </template>
            </TableComponent>
            <!-- Modal -->
            <SubModal :show="ocsModal.showing" :ruta="ocsModal.ruta" @close="closeOcs()" />
        </template>

    </DialogModal>
</template>
