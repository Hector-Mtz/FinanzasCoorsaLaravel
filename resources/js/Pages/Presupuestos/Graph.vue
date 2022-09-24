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
import ModalGastos from '@/Components/DialogModal.vue';
import ButtonPres from '../../Components/ButtonPres.vue';
import SecondaryButton1 from '@/Jetstream/SecondaryButton.vue';
import Button from '@/Jetstream/Button.vue';
import ButtonAdd from '../../Components/ButtonAdd.vue';
import TableComponent from '@/Components/Table.vue';
import Label from '@/Jetstream/Label.vue';
import Input1 from '@/Jetstream/Input.vue';
import DangerButton from '@/Components/DangerButton.vue';
import { isSet } from '@vue/shared';
import SelectComponent from '@/Components/SelectComponent.vue';
import Table from '../../Components/Table.vue';
import moment from 'moment';
//variables GLOBALES
//cambio aaa
let zoom = false;
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
let idMovimientoForm; 

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
            ModalMov:false,
            ModalNewGastos: false,
            WatchProductos:false,
            ModalNewProducto:false,
            data: [],
            modalData:modalDatos,
            movimientos:[], //array para listar los tipo de movimiento
            agrupacionModal:[],
            productos:[],
            idMovimientoForm:0,
            nombreMovimiento:"",
            filas:[],
            newFilas:[]
        };
    },

    setup()
    {
        const formSolicitud = reactive({
          nombre: "",
          tipo_movimiento_id: 0,
          ceco_concepto_id:0,
          productos:[],
          autorizacion_id:1,
          created_at:"",
          updated_at:""
          })

          return { formSolicitud }
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
            if(!zoom) {this.click(ev)}
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
           zoom = true;
           nuevosValores = ev.target._dataItem.dataContext; //recuperamos x y anteriores
           //console.log(nuevosValores);
           let x = nuevosValores.x;
           let y = nuevosValores.y;
           axios.get('api/ceco_concepto/'+x+'/'+y,{ob: x},{ob1: y}) //enviamos el dato a la ruta de la api
           .then((resp)=>{
              let datos = resp.data[0]; //la respuesta que obtenemos de BD es la que almacenamos
              console.log(datos); //imprimimos la respuesta accediendo a la data
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
                                 console.log(newxy);
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
                if(zoom){
                    this.nuevoClick(ev)
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

        nuevoClick: function(ev)
        {
           this.data = data;
           let datos = this.data;
           //console.log(datos);
           nuevosValores = ev.target._dataItem.dataContext; 
           //console.log(nuevosValores);
           let x = nuevosValores.x;
           let y = nuevosValores.y;
           
           axios.get('api/cliente_concepto/'+x+'/'+y,{ob: x},{ob1: y}) //enviamos el dato a la ruta de la api
           .then((resp)=>
           {
            //console.log(resp);
             let button;
             modalDatos=resp.data[0];
             this.modalData = modalDatos;
             //console.log(this.modalData);
             let newData = this.modalData; //almacenamos lo que viene de la bd en una variable
             this.movimientos = resp.data[1];
             let tipoMovimientos = this.movimientos;
             //console.log(tipoMovimientos);
             let nuevoArregloMovimientos = [];
                for (let index = 0; index < tipoMovimientos.length; index++) //for para agrupar
             {
                let element = tipoMovimientos[index];
                //console.log(element);
                if(element == tipoMovimientos[0])
                {
                  nuevoArregloMovimientos.push(
                    {
                        movimiento:element.nombre
                    }
                  );
                } 
                else {
                    let nombreTipo = element.nombre;
                    //console.log(nombreTipo); //imprime los diferentes a indice 0
                    let nuevoObj;
                    //console.log(nuevoArregloMovimientos.length); //marca cuantos elementos hay en el arreglo
                    for (let i = 0; i < nuevoArregloMovimientos.length; i++) 
                    {
                        let element = nuevoArregloMovimientos[i]; //almacenamos en variable el elemento que fue guardado en la primera vuelta
                        if(element !== nombreTipo) //comparamos si el elemento que fue agregado en la primer vuelta es igual al que recorremos
                        {
                            nuevoObj = //por cada elemento nuevo creamos un objeto
                           {
                             movimiento:nombreTipo
                           }
                        } 
                       
                    }
                     nuevoArregloMovimientos.push(nuevoObj); //hacemos push al array principal
                }  
                   
                } 
                let elementoPrincipal;
                for (let index = 0; index < newData.length; index++) //recorremos la newData
                {
                    elementoPrincipal = newData[index];
                    //console.log(elementoPrincipal);
                    let elementoMovimiento = newData[index].movimiento;
                    
                    //console.log(elementoMovimiento) //imprime los elementos del array de la bd

                    for (let i = 0; i < nuevoArregloMovimientos.length; i++)  //recorremos los movimientos
                    {
                         let  eleMovimiento = nuevoArregloMovimientos[i].movimiento;
                             if ( elementoMovimiento == eleMovimiento)
                              {
                                //console.log(elementosArray.movimiento , x.movimiento) // imprime del principal el movimiento y de los movimientos
                                  parseInt(i);
                                 // console.log(y) //imprime
                                  elementoPrincipal.indice = i
                              }
                    }
                }  
                //RECORRIDO PARA HACER LOS TDs
                let cambio = false;
                console.log(newData);
                for (let x = 0; x < newData.length; x++)
                 {
                    console.log(newData);
                    let tds = [];                    
                    let indice = newData[x].indice; //seleccionamos el indice del elemento actual
                    //console.log(indice); //imprime el indice
                    //console.log("vuelta numero" +  x)
                    //let longitud = elementosArray.length; //rescatamos la longitud
                    for ( let k = 0; k < nuevoArregloMovimientos.length; k++) 
                    {
                        //console.log(k)
                        let  indiceMovimiento = k; //recuperamos indice actual
                        //console.log(tipoMovimiento);
                        if(indiceMovimiento === indice)
                        {
                          //console.log(elementosArray[x].cantidad)
                          let td = '<td>'+newData[x].cantidad+'</td>' ;
                          //console.log(td);
                          tds.push(td)
                        }
                        else{
                            let td = `<td></td>` ;
                            tds.push(td)
                          //console.log(td);
                          //console.log("llegue aqui" + k)
                          //document.getElementById(x).innerHTML=td; // obtengo el id y sustituyo por el actual     
                        }

                    }
                    
                    let stringTds = tds.toString();
                    console.log(newData);
                    let stringTdsSinComas = stringTds.replace(",", " ");  
                    let stringTdsSinComas2 = stringTdsSinComas.replace(",", " ");  
                    stringTdsSinComas2 += `<td>
                        </td>
                                           <td>${newData[x].fecha}</td>`;
                    stringTdsSinComas2+= `
                    <td>
                      <Button id="watch${newData[x].id}" class="watch">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 eye" viewBox="0 0 16 16" >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                        </svg>
                      </Button>
                    </td>`;
                    console.log(stringTdsSinComas2) 
        
                    let tr = `<tr>
                                <td>
                                  <a>${newData[x].nombre}</a>
                                </td>
                                ${stringTdsSinComas2}
                              </tr>`
                    //console.log(tr)


                    let tabla = document.getElementById('tabla');
                    
                    function insertRow (table, tr)
                    {
                       var table = document.getElementById("tabla"); //seleccionamos la tabla por ID
                       var row = table.insertRow(1);//insertamos los datos despues de la fila 1
                       row.innerHTML = tr; //insertamos
                    }

                    insertRow(tabla,tr); //insertamos en la tabla los datos anteriores

                    button = document.getElementById(`watch${newData[x].id}`); //seleccionamos el boton que hara la funcion
                    
                    let idvar = newData[x].id;
                    //console.log(idvar)
                   
                    
                   //le asignamos un addevent al click y le pasamos la funcion vuejs

                    button.addEventListener('click',(e) =>  {
                        console.log(e)
                        this.verProductos(idvar)
                    }); 
              }

             })
            .catch(function (error)
           {
            console.log(error);
           }); 

            this.ModalMov = true;   //abrimos modal
        },

        verProductos:function(id)
        {
          console.log(id);
            axios.get('api/productos/'+id,{ob: id}) //enviamos el dato a la ruta de la api
           .then((resp)=>
             {
               console.log(resp);
               this.WatchProductos = true;
               this.productos=resp.data;
             })
            .catch(function (error)
           {
            console.log(error);
           }); 
        },
            
        nuevoRegistro:function(idMovimiento)
         {
            axios.get('/api/consultaMovimiento/'+idMovimiento,{ob: idMovimiento}) //enviamos el dato a la ruta de la api
           .then((resp)=>
             {
               console.log(resp);
               this.ModalNewGastos = true;
               this.idMovimientoForm = idMovimiento;
               //console.log(resp.data[0].nombre);
               this.nombreMovimiento = resp.data[0].nombre;
               //console.log(this.nombreMovimiento);
               
             })
            .catch(function (error)
           {
            console.log(error);
           });

         },

        closeModal:function()
        {
           this.ModalMov=false;
        },

        closeModalNewGastos: function ()
        {
            this.ModalNewGastos = false;
        },

        closeModalProductos: function ()
        {
            this.WatchProductos = false;
        },

        closeModalNewProducto: function ()
        {
            this.ModalNewProducto = false;
        },

        filtroCECOS:function()
        {
           
        },

        addRow:function()
        {
            console.log("Añade fila");
            this.filas.push({
                id:0,
                nombreProducto:'',
                cantidad:0,
                costo:0,
                iva:'',
                total: 0
            });

        },

        removeRow:function(id)
        {
            console.log("Quita fila");
            console.log(id);
            this.filas.splice(id,1);
        },


        enviarFormSolicitud:function(concepto,ceco)
        {
            //console.log(this.idMovimientoForm); //si recibe el id
            //console.log(concepto);
            //console.log(ceco);
           // console.log(this.filas);
            this.formSolicitud.tipo_movimiento_id = this.idMovimientoForm;
            this.formSolicitud.productos = this.filas;
            // obtener el nombre del mes, día del mes, año, hora
            var now = moment().format("YYYY-MM-DD HH:mm:ss");
            this.formSolicitud.created_at = now;
            this.formSolicitud.updated_at = now;
            //console.log(now);
            axios.get('api/consulta_ceco_concepto/'+ceco+'/'+concepto,{ob: ceco},{ob1: concepto}) //enviamos los dato a la ruta de la api
           .then((resp)=>
             {
               console.log(resp.data[0].id); // tenemos el id del ceco_concepto a insertar
               this.formSolicitud.ceco_concepto_id = resp.data[0].id;
               console.log(this.formSolicitud);
               Inertia.post('/soliMovimientos', this.formSolicitud);
               this.ModalNewGastos = false;
               this.formSolicitud.reset();
             })
            .catch(function (error)
           {
            console.log(error);
           });


        }

    },
    components: { ButtonPres, ModalGastos, SecondaryButton1, Button, ButtonAdd, TableComponent, Label, Input1, SelectComponent, Table }
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
  <ModalGastos :show="ModalMov" @close="closeModal">
    <template #title>
       <div class="modalPart1">
         <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
             <span class="block font-bold text-center text-white">
                 {{modalData[0].grupoConcepto}} 
             </span>
         </div>
        </div>
    </template>
    <template #content>
        <div class="flex flex-row modalPart1">
                <div class="px-4 py-1 border-r-4 borderModal basis-1/3">
                    <span class="block font-bold text-center text-white">
                        Concepto: {{modalData[0].concepto}}
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex justify-center">
                        <span class="block font-bold text-center text-white">
                            CECO: {{modalData[0].ceco}}
                        </span>
                    </div>
                </div>
        </div>
        <table id="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th v-for="item in movimientos" :key="item.id">
                   {{item.nombre}} <!--Listamos nombre de movimietos-->
                </th>
                <th>Evidencia</th>
                <th>Fecha de creación</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
               <tr></tr>
               <tr>
                  <td></td>
                  <td v-for="item in movimientos" :key="item.id">
                    <ButtonAdd class="h-5" @click="nuevoRegistro(item.id)" />
                  </td>
                  <td colspan="3"></td>
               </tr>
               <tr>
                   <td></td>
                   <td>total</td>
                   <td>total</td>
                   <td>total</td>
                   <td colspan="3"></td> 
                    </tr>
                <tr></tr>
            </tbody>
        </table>
       
         <SecondaryButton1  @click="closeModal" style="margin:1rem">
            Cerrar
         </SecondaryButton1>
    </template>
  </ModalGastos>

  <ModalGastos :show="ModalNewGastos" @close="closeModal">
    <template #title>
           <div class="modalPart1">
         <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
             <span class="block font-bold text-center text-white">
                  Nuevo Registro
             </span>
         </div>
        </div>
    </template>
    <template #content>
         <form class="formNewGastos" v-on:submit.prevent="enviarFormSolicitud(modalData[0].concepto,modalData[0].ceco)">
            <div style="margin-left:3rem;">
                <label class ="labelForm">Nombre de solicitud: </label>
                <Input1 v-model="formSolicitud.nombre" type="text" required></Input1>
            </div>

           <div>
             <label class ="labelForm" >TIPO DE MOVIMIENTO:</label>
             <p style="display:none">{{formSolicitud.tipo_movimiento_id=idMovimientoForm}}</p>
              <Input1 type="text" disabled v-model="formSolicitud.tipo_movimiento_id" :value="nombreMovimiento" required ></Input1>
           </div>

           <div class="buttonModalAdd1">
              <SecondaryButton1 class="buttonAdd" @click="addRow()">+</SecondaryButton1>
           </div>
           <br>
           <table id="tabla" style="margin-top:5px; grid-column: 1/3;">
              <thead>
                <tr>
                  <th>Nombre de producto</th>
                  <th>Cantidad</th>
                  <th>$</th>
                  <th>IVA</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody >
                 <tr v-for="item in filas" :key="item.id">
                    <td>
                        <Input1 name="nombreProducto" type="text" v-model="item.nombreProducto" style="color: black;" required ></Input1>
                    </td>
                    <td>
                        <Input1 type="number" min="1" pattern="^[0-9]+" v-model="item.cantidad" style="width: 70px;color: black;" required></Input1>
                    </td>
                    <td>
                        <Input1 type="number" min="1" pattern="^[0-9]+" v-model="item.costo" style="width: 70px;color: black;" required></Input1>
                    </td>
                    <td>
                        <checkbox v-model="item.iva"></checkbox>
                    </td>
                    <td>
                        <p style="display:none" v-if="item.iva==false">{{item.total = (item.cantidad)*(item.costo)}}</p>
                        <p style="display:none" v-if="item.iva==true">{{item.total = ((item.cantidad)*(item.costo))*1.16}}</p>
                        <Input1 type="number" min="1" pattern="^[0-9]+" v-model="item.total" disabled style="width: 100px;color: black;"></Input1>     
                    </td>
                    <td>
                       <SecondaryButton1 class="buttonRemove" @click="removeRow(item.id)">-</SecondaryButton1>
                    </td>
                 </tr>
              </tbody>
          </table>
          <br>
            <SecondaryButton1 class="mb-3 btn btn-primary sentButtonModal1" type="submit">Enviar</SecondaryButton1>
            <SecondaryButton1  @click="closeModalNewGastos" class="closeModal1">
            Cerrar
         </SecondaryButton1>
         </form>

    </template>
  </ModalGastos>

  <ModalGastos :show="ModalNewProducto" @close="closeModal">
    <template #title>
           <div class="modalPart1">
         <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
             <span class="block font-bold text-center text-white">
                  Nuevo Producto
             </span>
         </div>
        </div>
    </template>
    <template #content>
         <form class="formNewGastos">
            <div>
              <label class ="labelForm" >Nombre de producto:</label>
              <Input1 type="text"></Input1>
            </div>
           <div>
              <label class ="labelForm" >Cantidad de producto:</label>
              <Input1 type="number" :placeholder="'$0.00'"></Input1>
           </div> 
         </form>
         <SecondaryButton1  @click="closeModalNewProducto" style="margin:1rem">
            Cerrar
         </SecondaryButton1>
    </template>
  </ModalGastos>

  <ModalGastos :show="WatchProductos" @close="closeModal">
    <template #title>
        <div class="modalPart1">
         <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
             <span class="block font-bold text-center text-white">
                 Productos de solicitud:  {{productos[0].soli_movimiento_id}}
             </span>
         </div>
        </div>
    </template>
    <template #content>
        <table id="tabla2">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
               <tr v-for="item in productos" :key="item.id">
                  <td>{{item.nombre}}</td>
                  <td>{{item.cantidad}}</td>
                </tr>
            </tbody>
        </table>

         <SecondaryButton1  @click="closeModalProductos" style="margin:1rem">
            Cerrar
         </SecondaryButton1>
    </template>
  </ModalGastos>
  <div class="graph" ref="chartdiv">  </div>
</template>