<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import axios from 'axios';

import JetLabel from "@/Jetstream/Label.vue";
import JetButton from "@/Jetstream/Button.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import DialogModal from "@/Components/DialogModal.vue";
import Input from "@/Components/Input.vue";
import SpinProgress from "@/Components/SpinProgress.vue";
import SelectComponent from "@/Components/SelectComponent.vue";



import DropZone from '@/Components/DropZone.vue';

const emit = defineEmits(["close", "addDeposito", "editDeposito"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: "create",
    },
    deposito: {
        type: Object,
        required: false,
    },
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
    if (props.typeForm === "create") {
        restForm();
        return "Nuevo Deposito";
    } else {
        form.nombre = props.deposito.nombre;
        form.cantidad = props.deposito.cantidad;
        form.banco_id = props.deposito.banco_id;
        form.created_at = props.deposito.created_at;
        return "Actualizar Deposito";
    }
});

function restForm() {
    form.cantidad = "";
    form.nombre = "";
    form.banco_id = "";
    form.hasErrors = false;
    form.errors = [];
    form.error = "";
    form.created_at = "";
}

const close = () => {
    emit("close");
};


let documentoReactive = ref(null);
const setFile = (file) => {
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


const reVisit = () => {
    Inertia.visit(route('finanzas.index'),
        {
            preserveState: true,
            preserveScroll: true,
            only: ['totalOcs'],
        });

    close();
    form.reset();
}


const create = () => {

    form.post(route('ingresos.store'),
        {
            onProgress: () => form.processing = true,
            onSuccess: () => emit("addDeposito"),
            onFinish: () => reVisit()

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
                if (error.hasOwnProperty("response")) {
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
                            form.error = "Error CREATE DEPOSITO";
                        }
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
    
    
        let formData = new FormData();
        let documento = document.querySelector('#documento');
        formData.append('documento', documento.files[0]);
    */


}
const update = () => {

    form.post(route('ingresos.update', props.deposito.id),
        {
            onProgress: () => form.processing = true,
            onSuccess: () => emit("addDeposito"),
            onFinish: () => reVisit()
        });

    /*
       axios.put(route('ingresos.update', props.deposito.id), form,
           {
               onUploadProgress: () => {
                   form.processing = true;
               },
           })
           .then((resp) => {
               // Es el mismo ya que reconsulta
               emit("addDeposito", resp.data);
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
               if (error.hasOwnProperty("response")) {
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
                           form.error = "ERROR UPDATE DEPOSITO";
                       }
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
}


const getBancos = async () => {
    const resp = await axios.get(route("bancos.index"));
    listBancos.value = resp.data;
};

onBeforeMount(() => {
    getBancos();
});
</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex items-center">
                <div class="px-4 py-1 my-6 text-center">
                    <span class="font-semibold text-[32px] text-fuente-500">
                        {{ titleModal }}
                    </span>
                    <JetInputError :message="form.error" class="mt-2" />
                </div>
                <img :src="cerrar" alt="" @click="close()" class="absolute top-[1rem] left-[40rem] hover:cursor-pointer" />
            </div>
        </template>
        <template #content>
            <form @submit.prevent="createOrUpdate()">
                <div class="grid gap-x-2 gap-y-4 px-4 py-2 text-[14px] font-light">
                    <div>
                        <Input placeholder="Numero de Deposito" id="nombre" name="nombre" type="text" v-model="form.nombre"
                            required maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>
                    <div>
                        <Input placeholder="Cantidad" id="cantidad" name="cantidad" type="text" pattern="^\d*(\.\d{0,2})?$"
                            v-model="form.cantidad" required maxlength="30" />
                        <JetInputError :message="form.errors.cantidad" class="mt-2" />
                    </div>
                    <div>
                        <SelectComponent v-model="form.banco_id">
                            <option value="" selected disabled>Banco</option>
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
