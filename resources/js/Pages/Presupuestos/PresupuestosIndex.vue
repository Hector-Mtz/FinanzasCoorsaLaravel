<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { onMounted, reactive, ref, watch, computed } from "vue";
import axios from "axios";
import { pickBy, throttle } from "lodash";
/*Importacion de componentes*/
import ButtonsGroup from "./Partials/ButtonsGroup.vue";
import GraficaPresupuestos from "./Partials/GraficaPresupuestos.vue";
import ButtonAdd from '@/Components/ButtonAdd.vue';
import DangerButton from '@/Components/DangerButton.vue';
import TableMovs from './Partials/TableMovs.vue';
import GraficoMovimientos from "./Components/GraficoMovimientos.vue";
import ButtonCalendar from '@/Components/ButtonCalendar.vue';
import Totales from './Partials/Totales.vue';
/**/
var props = defineProps({
   clientes_cecos:Object,
   grupoConceptos_conceptos:Object,
   cantidades:Object,
   lineas_negocio:Object,
   filters:Object
});

let tipoMovimientos = ref(["PRESUPUESTO", "SUPLEMENTO", "TOTAL", "GASTO", "DISPONIBLE"])
let movimientoReactive = ref("PRESUPUESTO");
const setMovimiento = (movimiento) =>
{
   movimientoReactive.value = movimiento;
}

var colors = {
        "critical": "#C6C6C6",
        "bad": "#FF6565",
        "medium": "#FD8F61",
        "good": "#FFC745",
        "verygood": "#7AE3AA",
        "supergood": "#39CDAD"
    };

 //Primer arreglo de la data
  let arregloGrupoConcepto = ref([]);
  watch(() => props.cantidades,(nuevasCantidades) => 
    { //el whatcher observa el cambio de la data
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
          for (let index4 = 0; index4 < nuevasCantidades.length; index4++)
          {
             const cantidad = nuevasCantidades[index4];
             //console.log(cantidad);
             for (let clave in interseccion.tipos_movimientos)
             {
                 if(cantidad.cliente_id == interseccion.cliente_id && cantidad.grupo_conceptos_id == interseccion.grupo_id)
                 {
                     //Ponemos las cantidades
                     if(cantidad.tipo_mov_name == clave)
                     {
                       interseccion.tipos_movimientos[clave] += cantidad.cantidad; //posicionamos valor por tipo de movimiento
                       if(clave == "PRESUPUESTO") //si existe este movimiento
                       {
                          interseccion.valor += cantidad.cantidad; //setea el valor de la grafica por default a presupuesto
                       }             
                     }
                     //Calculos
                     //colocacion de valores "calculados"
                     if(clave == "TOTAL")
                     {
                         let total = interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO;
                         interseccion.tipos_movimientos[clave] += total;
                     }
      
                     if(clave == "DISPONIBLE")
                     {
                        let disponible = (interseccion.tipos_movimientos.PRESUPUESTO + interseccion.tipos_movimientos.SUPLEMENTO) - interseccion.tipos_movimientos.GASTO;
                        interseccion.tipos_movimientos[clave] += disponible;
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
       const resultado = arregloGrupoConcepto.value.filter(obj => {
        return obj.valor !==0
       });
       arregloGrupoConcepto.value = resultado;
    });
  
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
         linea_negocio:"",
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
  
  //console.log(arregloGrupoConcepto.value);

  //colocacion de valores
  for (let index3 = 0; index3 < arregloGrupoConcepto.value.length; index3++) 
  {
     const interseccion = arregloGrupoConcepto.value[index3];
     for (let index4 = 0; index4 < props.cantidades.length; index4++)
     {
        const cantidad = props.cantidades[index4];
        for (let clave in interseccion.tipos_movimientos)
        {
            if(cantidad.cliente_id == interseccion.cliente_id && cantidad.grupo_conceptos_id == interseccion.grupo_id)
            {
               //console.log(cantidad);
                //Ponemos las cantidades
                interseccion.linea_negocio = cantidad.linea_negocio;
                if(cantidad.tipo_mov_name == clave)
                {
                  interseccion.tipos_movimientos[clave] += cantidad.cantidad; //posicionamos valor por tipo de movimiento
                  if(clave == "PRESUPUESTO") //si existe este movimiento
                  {
                     interseccion.valor += cantidad.cantidad; //setea el valor de la grafica por default a presupuesto
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

const resultado = arregloGrupoConcepto.value.filter(obj => {
   return obj.valor !==0
});

arregloGrupoConcepto.value = resultado;

let exitAcomodo = ref(false);
const setFor = (tipoAcomodo) => 
{
    let resultado = null;
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
                             linea_negocio:"",
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
                             interseccion.linea_negocio = cantidad.linea_negocio;
                             //Ponemos las cantidades
                             if(cantidad.tipo_mov_name == clave)
                             {
                               interseccion.tipos_movimientos[clave] += cantidad.cantidad; //posicionamos valor por tipo de movimiento
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

               resultado = arregloGrupoConcepto.value.filter(obj => {
                       return obj.valor !==0
                });
                arregloGrupoConcepto.value = resultado;
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
                             descripcion:"",
                             linea_negocio:"",
                             tipos_movimientos:{
                                 PRESUPUESTO:0,
                                 SUPLEMENTO:0,
                                 TOTAL:0,
                                 GASTO:0,
                                 DISPONIBLE:0
                              },
                        }
                    
                        newObj.descripcion = concepto.descripcion
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
                              interseccion.linea_negocio = cantidad.linea_negocio;
                             //Ponemos las cantidades
                             if(cantidad.tipo_mov_name == clave)
                             {
                               interseccion.tipos_movimientos[clave] += cantidad.cantidad; //posicionamos valor por tipo de movimiento
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

            resultado = arregloGrupoConcepto.value.filter(obj => {
                       return obj.valor !==0
                });
                arregloGrupoConcepto.value = resultado;
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
                  interseccion.tipos_movimientos[clave] += cantidad.cantidad; //posicionamos valor por tipo de movimiento
                  if(clave == "PRESUPUESTO") //si existe este movimiento
                  {
                     interseccion.valor += cantidad.cantidad; //setea el valor de la grafica por default a presupuesto
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

  const resultado = arregloGrupoConcepto.value.filter(obj => {
   return obj.valor !==0
  });

   arregloGrupoConcepto.value = resultado;
}

let cambio = ref(false);
const cambioButton = () => 
{
    cambio.value = !cambio.value;
}

//Filtros
const params = reactive({
    lineas_negocio_id: null,
    fecha:null,
});

//Fechas
let date = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
});

const changeDate = (newDate) => {
    date.value = newDate;
    let fecha = null;
    //console.log(newDate.month)
    switch (newDate.month) 
    {
      case 0: //Enero
            fecha = newDate.year + '-' + "01";
            params.fecha = fecha;
         break;
      case 1: //Febrero
            fecha = newDate.year + '-' + "02";
            params.fecha = fecha;
         break;
      case 2: //Marzo
            fecha = newDate.year + '-' + "03";
            params.fecha = fecha;
         break;
      case 3: //Abril
            fecha = newDate.year + '-' + "04";
            params.fecha = fecha;
         break;
      case 4: //Mayo
            fecha = newDate.year + '-' + "05";
            params.fecha = fecha;
         break;
      case 5: //Junio
         fecha = newDate.year + '-' + "06";
         params.fecha = fecha;
      break;
      case 6: //Julio
         fecha = newDate.year + '-' + "07";
         params.fecha = fecha;
      break;
      case 7: //Agosto
         fecha = newDate.year + '-' + "08";
         params.fecha = fecha;
      break;
      case 8: //Spetiembre
         fecha = newDate.year + '-' + "09";
         params.fecha = fecha;
      break;
      case 9: //Octubre
         fecha = newDate.year + '-' + "10";
         params.fecha = fecha;
      break;
      case 10: //Noviembre
         fecha = newDate.year + '-' + "11";
         params.fecha = fecha;
      break;
      case 11: //Diciembre
         fecha = newDate.year + '-' + "12";
         params.fecha = fecha;
      break;
    }
};

//watcher para filtros
watch(params, throttle(function () 
  {
    search();
 }), 100);


const search = () => 
{
   const filters = pickBy(params);
   //console.log(params);
   
   Inertia.visit(route('presupuestos.index'),{
        data:filters,
        preserveScroll:true,
        preserveState:true,
        only:['cantidades','clientes_cecos']
    }); 
   
}

const emisionReacomodo = () => 
{
   exitAcomodo.value = true;
}

</script>
<template>
    <AppLayout title="Presupuestos">
        <template #header>
            <div class="flex items-center">
                <h2 class="text-4xl font-bold leading-tight uppercase text-fuente-500">
                    Presupuestos
                </h2>
            </div>
        </template>
        <div class="grid grid-cols-6 grid-rows-2">
           <div>
              <ButtonsGroup v-if="!cambio" @seleccion="setMovimiento" :tipoMovimientos="tipoMovimientos"  @setFor="setFor" class="justify-center col-start-1 row-start-1 row-end-3"/>
           </div>
            <div class="flex flex-col">
              <div class="hidden"> <!--OCULTO LA TABLA DE DATOS-->
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
              <div>
                   <ButtonCalendar class="mt-2" :month="date.month"
                    :year="date.year"
                    @change-date="changeDate($event)"/>
                    <select class="w-full uppercase bg-transparent border-blue-400 rounded-2xl" v-model="params.lineas_negocio_id">
                        <option v-for="linea in lineas_negocio" :key="linea.id" :value="linea.id">
                           {{ linea.name }}
                        </option>
                    </select>
              </div>
            </div>
            <div class="items-center justify-center col-start-3 col-end-6">
               <Totales :cantidades="cantidades" :tipoMovimientos="tipoMovimientos" />
            </div>
        </div>
        <div class="py-12 -mt-24" v-if="!cambio">
            <!--Grafica-->
            <GraficaPresupuestos @reacomodar="emisionReacomodo" :arregloValores = "arregloGrupoConcepto" :movimiento = "movimientoReactive" :cantidades ="cantidades" />
        </div>
        <div class="ml-16 mr-16 -mt-2" v-if="cambio">
            <div class="grid grid-cols-2 grid-rows-1 gap-10">
               <div class="border-2 rounded-xl drop-shadow-2xl"> <!--Card1-->
                   <TableMovs />
               </div>
               <div class="border-2 rounded-xl drop-shadow-2xl"> <!--Card2-->
                   <GraficoMovimientos :movimientos="movimientos" />
               </div>
            </div>
        </div>
    </AppLayout>
</template>