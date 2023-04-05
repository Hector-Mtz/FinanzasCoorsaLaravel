<script setup>
import { ref, onMounted, watch } from 'vue'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";
/*Components*/
import ModalWatchSoliGastos from '../Partials/Modals/ModalWatchSoliGastos.vue';
import ModalGraph from '../Partials/Modals/ModalGraph.vue';
import moment from 'moment';

var props = defineProps({
    arregloValores:Object,
    movimiento:String,
    cantidades:Object,
});

let chart = null;

var colors = {
        "critical": "#ca0101",
        "bad": "#e17a2d",
        "medium": "#e1d92d",
        "good": "#5dbe24",
        "verygood": "#0b7d03",
        "supergood": "#8C8C8C"
    };

watch(() => props.arregloValores,(nuevosValores) => 
    { //el whatcher observa el cambio de la data
        console.log(nuevosValores);  //lo imprime
        chart.data = nuevosValores  
     });

watch(() => props.movimiento,(newMov) => 
    { //el whatcher observa el cambio de la data
        //console.log(newMov);  //lo imprime
        restructuraMov(newMov);
     });

let click1 = ref(0);
let concepto = ref(null);
let ceco = ref(null);
//Modals
const modalSoliGastos = ref(false);
const solicitudes = ref([]);
const openModalSoliGastos = () => 
{
    modalSoliGastos.value = true;
}

const closeModalSoliGastos = () => 
{
    modalSoliGastos.value = false;
}

const modalGrafica = ref(false);
let x = ref(null);
let y = ref(null);
let dataInfo = ref([]);
const openModalGrafico = () => 
{
    modalGrafica.value = true;
}

const closeModalGrafico = () => 
{
    modalGrafica.value = false;
}

//mounted
onMounted(() => 
{
   am4core.useTheme(am4themes_animated);
   // Themes end
   
   chart = am4core.create("chartdiv", am4charts.XYChart);
   chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
   
   chart.maskBullets = false;
   
   var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
   var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
   
   xAxis.dataFields.category = "x";
   yAxis.dataFields.category = "y";
   
   xAxis.renderer.grid.template.disabled = true;
   xAxis.renderer.minGridDistance = 40;
   xAxis.renderer.opposite = true;
   
   yAxis.renderer.grid.template.disabled = true;
   yAxis.renderer.inversed = true;
   yAxis.renderer.minGridDistance = 30;
   
   //Series
   var series = chart.series.push(new am4charts.ColumnSeries());
   series.dataFields.categoryX = "x";
   series.dataFields.categoryY = "y";
   series.dataFields.value = "valor";
   series.sequencedInterpolation = true;
   series.defaultState.transitionDuration = 2000;
   series.dataFields.descripcion = "descripcion"

   console.log(series.dataFields)

   // Set up column appearance
   var column = series.columns.template;
   column.strokeWidth = 2;
   column.strokeOpacity = 1;
   column.stroke = am4core.color("#ffffff");
   column.tooltipText = "{x}({descripcion}), {y}: {value}";
   column.width = am4core.percent(100);
   column.height = am4core.percent(100);
   column.column.cornerRadius(6, 6, 6, 6);
   column.propertyFields.fill = "color";
   
   // Set up bullet appearance
   var bullet1 = series.bullets.push(new am4charts.CircleBullet());
   //bullet1.circle.propertyFields.radius = "value";
   bullet1.circle.fill = am4core.color("#000");
   bullet1.circle.strokeWidth = 0;
   bullet1.circle.fillOpacity = 0.7;
   bullet1.interactionsEnabled = false;
   
   var bullet2 = series.bullets.push(new am4charts.LabelBullet());
   bullet2.label.text = "{valor}";
   bullet2.label.fill = am4core.color("#fff");
   bullet2.zIndex = 1;
   bullet2.fontSize = 15;
   bullet2.interactionsEnabled = false;

   var bullet3 = series.bullets.push(new am4charts.Bullet());
   var square = bullet3.createChild(am4core.Rectangle);
   square.width = 15;
   square.height = 15;
   bullet3.zIndex = 3;
   bullet3.locationY = 0.2;
   bullet3.locationX = 0.9;
   bullet3.fill = am4core.color("#fff");
   bullet3.events.on("hit",function(ev)
   {
      //console.log(ev.target._dataItem._dataContext);
      let dataInterna = ev.target._dataItem._dataContext;
     // console.log(dataInterna)
      axios.get(route('comportamiento', {ejex: dataInterna.x, ejey:dataInterna.y}))
                   .then((resp) => 
                    {
                      console.log(resp.data);
                      x.value = dataInterna.x;
                      y.value = dataInterna.y;
                     //console.log(resp.data);
                      let data= resp.data;
                      //console.log(data);
                      let arregloAux = []; //declaramos arreglo vacio para la data
                      //Tenemos que sacar la primer y ultima fecha pra construir un arreglo de fechas  
                      let arregloFechasTotales = [];
                      let first = data[0].created_at;
                      let fechaInicio = moment(first);
                      let last = _.last(data);
                      let fechaFinal = moment(last.created_at).add(1,'month');
                  
                      while (fechaInicio.isSameOrBefore(fechaFinal))
                       {
                        let Obj = {
                          date: fechaInicio.format('YYYY-MM'),
                          presupuesto:0,
                          suplemento:0,
                          gasto:0
                        }
                      	arregloFechasTotales.push(Obj);
                     		fechaInicio.add(1, 'months');
                    	}
                    //console.log(arregloFechasTotales);
             

                for (let index = 0; index < arregloFechasTotales.length; index++)
                {
                    const element = arregloFechasTotales[index]; //tenemos el arreglo
                    for (let index = 0; index < data.length; index++) 
                    {
                        const elementData = data[index];
                        //console.log(elementData)
                        let fechaActual = moment(elementData.created_at);
                        let fechaActualFormat =  fechaActual.format('YYYY-MM');
                        //console.log(fechaActualFormat);
                        if(element.date == fechaActualFormat)
                        {
                            switch (elementData.tipo_movimiento) 
                            {
                                case "PRESUPUESTO":
                                       element.presupuesto = elementData.cantidad;
                                    break;
                                case "GASTO":
                                       element.gasto = elementData.cantidad;
                                    break;
                                case "SUPLEMENTO":
                                       element.suplemento = elementData.cantidad;
                                    break;
                            
                                default:
                                    break;
                            }
                        }
                    }
                }
                
                dataInfo.value = arregloFechasTotales;
             });
      openModalGrafico();
   });
   
   chart.data = props.arregloValores; 
   series.columns.template.events.on("hit", function(ev)  //primer click para zoom
    {
       if(click1.value == 0)
       {
           //hay que recuperar los nombres de ejex y ejey
           //console.log(ev.target.dataItem); //tenemos ambas categorias
           let categorias =  ev.target.dataItem.categories;
           let tipoAcomodo = ev.target.dataItem.dataContext.tipo_arreglo;
           switch (tipoAcomodo) 
           {
            case "cliente_grupoConcepto":
                  axios.get(route('cliente.grupoCon', {cliente: categorias.categoryY, grupoConcepto:categorias.categoryX}))
                   .then((resp) => 
                    {
                      //console.log(resp.data);
                      let arregloAux = [];
                      let conceptos = resp.data[1];
                      let cecos = resp.data[0];
                      for (let index = 0; index < cecos.length; index++)
                       {
                          const ceco = cecos[index];
                          //console.log(ceco);
                          for (let index2 = 0; index2 < conceptos.length; index2++) 
                          {
                             const concepto = conceptos[index2];
                             let newObj = {
                                ceco_id:null,
                                x:null,
                                concepto_id:null,
                                y:null,
                                valor:0,
                                descripcion:'',
                                tipos_movimientos:{
                                 PRESUPUESTO:0,
                                 SUPLEMENTO:0,
                                 TOTAL:0,
                                 GASTO:0,
                                 DISPONIBLE:0
                              },
                             }
                             newObj.descripcion = concepto.descripcion;
                             newObj.ceco_id = ceco.id;
                             newObj.y = ceco.nombre;
                             newObj.concepto_id = concepto.id;
                             newObj.x = concepto.nombre;
                             arregloAux.push(newObj);
                          }
                       }

                       //colocacion de valores
                       for (let index3 = 0; index3 < arregloAux.length; index3++) 
                          {
                             const interseccion = arregloAux[index3];
                             for (let index4 = 0; index4 < props.cantidades.length; index4++)
                             {
                                const cantidad = props.cantidades[index4];
                                //console.log(cantidad);
                                for (let clave in interseccion.tipos_movimientos)
                                {
                                    if(cantidad.ceco_id == interseccion.ceco_id && cantidad.concepto_id == interseccion.concepto_id)
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

                       //console.log(arregloAux);
                       click1.value = 1;
                       chart.data = arregloAux;
                    });
                break;
            case "ceco_grupoConcepto": //solo debe mandar el grupoconcepto para desplegar los conceptos y conserva el ceco
                //console.log("ceco_grupoConcepto")
                axios.get(route('ceco.grupoCon', {grupoConcepto:categorias.categoryX})) //traemos todos los coceptos de ese grupo
                   .then((resp) => 
                    {
                        let arregloAux = [];
                        //console.log(resp);
                        for (let index = 0; index < resp.data.length; index++) 
                        {
                            const concepto = resp.data[index];
                            let newObj = {
                                ceco_id:null,
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
                             newObj.ceco_id = null;
                             newObj.y = categorias.categoryY;
                             newObj.concepto_id = concepto.id;
                             newObj.x = concepto.nombre;
                             arregloAux.push(newObj);
                        }
                       //colocacion de valores
                       for (let index3 = 0; index3 < arregloAux.length; index3++) 
                          {
                             const interseccion = arregloAux[index3];
                             for (let index4 = 0; index4 < props.cantidades.length; index4++)
                             {
                                const cantidad = props.cantidades[index4];
                                //console.log(interseccion);
                                for (let clave in interseccion.tipos_movimientos)
                                {
                                    if(cantidad.ceco_name == interseccion.y && cantidad.concepto_id == interseccion.concepto_id)
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
                        click1.value = 1;
                        chart.data = arregloAux;
                    });
              break;           
            case "cliente_concepto": //solo debe mandar el cliente para desplegar los cecos y conserva el concepto
                //console.log("cliente_concepto")
                axios.get(route('cliente.concepto', {cliente:categorias.categoryY}))
                   .then((resp) => 
                    {
                        let arregloAux = [];
                        //console.log(resp);
                        for (let index = 0; index < resp.data.length; index++) 
                        {
                            const ceco = resp.data[index];
                            let newObj = {
                                ceco_id:null,
                                x:null,
                                concepto_id:null,
                                y:null,
                                valor:0,
                                descripcion:'',
                                tipos_movimientos:{
                                 PRESUPUESTO:0,
                                 SUPLEMENTO:0,
                                 TOTAL:0,
                                 GASTO:0,
                                 DISPONIBLE:0
                              },
                             }
                            // console.log(categorias);
                             newObj.ceco_id = ceco.id;
                             newObj.y = ceco.nombre;
                             newObj.concepto_id = null;
                             newObj.x = categorias.categoryX;
                             arregloAux.push(newObj);
                        }

                      //colocacion de valores
                      for (let index3 = 0; index3 < arregloAux.length; index3++) 
                          {
                             const interseccion = arregloAux[index3];
                             for (let index4 = 0; index4 < props.cantidades.length; index4++)
                             {
                                const cantidad = props.cantidades[index4];
                                //console.log(cantidad);
                                for (let clave in interseccion.tipos_movimientos)
                                {
                                    if(cantidad.ceco_id == interseccion.ceco_id && cantidad.concepto_name == interseccion.x)
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
                        click1.value = 1;
                        chart.data = arregloAux;
                    });
                break;
           }
           click1.value = 1;
       }
       else
       {
         let categorias =  ev.target.dataItem.categories;
         modalSoliGastos.value = true
         ceco.value = categorias.categoryY;
         concepto.value = categorias.categoryX;
         click1.value = 0;

         axios.get(route('soli.gastos', {ceco: ceco.value, concepto: concepto.value}))
                   .then((resp) => 
                    {
                        //console.log(resp.data);
                        solicitudes.value = resp.data;
                    });
       }
       
    }, this);
   
   var baseWidth = Math.min(chart.plotContainer.maxWidth, chart.plotContainer.maxHeight);
   var maxRadius = baseWidth / Math.sqrt(chart.data.length) / 2 - 2; // 2 is jast a margin
   series.heatRules.push({ min: 1, max: maxRadius, property: "radius", target: bullet1.circle });
   
   
   chart.plotContainer.events.on("maxsizechanged", function() {
       var side = Math.min(chart.plotContainer.maxWidth, chart.plotContainer.maxHeight);
       bullet1.circle.clones.each(function(clone) {
           clone.scale = side / baseWidth;
       })
   });

   /*Scrollbar*/
   chart.scrollbarX = new am4core.Scrollbar();
   chart.scrollbarX.parent = chart.bottomAxesContainer;
   chart.scrollbarY = new am4core.Scrollbar();
   chart.scrollbarY.parent = chart.leftAxesContainer;
});

const restructuraMov = (movimiento) => 
{
   let arrayAux = chart.data;
   //console.log(chart.data); //imprimiemos la data actual independientemente de como este estructurada
   for (let index = 0; index < arrayAux.length; index++) 
   {
     const item = arrayAux[index];
     //console.log(item);
     for(let clave in item.tipos_movimientos)
     {
        if(clave == movimiento)
        {
           item.valor = item.tipos_movimientos[clave];
        }
     }
   }
   
  chart.data = [];
  chart.data = arrayAux;
}

</script>
<template>
    <div class="hello" ref="chartdiv" id="chartdiv">
    </div>
    <!--Modales-->
    <ModalWatchSoliGastos :ceco="ceco" :concepto="concepto" :show="modalSoliGastos" @close="closeModalSoliGastos" :solicitudes ="solicitudes" />
    <ModalGraph  :ejex = "x" :ejey="y" :data="dataInfo" :show="modalGrafica" @close="closeModalGrafico" />
</template>
<style>
#chartdiv {
  width: 100%;
  height: 900px;
}
</style>