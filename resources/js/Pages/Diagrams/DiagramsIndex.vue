<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { onMounted, reactive, ref, watch, computed } from "vue";
import DangerButton from '@/Components/DangerButton.vue';
import DropZone from '@/Components/DropZone.vue';

/**/
var props = defineProps({

});

const form = useForm({
   file:null
});

const sendForm = () =>
{
    form.post(route('importPresupuesto'),{
       preserveScroll:true,
       preserveState:true,
       onSuccess:()=> form.reset(),
       onFinish:() => form.reset()
    });
}
</script>
<template>
    <AppLayout title="Diagramas">
        <template #header>
            <div class="flex items-center">
                <h2 class="text-4xl font-bold leading-tight text-fuente-500">
                    Diagramas
                </h2>
            </div>
            <a :href="route('getExample')">
                <DangerButton>
                    Descargar ejemplo
                </DangerButton>
            </a>
            <form class="mt-2 ml-2">
                <DropZone accept=".xlsx"  v-model="form.file"  @change="sendForm"/>
            </form>
        </template>
    </AppLayout>
</template>