<script setup>
import { computed, reactive } from 'vue';

import axios from 'axios';

import { Inertia } from '@inertiajs/inertia';

import JetLabel from '@/Jetstream/Label.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInputError from '@/Jetstream/InputError.vue';

import DialogModal from '@/Components/DialogModal.vue';
import Input from '@/Components/Input.vue';
import ListDataInput from '@/Components/ListDataInput.vue';
import SpinProgress from '@/Components/SpinProgress.vue';
import SelectComponent from '@/Components/SelectComponent.vue';

const emit = defineEmits(["close", "add", "edit"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: 'create'
    },
    padreId: { // Catalogo principal
        type: Number,
        required: true
    },
    ceco: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lineasNegocios: {
        type: Object,
        required: true
    }
});




const form = reactive({
    "nombre": "",
    "lineas_negocio_id": "",
    'hasErrors': false,
    'errors': [],
    'error': "",
    'recentlySuccessful': false,
    'processing': false,
});

const titleModal = computed(() => {
    if (props.typeForm === 'create') {
        restForm();
        return "Nuevo " + props.title.slice(0, -1)
    } else {
        form.nombre = props.ceco.nombre;
        form.lineas_negocio_id = props.ceco.lineas_negocio_id;
        return "Actualizar " + props.title.slice(0, -1)
    }
})

function restForm() {
    form.nombre = '';
    form.lineas_negocio_id = '';
    form.hasErrors = false;
    form.errors = [];
    form.error = "";
}

const close = () => {
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
    axios.post(route('cecos.store', props.padreId), form,
        {
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
        }).catch(error => {
            form.hasErrors = true;
            if (error.response.data.hasOwnProperty('errors')) {
                const errors = error.response.data.errors
                for (let error in errors) {
                    form.errors[error] = errors[error][0]
                }
                form.error = error.response.data.message
            } else {
                form.error = "Error CREATE " + props.routeName
            };
        }).then(() => { // always
            form.processing = false;
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
        });
}
const update = () => {
    axios.put(route('cecos.update', [props.padreId, props.ceco.id]), form,
        {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("edit", resp.data);
            form.recentlySuccessful = true
            setTimeout(() => {
                restForm();
                close();
            }, 500);
        }).catch(error => {
            form.hasErrors = true;
            console.log(error);
            if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('errors')) {
                const errors = error.response.data.errors
                for (let error in errors) {
                    form.errors[error] = errors[error][0]
                }
                form.error = error.response.data.message
            } else {
                form.error = "Error UPDATE " + props.routeName
            };
        }).then(() => { // always
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
                        <Input id="nombre" name="nombre" type="text" v-model="form.nombre" required maxlength="60" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="lineas_negocio_id" value="Lineas de negocios:" />
                        <SelectComponent id="lineas_negocio_id" name="lineas_negocio_id"
                            v-model="form.lineas_negocio_id" required>
                            <option value="">Seleciona una Linea de Negocio</option>
                            <option v-for="linea in lineasNegocios" :key="'l' + linea.id" :value="linea.id">
                                {{ linea.name }}
                            </option>
                        </SelectComponent>
                        <JetInputError :message="form.errors.lineas_negocio_id" class="mt-2" />
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
