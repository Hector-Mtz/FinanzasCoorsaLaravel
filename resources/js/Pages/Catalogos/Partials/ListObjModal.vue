<script setup>
import { ref, watchEffect } from "vue";

import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import FormModal from "./FormModal.vue";
import SuccessButton from "@/Components/SuccessButton.vue";

const emit = defineEmits(["close", "add"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    listObj: {
        type: Object,
        required: true,
    },
    routeName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});
const showingForm = ref(false);
const object = ref({});
const typeForm = ref("create");

// MODALS FUNCITON
const showForm = (objectSelect) => {
    if (objectSelect === undefined) {
        typeForm.value = "create";
    } else {
        typeForm.value = "update";
        object.value = objectSelect;
    }
    showingForm.value = true;
};
const updateObj = (newObj) => {
    const objIndex = props.listObj.findIndex((ob) => ob.id === newObj.id);
    props.listObj[objIndex] = newObj;
};

// EN MODALS FUNCTION

const close = () => {
    emit("close");
};
</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row">
                <div class="px-4 py-1">
                    <span class="block font-bold text-center text-fuente-500">
                        {{ props.title }}
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div
                        class="flex items-center justify-center gap-1 text-fuente-500"
                    >
                        <span
                            class="block font-bold text-center text-fuente-500"
                        >
                            Agregar
                        </span>
                        <ButtonAdd class="h-5" @click="showForm()" />
                    </div>
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #tbody>
                    <tr v-for="obj in props.listObj" :key="obj.id">
                        <td>
                            {{ obj.nombre }}
                        </td>
                        <td>
                            <div class="flex justify-center">
                                <SuccessButton @click="showForm(obj)">
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
                            </div>
                        </td>
                    </tr>
                </template>
            </TableComponent>
            <!-- MODALS -->
            <FormModal
                :route-name="props.routeName"
                :title="props.title"
                :show="showingForm"
                :type-form="typeForm"
                :object="object"
                @add="emit('add')"
                @edit="updateObj($event)"
                @close="showingForm = false"
            />
            <!-- ENDS MODALS -->
        </template>
    </DialogModal>
</template>
