<script setup>
import { computed, reactive } from 'vue';

import axios from 'axios';

import JetLabel from '@/Jetstream/Label.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInputError from '@/Jetstream/InputError.vue';

import DialogModal from '@/Components/DialogModal.vue';
import Input from '@/Components/Input.vue';
import ListDataInput from '@/Components/ListDataInput.vue';
import SpinProgress from '@/Components/SpinProgress.vue';
import SelectComponent from '@/Components/SelectComponent.vue';
import { Inertia } from '@inertiajs/inertia';

const emit = defineEmits(["close", "addOc", "editOc"]);

let nowDate = new Date();
const month = nowDate.getMonth() + 1;
nowDate = nowDate.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate());
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: 'create'
    },
    oc: {
        type: Object,
        required: false
    },
    venta: {
        type: Object,
        required: false
    }
});




const form = reactive({
    'nombre': "",
    'cantidad': "",
    'fecha_alta': nowDate,
    'status_id': "",
    'venta_id': "",
    'hasErrors': false,
    'errors': [],
    'error': "",
    'recentlySuccessful': false,
    'processing': false,
});

const titleModal = computed(() => {
    if (props.typeForm === 'create') {
        restForm();
        form.fecha_alta = nowDate;

        return "Nueva Oc"
    } else {
        form.nombre = props.oc.nombre;
        form.cantidad = props.oc.cantidad;
        form.fecha_alta = props.oc.fecha_alta.split('/').reverse().join('-');
        form.status_id = props.oc.status_id;
        form.venta_id = props.oc.venta_id;
        return "Actualizar Oc"
    }
})

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
}

const close = () => {
    form.hasErrors = false;
    form.errors = {};
    form.error = "";
    emit('close');
};



const createOrUpdate = () => {
    if (props.typeForm === "create") {
        create();
    } else {
        update();
    }
}



const create = () => {
    axios.post(route('ocs.store'), form,
        {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("addOc", resp.data);
            form.recentlySuccessful = true;
            restForm();
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            })
            setTimeout(() => {
                close();
            }, 500);
        }).catch(error => {
            form.hasErrors = true;
            if (error.response.data.hasOwnProperty('errors')) {
                const errors = error.response.data.errors
                for (let error in errors) {
                    form.errors[error] = errors[error][0]
                }
                form.error = error.response.data.message
            } else {
                form.error = "Error CREATE OC"
            };
        }).then(() => { // always
            form.processing = false;
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
        });
}
const update = () => {
    axios.put(route('ocs.update', props.oc.id), form,
        {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("editOc", resp.data);
            form.recentlySuccessful = true
            restForm();
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            })
            setTimeout(() => {
                close();
            }, 500);
        }).catch(error => {
            form.hasErrors = true;
            if (error.response.data.hasOwnProperty('errors')) {
                const errors = error.response.data.errors
                for (let error in errors) {
                    form.errors[error] = errors[error][0]
                }
                form.error = error.response.data.message
            } else {
                form.error = "ERROR UPDATE OC"
            };
        }).then(() => { // always
            console.log("Cierra el formulario");
            form.processing = false;
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
        });
}


</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="border-b-4 border-gray-600">
                <div class="px-4 py-1 text-center">
                    <span class="font-bold text-white">
                        {{ titleModal }}
                    </span>
                    <JetInputError :message="form.error" class="mt-2" />
                </div>
            </div>
        </template>
        <template #content>
            <form @submit.prevent="createOrUpdate()">
                <div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm">
                    <div>
                        <JetLabel for="nombre" value="Nombre:" />
                        <Input id="nombre" name="nombre" type="text" v-model="form.nombre" required maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="cantidad" value="Cantidad:" />
                        <Input id="cantidad" name="cantidad" type="text" pattern="^\d*(\.\d{0,2})?$"
                            v-model="form.cantidad" required maxlength="30" />
                        <JetInputError :message="form.errors.cantidad" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="fecha_alta" value="Fecha Alta:" />
                        <Input id="fecha_alta" name="fecha_alta" type="date" min="2000-01-02" v-model="form.fecha_alta"
                            required />
                        <JetInputError :message="form.errors.fecha_alta" class="mt-2" />
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2 border-gray-600 border-y-4">
                    <JetButton type="submit" :disabled="form.processing">
                        <SpinProgress :inprogress="form.processing" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5 "
                            viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>Guardar
                    </JetButton>
                </div>

            </form>
        </template>
    </DialogModal>
</template>
