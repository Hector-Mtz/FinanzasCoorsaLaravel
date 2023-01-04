<script setup>
import { ref, watch, watchEffect } from 'vue';

import ButtonAdd from '@/Components/ButtonAdd.vue';
import DialogModal from '@/Components/DialogModal.vue';
import TableComponent from '@/Components/Table.vue';
import SuccessButton from '@/Components/SuccessButton.vue';
import PaginationAxios from '../../../Components/PaginationAxios.vue';
import { pickBy } from 'lodash';
import InputSearch from '../../../Components/InputSearch.vue';
import FormClienteCeco from './FormClienteCeco.vue';

const emit = defineEmits(["close"])
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
        required: true
    }

});
const showingForm = ref(false);
const typeForm = ref("create");
const searchText = ref("");
const ceco = ref({});
const listCecos = ref({ data: [] });

// MODALS FUNCITON
const showForm = (cecoSelect) => {
    if (cecoSelect === undefined) {
        typeForm.value = "create"
    } else {
        typeForm.value = "update"
        ceco.value = cecoSelect
    }
    showingForm.value = true
}



const search = async (newSearch, page) => {
    const params = pickBy({ search: newSearch, page })
    const resp = await axios.get(route('cecos.index', props.cliente.id), { params });
    listCecos.value = resp.data;
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
    let objIndex = listCecos.value.data.findIndex((ob) => ob.id === newObj.id);
    listCecos.value.data[objIndex] = newObj;
}


const close = () => {
    listCecos.value = { data: [] };
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
                        {{ props.cliente.nombre }}
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

                    <tr v-for="subcatalogo in listCecos.data" :key="subcatalogo.id">
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
            </TableComponent>
            <PaginationAxios :pagination="listCecos" />
            <!-- MODALS -->
            <FormClienteCeco :padre-id="props.cliente.id" :title="props.title" :show="showingForm" :type-form="typeForm"
                :ceco="ceco" :lineas-negocios="props.lineasNegocios" @add="search(searchText, listCecos.current_page)"
                @edit="updateObj($event)" @close="showingForm = false" />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
