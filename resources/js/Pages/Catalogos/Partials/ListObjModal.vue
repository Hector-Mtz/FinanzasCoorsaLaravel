<script setup>
import { ref, watchEffect } from "vue";

import ButtonAdd from "@/Components/ButtonAdd.vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";
import FormModal from "./FormModal.vue";
import ModalButton from "@/Components/ModalButton.vue";
import cerrar from "../../../../img/elementos/cerrar.png";
import edit from "../../../../img/elementos/editar.png";
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
    <DialogModal :show="show" @close="close()" :maxWidth="'xl'">
        <template #title>
            <div class="flex justify-between items-center my-6">
                <div class="px-4 py-1 flex gap-8 items-center">
                    <span
                        class="block font-semibold text-[28px] text-center text-fuente-500"
                    >
                        {{ props.title }}
                    </span>
                    <ButtonAdd class="h-[25px] w-[35px]" @click="showForm()" />
                </div>
                <div
                    class="flex items-center justify-center gap-1 text-fuente-500"
                ></div>
                <img
                    :src="cerrar"
                    alt=""
                    @click="close"
                    class="absolute top-[1rem] left-[95.5%] hover:cursor-pointer"
                />
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #tbody>
                    <tr
                        v-for="obj in props.listObj"
                        :key="obj.id"
                        class="text-[16px] font-light text-start"
                    >
                        <td class="px-4 pt-1">
                            {{ obj.nombre }}
                        </td>
                        <td class="px-4 pt-1">
                            <div class="flex justify-center">
                                <ModalButton @click="showForm(obj)">
                                    <img :src="edit" alt="" />
                                </ModalButton>
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
