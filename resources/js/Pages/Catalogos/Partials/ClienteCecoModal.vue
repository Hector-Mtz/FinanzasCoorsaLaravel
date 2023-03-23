<script setup>
import { ref, watch, watchEffect } from "vue";

import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import ModalButton from "@/Components/ModalButton.vue";
import PaginationAxios from "../../../Components/PaginationAxios.vue";
import { pickBy } from "lodash";
import InputSearch from "../../../Components/InputSearch.vue";
import FormClienteCeco from "./FormClienteCeco.vue";
import cerrar from "../../../../img/elementos/cerrar.png";
import edit from "../../../../img/elementos/editar.png";

const emit = defineEmits(["close"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,
    },
    cliente: {
        type: Object,
        required: true,
    },
    lineasNegocios: {
        type: Object,
        required: true,
    },
});
const showingForm = ref(false);
const typeForm = ref("create");
const searchText = ref("");
const ceco = ref({});
const listCecos = ref({ data: [] });

// MODALS FUNCITON
const showForm = (cecoSelect) => {
    if (cecoSelect === undefined) {
        typeForm.value = "create";
    } else {
        typeForm.value = "update";
        ceco.value = cecoSelect;
    }
    showingForm.value = true;
};

const search = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page });
    const resp = await axios.get(route("cecos.index", props.cliente.id), {
        params,
    });
    listCecos.value = resp.data;
};

let timeout;
watch(searchText, (newSearch) => {
    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    //Bounce de busqueda
    timeout = setTimeout(() => {
        search(newSearch);
    }, 300);
});

// EN MODALS FUNCTION

const updateObj = (newObj) => {
    let objIndex = listCecos.value.data.findIndex((ob) => ob.id === newObj.id);
    listCecos.value.data[objIndex] = newObj;
};

const close = () => {
    listCecos.value = { data: [] };
    emit("close");
};

watchEffect(() => {
    if (props.show) {
        search();
    }
});
</script>
<template>
    <DialogModal :show="show" @close="close()" :maxWidth="'3xl'">
        <template #title>
            <div class="flex items-center my-6 gap-14">
                <div class="px-4 py-1 flex items-center">
                    <span
                        class="block font-semibold text-[28px] text-fuente-500 w-fit"
                    >
                        {{ props.cliente.nombre }}
                    </span>
                    <ButtonAdd class="h-[25px] w-[35px]" @click="showForm()" />
                </div>
                <div class="px-2 py-1">
                    <div
                        class="flex flex-col items-center justify-center gap-1 text-fuente-500"
                    >
                        <span
                            class="block font-normal text-center text-fuente-500"
                        >
                            {{ props.title }}
                        </span>
                        <InputSearch
                            v-model="searchText"
                            class="px-2 py-1 w-80"
                        />
                    </div>
                </div>
                <img
                    :src="cerrar"
                    alt=""
                    class="absolute left-[95.5%] top-[5%] hover:cursor-pointer"
                    @click="close"
                />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #tbody>
                    <tr
                        v-for="subcatalogo in listCecos.data"
                        :key="subcatalogo.id"
                    >
                        <td>
                            {{ subcatalogo.nombre }}
                        </td>
                        <td>
                            <div class="flex justify-center">
                                <ModalButton @click="showForm(subcatalogo)">
                                    <img :src="edit" alt="" />
                                </ModalButton>
                            </div>
                        </td>
                    </tr>
                </template>
            </TableComponent>
            <PaginationAxios :pagination="listCecos" />
            <!-- MODALS -->
            <FormClienteCeco
                :padre-id="props.cliente.id"
                :title="props.title"
                :show="showingForm"
                :type-form="typeForm"
                :ceco="ceco"
                :lineas-negocios="props.lineasNegocios"
                @add="search(searchText, listCecos.current_page)"
                @edit="updateObj($event)"
                @close="showingForm = false"
            />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
