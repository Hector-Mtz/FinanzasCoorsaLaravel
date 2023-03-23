<script setup>
import { computed, reactive } from "vue";

import axios from "axios";

import { Inertia } from "@inertiajs/inertia";

import JetLabel from "@/Jetstream/Label.vue";
import JetButton from "@/Jetstream/Button.vue";
import JetInputError from "@/Jetstream/InputError.vue";

import DialogModal from "@/Components/DialogModal.vue";
import Input from "@/Components/Input.vue";
import ListDataInput from "@/Components/ListDataInput.vue";
import SpinProgress from "@/Components/SpinProgress.vue";
import SelectComponent from "@/Components/SelectComponent.vue";
import cerrar from "../../../../img/elementos/cerrar.png";

const emit = defineEmits(["close", "add", "edit"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: "create",
    },
    object: {
        type: Object,
        required: false,
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

const form = reactive({
    nombre: "",
    hasErrors: false,
    errors: [],
    error: "",
    recentlySuccessful: false,
    processing: false,
});

const titleModal = computed(() => {
    if (props.typeForm === "create") {
        restForm();
        return "Nuevo " + props.title.slice(0, -1);
    } else {
        form.nombre = props.object.nombre;
        return "Actualizar " + props.title.slice(0, -1);
    }
});

function restForm() {
    form.nombre = "";
    form.hasErrors = false;
    form.errors = [];
    form.error = "";
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
        .post(route(`${props.routeName}.store`), form, {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then(() => {
            emit("add");
            form.recentlySuccessful = true;
            restForm();
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
                form.error = "Error CREATE " + props.routeName;
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
const update = () => {
    axios
        .put(route(`${props.routeName}.update`, props.object.id), form, {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("edit", resp.data);
            form.recentlySuccessful = true;
            setTimeout(() => {
                restForm();
                close();
            }, 500);
        })
        .catch((error) => {
            form.hasErrors = true;
            console.log(error);
            if (
                error.hasOwnProperty("response") &&
                error.response.data.hasOwnProperty("errors")
            ) {
                const errors = error.response.data.errors;
                for (let error in errors) {
                    form.errors[error] = errors[error][0];
                }
                form.error = error.response.data.message;
            } else {
                form.error = "Error UPDATE " + props.routeName;
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
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="px-4 py-1 flex items-center justify-between my-6">
                <div>
                    <span class="font-semibold text-[32px] text-fuente-500">
                        {{ titleModal }}
                    </span>
                    <JetInputError :message="form.error" class="mt-2" />
                </div>
                <img
                    :src="cerrar"
                    alt=""
                    class="absolute left-[95.5%] top-[5%] hover:cursor-pointer"
                    @click="close"
                />
            </div>
        </template>
        <template #content>
            <form @submit.prevent="createOrUpdate()">
                <div
                    class="grid gap-x-2 gap-y-6 px-4 py-2 text-[14px] font-light my-6"
                >
                    <div>
                        <Input
                            placeholder="Nombre"
                            id="nombre"
                            name="referencia"
                            type="text"
                            v-model="form.nombre"
                            required
                            maxlength="30"
                        />
                        <JetInputError
                            :message="form.errors.nombre"
                            class="mt-2"
                        />
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2">
                    <JetButton type="submit" :disabled="form.processing">
                        <SpinProgress :inprogress="form.processing" />
                        <template v-if="form.nombre === ''">Agregar</template>
                        <template v-else>Actualizar</template>
                    </JetButton>
                </div>
            </form>
        </template>
    </DialogModal>
</template>
