<script setup>
import { computed, reactive } from "vue";
import axios from "axios";
import JetButton from "@/Jetstream/Button.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import folder from "../../../../../img/elementos/agregar-documento.png";
import DialogModal from "@/Components/DialogModal.vue";
import Input from "@/Components/Input.vue";
import SpinProgress from "@/Components/SpinProgress.vue";
import { Inertia } from "@inertiajs/inertia";
import DropZone from '@/Components/DropZone.vue';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

const emit = defineEmits(["close", "addOc", "editOc"]);

let nowDate = new Date();
const month = nowDate.getMonth() + 1;
nowDate =
    nowDate.getFullYear() +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate());
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: "create",
    },
    oc: {
        type: Object,
        required: false,
    },
    venta: {
        type: Object,
        required: false,
    },
});

const form = useForm({
    nombre: "",
    cantidad: "",
    fecha_alta: nowDate,
    status_id: "",
    venta_id: "",
    hasErrors: false,
    errors: [],
    error: "",
    recentlySuccessful: false,
    processing: false,
    documento: null
});

const titleModal = computed(() => {
    if (props.typeForm === "create") {
        restForm();
        form.fecha_alta = nowDate;

        return "Nueva Oc";
    } else {
        form.nombre = props.oc.nombre;
        form.cantidad = props.oc.cantidad;
        form.fecha_alta = props.oc.fecha_alta.split("/").reverse().join("-");
        form.status_id = props.oc.status_id;
        form.venta_id = props.oc.venta_id;
        return "Actualizar Oc";
    }
});

function restForm() {
    form.nombre = "";
    form.cantidad = "";
    form.fecha_alta = "";
    form.status_id = "";
    form.venta_id = "";
    form.venta_id = props.venta.id;
    form.hasErrors = false;
    form.errors = {};
    form.error = "";
    form.documento = null;
}

const close = () => {
    form.hasErrors = false;
    form.errors = {};
    form.error = "";
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
    form.post(route('ocs.store'), {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => Inertia.visit(route("finanzas.index"), {
            preserveState: true,
            preserveScroll: true,
            only: ["totalOcs"],
        }),
        onSuccess: () => { close(), form.reset() },
    });
    /*
    axios
        .post(route("ocs.store"), form, {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("addOc", resp.data);
            form.recentlySuccessful = true;
            restForm();
            Inertia.visit(route("vfinanzas.index"), {
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
                    form.error = "Error CREATE OC";
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
        */
};
const update = () => {
    form.post(route("ocs.update", props.oc.id),
        {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => Inertia.visit(route("finanzas.index"), {
                preserveState: true,
                preserveScroll: true,
                only: ["totalOcs"],
            }),
            onSuccess: () => { emit("editOc", props.oc), close() }
        });

    /*
    axios
        .put(route("ocs.update", props.oc.id), form, {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("editOc", resp.data);
            form.recentlySuccessful = true;
            restForm();
            Inertia.visit(route("finanzas.index"), {
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
                    form.error = "ERROR UPDATE OC";
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
        */
};
</script>
<template>
    <DialogModal :maxWidth="'xl'" :show="show" @close="close()">
        <template #title>
            <div class="relative flex justify-start">
                <div class="px-4 py-1 text-center">
                    <span class="text-3xl font-bold">
                        {{ titleModal }}
                    </span>
                    <JetInputError :message="form.error" class="mt-2" />
                </div>
                <div class="absolute left-[94%] top-[5%] hover:cursor-pointer" @click="close">
                    <img :src="cerrar" alt="" />
                </div>
            </div>
        </template>
        <template #content>
            <form @submit.prevent="createOrUpdate()">
                <div class="grid px-4 mt-4 mb-12 gap-x-2 gap-y-6">
                    <div>
                        <Input id="nombre" name="nombre" type="text" placeholder="NOMBRE" v-model="form.nombre" required
                            maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>
                    <div>
                        <Input id="fecha_alta" name="fecha_alta" type="date" placeholder="FECHA INICIAL" min="2000-01-02"
                            v-model="form.fecha_alta" required />
                        <JetInputError :message="form.errors.fecha_alta" class="mt-2" />
                    </div>
                    <div class="flex justify-between">
                        <div>
                            <Input id="cantidad" name="cantidad" type="text" pattern="^\d*(\.\d{0,2})?$"
                                placeholder="CANTIDAD" v-model="form.cantidad" required maxlength="30" />
                            <JetInputError :message="form.errors.cantidad" class="mt-2" />
                        </div>
                        <div>
                            <DropZone v-model="form.documento" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2">
                    <JetButton type="submit" :disabled="form.processing">
                        <SpinProgress :inprogress="form.processing" />
                        <template v-if="form.nombre === ''"> Agregar </template>
                        <template v-else>Actualizar</template>
                    </JetButton>
                </div>
            </form>
        </template>
    </DialogModal>
</template>
