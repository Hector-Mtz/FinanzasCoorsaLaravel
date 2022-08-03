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

const emit = defineEmits(["close", "addFactura", "editFactura"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: 'create'
    },
    factura: {
        type: Object,
        required: false
    }
});




const form = reactive({
    "cantidad": "",
    "referencia": "",
    "fechaDePago": "",
    'hasErrors': false,
    'errors': [],
    'error': "",
    'recentlySuccessful': false,
    'processing': false,
});

const titleModal = computed(() => {
    if (props.typeForm === 'create') {
        restForm();
        return "Nueva Factura"
    } else {
        form.cantidad = props.factura.cantidad;
        form.referencia = props.factura.referencia;
        form.fechaDePago = props.factura.fechaDePago;
        return "Actualizar Factura"
    }
})

function restForm() {
    form.cantidad = "";
    form.referencia = "";
    form.fechaDePago = "";
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
    axios.post(route('facturas.store'), form,
        {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            emit("addFactura");
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
                form.error = "Error CREATE FACTURA"
            };
        }).then(() => { // always
            form.processing = false;
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            })
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
        });
}
// const update = () => {
//     axios.put(route('facturas.update', props.oc.id), form,
//         {
//             onUploadProgress: () => {
//                 form.processing = true;
//             },
//         })
//         .then((resp) => {
//             emit("editFactura", resp.data);
//             form.recentlySuccessful = true
//             setTimeout(() => {
//                 restForm();
//                 close();
//             }, 500);
//         }).catch(error => {
//             form.hasErrors = true;
//             console.log(error);
//             // if (error.response.data.hasOwnProperty('errors')) {
//             //     const errors = error.response.data.errors
//             //     for (let error in errors) {
//             //         form.errors[error] = errors[error][0]
//             //     }
//             //     form.error = error.response.data.message
//             // } else {
//             //     form.error = "ERROR UPDATE OC"
//             // };
//         }).then(() => { // always
//             form.processing = false;
//             setTimeout(() => {
//                 form.recentlySuccessful = false;
//             }, 500);
//         });
// }


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
                        <JetLabel for="referencia" value="Referencia:" />
                        <Input id="referencia" name="referencia" type="text" v-model="form.referencia" required
                            maxlength="30" />
                        <JetInputError :message="form.errors.referencia" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="cantidad" value="Cantidad:" />
                        <Input id="cantidad" name="cantidad" type="text" pattern="^\d*(\.\d{0,2})?$"
                            v-model="form.cantidad" required maxlength="30" />
                        <JetInputError :message="form.errors.cantidad" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="fechaDePago" value="Fecha De Pago:" />
                        <Input id="fechaDePago" name="fecha_final" type="date" v-model="form.fechaDePago" required
                            :min="form.fechaInicial" />
                        <JetInputError :message="form.errors.fechaDePago" class="mt-2" />
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
