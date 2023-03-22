<script setup>
import DialogModal from "@/Components/DialogModal.vue";
import del from "../../../../../img/elementos/eliminar grande.png";

const emit = defineEmits(["close", "delete"]);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: "2xl",
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    oc: {
        type: Object,
    },
});

const close = () => {
    emit("close");
};
</script>

<template>
    <DialogModal
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
    >
        <template #title>
            <div class="flex justify-center pt-8 mb-4">
                <div
                    class="bg-gris-500 p-5 rounded-full w-24 flex justify-center"
                >
                    <img :src="del" alt="" />
                </div>
            </div>
        </template>
        <template #content>
            <div class="grid gap-8 pb-8 px-4">
                <div class="text-3xl text-center font-semibold">
                    <h1>¿Seguro que desea eliminar la Venta?</h1>
                </div>
                <div class="flex justify-evenly text-xl font-semibold">
                    <button @click="close">Cancel</button>
                    <button
                        class="bg-rojo-500 px-3 py-1 rounded-md text-white"
                        @click="emit('delete', props.oc)"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </template>
    </DialogModal>
</template>
