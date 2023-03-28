<script setup>
import { computed, reactive } from "vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";

import axios from "axios";

import { Inertia } from "@inertiajs/inertia";
import JetButton from "@/Jetstream/Button.vue";
import JetLabel from "@/Jetstream/Label.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import DialogModal from "@/Components/DialogModal.vue";
import Input from "@/Components/Input.vue";
import SpinProgress from "@/Components/SpinProgress.vue";
import DropZone from "@/Components/DropZone.vue";

const emit = defineEmits(["close", "updateFacturas"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: "create",
    },
    factura: {
        type: Object,
        required: false,
    },
});

const form = useForm({
    cantidad: "",
    referencia: "",
    fechaDePago: "",
    documento: "",
    hasErrors: false,
    errors: [],
    error: "",
    recentlySuccessful: false,
    processing: false,
});

const titleModal = computed(() => {
    if (props.typeForm === "create") {
        restForm();
        return "Nueva Factura";
    } else {
        form.cantidad = props.factura.cantidad;
        form.referencia = props.factura.referencia;
        form.fechaDePago = props.factura.fechaDePago;
        return "Actualizar Factura";
    }
});

function restForm() {
    form.cantidad = "";
    form.referencia = "";
    form.fechaDePago = "";
    form.documento = "";
}

const close = () => {
    emit("close");
};

const createOrUpdate = () => {
    console.log("Entra aqui");
    if (props.typeForm === "create") {
        create();
    } else {
        update();
    }
};

const create = () => {
    form.post(route('facturas.store'),
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                restForm();
                emit("updateFacturas");
                close();
            },
            onFinish: () => Inertia.visit(route("finanzas.index"),
                {
                    preserveScroll: true,
                    preserveState: true,
                    only: ["totalOcs"]
                })
        });
};
const update = () => {
    form.post(route("facturas.update", props.factura.id),
        {
            onSuccess: () => {
                restForm();
                emit("updateFacturas");
                close();
            },
            onFinish: () => Inertia.visit(route("finanzas.index"),
                {
                    preserveScroll: true,
                    preserveState: true,
                    only: ["totalOcs"]
                }),
            preserveScroll: true,
            preserveState: true
        });
};
</script>
<template>
    <DialogModal :show="show" @close="close()" :maxWidth="'lg'">
        <template #title>
            <div>
                <div class="px-4 py-4 text-start">
                    <span class="font-bold text-fuente-500 text-[32px]">
                        {{ titleModal }}
                    </span>
                    <JetInputError :message="form.error" class="mt-2" />
                </div>
                <img :src="cerrar" alt="" class="absolute left-[30rem] top-[1rem] hover:cursor-pointer" @click="close()" />
            </div>
        </template>
        <template #content>
            <form @submit.prevent="createOrUpdate()">
                <div class="flex flex-col px-4 py-2 mb-8 gap-x-2 gap-y-6">
                    <div>
                        <JetLabel for="referencia" value="Referencia" />
                        <Input placeholder="Referencia" id="referencia" name="referencia" type="text"
                            v-model="form.referencia" required class="text-[14px] font-light uppercase" maxlength="30" />
                        <JetInputError :message="form.errors.referencia" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="fechaDePago" value="Fecha de pago" />
                        <Input placeholder="Fecha de Pago" id="fechaDePago" name="fecha_final" type="date"
                            v-model="form.fechaDePago" required :min="form.fechaInicial"
                            class="text-[14px] font-light uppercase" />
                        <JetInputError :message="form.errors.fechaDePago" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="cantidad" value="Cantidad" />
                        <Input placeholder="Cantidad" name="cantidad" type="number" v-model="form.cantidad" required
                            :min="form.cantidad" class="text-[14px] font-light uppercase" />
                        <JetInputError :message="form.errors.fechaDePago" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="documento" value="Documento" />
                        <DropZone v-model="form.documento" />
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2">
                    <JetButton type="submit" :disabled="form.processing">
                        <SpinProgress :inprogress="form.processing" />
                        <template v-if="props.typeForm === 'create'">
                            Agregar
                        </template>
                        <template v-else> Actualizar</template>
                    </JetButton>
                </div>
            </form>
        </template>
    </DialogModal>
</template>
