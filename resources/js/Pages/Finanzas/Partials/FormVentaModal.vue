<script setup>
import { watch, computed, ref, nextTick } from 'vue';
import { useForm } from '@inertiajs/inertia-vue3';

import axios from 'axios';
import JetLabel from '@/Jetstream/Label.vue';

import ButtonAdd from '../../../Components/ButtonAdd.vue';
import DialogModal from '../../../Components/DialogModal.vue';
import SelectComponent from '../../../Components/SelectComponent.vue';
import Input from '../../../Components/Input.vue';
import ListDataInput from '../../../Components/ListDataInput.vue';

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
    "monto_id": -1,
    "nombre": "",
    "fechaInicial": "",
    "fechaFinal": "",
    "periodos": 0,
    "tipo_id": -1,
    "ceco_id": "",
    "cliente_id": "",
})

const listClientes = ref([]);
const listCecos = ref([]);

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

const getClientes = async () => {
    const resp = await axios.get(route('clientes.catalogo'))
    listClientes.value = resp.data
}

const getCecos = async (clente_id) => {
    const resp = await axios.get(route('clientes.cecos', form.cliente_id));
    listCecos.value = resp.data
}


watch(props, () => {
    if (props.show == true) {
        getClientes();
    }
})

</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="border-b-4 border-gray-600">
                <div class="px-4 py-1 text-center">
                    <span>
                        {{ titleModal }}
                    </span>
                </div>
            </div>
        </template>
        <template #content>
            <div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm">
                <div>
                    <JetLabel for="nombre" value="Nombre" />
                    <Input id="nombre" name="nombre" type="text" v-model="form.nombre" required maxlength="30" />
                </div>
                <div>
                    <JetLabel for="cliente" value="Cliente" />
                    <ListDataInput v-model="form.cliente_id" list="clientes" :options="listClientes"
                        @change="getCecos()" />
                    <!-- <SelectComponent id="cliente" name="cliente" v-model="form.cliente_id"
                        @change="getClientes($event.target.value)">
                        <option value="-1" disabled selected>Seleciona un Cliente</option>
                        <option v-for="cliente in listClientes" :key="cliente.nombre" :value="cliente.id">
                            {{ cliente.nombre }}
                        </option>
                    </SelectComponent> -->
                </div>
                <div>
                    <JetLabel value="Ceco:" />
                    <ListDataInput v-model="form.ceco_id" list="cecos" :options="listCecos"
                        :disabled="form.cliente_id == ''" />
                </div>
            </div>
        </template>
    </DialogModal>
</template>
