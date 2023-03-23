<script setup>
import { ref, watch, watchEffect } from "vue";

import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import ModalButton from "@/Components/ModalButton.vue";
import PaginationAxios from "../../../Components/PaginationAxios.vue";
import { pickBy } from "lodash";
import InputSearch from "../../../Components/InputSearch.vue";
import FormSubCatalogoModal from "./FormSubCatalogoModal.vue";
import cerrar from "../../../../img/elementos/cerrar.png";
import edit from "../../../../img/elementos/editar.png";

const emit = defineEmits(["close"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    routeName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    object: {
        type: Object,
        required: true,
    },
});
const showingForm = ref(false);
const typeForm = ref("create");
const searchText = ref("");
const subCatalogo = ref({});
const listSubCatalogo = ref({ data: [] });

// MODALS FUNCITON
const showForm = (objectSelect) => {
    if (objectSelect === undefined) {
        typeForm.value = "create";
    } else {
        typeForm.value = "update";
        subCatalogo.value = objectSelect;
    }
    showingForm.value = true;
};

const search = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page });
    const resp = await axios.get(
        route(`${props.routeName}.index`, props.object.id),
        { params }
    );
    listSubCatalogo.value = resp.data;
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
    let objIndex = listSubCatalogo.value.data.findIndex(
        (ob) => ob.id === newObj.id
    );
    listSubCatalogo.value.data[objIndex] = newObj;
};

const close = () => {
    listSubCatalogo.value = { data: [] };
    emit("close");
};

watchEffect(() => {
    if (props.show) {
        search();
    }
});
</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row justify-between items-center my-6 gap-20">
                <div class="px-4 py-1 flex items-center gap-4">
                    <span
                        class="block font-semibold text-[28px] w-min text-fuente-500"
                    >
                        {{ props.object.nombre }}
                    </span>

                    <ButtonAdd class="h-[25px] w-[35px]" @click="showForm()" />
                </div>
                <div class="px-2 py-1">
                    <div
                        class="flex flex-col items-center justify-center gap-1 text-fuente-500"
                    >
                        <span class="block font-normal text-fuente-500">
                            {{ props.title }}
                        </span>
                        <InputSearch v-model="searchText" class="px-2 py-1" />
                    </div>
                </div>
                <img
                    :src="cerrar"
                    alt=""
                    @click="close"
                    class="absolute hover:cursor-pointer top-[.8rem] left-[95.5%]"
                />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #tbody>
                    <template v-if="props.routeName === 'montos'">
                        <tr
                            v-for="subcatalogo in listSubCatalogo.data"
                            :key="subcatalogo.id"
                        >
                            <td>
                                {{ subcatalogo.cantidad }}
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
                    <template v-else>
                        <tr
                            v-for="subcatalogo in listSubCatalogo.data"
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
                </template>
            </TableComponent>
            <PaginationAxios :pagination="listSubCatalogo" />
            <!-- MODALS -->
            <FormSubCatalogoModal
                :padre-id="props.object.id"
                :route-name="props.routeName"
                :title="props.title"
                :show="showingForm"
                :type-form="typeForm"
                :object="subCatalogo"
                @add="search(searchText, listSubCatalogo.current_page)"
                @edit="updateObj($event)"
                @close="showingForm = false"
            />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
