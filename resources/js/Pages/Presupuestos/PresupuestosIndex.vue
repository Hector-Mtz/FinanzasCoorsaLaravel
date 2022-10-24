<script setup >
import AppLayout from '@/Layouts/AppLayout.vue';
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import ButtonPres from '@/Components/ButtonPres.vue';
import Dropdown from '@/Components/DropDownLink.vue';
import ButtonCalendar from '../../Components/ButtonCalendar.vue';
import Graph from './Graph.vue';
import GraphPrueba from './GraphPrueba.vue';
import Button from '../../Jetstream/Button.vue';

var props = defineProps({
    clientes:Object,
    grupo_conceptos: Object,
    cantidades:Object,
    movimientos:Object,
    solicitudes:Object,
    filtros: Object
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
                    <h2 class="text-xl font-semibold leading-tight text-white">
                        Presupuestos
                    </h2>
                    
                    <ButtonCalendar :month="date.month" :year="date.year" @change-date="changeDate($event)"/> 
              </div>
              <div class="button_submenu">
                <Button style="float:left">
                    <Link :href="route('tabla.presupuestos')" preserve-state>TABLA DE DATOS</Link>
                </Button>
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
                    </div> 
                      <GraphPrueba
                      :date = date
                      :filtros = filtros 
                      :movimientos = movimientos
                      :clientes= clientes
                      :grupo_conceptos = grupo_conceptos
                      :cantidades = cantidades
                      :solicitudes= solicitudes
                       ></GraphPrueba>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
