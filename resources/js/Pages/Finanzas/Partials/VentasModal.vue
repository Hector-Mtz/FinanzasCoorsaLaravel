<script setup>
import DialogModal from '../../../Components/DialogModal.vue';
import ButtonAdd from '../../../Components/ButtonAdd.vue';

const emit = defineEmits(["close", "showAddVenta"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})


const close = () => {
    emit('close');
};

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex border-b-4 border-gray-600">
                <div class="px-4 py-1 border-r-4 border-gray-600">
                    <span>
                        Ventas
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex justify-center">
                        <ButtonAdd @click="emit('showAddVenta')" class="text-sm text-white h-7">
                            Agregar
                        </ButtonAdd>
                    </div>
                </div>
            </div>
        </template>
        <template #body>
        </template>
    </DialogModal>
</template>
