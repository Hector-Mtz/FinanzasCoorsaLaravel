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
var props = defineProps({
   clientes_cecos:Object,
   grupoConceptos_conceptos:Object,
   cantidades:Object
});

let tipoMovimientos = ref(["PRESUPUESTO", "SUPLEMENTO", "TOTAL", "GASTO", "DISPONIBLE"])
let movimientoReactive = ref("PRESUPUESTO");
const setMovimiento = (movimiento) =>
{
   movimientoReactive.value = movimiento;
}

var colors = {
        "critical": "#ca0101",
        "bad": "#e17a2d",
        "medium": "#e1d92d",
        "good": "#5dbe24",
        "verygood": "#0b7d03",
        "supergood": "#8C8C8C"
    };

 //Primer arreglo de la data
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
         valor:0,
         tipos_movimientos:{
            PRESUPUESTO:0,
            SUPLEMENTO:0,
            TOTAL:0,
            GASTO:0,
            DISPONIBLE:0
         },
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
  //colocacion de valores
  for (let index3 = 0; index3 < arregloGrupoConcepto.value.length; index3++) 
  {
     const interseccion = arregloGrupoConcepto.value[index3];
     for (let index4 = 0; index4 < props.cantidades.length; index4++)
     {
        const cantidad = props.cantidades[index4];
        //console.log(cantidad);
        for (let clave in interseccion.tipos_movimientos)
        {
            if(cantidad.cliente_id == interseccion.cliente_id && cantidad.grupo_conceptos_id == interseccion.grupo_id)
            {
                //Ponemos las cantidades
                if(cantidad.tipo_mov_name == clave)
                {
                  interseccion.tipos_movimientos[clave] = cantidad.cantidad; //posicionamos valor por tipo de movimiento
                  if(clave == "PRESUPUESTO") //si existe este movimiento
                  {
                     interseccion.valor = cantidad.cantidad; //setea el valor de la grafica por default a presupuesto
                  }             
                }
                //Calculos
                //colocacion de valores "calculados"
                if(clave == "TOTAL")
                {
                    let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                    interseccion.tipos_movimientos[clave] = total;
                }

                if(clave == "DISPONIBLE")
                {
                   let disponible = (interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO) - interseccion.tipos_movimientos.GASTO;
                   interseccion.tipos_movimientos[clave] = disponible;
                }

                let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                let gasto =  interseccion.tipos_movimientos.GASTO;

                let porcentaje = (gasto /total) * 100;
                 if(porcentaje  <= 50)
                 {
                    interseccion.color = colors.verygood
                 }
                 if(porcentaje > 51 && porcentaje <= 60)
                 {
                   interseccion.color = colors.good;
                 }
                 if(porcentaje > 61 && porcentaje <= 70)
                 {
                   interseccion.color = colors.medium
                 }
                 if(porcentaje >71 && porcentaje <= 80)
                 {
                    interseccion.color = colors.bad
                 }
                 if(porcentaje >81 && porcentaje <= 90)
                 {
                    interseccion.color = colors.critical
                 }
                 if(porcentaje > 91)
                 {
                    interseccion.color = colors.supergood
                 }
                 
            }
        }
     }
  } 
 
let exitAcomodo = ref(false);
const setFor = (tipoAcomodo) => 
{
    switch (tipoAcomodo) //dependiendo el boton es como se acomodaran los datos y reestructurara la data
    {
        case "CECO":
              //console.log("Set for CECO");
              arregloGrupoConcepto.value = [];
               for (let index = 0; index < props.grupoConceptos_conceptos.length; index++)
               {
                 const grupoConcepto = props.grupoConceptos_conceptos[index];
                 for (let index2 = 0; index2 < props.clientes_cecos.length; index2++) 
                 {
                    const cliente = props.clientes_cecos[index2];
                    for (let index3 = 0; index3 < cliente.cecos.length; index3++) 
                    {
                        const ceco = cliente.cecos[index3];
                        //console.log(ceco);
                        let newObj = {
                             tipo_arreglo:"ceco_grupoConcepto",
                             ceco_id:null,
                             x:null,
                             grupo_id:null,
                             y:null,
                             valor:0,
                             tipos_movimientos:{
                                 PRESUPUESTO:0,
                                 SUPLEMENTO:0,
                                 TOTAL:0,
                                 GASTO:0,
                                 DISPONIBLE:0
                              },
                            };

                        newObj.ceco_id = ceco.id;
                        newObj.y = ceco.nombre;
                        newObj.grupo_id = grupoConcepto.id
                        newObj.x = grupoConcepto.nombre,
                        newObj.padre_id=cliente.id
                        newObj.padre_name =cliente.nombre
                        arregloGrupoConcepto.value.push(newObj);
                    }
                 }
               }

               //colocacion de valores
               for (let index3 = 0; index3 < arregloGrupoConcepto.value.length; index3++) 
               {
                  const interseccion = arregloGrupoConcepto.value[index3];
                  for (let index4 = 0; index4 < props.cantidades.length; index4++)
                  {
                     const cantidad = props.cantidades[index4];
                     //console.log(cantidad);
                     for (let clave in interseccion.tipos_movimientos)
                     {
                         if(cantidad.ceco_id == interseccion.ceco_id && cantidad.grupo_conceptos_id == interseccion.grupo_id)
                         {
                             //Ponemos las cantidades
                             if(cantidad.tipo_mov_name == clave)
                             {
                               interseccion.tipos_movimientos[clave] = cantidad.cantidad; //posicionamos valor por tipo de movimiento
                               if(clave == "PRESUPUESTO") //si existe este movimiento
                               {
                                  interseccion.valor = cantidad.cantidad; //setea el valor de la grafica por default a presupuesto
                               }             
                             }
                             //Calculos
                             //colocacion de valores "calculados"
                             if(clave == "TOTAL")
                             {
                                 let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                                 interseccion.tipos_movimientos[clave] = total;
                             }
             
                             if(clave == "DISPONIBLE")
                             {
                                let disponible = (interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO) - interseccion.tipos_movimientos.GASTO;
                                interseccion.tipos_movimientos[clave] = disponible;
                             }
             
                             let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                             let gasto =  interseccion.tipos_movimientos.GASTO;
             
                             let porcentaje = (gasto /total) * 100;
                              if(porcentaje  <= 50)
                              {
                                 interseccion.color = colors.verygood
                              }
                              if(porcentaje > 51 && porcentaje <= 60)
                              {
                                interseccion.color = colors.good;
                              }
                              if(porcentaje > 61 && porcentaje <= 70)
                              {
                                interseccion.color = colors.medium
                              }
                              if(porcentaje >71 && porcentaje <= 80)
                              {
                                 interseccion.color = colors.bad
                              }
                              if(porcentaje >81 && porcentaje <= 90)
                              {
                                 interseccion.color = colors.critical
                              }
                              if(porcentaje > 91)
                              {
                                 interseccion.color = colors.supergood
                              }
                              
                         }
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
                             valor:0,
                             tipos_movimientos:{
                                 PRESUPUESTO:0,
                                 SUPLEMENTO:0,
                                 TOTAL:0,
                                 GASTO:0,
                                 DISPONIBLE:0
                              },
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

             //colocacion de valores
             for (let index3 = 0; index3 < arregloGrupoConcepto.value.length; index3++) 
               {
                  const interseccion = arregloGrupoConcepto.value[index3];
                  //console.log(interseccion)
                  for (let index4 = 0; index4 < props.cantidades.length; index4++)
                  {
                     const cantidad = props.cantidades[index4];
                     //console.log(cantidad);
                     for (let clave in interseccion.tipos_movimientos)
                     {
                         if(cantidad.concepto_id == interseccion.concepto_id && cantidad.cliente_id == interseccion.cliente_id)
                         {
                             //Ponemos las cantidades
                             if(cantidad.tipo_mov_name == clave)
                             {
                               interseccion.tipos_movimientos[clave] = cantidad.cantidad; //posicionamos valor por tipo de movimiento
                               if(clave == "PRESUPUESTO") //si existe este movimiento
                               {
                                  interseccion.valor = cantidad.cantidad; //setea el valor de la grafica por default a presupuesto
                               }             
                             }
                             //Calculos
                             //colocacion de valores "calculados"
                             if(clave == "TOTAL")
                             {
                                 let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                                 interseccion.tipos_movimientos[clave] = total;
                             }
             
                             if(clave == "DISPONIBLE")
                             {
                                let disponible = (interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO) - interseccion.tipos_movimientos.GASTO;
                                interseccion.tipos_movimientos[clave] = disponible;
                             }
             
                             let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                             let gasto =  interseccion.tipos_movimientos.GASTO;
             
                             let porcentaje = (gasto /total) * 100;
                              if(porcentaje  <= 50)
                              {
                                 interseccion.color = colors.verygood
                              }
                              if(porcentaje > 51 && porcentaje <= 60)
                              {
                                interseccion.color = colors.good;
                              }
                              if(porcentaje > 61 && porcentaje <= 70)
                              {
                                interseccion.color = colors.medium
                              }
                              if(porcentaje >71 && porcentaje <= 80)
                              {
                                 interseccion.color = colors.bad
                              }
                              if(porcentaje >81 && porcentaje <= 90)
                              {
                                 interseccion.color = colors.critical
                              }
                              if(porcentaje > 91)
                              {
                                 interseccion.color = colors.supergood
                              }
                              
                         }
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
           valor:0,
           tipos_movimientos:{
            PRESUPUESTO:0,
            SUPLEMENTO:0,
            TOTAL:0,
            GASTO:0,
            DISPONIBLE:0
            },
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
    //colocacion de valores
  for (let index3 = 0; index3 < arregloGrupoConcepto.value.length; index3++) 
  {
     const interseccion = arregloGrupoConcepto.value[index3];
     for (let index4 = 0; index4 < props.cantidades.length; index4++)
     {
        const cantidad = props.cantidades[index4];
        //console.log(cantidad);
        for (let clave in interseccion.tipos_movimientos)
        {
            if(cantidad.cliente_id == interseccion.cliente_id && cantidad.grupo_conceptos_id == interseccion.grupo_id)
            {
                //Ponemos las cantidades
                if(cantidad.tipo_mov_name == clave)
                {
                  interseccion.tipos_movimientos[clave] = cantidad.cantidad; //posicionamos valor por tipo de movimiento
                  if(clave == "PRESUPUESTO") //si existe este movimiento
                  {
                     interseccion.valor = cantidad.cantidad; //setea el valor de la grafica por default a presupuesto
                  }             
                }
                //Calculos
                //colocacion de valores "calculados"
                if(clave == "TOTAL")
                {
                    let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                    interseccion.tipos_movimientos[clave] = total;
                }

                if(clave == "DISPONIBLE")
                {
                   let disponible = (interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO) - interseccion.tipos_movimientos.GASTO;
                   interseccion.tipos_movimientos[clave] = disponible;
                }

                let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                let gasto =  interseccion.tipos_movimientos.GASTO;

                let porcentaje = (gasto /total) * 100;
                 if(porcentaje  <= 50)
                 {
                    interseccion.color = colors.verygood
                 }
                 if(porcentaje > 51 && porcentaje <= 60)
                 {
                   interseccion.color = colors.good;
                 }
                 if(porcentaje > 61 && porcentaje <= 70)
                 {
                   interseccion.color = colors.medium
                 }
                 if(porcentaje >71 && porcentaje <= 80)
                 {
                    interseccion.color = colors.bad
                 }
                 if(porcentaje >81 && porcentaje <= 90)
                 {
                    interseccion.color = colors.critical
                 }
                 if(porcentaje > 91)
                 {
                    interseccion.color = colors.supergood
                 }
                 
            }
        }
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
              <ButtonsGroup @seleccion="setMovimiento" :tipoMovimientos="tipoMovimientos"  @setFor="setFor" class="justify-center col-start-1 row-start-1 row-end-3"/>
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
            <GraficaPresupuestos :arregloValores = "arregloGrupoConcepto" :movimiento = "movimientoReactive" :cantidades ="cantidades" />
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