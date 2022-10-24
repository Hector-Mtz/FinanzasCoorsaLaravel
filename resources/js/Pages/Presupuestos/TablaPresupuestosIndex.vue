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
import ModalNewCecoConcepto from './Components/ModalNewCecoConcepto.vue';
import { formatoMoney, IVA } from "../../utils/conversiones";

//Variables reactivas
var props = defineProps({
    ceco_concepto:Object,
    cecos: Object,
    conceptos:Object
});

let movimiento = ref ({ state: "PRESUPUESTO" });
let idMov = ref(3);
let tableCecoConceptos = ref([]);
tableCecoConceptos.value = props.ceco_concepto.filter(ceco_concepto => ceco_concepto.Movimiento === movimiento.value.state);
let date = ref({month:new Date().getMonth(), 
                year: new Date().getFullYear()});



/*
for (let index = 0; index < props.ceco_concepto.length; index++) {
    const element = props.ceco_concepto[index];
    let newCantidad = formatoMoney(element.Cantidad.toFixed(2));
    element.Cantidad = newCantidad;
}*/
//Funciones

const changeDate = (newDate) => {
    tableCecoConceptos.value = [];
    date.value = newDate;
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
    });
    //console.log(props.ceco_concepto);

    tableCecoConceptos.value = props.ceco_concepto.filter(ceco_concepto => ceco_concepto.Movimiento === movimiento.value.state);
}

const cambiar = (movimientoActual) =>
{ 
  tableCecoConceptos.value = [];
  movimiento.value.state = movimientoActual;
  let result = props.ceco_concepto.filter(ceco_concepto => ceco_concepto.Movimiento === movimientoActual);
  tableCecoConceptos.value = result;
  
  switch (movimientoActual) 
 {
    case "GASTO":
           idMov.value = 1;
        break;
    case "SUPLEMENTO":
           idMov.value = 2;
        break;
    case "PRESUPUESTO":
           idMov.value = 3;
        break;
  
    default:
        break;
  }
}


//Modales

let newCecoConcepto = ref(false);

const openCecoConcepto = () =>
{
    newCecoConcepto.value = true;
}

const closeModalCecoConcepto = () =>
{
    newCecoConcepto.value = false;
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
                    <Link href="/clientes" preserve-state>GRÁFICA Y TABLA</Link>
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
                      <div class="dropdown">
                          <button onclick="myFunction()" class="dropbtn" 
                          style="margin-left:1rem; margin-top: 0rem; 
                          margin-bottom: 1rem; padding: 0.5rem; float: left;">
                          <p>$</p>
                        </button>
                        <div id="myDropdown" class="dropdown-content">
                            <button id="PRESUPUESTO" @click="cambiar('PRESUPUESTO')">Presupuesto</button>
                            <button id="SUPLEMENTO" @click="cambiar('SUPLEMENTO')">Suplemento</button>
                            <button id="GASTO" @click="cambiar('GASTO')">Gasto</button>  
                        </div>
                        <div style="float:right; margin-left:5rem ;">
                            <p style="color:white;">{{movimiento.state}}</p>
                        </div>
                     </div>
                        <TablaCecoConcepto :per-page="10">
                            <template #thead>
                                <tr>
                                    <th>
                                        CECO<br>
                                        <ButtonAdd style="padding:0rem;padding-inline: 0.5rem;" @click="openCecoConcepto">
                                        </ButtonAdd>
                                    </th>
                                    <th>CONCEPTO</th>
                                    <th>$</th>
                                </tr>
                            </template>
                            <template #tbody >
                               <tr v-for="datos in tableCecoConceptos" :key="datos.id">
                                  <td>{{datos.CECO}}</td>
                                  <td>{{datos.Concepto}}</td>
                                  <td>{{datos.Cantidad}}</td>
                              </tr>
                            </template>
                        </TablaCecoConcepto>
                        <ModalNewCecoConcepto :show="newCecoConcepto"
                         :cecos = "cecos"
                         :movimiento= "movimiento.state" 
                         :idmovimiento="idMov"
                         :conceptos = "conceptos"
                          @close="closeModalCecoConcepto">
                        </ModalNewCecoConcepto>
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
