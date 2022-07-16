<script setup>
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetCheckbox from '@/Jetstream/Checkbox.vue';
import JetLabel from '@/Jetstream/Label.vue';
import JetValidationErrors from '@/Jetstream/ValidationErrors.vue';
import ButtonLogin from '../../Components/buttonLogin.vue';
import InputLogin from '../../Components/inputLogin.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>


<template >
    <Head title="Log in" />

    <JetAuthenticationCard>
        <!--
        <template #logo>
            <JetAuthenticationCardLogo/>
        </template>
        -->

        <JetValidationErrors class="mb-4" />

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <h1 class="text-input">Ingresar</h1>
                <InputLogin
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    placeholder="Email"
                />
            </div>

            <div class="mt-4">
                <InputLogin
                    id="password"
                    v-model="form.password"
                    type="password"
                    class=""
                    required
                    autocomplete="current-password"
                    placeholder="Contraseña"
                />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <JetCheckbox v-model:checked="form.remember" name="remember" />
                    <span class="ml-2 text-sm  labelLogin">Recordar</span>
                </label>
            </div>

            <div class="flex items-center justify-center mt-4">
                <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-gray-600  hover:text-gray-900">
                    Forgot your password?
                </Link>

                <ButtonLogin  class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                      Ingresar
                </ButtonLogin>
            </div>
        </form>
    </JetAuthenticationCard>
</template>
