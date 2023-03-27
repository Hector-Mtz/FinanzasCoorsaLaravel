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
import TableMovs from './Partials/TableMovs.vue';
import GraficoMovimientos from "./Components/GraficoMovimientos.vue";
/**/

var colors = {
        "critical": "#ca0101",
        "bad": "#e17a2d",
        "medium": "#e1d92d",
        "good": "#5dbe24",
        "verygood": "#0b7d03"
    };

var props = defineProps({
   clientes_cecos:Object,
   grupoConceptos_conceptos:Object,
});


const setMovimiento = (movimiento) =>
{
   
}

let arregloGrupoConcepto = ref([]);
  for (let index = 0; index < props.clientes_cecos.length; index++) 
  {
     const cliente = props.clientes_cecos[index];
     
     for (let index2 = 0; index2 < props.grupoConceptos_conceptos.length; index2++) 
     {
        const grupo = props.grupoConceptos_conceptos[index2];
        let newObj = {
         tipo_arreglo:"cliente_grupoConcepto",
         cliente_id:null,
         x:null,
         grupo_id:null,
         y:null,
         valor:0
        };
 
        //los clientes/cecos deben ser ejey 
        newObj.cliente_id = cliente.id;
        newObj.y = cliente.nombre;
        //los grupos/concepto deben ser ejex
        newObj.grupo_id = grupo.id;
        newObj.x = grupo.nombre;
        arregloGrupoConcepto.value.push(newObj);
        
     }
    
  }
  // define colors
let exitAcomodo = ref(false);
const setFor = (tipoAcomodo) => 
{
    switch (tipoAcomodo) //dependiendo el boton es como se acomodaran los datos y reestructurara la data
    {
        case "CECO":
              //console.log("Set for CECO");
              arregloGrupoConcepto.value = [];
              for (let index = 0; index < props.clientes_cecos.length; index++) 
                 {
                    const cliente = props.clientes_cecos[index];
                    for (let index2 = 0; index2 < cliente.cecos.length; index2++) 
                    {
                        const ceco = cliente.cecos[index];
                        for (let index3 = 0; index3 < props.grupoConceptos_conceptos.length; index3++)
                        {
                            const grupoCon = props.grupoConceptos_conceptos[index3];
                            let newObj = {
                             tipo_arreglo:"ceco_grupoConcepto",
                             ceco_id:null,
                             x:null,
                             grupo_id:null,
                             y:null,
                             valor:0
                            };

                            newObj.ceco_id = ceco.id;
                            newObj.y = ceco.nombre;
                            newObj.grupo_id = grupoCon.id
                            newObj.x = grupoCon.nombre,
                            newObj.padre_id=cliente.id
                            newObj.padre_name =cliente.nombre

                            arregloGrupoConcepto.value.push(newObj);
                        }
                    }
                 }
                 exitAcomodo.value = true;
              //return arregloAux;
            break;
        
        case "CONCEPTO": 
             //console.log("Set for CONCEPTO");
             arregloGrupoConcepto.value = [];
             for (let index = 0; index < props.clientes_cecos.length; index++) 
             {
                const clientes = props.clientes_cecos[index];
                for (let index2 = 0; index2 < props.grupoConceptos_conceptos.length; index2++)
                {
                    const grupoCon = props.grupoConceptos_conceptos[index2];
                    //console.log(grupoCon);
                    for (let index3 = 0; index3 < grupoCon.conceptos.length; index3++) 
                    {
                        const concepto = grupoCon.conceptos[index3];
                        //console.log(concepto)
                        let newObj = {
                             tipo_arreglo:"cliente_concepto",
                             cliente_id:null,
                             x:null,
                             concepto_id:null,
                             y:null,
                             valor:0
                        }
                    
                        newObj.cliente_id = clientes.id;
                        newObj. y= clientes.nombre;
                        newObj.concepto_id = concepto.id;
                        newObj.x = concepto.nombre;
                        newObj.padre_id = grupoCon.id;
                        newObj.padre_name = grupoCon.nombre;
                        arregloGrupoConcepto.value.push(newObj);
                    }
                }
             }
             exitAcomodo.value = true;
           break;
    
        default:
             
            break;
    }
  
}

const reAcomodar = () => 
{
    exitAcomodo.value = false;
    arregloGrupoConcepto.value = [];
    for (let index = 0; index < props.clientes_cecos.length; index++) 
    {
       const cliente = props.clientes_cecos[index];
       
       for (let index2 = 0; index2 < props.grupoConceptos_conceptos.length; index2++) 
       {
          const grupo = props.grupoConceptos_conceptos[index2];
          let newObj = {
          tipo_arreglo:"cliente_grupoConcepto",
           cliente_id:null,
           x:null,
           grupo_id:null,
           y:null,
           valor:0
          };
   
          //los clientes/cecos deben ser ejey 
          newObj.cliente_id = cliente.id;
          newObj.y = cliente.nombre;
          //los grupos/concepto deben ser ejex
          newObj.grupo_id = grupo.id;
          newObj.x = grupo.nombre;
          arregloGrupoConcepto.value.push(newObj);
          
       }
      
    }
}

let cambio = ref(false);
const cambioButton = () => 
{
    cambio.value = !cambio.value;
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
           <div>
              <ButtonsGroup @seleccion="setMovimiento" @setFor="setFor" class="justify-center col-start-1 row-start-1 row-end-3"/>
           </div>
            <div class="flex flex-col">
              <div>
                <DangerButton @click="cambioButton">
                  <span v-if="!cambio">
                      Tabla de datos
                  </span>
                  <span v-if="cambio">
                      Grafica
                  </span>
                </DangerButton>
              </div>
              <div class="mt-2" v-if="exitAcomodo">
                <DangerButton @click="reAcomodar">
                   Regresar
                </DangerButton>
              </div>
            </div>
        </div>
        <div class="py-12 -mt-24" v-if="!cambio">
            <!--Grafica-->
            <GraficaPresupuestos :arregloValores = "arregloGrupoConcepto" />
        </div>
        <div class="ml-16 mr-16 -mt-8" v-if="cambio">
            <div class="grid grid-cols-2 grid-rows-1 gap-10">
               <div class="border-2 rounded-xl drop-shadow-2xl"> <!--Card1-->
                   <TableMovs />
               </div>
               <div class="border-2 rounded-xl drop-shadow-2xl"> <!--Card2-->
                   <GraficoMovimientos />
               </div>
            </div>
        </div>
    </AppLayout>
</template>