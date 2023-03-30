<script setup>
import { watch, computed, ref } from "vue";
import { useForm } from "@inertiajs/inertia-vue3";

import axios from "axios";
import JetLabel from "@/Jetstream/Label.vue";
import JetButton from "@/Jetstream/Button.vue";
import JetInputError from "@/Jetstream/InputError.vue";
import DialogModal from "@/Components/DialogModal.vue";
import cerrar from "../../../../../img/elementos/cerrar.png";
import Input from "@/Components/Input.vue";
import ListDataInput from "@/Components/ListDataInput.vue";
import SpinProgress from "@/Components/SpinProgress.vue";
import SelectComponent from "@/Components/SelectComponent.vue";
import TextArea from "../../../../Components/TextArea.vue";
import folder from "../../../../../img/elementos/agregar-documento.png";

import DropZone from '@/Components/DropZone.vue';

const emit = defineEmits(["close", "refreshVentas"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    typeForm: {
        type: String,
        default: "create",
    },
    venta: {
        type: Object,
        required: false,
    },
});

const form = useForm({
    "monto_id": "",
    "textMonto": "",
    "nombre": "",
    "comentario": "",
    "fechaInicial": "",
    "fechaFinal": "",
    "periodos": "",
    "tipo_id": "",
    "cantidad": "",
    "ceco_id": "",
    "textCeco": "",
    "servicio_id": "",
    "textServicio": "",
    "documento": ""
})

const listServicios = ref([]);
const listCecos = ref([]);
const listTipos = ref([]);

const titleModal = computed(() => {
    if (props.typeForm === "create") {
        form.monto_id = "";
        form.nombre = "";
        form.comentario = "";
        form.fechaInicial = "";
        form.fechaFinal = "";
        form.periodos = "";
        form.tipo_id = "";
        form.cantidad = "";
        form.ceco_id = "";
        form.servicio_id = "";
        form.documento = "";
        return "Nueva Venta"
    } else {
        form.monto_id = props.venta.monto_id
        form.nombre = props.venta.nombre
        form.comentario = props.venta.comentario
        form.fechaInicial = props.venta.fechaInicial
        form.fechaFinal = props.venta.fechaFinal
        form.periodos = props.venta.periodos
        form.tipo_id = props.venta.tipo_id
        form.cantidad = props.venta.cantidad
        form.ceco_id = props.venta.ceco_id
        form.servicio_id = props.venta.servicio_id
        form.documento = props.venta.documento
        return "Actualizar Venta"
    }
});

const close = () => {
    emit("close");
};

const getCatalogos = async () => {
    const respCecos = axios.get(route("cecos.catalogo"));
    const respServicios = axios.get(route("servicios.catalogo"));
    const respTipos = axios.get(route("tipos.catalogo"));
    const resps = await Promise.all([respCecos, respServicios, respTipos]);

    listCecos.value = resps[0].data;
    listServicios.value = resps[1].data;
    listTipos.value = resps[2].data;
};

const listMontos = computed(() => {
    const servicio = listServicios.value.find((serv) => {
        return serv.id === form.servicio_id;
    });
    if (servicio !== undefined) return servicio.montos;
    return [];
});

const createOrUpdate = () => {
    if (props.typeForm === "create") {
        create();
    } else {
        update();
    }
};

const create = () => {
    form.post(route("ventas.store"), {
        preserveScroll: true,
        preserveState: true,
        only: ["clientes", "totalVentasStatus", "errors"],
        onSuccess: () => {
            emit('refreshVentas');
            form.reset();
            close();
        },
    });
};
const update = () => {
    form.post(route('ventas.update', props.venta.id), {
        preserveScroll: true,
        preserveState: true,
        only: ["clientes", "totalVentasStatus", "errors"],
        onSuccess: () => {
            emit('refreshVentas');
            form.reset();
            close();
        },
    });
};

watch(props, () => {
    if (props.show == true) {
        getCatalogos();
    }
});
</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="">
                <div class="px-4 py-1 my-6">
                    <span class="font-bold text-fuente-500 text-[32px]">
                        {{ titleModal }}
                    </span>
                    <JetInputError :message="form.error" class="mt-2" />
                </div>
                <img :src="cerrar" alt="" @click="close()" class="absolute top-[1rem] left-[40rem] hover:cursor-pointer" />
            </div>
        </template>
        <template #content>
            <form @submit.prevent="createOrUpdate()">
                <div class="grid grid-cols-2 gap-x-2 gap-y-6 px-4 py-2 text-[14px] font-light uppercase text-fuente-500">
                    <div>
                        <Input placeholder="Nombre" id="nombre" name="nombre" type="text" v-model="form.nombre" required
                            maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>

                    <div>
                        <ListDataInput :placeholder="'CECO'" v-model="form.ceco_id" :valueText="form.textCeco"
                            @value="form.textCeco = $event" list="cecos" :options="listCecos" />

                        <JetInputError :message="form.errors.ceco_id" class="mt-2" />
                    </div>
                    <div>
                        <ListDataInput v-model="form.servicio_id" :valueText="form.textServicio"
                            @value="form.textServicio = $event" list="servicios" :options="listServicios"
                            :placeholder="'Servicios'" />
                    </div>
                    <div>
                        <ListDataInput v-model="form.monto_id" :valueText="form.textMonto" @value="form.textMonto = $event"
                            list="montos" name-option="cantidad" :options="listMontos" :disabled="form.servicio_id == ''"
                            :placeholder="'Monto'" />

                        <JetInputError :message="form.errors.monto_id" class="mt-2" />
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
                        <Input placeholder="Cantidad" id="cantidad-1" name="cantidad-1" type="number"
                            v-model="form.cantidad" required maxlength="30" />
                        <JetInputError :message="form.errors.cantidad" class="mt-2" />
                    </div>
                    <div class="text-[14px] font-light">
                        <SelectComponent id="tipo" name="tipo" v-model="form.tipo_id" required>
                            <option value="" disabled selected class="text-[14px] font-light">
                                Tipo
                            </option>
                            <option v-for="tipo in listTipos" :key="tipo.nombre" :value="tipo.id"
                                class="text-[14px] font-light">
                                {{ tipo.nombre }}
                            </option>
                        </SelectComponent>
                        <JetInputError :message="form.errors.tipo_id" class="mt-2" />
                    </div>
                    <div>
                        <Input id="periodos" name="periodos" type="number" v-model="form.periodos" required maxlength="30"
                            placeholder="Periodos" />
                        <JetInputError :message="form.errors.periodos" class="mt-2" />
                    </div>
                    <div>
                        <TextArea id="comentario" name="comentario" v-model="form.comentario" maxlength="255"
                            :placeholder="'Comentario'" />
                        <JetInputError :message="form.errors.periodos" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="documento" value="Documento:" />
                        <DropZone v-model="form.documento" />
                    </div>
                </div>
                <div class="flex justify-end px-10 py-2">
                    <JetButton type="submit" :disabled="form.processing">
                        <SpinProgress :inprogress="form.processing" />
                        <template v-if="form.monto_id === ''">
                            Agregar
                        </template>
                        <template v-else> Actualizar </template>
                    </JetButton>
                </div>
            </form>
        </template>
    </DialogModal></template>
