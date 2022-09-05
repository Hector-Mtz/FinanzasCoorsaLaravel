<script setup >
import AppLayout from '@/Layouts/AppLayout.vue';
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import SideBar from '../Components/SideBar.vue';

var props = defineProps({
    clientes:Object,
    cecos: Object
});
</script>

<template>
 
    <AppLayout title="Inicio">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-white">
                Inicio
            </h2>
        </template>
 
        <div class="py-12" >
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-xl sm:rounded-lg">

                </div>
            </div>
        </div>
    </AppLayout>
</template>
