<script setup >
import AppLayout from '@/Layouts/AppLayout.vue';
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import ModuleCliente from '@/Components/clientes.vue'; //traemos la grafica
import ButtonPres from '@/Components/ButtonPres.vue';
import Dropdown from '@/Components/DropDownLink.vue';
import ButtonCalendar from '../Components/ButtonCalendar.vue';

var props = defineProps({
    clientes:Object,
    grupo_conceptos: Object,
    cantidades:Object,
});


let clientes = props.clientes;
let grupo_conceptos = props.grupo_conceptos;
let datos = props.cantidades;
let date = ref({month:new Date().getMonth(), year: new Date().getFullYear()})

const changeDate = (newDate) => {
    date.value = newDate
    //
}
</script>

<template>    
    <AppLayout title="Presupuestos">
        <template #header>
              <div class="flex items-center justify-around">

                    <h2 class="text-xl font-semibold leading-tight text-gray-800">
                        Presupuestos
                    </h2>
                    <ButtonCalendar :month="date.month" :year="date.year" @change-date="changeDate($event)"/> 
              </div>
        </template>
 
        <div class="py-12 fondo_general" >
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                    <div class="datetexts">
                      <div class="dashboard_texts">
                        <div class="texts_dash">
                           <h1 class="dashboard_text">Dashboard</h1>    
                         </div>
                         <div class="texts_dash">
                           <h2 class="dashboard_text2">TABLA DE DATOS</h2>
                         </div>
                      </div>
                      <div class="datepicker">
                    
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
