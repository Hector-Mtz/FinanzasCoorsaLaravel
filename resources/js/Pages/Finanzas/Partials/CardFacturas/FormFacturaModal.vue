<script setup>
import { computed, reactive } from "vue";
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';

import axios from "axios";

import { Inertia } from "@inertiajs/inertia";
import folder from "../../../../../img/elementos/agregar-documento.png";
import JetButton from "@/Jetstream/Button.vue";
import JetLabel from "@/Jetstream/Label.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import DialogModal from "@/Components/DialogModal.vue";
import Input from "@/Components/Input.vue";
import SpinProgress from "@/Components/SpinProgress.vue";
import DropZone from '@/Components/DropZone.vue';

const emit = defineEmits(["close", "addFactura", "editFactura"]);
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
    documento:"",
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
    if (props.typeForm === "create") {
        create();
    } else {
        update();
    }
};

const create = () => {
    form.post(route('facturas.store'),
    {
        preserveScroll:true,
        preserveState:true,
        onSuccess:() => restForm()
    })
    /*
    axios
        .post(route("facturas.store"), form, {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then(() => {
            emit("addFactura");
            form.recentlySuccessful = true;
            restForm();
            Inertia.visit(route("ventas.index"), {
                preserveState: true,
                preserveScroll: true,
                only: ["totalOcs"],
            });
            setTimeout(() => {
                close();
            }, 500);
        })
        .catch((error) => {
            form.hasErrors = true;
            if (error.response.data.hasOwnProperty("errors")) {
                const errors = error.response.data.errors;
                for (let error in errors) {
                    form.errors[error] = errors[error][0];
                }
                form.error = error.response.data.message;
            } else {
                if (error.response.data.hasOwnProperty("message")) {
                    form.error = error.response.data.message;
                } else {
                    form.error = "Error CREATE FACTURA";
                }
            }
        })
        .then(() => {
            // always
            form.processing = false;
            Inertia.visit(route("ventas.index"), {
                preserveState: true,
                preserveScroll: true,
                only: ["totalOcs"],
            });
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
        });
        */
};
const update = () => {
    axios
        .put(route("facturas.update", props.factura.id), form, {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("editFactura", resp.data);
            form.recentlySuccessful = true;
            restForm();
            Inertia.visit(route("ventas.index"), {
                preserveState: true,
                preserveScroll: true,
                only: ["totalOcs"],
            });
            setTimeout(() => {
                close();
            }, 500);
        })
        .catch((error) => {
            form.hasErrors = true;
            console.log(error);
            if (error.response.data.hasOwnProperty("errors")) {
                const errors = error.response.data.errors;
                for (let error in errors) {
                    form.errors[error] = errors[error][0];
                }
                form.error = error.response.data.message;
            } else {
                if (error.response.data.hasOwnProperty("message")) {
                    form.error = error.response.data.message;
                } else {
                    form.error = "ERROR UPDATE FACTURA";
                }
            }
        })
        .then(() => {
            // always
            form.processing = false;
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
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
                <img
                    :src="cerrar"
                    alt=""
                    class="absolute left-[30rem] top-[1rem] hover:cursor-pointer"
                    @click="close()"
                />
            </div>
        </template>
        <template #content>
            <form @submit.prevent="createOrUpdate()">
                <div class="flex flex-col px-4 py-2 mb-8 gap-x-2 gap-y-6">
                    <div>
                        <Input
                            placeholder="Referencia"
                            id="referencia"
                            name="referencia"
                            type="text"
                            v-model="form.referencia"
                            required
                            class="text-[14px] font-light uppercase"
                            maxlength="30"
                        />
                        <JetInputError
                            :message="form.errors.referencia"
                            class="mt-2"
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Fecha de PAgo"
                            id="fechaDePago"
                            name="fecha_final"
                            type="date"
                            v-model="form.fechaDePago"
                            required
                            :min="form.fechaInicial"
                            class="text-[14px] font-light uppercase"
                        />
                        <JetInputError
                            :message="form.errors.fechaDePago"
                            class="mt-2"
                        />
                    </div>
                    <div>
                        <JetLabel for="documento" value="Documento" />
                        <DropZone v-model="form.documento" />
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2">
                    <JetButton type="submit" :disabled="form.processing">
                        <SpinProgress :inprogress="form.processing" />
                        <template v-if="form.referencia === ''">
                            Agregar
                        </template>
                        <template v-else> Actualizar</template>
                    </JetButton>
                </div>
            </form>
        </template>
    </DialogModal>
</template>
