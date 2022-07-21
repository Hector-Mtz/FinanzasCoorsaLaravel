<script setup >
import AppLayout from '@/Layouts/AppLayout.vue';
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import ModuleCliente from '@/Components/clientes.vue';
import DatePicker from '../Components/datePicker.vue';

var props = defineProps({
    clientes:Object,
    grupo_conceptos: Object,
    cantidades:Object
});
</script>

<template>    
    <AppLayout title="Presupuestos">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Presupuestos
            </h2>
        </template>
 
        <div class="py-12 fondo_general" >
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                    <div class="datetexts">
                      <div class="dashboard_texts">
                        <div class="texts_dash">
                           <H1 class="dashboard_text">Dashboard</H1>
                         </div>
                         <div class="texts_dash">
                           <h2 class="dashboard_text2">TABLA DE DATOS</h2>
                         </div>
                      </div>
                      <div class="datepicker">
                        <DatePicker></DatePicker>
                      </div>
                    </div>  
                    <ModuleCliente 
                     :clientes = clientes 
                     :grupo_conceptos = grupo_conceptos
                     :cantidades = cantidades
                     ></ModuleCliente> <!--Modulo amcharts-->
                </div>
            </div>
        </div>
    </AppLayout>
</template>
