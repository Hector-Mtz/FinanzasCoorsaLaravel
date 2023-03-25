<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { onMounted, reactive, ref, watch, computed } from "vue";
import axios from "axios";
/*Importacion de componentes*/
import ButtonsGroup from "./Partials/ButtonsGroup.vue";
import GraficaPresupuestos from "./Partials/GraficaPresupuestos.vue";
import ButtonAdd from '@/Components/ButtonAdd.vue';
import DangerButton from '@/Components/DangerButton.vue';
/**/

var props = defineProps({
   clientes_cecos:Object,
   grupoConceptos_conceptos:Object,
   soli_gastos:Object
});

let movimiento = ref("PRESUPUESTO");
const setMovimiento = (movimiento) =>
{
    let mov_id = 0;
    switch (movimiento) {
        case "GASTO":
              mov_id = 1;
              Inertia.visit(route('presupuestos.index'),
               {
                   data:{movimiento:mov_id},
                   replace:true,
                   only: ['soli_gastos'],
                       preserveScroll: true,
                       preserveState: true,
               });
            break;
        
        case "SUPLEMENTO":
            mov_id = 2;
            Inertia.visit(route('presupuestos.index'),
               {
                   data:{movimiento:mov_id},
                   replace:true,
                   only: ['soli_gastos'],
                       preserveScroll: true,
                       preserveState: true,
               });
           break;
    
        case "PRESUPUESTO":
             mov_id = 3;
             Inertia.visit(route('presupuestos.index'),
               {
                   data:{movimiento:mov_id},
                   replace:true,
                   only: ['soli_gastos'],
                       preserveScroll: true,
                       preserveState: true,
               });
            break
        case "TOTAL":
              //console.log(props.clientes_cecos);
            break;

        case "DISPONIBLE":
            break;

        default:
            mov_id = 1
            break;
    }
}

const arregloValores = computed(() => {
  let arregloAux = [];
  // define colors
  var colors = {
        "critical": "#ca0101",
        "bad": "#e17a2d",
        "medium": "#e1d92d",
        "good": "#5dbe24",
        "verygood": "#0b7d03"
    };
    
  for (let index = 0; index < props.clientes_cecos.length; index++) //recorremos todos los clientes
  {
     let cliente = props.clientes_cecos[index];
     for (let index2 = 0; index2 < props.grupoConceptos_conceptos.length; index2++)
     {
        let newObj = {
           ClienteId: cliente.id,
           ClienteName:cliente.nombre,
           GrupoConId:null,
           GrupoConName:null,
           valor: 0,
           color:null,
           children:[]
        };
        let grupoConcepto = props.grupoConceptos_conceptos[index2];
        newObj.GrupoConId = grupoConcepto.id;
        newObj.GrupoConName = grupoConcepto.nombre;
        arregloAux.push(newObj);
     }   
  }

  for (let index = 0; index < props.grupoConceptos_conceptos.length; index++) 
  {
    const element = props.grupoConceptos_conceptos[index];
    console.log(element);
    
  }

 for (let index3 = 0; index3 < arregloAux.length; index3++)
  {
    const element = arregloAux[index3];
    for (let index4 = 0; index4 < props.soli_gastos.length; index4++)
    {
        const soli_gastos = props.soli_gastos[index4];
        if(element.ClienteId == soli_gastos.clientes_id && element.GrupoConId == soli_gastos.grupo_concepto_id)
        {
            element.valor = soli_gastos.productos[0].total;
             if(element.valor <=300)
             {
               element.color = colors.critical
             }
             if(element.valor >300 && element.valor <= 500)
             {
                element.valor = colors.bad
             }
             if(element.valor >500 && element.valor <= 800)
             {
                element.color = colors.medium
             }
             if(element.valor >800 && element.valor <= 5000)
             {
               element.color = colors.good
             }
             if(element.valor > 5000)
             {
                element.color = colors.verygood
             }
        }
    }  
  }

  //console.log(props.soli_gastos);

  return arregloAux;
});


const setFor = (tipoAcomodo) => 
{
    switch (tipoAcomodo) //dependiendo el boton es como se acomodaran los datos y reestructurara la data
    {
        case "CECO":
              console.log("Set for CECO");
              //return arregloAux;
            break;
        
        case "CONCEPTO": 
             console.log("Set for CONCEPTO")
           break;
    
        default:
             
             return arregloAux;
            break;
    }
  
}

</script>
<template>
    <AppLayout title="Presupuestos">
        <template #header>
            <div class="flex items-center">
                <h2 class="text-4xl font-bold leading-tight text-fuente-500">
                    Presupuestos
                </h2>
            </div>
        </template>
        <div class="grid grid-cols-6 grid-rows-2">
            <ButtonsGroup @seleccion="setMovimiento" @setFor="setFor" class="justify-center col-start-1 row-start-1 row-end-3"/>
            <DangerButton>
                Tabla de datos
            </DangerButton>
        </div>
        <div class="py-12">
            <!--Grafica-->
            <GraficaPresupuestos :arregloValores = "arregloValores" />
        </div>
    </AppLayout>
</template>