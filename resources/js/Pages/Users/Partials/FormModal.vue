<script setup>
import { computed } from 'vue';

import { useForm, Inertia } from '@inertiajs/inertia-vue3';

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
    user: {
        type: Object,
        required: false
    },
});


const form = useForm({
    "name": "",
    "email": "",
    "password": "",
});

const titleModal = computed(() => {
    if (props.typeForm === 'create') {
        return "Nuevo Usuario"
    } else {
        form.name = props.user.name;
        form.email = props.user.email;
        form.password = props.user.password;
        return "Actualizar Usuario"
    }
})


const close = () => {
    form.clearErrors();
    emit('close');
};



const createOrUpdate = () => {
    let ruta = '';
    if (props.typeForm === "create") {
        ruta = route('user.store');
    } else {
        ruta = route('user.update', props.user.id)
    }
    form.post(ruta, {
        preserveScroll: true,
        preserveState: true,
        only: ['users'],
        onSuccess: () => {
            form.reset(),
                close();
        },
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
                        <JetLabel for="name" value="Nombre:" />
                        <Input id="name" name="name" type="text" v-model="form.name" required maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="email" value="Correo:" />
                        <Input id="email" name="email" type="email" v-model="form.email" required maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
                    </div>
                    <div>
                        <JetLabel for="password" value="Correo:" />
                        <Input id="password" name="password" type="password" v-model="form.password" required
                            maxlength="30" />
                        <JetInputError :message="form.errors.nombre" class="mt-2" />
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
