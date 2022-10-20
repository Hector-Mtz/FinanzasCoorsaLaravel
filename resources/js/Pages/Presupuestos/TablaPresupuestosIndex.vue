<script setup >
import AppLayout from '@/Layouts/AppLayout.vue';
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import ButtonPres from '@/Components/ButtonPres.vue';
import Dropdown from '@/Components/DropDownLink.vue';
import ButtonCalendar from '../../Components/ButtonCalendar.vue';
import Button from '../../Jetstream/Button.vue';
import TablaCecoConcepto from './Components/TablaCecoConcepto.vue';
import Card from '../../Components/Card.vue';
import ButtonAdd from '../../Components/ButtonAdd.vue';
import GraficoMovimientos from './Components/GraficoMovimientos.vue';


var props = defineProps({
    ceco_concepto:Object
});

let date = ref({month:new Date().getMonth(), 
                year: new Date().getFullYear()})



const changeDate = (newDate) => {
    date.value = newDate
    let formatDatePHP = null;
    if(date.value.month != 10 && date.value.month != 11 )
    {
       formatDatePHP = date.value.year+'-0'+date.value.month;
    }
    else
    {
     formatDatePHP = date.value.year+'-'+date.value.month;
    }
    //console.log(formatDatePHP);
    Inertia.visit(route('tabla.presupuestos'), {
        data: {
            fecha:formatDatePHP
        },
        preserveState: true,
        preserveScroll: true,
        only: ['ceco_concepto'],
    })
}

</script>

<template>    
    <AppLayout title="Presupuestos" >
        <template #header>
              <div class="flex items-center justify-around">
                    <h2 class="text-xl font-semibold leading-tight text-white">
                        Presupuestos
                    </h2>
                    
                    <ButtonCalendar :month="date.month" :year="date.year"
                     @change-date="changeDate($event)"/> 
              </div>
              <div class="button_submenu">
                <Button style="float:left">
                    <a :href="route('clientes.index')">GRÁFICA Y TABLA</a>
                </Button>
              </div>        
        </template>
 
        <div class="py-12 fondo_general"  style="margin-top:-7rem;">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="datetexts">
                      <div class="dashboard_texts">
                        <div class="texts_dash">
                           <h1 class="dashboard_text" style="color:white;">Dashboard</h1>    
                         </div>
                         <div class="texts_dash">
                           <h2 class="dashboard_text2">TABLA DE DATOS</h2>
                         </div>
                      </div>
                    </div> 
                    
                   <div style="float:left; margin: 2rem; margin-right: 0rem;">
                     <Card>
                        <TablaCecoConcepto :per-page="10">
                            <template #thead>
                               <tr colspan="3">

                               </tr>
                                <tr>
                                    <th>
                                        CECO<br>
                                        <ButtonAdd style="padding:0rem;padding-inline: 0.5rem;">
                                        </ButtonAdd>
                                    </th>
                                    <th>CONCEPTO</th>
                                    <th>$</th>
                                </tr>
                            </template>
                            <template #tbody >
                               <tr v-for="datos in ceco_concepto" :key="datos.id">
                                  <td>{{datos.CECO}}</td>
                                  <td>{{datos.Concepto}}</td>
                                  <td>{{datos.Cantidad}}</td>
                              </tr>
                            </template>
                        </TablaCecoConcepto>
                     </Card>
                   </div>
                   <div style="float:right; margin: 2rem; margin-left: 0rem;"> 
                    <Card>
                        <GraficoMovimientos :datos = ceco_concepto></GraficoMovimientos>
                    </Card>
                   </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
