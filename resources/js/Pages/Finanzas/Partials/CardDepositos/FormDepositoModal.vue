<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import axios from 'axios';

import JetLabel from '@/Jetstream/Label.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInputError from '@/Jetstream/InputError.vue';

import DialogModal from '@/Components/DialogModal.vue';
import Input from '@/Components/Input.vue';
import ListDataInput from '@/Components/ListDataInput.vue';
import SpinProgress from '@/Components/SpinProgress.vue';
import SelectComponent from '@/Components/SelectComponent.vue';

import DropZone from '@/Components/DropZone.vue';

const emit = defineEmits(["close", "addDeposito", "editDeposito"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: 'create'
    },
    deposito: {
        type: Object,
        required: false
    }
});


const listBancos = ref([]);

const form = useForm({
    "nombre": "",
    "cantidad": "",
    "banco_id": "",
    'hasErrors': false,
    'created_at': "",
    'errors': [],
    'error': "",
    'recentlySuccessful': false,
    'processing': false,
    'documento': null
});

const titleModal = computed(() => {
    if (props.typeForm === 'create') {
        restForm();
        return "Nuevo Deposito"
    } else {
        form.nombre = props.deposito.nombre;
        form.cantidad = props.deposito.cantidad;
        form.banco_id = props.deposito.banco_id;
        form.created_at = props.deposito.created_at
        return "Actualizar Deposito"
    }
})

function restForm() {
    form.cantidad = "";
    form.nombre = "";
    form.banco_id = "";
    form.hasErrors = false;
    form.errors = [];
    form.error = "",
    form.created_at = ""
}

const close = () => {
    emit('close');
};


let documentoReactive = ref(null);
const setFile = (file) => 
{
    const newFile = file.target.files[0];
    form.documento = file.target.files[0];

}

const createOrUpdate = () => {
    if (props.typeForm === "create") {
        create();
    } else {
        update();
    }
}


const reVisit = () => 
{
    Inertia.visit(route('ventas.index'),
        {
          preserveState: true,
          preserveScroll: true,
          only: ['totalOcs'],
      }); 
}


const create = () => {

    form.post(route('ingresos.store'),
    {
       onProgress:() => form.processing = true,
       onSuccess:() => emit("addDeposito"),
       onFinish:()=> reVisit()

    });
    
/*
    axios.post(route('ingresos.store'), form,
        {
            onUploadProgress: () => {
                form.processing = true;
            },
            headers: {
             'Content-Type': 'multipart/form-data'
            }
        })
        .then((resp) => {
            console.log(resp);
            emit("addDeposito", resp.data);
            form.recentlySuccessful = true;
            restForm();
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            });
            setTimeout(() => {
                close();
            }, 500);
        }).catch(error => {
            form.hasErrors = true;
            if (error.hasOwnProperty("response")) {

                if (error.response.data.hasOwnProperty('errors')) {
                    const errors = error.response.data.errors
                    for (let error in errors) {
                        form.errors[error] = errors[error][0]
                    }
                    form.error = error.response.data.message
                } else {
                    if (error.response.data.hasOwnProperty("message")) {
                        form.error = error.response.data.message
                    } else {
                        form.error = "Error CREATE DEPOSITO"
                    }
                };
            }
        }).then(() => { // always
            form.processing = false;
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
        });


    let formData = new FormData();
    let documento = document.querySelector('#documento');
    formData.append('documento', documento.files[0]);
*/

    
}
const update = () => {
    axios.put(route('ingresos.update', props.deposito.id), form,
        {
            onUploadProgress: () => {
                form.processing = true;
            },
        })
        .then((resp) => {
            // Es el mismo ya que reconsulta
            emit("addDeposito", resp.data);
            form.recentlySuccessful = true
            restForm();
            Inertia.visit(route('ventas.index'), {
                preserveState: true,
                preserveScroll: true,
                only: ['totalOcs'],
            });
            setTimeout(() => {
                close();
            }, 500);
        }).catch(error => {
            form.hasErrors = true;
            if (error.hasOwnProperty('response')) {
                if (error.response.data.hasOwnProperty('errors')) {
                    const errors = error.response.data.errors
                    for (let error in errors) {
                        form.errors[error] = errors[error][0]
                    }
                    form.error = error.response.data.message
                } else {
                    if (error.response.data.hasOwnProperty("message")) {
                        form.error = error.response.data.message
                    } else {
                        form.error = "ERROR UPDATE DEPOSITO"
                    }
                };
            }
        }).then(() => { // always
            form.processing = false;
            setTimeout(() => {
                form.recentlySuccessful = false;
            }, 500);
        });
}


const getBancos = async () => {
    const resp = await axios.get(route('bancos.index'));
    listBancos.value = resp.data
}

onBeforeMount(() => {
    getBancos();
})

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
                        <JetLabel for="nombre" value="Núm Deposito:" />
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
                        <JetLabel for="banco_id" value="Banco:" />
                        <SelectComponent v-model="form.banco_id">
                            <option v-for="banco in listBancos" :key="banco.id" :value="banco.id">
                                {{ banco.nombre }}
                            </option>
                        </SelectComponent>
                        <JetInputError :message="form.errors.fechaDePago" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="fecha" value="Fecha" /> <!--Fecha de creación-->
                        <Input id="fecha" name="fecha" type="datetime-local" v-model="form.created_at" required />
                    </div>
                    <div>
                        <JetLabel for="documento" value="Documento" />
                        <DropZone id="documento" v-model="form.documento" />
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
