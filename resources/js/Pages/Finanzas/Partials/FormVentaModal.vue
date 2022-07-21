<script setup>
import { watch, computed, ref, nextTick } from 'vue';
import { useForm } from '@inertiajs/inertia-vue3';

import axios from 'axios';
import JetLabel from '@/Jetstream/Label.vue';

import JetButton from '@/Jetstream/Button.vue';
import DialogModal from '../../../Components/DialogModal.vue';
import SelectComponent from '../../../Components/SelectComponent.vue';
import Input from '../../../Components/Input.vue';
import ListDataInput from '../../../Components/ListDataInput.vue';
import { fromJSON } from 'postcss';
import SpinProgress from '../../../Components/SpinProgress.vue';
import JetInputError from '@/Jetstream/InputError.vue';

const emit = defineEmits(["close"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: 'create'
    },
    venta: {
        type: Object,
        required: false
    }
})

const form = useForm({
    "monto_id": "",
    "nombre": "",
    "fechaInicial": "",
    "fechaFinal": "",
    "periodos": "",
    "tipo_id": "",
    "cantidad": "",
    "ceco_id": "",
    "servicio_id": "",
})

const listServicios = ref([]);
const listCecos = ref([]);
const listMontos = ref([]);
const listTipos = ref([]);

const titleModal = computed(() => {
    if (props.typeForm === 'create') {
        return "Nueva Venta"
    } else {
        return "Actualizar Venta"
    }
})


const close = () => {
    emit('close');
};

const getCatalogos = async () => {
    const respCecos = axios.get(route('cecos.catalogo'))
    const respServicios = axios.get(route('servicios.catalogo'))
    const respTipos = axios.get(route('tipos.catalogo'))
    const resps = await Promise.all([
        respCecos,
        respServicios,
        respTipos,
    ]);

    listCecos.value = resps[0].data;
    listServicios.value = resps[1].data;
    listTipos.value = resps[2].data;
}


const setMontos = () => {
    const servicio = listServicios.value.find(serv => {
        return serv.id === form.servicio_id
    });
    if (servicio !== undefined)
        listMontos.value = servicio.montos
}

const create = () => {
    form.post(route('ventas.store'), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            form.reset();
            close();
        },
    })
}


watch(props, () => {
    if (props.show == true) {
        getCatalogos();
    }
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
            <form @submit.prevent="create()">
                <div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm">
                    <div>
                        <JetLabel for="nombre" value="Nombre:" />
                        <Input id="nombre" name="nombre" type="text" v-model="form.nombre" required maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>

                    <div>
                        <JetLabel value="Ceco:" />
                        <ListDataInput v-model="form.ceco_id" list="cecos" :options="listCecos" />

                        <JetInputError :message="form.errors.ceco_id" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel value="Servicio:" />
                        <ListDataInput v-model="form.servicio_id" list="servicios" @change="setMontos()"
                            :options="listServicios" />
                    </div>
                    <div>
                        <JetLabel value="Monto:" />
                        <ListDataInput v-model="form.monto_id" list="montos" name-option="cantidad"
                            :options="listMontos" :disabled="form.servicio_id == ''" />

                        <JetInputError :message="form.errors.monto_id" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="cantidad" value="Cantidad:" />
                        <Input id="cantidad" name="cantidad" type="number" v-model="form.cantidad" required
                            maxlength="30" />
                        <JetInputError :message="form.errors.cantidad" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="fechaInicio" value="Fecha Inicial:" />
                        <Input id="fechaInicio" name="fecha_inicio" type="date" v-model="form.fechaInicial" required />

                        <JetInputError :message="form.errors.fechaInicial" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="fechaFinal" value="Fecha Final:" />
                        <Input id="fechaFinal" name="fecha_final" type="date" v-model="form.fechaFinal" required
                            :min="form.fechaInicial" />
                        <JetInputError :message="form.errors.fechaFinal" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="tipo" value="Tipo:" />
                        <SelectComponent id="tipo" name="tipo" v-model="form.tipo_id" required>
                            <option value="" disabled> Seleciona un Tipo</option>
                            <option v-for="(tipo) in listTipos" :key="tipo.nombre" :value="tipo.id">
                                {{ tipo.nombre }}
                            </option>
                        </SelectComponent>
                        <JetInputError :message="form.errors.tipo_id" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="periodos" value="Periodos:" />
                        <Input id="periodos" name="periodos" type="number" v-model="form.periodos" required
                            maxlength="30" />
                        <JetInputError :message="form.errors.periodos" class="mt-2" />
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2 border-gray-600 border-y-4">
                    <SpinProgress :inprogress="form.processing" />
                    <JetButton type="submit" :disabled="form.processing">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5 "
                            viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>Guardad
                    </JetButton>
                </div>

            </form>
        </template>
    </DialogModal>
</template>
