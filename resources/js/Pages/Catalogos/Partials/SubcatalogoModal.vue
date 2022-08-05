<script setup>
import { ref, watch, watchEffect } from 'vue';

import ButtonAdd from '@/Components/ButtonAdd.vue';
import DialogModal from '@/Components/DialogModal.vue';
import TableComponent from '@/Components/Table.vue';
import SuccessButton from '@/Components/SuccessButton.vue';
import PaginationAxios from '../../../Components/PaginationAxios.vue';
import { pickBy } from 'lodash';
import InputSearch from '../../../Components/InputSearch.vue';
import FormSubCatalogoModal from './FormSubCatalogoModal.vue';

const emit = defineEmits(["close"])
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
    }

});
const showingForm = ref(false);
const typeForm = ref("create");
const searchText = ref("");
const subCatalogo = ref({});
const listSubCatalogo = ref({ data: [] });

// MODALS FUNCITON
const showForm = (objectSelect) => {
    if (objectSelect === undefined) {
        typeForm.value = "create"
    } else {
        typeForm.value = "update"
        subCatalogo.value = objectSelect
    }
    showingForm.value = true
}



const search = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page })
    const resp = await axios.get(route(`${props.routeName}.index`, props.object.id), { params });
    listSubCatalogo.value = resp.data;
}

let timeout;
watch(searchText, (newSearch) => {
    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    //Bounce de busqueda
    timeout = setTimeout(() => {
        search(newSearch)
    }, 300);
});


// EN MODALS FUNCTION

const updateObj = (newObj) => {
    let objIndex = listSubCatalogo.value.data.findIndex((ob) => ob.id === newObj.id);
    listSubCatalogo.value.data[objIndex] = newObj;
}


const close = () => {
    listSubCatalogo.value = { data: [] };
    emit('close');
};


watchEffect(() => {
    if (props.show) {
        search();
    }
})

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row">

                <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
                    <span class="block font-bold text-center text-white">
                        {{ props.object.nombre }}
                    </span>
                    <InputSearch v-model="searchText" />
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex flex-col items-center justify-center gap-1 text-white">
                        <span class="block font-bold text-center text-gray-300">
                            {{ props.title }}
                        </span>
                        <ButtonAdd class="h-5" @click="showForm()" />
                    </div>
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #tbody>
                    <template v-if="props.routeName === 'montos'">
                        <tr v-for="subcatalogo in listSubCatalogo.data" :key="subcatalogo.id">
                            <td>
                                {{ subcatalogo.cantidad }}
                            </td>
                            <td>
                                <div class="flex justify-center">
                                    <SuccessButton @click="showForm(subcatalogo)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </SuccessButton>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="subcatalogo in listSubCatalogo.data" :key="subcatalogo.id">
                            <td>
                                {{ subcatalogo.nombre }}
                            </td>
                            <td>
                                <div class="flex justify-center">
                                    <SuccessButton @click="showForm(subcatalogo)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </SuccessButton>
                                </div>
                            </td>
                        </tr>
                    </template>
                </template>
            </TableComponent>
            <PaginationAxios :pagination="listSubCatalogo" />
            <!-- MODALS -->
            <FormSubCatalogoModal :padre-id="props.object.id" :route-name="props.routeName" :title="props.title"
                :show="showingForm" :type-form="typeForm" :object="subCatalogo"
                @add="search(searchText, listSubCatalogo.current_page)" @edit="updateObj($event)"
                @close="showingForm = false" />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
