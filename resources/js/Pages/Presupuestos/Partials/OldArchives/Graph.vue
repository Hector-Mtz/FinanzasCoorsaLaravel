<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5hierarchy from  '@amcharts/amcharts5/hierarchy';
import { watch, ref, onMounted  } from '@vue/runtime-core';
import { reactive } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import axios from 'axios';
import ButtonPres from '@/Components/ButtonPres.vue';
import moment from 'moment';
import ModalSalidaMovimiento from '../../Components/ModalSalidaMovimiento.vue';

//comentariooo

///comentario programador jr

//variables GLOBALES
//cambio aaa
let data =[];
let nuevoArreglo=[];
let series =[];
let nuevosValores;
let ejey = [];
let ejex = [];
let yAxis;
let xAxis;
let root;
let yRenderer;
let xRenderer;
let chart;
let modalDatos = [{grupoconcepto:''}];


export default {

    props: {
        clientes: Object,
        grupo_conceptos: Object,
        cantidades: Object,
        movimientos:Object,
        solicitudes:Object
    },
    components: {
        ButtonPres,
    },
    data() {
        return {
            movimiento: { state: "PRESUPUESTO" },
            SalidaMovimiento:false,
            data: [],
            modalData:modalDatos,
            //movimientos:[], //array para listar los tipo de movimiento
            agrupacionModal:[],
            productos:[],
            idMovimientoForm:0,
            nombreMovimiento:"",
            cliente:"",
            grupo_concepto:"",
            zoom:false //variable para regresar al padre
        };
    },
  
    mounted() {
        // console.log(vm.clientes); //comprobamos si imprime todos los los clientes
        let clients = this.clientes; //guardamos en una varibale los cliente spara iterarlos
        //console.log(clients);
        let grupo_conceptos = this.grupo_conceptos;
        //console.log(grupo_conceptos);
        //console.log(this.WatchProductos);

        let datos = this.cantidades;
        root = am5.Root.new(this.$refs.chartdiv);
        root.setThemes([am5themes_Animated.new(root)]);
        chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            layout: root.verticalLayout
        }));
        // Create axes and their renderers
         yRenderer = am5xy.AxisRendererY.new(root, { //este tenia var
            visible: false,
            minGridDistance: 20,
            inversed: true
        });
        yRenderer.grid.template.set("visible", false);
        yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            renderer: yRenderer,
            categoryField: "category"
        }));
         xRenderer = am5xy.AxisRendererX.new(root, { //este tenia la var
            visible: false,
            minGridDistance: 30,
            inversed: false,
            opposite: true,
        });
        xRenderer.grid.template.set("visible", false);
         xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            renderer: xRenderer,
            categoryField: "category",
        }));
        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
         series = chart.series.push(am5xy.ColumnSeries.new(root, {
            calculateAggregates: true,
            stroke: am5.color(16777215),
            clustered: false,
            xAxis: xAxis,
            yAxis: yAxis,
            categoryXField: "x",
            categoryYField: "y",
            valueField: "value",
        }));
        series.columns.template.setAll({
            tooltipText: "{value}",
            strokeOpacity: 1,
            strokeWidth: 2,
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            cornerRadiusBL: 5,
            cornerRadiusBR: 5,
            width: am5.percent(100),
            height: am5.percent(100),
            templateField: "columnSettings",
        });
        var circleTemplate = am5.Template.new({});
        // Add heat rule
        // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
        series.set("heatRules", [{
                target: circleTemplate,
                dataField: "value",
                key: "radius"
            }]);
        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                    fill: am5.color(16777215),
                    populateText: true,
                    centerX: am5.p50,
                    centerY: am5.p50,
                    fontSize: 15,
                    text: "{value}"
                })
            });
        });
        //DECLARACION DE COLORES PARA ASIGNARA
        var colors = {
            critical: am5.color(13238529),
            bad: am5.color(14776877),
            medium: am5.color(14801197),
            good: am5.color(6143524),
            verygood: am5.color(752899)
        };
        // Set data
        // https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
        //PARTE A SECCIONAR0

          data = [];
          let a = {};
          nuevoArreglo = [];
          for (let c = 0; c < datos.length; c++) 
          {
               var ele = datos[c];
               let i = 0
               let r = 0
               if (ele === datos[0]) 
               {
                 a = {
                       x: ele.Cliente,
                       y: ele.GrupoConcepto,
                       movimientos: [{
                          tipo: ele.Movimiento,
                          cantidad: parseInt(ele.Cantidad)
                        }]
                     }
                nuevoArreglo.push(a);
               //console.log(nuevoArreglo)
             }
              else 
             {
               let xy = ele.Cliente + ele.GrupoConcepto
               while (i < nuevoArreglo.length)
                {
                 var x = nuevoArreglo[i];
                 let y = x.x + x.y;
                 if (xy === y) 
                 {
                  let e = 0
                  let k = 0
                  while (e < x.movimientos.length)
                   {
                     let z = x.movimientos[e];
                     let j = z.tipo
                     let  h = ele.Movimiento
                     if (j === h) 
                     {
                       z.cantidad = parseInt(z.cantidad) + parseInt(ele.Cantidad)
                       k = 1
                       break
                     }
                     e++
                   }
                   if (k === 0) 
                   {
                     let  a = 
                     {
                       tipo: ele.Movimiento,
                       cantidad: parseInt(ele.Cantidad)
                     }
                     x.movimientos.push(a)
                   }
                   r = 1; //bandera declarada en 1 para romper el ciclo
                   break
                 }   
                 i++
                };
               if (r === 0) 
               {
                 a = {
                     x: ele.Cliente,
                     y: ele.GrupoConcepto,
                     movimientos: [{
                         tipo: ele.Movimiento,
                         cantidad: parseInt(ele.Cantidad)
                      }]
                    }
                 nuevoArreglo.push(a);
                }
             }
             //console.log(nuevoArreglo)
         }
         let i = 0
         let total = 0
         let disponible = 0
         let porcentaje = 0
         //console.log(nuevoArreglo.length);
         while (i < nuevoArreglo.length) {
         let h = nuevoArreglo[i]
         
            let a = {
                 "tipo": "TOTAL",
                 "cantidad": total
             };
            let  b = {
                 "tipo": "PORCENTAJE",
                 "cantidad": porcentaje
             };
            let c = {
                 "tipo": "DISPONIBLE",
                 "cantidad": disponible
             }
         h.movimientos.push(a, b, c)
         //console.log(total);
         let j = 0
         while (j < h.movimientos.length) {
             let k = h.movimientos[j]
             //console.log(k.tipo);
             if (k.tipo === "PRESUPUESTO") {
                 //console.log('llegue aqui');
                 let l = 0
                 while (l < h.movimientos.length) {
                     let g = h.movimientos[l]
                     if (g.tipo === "TOTAL") {
                         g.cantidad = g.cantidad + k.cantidad
                     }
                     l++
                 }
             } else if (k.tipo === "SUPLEMENTO") {
                 //console.log("hola");
                 let l = 0
                 while (l < h.movimientos.length) {
                     let g = h.movimientos[l]
                     if (g.tipo === "TOTAL") {
                         g.cantidad = g.cantidad + k.cantidad
                     }
                     l++
                 }
             }
             else if (k.tipo === "GASTO") {
                 //console.log("hola");
                 let l = 0
                 while (l < h.movimientos.length) {
                     let g = h.movimientos[l]
                     if (g.tipo === "PORCENTAJE") {
                         g.cantidad = g.cantidad + (k.cantidad)
                     }
                     else if 
                     (g.tipo === "DISPONIBLE") {
                         g.cantidad = g.cantidad + (-1*k.cantidad)
                     }
                     l++
                 }
             }
             else if (k.tipo === "TOTAL") {
                 //console.log("hola");
                 let l = 0
                 while (l < h.movimientos.length) {
                     let g = h.movimientos[l]
                     if (g.tipo === "PORCENTAJE") {
                         g.cantidad = Math.round(100*(g.cantidad / k.cantidad))
                     }
                     else if 
                     (g.tipo === "DISPONIBLE") {
                         g.cantidad = g.cantidad + k.cantidad
                     }
                     l++
                 }
             }
             j++
         }
         i++
         }
         //console.log(nuevoArreglo)
         
         let e = "GASTO"
         i = 0
         let v = 0
         while (i < nuevoArreglo.length) {
         let j = nuevoArreglo[i]
         let a = 0
                 while(a < j.movimientos.length ){
                     let k = j.movimientos[a]
                     if(e === k.tipo){
                         v = k.cantidad
                     }
                     a++
                 }
         
         x =  {
             "x" : j.x,
             "y" : j.y,
             "value": v
         }
         data.push(x)
         i++
         }
         
        // console.log(data);
                 function TipoMov(movimiento) {
                     let e = movimiento;
                     i = 0;
                     let v = 0;
                     while (i < nuevoArreglo.length) {
                         let j = nuevoArreglo[i];
                         let a = 0;
                         while (a < j.movimientos.length) {
                             let k = j.movimientos[a];
                             if (e === k.tipo) {
                                 v = k.cantidad;
                             }
                             a++;
                         }
                         x = {
                             "y": j.x,
                             "x": j.y,
                             "value": v
                         };
                         data.push(x);
                         i++;
                     }
                 }
        //console.log(this.movimiento.state);
        TipoMov(this.movimiento.state);
        //console.log(data);
        series.data.setAll(data);
        //Siteamos los datos que aparecen en el eje y
        for (let index = 0; index < clients.length; index++) {
            const element = clients[index];
            //console.log(element.nombre);
            ejey.push({ category: element.nombre });
        }
        yAxis.data.setAll(ejey);
        //Siteamos los datos que aparecen en el eje x
        for (let i = 0; i < grupo_conceptos.length; i++) {
            const e = grupo_conceptos[i];
            // console.log(e.nombre);
            ejex.push({ category: e.nombre });
        }
        xAxis.data.setAll(ejex);
        //click
        series.columns.template.events.once("click", (ev)  => {
            if(!this.zoom) {this.click(ev)}
        });

        root.container.children.moveValue(
          am5hierarchy.BreadcrumbBar.new(root, {
          series: series
          }), 0
         );

        //AGREGAR LEGEND
        var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        }));
        legend.data.setAll(chart.series.values);
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
        chart.appear(1000, 100);
    },
    methods: { 
        click:function(ev)
        {
           this.zoom = true;
           nuevosValores = ev.target._dataItem.dataContext; //recuperamos x y anteriores
           //console.log(nuevosValores);
           let x = nuevosValores.x;
           let y = nuevosValores.y;
           axios.get('api/ceco_concepto/'+x+'/'+y,{ob: x},{ob1: y}) //enviamos el dato a la ruta de la api
           .then((resp)=>{
              let datos = resp.data[0]; //la respuesta que obtenemos de BD es la que almacenamos
              //console.log(datos); //imprimimos la respuesta accediendo a la data
              data = []; //vaciamos el arreglo data
              let a = {};
              nuevoArreglo = [];
              for (let index = 0; index < datos.length; index++) 
              {
                const element = datos[index];
                //console.log(element); imprime cada elemento
                let i = 0;
                let r = 0;
                if (element === datos[0])  //si el valor seleccionado es igual al indice 0
                 {
                    //console.log("Es igual al indice 0");
                     a = {
                         x: element.CECO,
                         y: element.Concepto,
                         movimientos: [{
                             tipo: element.Movimiento,
                             cantidad: parseInt(element.Cantidad)
                         }]
                     }
                     nuevoArreglo.push(a);
                     //console.log(element);
                     console.log(nuevoArreglo)
                 }
                 else //si el valor seleccionado es diferente al indice 0
                 {
                    //console.log(element); //elemento diferente a indice 0
                    //console.log("Es diferente al indice 0");
                    let xy = element.CECO+element.Concepto; //tomamos el ceco y concepto del elemento diferente de 0
                    while (i < nuevoArreglo.length) 
                    {
                      var elemento0 = nuevoArreglo[i]; //tomamos el elemento que esta en primera posicion
                      //console.log(elemento0); //imprime el arreglo con los movimientos
                      let newxy = elemento0.x + elemento0.y; //extraemos el xy del elemento 0
                      //console.log(xy);
                      if (xy === newxy)  //comprobamos si son iguales los xy
                      {
                          //console.log("XY elemento0:" +newxy + " XY de otro elemento: "+ xy)
                          let e = 0
                          let k = 0
                          while (e < elemento0.movimientos.length)  //recorremos los movimientos
                          {
                              let z = elemento0.movimientos[e];
                              let j = z.tipo; // imprime el tipo del movimiento
                              let h = element.Movimiento; //imprime el movimiento que tra de la BD
                              //console.log(h); 
                              if (j === h)  //si los movimientos son iguales
                              {
                                  z.cantidad = parseInt(z.cantidad) + parseInt(element.Cantidad)
                                  k = 1; //levantamos bandera
                                  break
                              }
                              e++
                          }
                          if (k === 0)  //si la bandera es igual a 0
                          {
                              a = {
                                  tipo: element.Movimiento,
                                  cantidad: parseInt(element.Cantidad)
                                 }
                                 //console.log(newxy);
                                 elemento0.movimientos.push(a)
                          }
                          r = 1
                          break
                         }
                         i++
                      }
                      if (r === 0)
                       {
                           a = {
                             x: element.CECO,
                             y: element.Concepto,
                             movimientos: [{
                                 tipo: element.Movimiento,
                                 cantidad: parseInt(element.Cantidad)
                             }]
                           }
                          nuevoArreglo.push(a);
                      }
                  }                       
                }
               //Poniendo los nuevos tipos de movimiento
               let i = 0
               let total = 0
               let disponible = 0
               let porcentaje = 0
               //console.log(nuevoArreglo.length);
               while (i < nuevoArreglo.length) {
                  let ele = nuevoArreglo[i]
              
                    let  a = {
                              "tipo": "TOTAL",
                              "cantidad": total
                            };
                    let  b = {
                              "tipo": "PORCENTAJE",
                              "cantidad": porcentaje
                            };
                    let c = {
                          "tipo": "DISPONIBLE",
                          "cantidad": disponible
                      }
                  ele.movimientos.push(a, b, c)
                  let j = 0
                    while (j < ele.movimientos.length) 
                    {
                       let k = ele.movimientos[j] 
                       if (k.tipo === "PRESUPUESTO") 
                       {
                           let l = 0
                           while (l < ele.movimientos.length) {
                               let g = ele.movimientos[l]
                               if (g.tipo === "TOTAL") {
                                   g.cantidad = g.cantidad + k.cantidad
                               }
                               l++
                           }
                       } else if (k.tipo === "SUPLEMENTO") {
                           let l = 0
                           while (l < ele.movimientos.length) {
                               let g = ele.movimientos[l]
                               if (g.tipo === "TOTAL") {
                                   g.cantidad = g.cantidad + k.cantidad
                               }
                               l++
                           }
                       }
                       else if (k.tipo === "GASTO") {
                           let l = 0
                           while (l < ele.movimientos.length) {
                               let g = ele.movimientos[l]
                               if (g.tipo === "PORCENTAJE") {
                                   g.cantidad = g.cantidad + (k.cantidad)
                               }
                               else if 
                               (g.tipo === "DISPONIBLE") {
                                   g.cantidad = g.cantidad + (-1*k.cantidad)
                               }
                               l++
                           }
                       }
                       else if (k.tipo === "TOTAL") {
                           let l = 0
                           while (l < ele.movimientos.length) {
                               let g = ele.movimientos[l]
                               if (g.tipo === "PORCENTAJE") {
                                   g.cantidad = Math.round(100*(g.cantidad / k.cantidad))
                               }
                               else if 
                               (g.tipo === "DISPONIBLE") {
                                   g.cantidad = g.cantidad + k.cantidad
                               }
                               l++
                           }
                       }
                       j++
                   }
                  i++
               }

                function TipoMov(movimiento) {
                     let e = movimiento;
                     i = 0;
                     let v = 0;
                     while (i < nuevoArreglo.length) {
                         let j = nuevoArreglo[i];
                         let a = 0;
                         while (a < j.movimientos.length) {
                             let k = j.movimientos[a];
                             if (e === k.tipo) {
                                 v = k.cantidad;
                             }
                             a++;
                         }
                         x = {
                             "y": j.x,
                             "x": j.y,
                             "value": v
                         };
                         data.push(x);
                         i++;
                     }
                 }
              //console.log(this.movimiento.state);
              TipoMov(this.movimiento.state);
              //console.log(data);

              series.columns.template.events.on("click", (ev) => {
                  if (this.zoom){
                    let nuevosValores = ev.target._dataItem.dataContext; 
                    console.log(nuevosValores);
                    this.cliente= nuevosValores.y;
                    this.grupo_concepto= nuevosValores.x;
                    this.SalidaMovimiento = true;
                }
           }); //funcion para el modal
               

              ejex=[]; //vaciamos el ejex
              let cecos = resp.data[1]; //traemos el objeto donde contiene los cecos
              //console.log(cecos.length);
              for (let index = 0; index < cecos.length; index++) //recorremos cecos
              {
              let nombreCeco = cecos[index].nombre; //guardamos en variables los cecos
              ejex.push({ category: nombreCeco }); // lo metemos al objeto
              }
              //console.log(ejex);
              ejey = [];
              let conceptos = resp.data[2];
              for (let f = 0; f < conceptos.length; f++) {
                  let nombreConcepto = conceptos[f].nombre;
                  ejey.push({ category: nombreConcepto });
              }
              //console.log(nuevoArreglo);
              yAxis.data.setAll(ejex);
              xAxis.data.setAll(ejey);
              series.data.setAll(data);
          })
           .catch(function (error)
          {
           console.log(error);
          });    
        },

        cambiar: function (movimiento) {
            this.movimiento.state = movimiento; //reemplazamos la variable global por la que traemos del boton
            //console.log(this.movimiento.state);
            let actualMov = movimiento;
            let i = 0;//variable que se usara para recorrer el arreglo
            let newValue; //declaramos el value que se usara en 0
            //console.log(nuevoArreglo);
            data = []; //declaramos la data que se enviara a la grafica vacia
            console.log(nuevoArreglo);
            while (i < nuevoArreglo.length)//recorremos el arreglo que tenemos actual
             { 
                let element = nuevoArreglo[i]; //almacenamos en una variable el objeto
                console.log(element);
                let a = 0;//declaramos una variable para iterar con esta
                while (a < element.movimientos.length) //iteramos sobre los movimientos
                {
                    let movActual = element.movimientos[a];
                    //console.log(movActual);
                    if (actualMov === movActual.tipo)
                     {
                        newValue = movActual.cantidad;
                     }
                    a++;
                }
                let x = {
                    "y": element.x,
                    "x": element.y,
                    "value": newValue
                };
                data.push(x);
                i++;
            }    
            series.data.setAll(data);
            console.log(data);
        } ,

        closeModalSalida:function()
        {
            this.SalidaMovimiento = false;
           
        },

    },
    components: { ModalSalidaMovimiento,ButtonPres ,Link }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .graph {
   width: 100%;
   height: 500px;
 }
</style>
<template>
     <div class="group">
           <ButtonPres class="buttonCECO" @click="filtroCECOS" style="background-color:#111F2E">CECO</ButtonPres>
           <ButtonPres class="buttonCON" style="background-color:#111F2E">CON.</ButtonPres> 
           <div class="dropdown" >
                  <button onclick="myFunction()" class="dropbtn">$</button>
                  <div id="myDropdown" class="dropdown-content">
                      <button id="PRESUPUESTO" @click="cambiar('PRESUPUESTO')">Presupuesto</button>
                      <button id="SUPLEMENTO" @click="cambiar('SUPLEMENTO')">Suplemento</button>
                      <button id="TOTAL" @click="cambiar('TOTAL')">Total</button>
                      <button id="GASTO" @click="cambiar('GASTO')">Gasto</button>
                      <button id="DISPONIBLE" @click="cambiar('DISPONIBLE')">Disponible</button>     
                  </div>
           </div>
     </div>
 
  <ModalSalidaMovimiento :show="SalidaMovimiento" 
    :ceco="cliente" 
    :concepto="grupo_concepto"
    @close="closeModalSalida">
  </ModalSalidaMovimiento>

  <a  v-if="zoom" :href="route('clientes.index')" style="color:red;">  
        Regresarss
  </a >
  <div class="graph" ref="chartdiv">  </div>
</template>