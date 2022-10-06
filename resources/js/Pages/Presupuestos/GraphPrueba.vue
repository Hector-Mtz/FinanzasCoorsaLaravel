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
import ButtonPres from '../../Components/ButtonPres.vue';
import ModalSalidaMovimiento from './Components/ModalSalidaMovimiento.vue';

//variables GLOBALES
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
        solicitudes:Object,
        filtros:Object
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
            agrupacionModal:[],
            productos:[],
            idMovimientoForm:0,
            nombreMovimiento:"",
            cliente:"",
            grupo_concepto:"",
            zoom:false, //variable para regresar al padre
            datosGrafica:[]
        };
    },
  
    mounted() {

        // console.log(vm.clientes); //comprobamos si imprime todos los los clientes
        let clients = this.clientes; //guardamos en una varibale los cliente spara iterarlos

        let grupo_conceptos = this.grupo_conceptos;
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
        //console.log(this.filtros);
        if(this.filtros.grupoType)
        {
          //console.log(this.filtros);
          yRenderer.labels.template.setAll({ text: "{ceco}" })
        }

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
            categoryXField: "GrupoConcepto",
            categoryYField: "Cliente",
            valueField: "Cantidad",
        }));
        series.columns.template.setAll({
            tooltipText: "{Cantidad}",
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
                dataField: "Cantidad",
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
                    text: "{Cantidad}"
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
        this.datosGrafica = this.cantidades;
        data = this.datosGrafica;
        //console.log(this.movimiento.state);
        //console.log("Ante del filtro",data);
        data = data.filter((cantidad) => cantidad.Movimiento === this.movimiento.state )
        //console.log(data);
        series.data.setAll(data);
        ejey = [];
        ejex = [];
        //Siteamos los datos que aparecen en el eje y
        let auxiliarGrupo= {nombre:null};
        for (let index = 0; index < clients.length; index++) {
            const element = clients[index];
            //console.log(element.nombre);
            ejey.push({ category: element.nombre, ceco:element.ceco});
            //AGRUPACION 
            if(this.filtros.grupoType)
            {
              if(auxiliarGrupo.nombre == null)
              {
                auxiliarGrupo = element; //guarda el cliente
              }
              else
              {
                if(auxiliarGrupo.grupoCliente != element.grupoCliente) //ya se tiene guardado el cliente
                {
                    var range = yAxis.makeDataItem({
                                "category": auxiliarGrupo.nombre,
                                "endCategory": auxiliarGrupo.nombre,
                     });
                     yAxis.createAxisRange(range);
                    
                     var label = range.get("label");
                     
                     label.setAll({
                       text: auxiliarGrupo.grupoCliente,
                       dx: -100,
                       dy:-50,
                       fontWeight: "bold",
                       tooltipText: auxiliarGrupo.grupoCliente,
                       rotation:270  });
                     
                     var tick = range.get("tick");
                     tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });
                     
                    var grid = range.get("grid");
                    grid.setAll({ strokeOpacity: 1 });
                    //auxiliarGrupo = element;
                 }
              }
                               }
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
           
           let GrupoConcepto = nuevosValores.GrupoConcepto;
           let Cliente = nuevosValores.Cliente;
           axios.get('api/ceco_concepto/'+GrupoConcepto+'/'+Cliente,{ob: GrupoConcepto},{ob1: Cliente}) //enviamos el dato a la ruta de la api
           .then((resp)=>{
              let datos = resp.data[0];//la respuesta que obtenemos de BD es la que almacenamos
              //console.log(datos); //imprimimos la respuesta accediendo a la datay trae el tipo de mv
              data = []; //vaciamos el arreglo data
              let a = {};
              ejex=[]; //vaciamos el ejex
              let cecos = resp.data[1]; //traemos el objeto donde contiene los cecos
              for (let index = 0; index < cecos.length; index++) //recorremos cecos
              {
                let nombreCeco = cecos[index].nombre; //guardamos en variables los cecos
                ejex.push({ category: nombreCeco }); // lo metemos al objeto
              }
              ejey = [];
              let conceptos = resp.data[2];
              for (let f = 0; f < conceptos.length; f++) 
              {
                  let nombreConcepto = conceptos[f].nombre;
                  ejey.push({ category: nombreConcepto });
              }
              series.columns.template.events.on("click", (ev) => {
                  if (this.zoom)
                  {
                    let nuevosValores = ev.target._dataItem.dataContext; 
                    console.log(nuevosValores);
                    this.cliente= nuevosValores.Cliente;
                    this.grupo_concepto= nuevosValores.GrupoConcepto;
                    this.SalidaMovimiento = true;
                }
              }); //funcion para el modal

              yAxis.data.setAll(ejex);
              xAxis.data.setAll(ejey);
              //console.log(datos);
              //console.log("Datos Response:", datos);
              this.datosGrafica =datos;
              this.cambiar(this.movimiento.state);
     
          })
           .catch(function (error)
          {
           console.log(error);
          });    
        },

        cambiar: function (movimiento) {
            this.movimiento.state = movimiento; //reemplazamos la variable global por la que traemos del boton
            let data = this.datosGrafica ;
            data = data.filter((cantidad) => cantidad.Movimiento === this.movimiento.state);

            series.data.setAll(data);
        } ,

        closeModalSalida:function()
        {
            this.SalidaMovimiento = false;
        },
    },
    components: { ModalSalidaMovimiento,ButtonPres ,Link }
}
</script>
<style scoped>
 .graph {
   width: 100%;
   height: 500px;
 }
</style>
<template>
     <div class="group">
           <Link :href="route('clientes.index')" :only="['cantidades','clientes','filtros']" preserveScroll :data="{grupoType: 'clientes'}">
              <ButtonPres class="buttonCECO"  style="background-color:#111F2E">
                CECO
              </ButtonPres>
          </Link>
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

  <a  v-if="zoom" :href="route('clientes.index')" style="color:red" >  
        Regresar
  </a >
  <div class="graph" ref="chartdiv">  </div>
</template>