<script setup>
import { computed, reactive } from "vue";

import axios from "axios";

import { Inertia } from "@inertiajs/inertia";
import folder from "../../../../../img/elementos/agregar-documento.png";
import JetButton from "@/Jetstream/Button.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import DialogModal from "@/Components/DialogModal.vue";
import Input from "@/Components/Input.vue";
import SpinProgress from "@/Components/SpinProgress.vue";

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

const form = reactive({
    cantidad: "",
    referencia: "",
    fechaDePago: "",
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
                <div class="flex flex-col gap-2 px-4 py-2 text-sm mb-8">
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
                    <div class="flex justify-between">
                        <div>
                            <Input
                                placeholder="Cantidad"
                                id="cantidad"
                                name="cantidad"
                                type="text"
                                pattern="^\d*(\.\d{0,2})?$"
                                v-model="form.cantidad"
                                required
                                maxlength="30"
                                class="text-[14px] font-light uppercase w-[220px]"
                            />
                            <JetInputError
                                :message="form.errors.cantidad"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="w-[74px] h-[35px] bg-aqua-500 grid place-content-center rounded-2xl hover:cursor-pointer"
                        >
                            <img :src="folder" alt="" class="" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2">
                    <JetButton type="submit" :disabled="form.processing">
                        <SpinProgress :inprogress="form.processing" />
                        Agregar
                    </JetButton>
                </div>
            </form>
        </template>
    </DialogModal>
</template>
