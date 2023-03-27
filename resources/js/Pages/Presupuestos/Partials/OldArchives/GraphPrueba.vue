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
import ModalSalidaMovimiento from '../../Components/ModalSalidaMovimiento.vue';
import ButtonReturn from '@/Components/ButtonReturn.vue';


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
        filtros:Object,
        date:Object
    },
    components: {
        ButtonPres,
    },
    data() {
        return {
            movimiento: { state: "PRESUPUESTO" },
            SalidaMovimiento:false,
            data: [],
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
            inversed: true,
        });
        
        yRenderer.labels.template.setAll({
        fill: am5.color(0xffffff),
       });

        //console.log(this.filtros);
        yRenderer.grid.template.set("visible", false);
        if(this.filtros.grupoType)
        {
          //console.log(this.filtros);
          yRenderer.labels.template.setAll({ text: "{ceco}" }) //enmascara
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

        xRenderer.labels.template.setAll({
        fill: am5.color(0xffffff),
        });

        if(this.filtros.grupoType2)
        {
          //console.log(this.filtros);
          xRenderer.labels.template.setAll({ text: "{concepto}" }) //enmascara la seccion
        }
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

        var scrollableContainer = chart.chartContainer.children.unshift(am5.Container.new(root, {
        width: am5.p100, height: am5.p100, 
        verticalScrollbar: am5.Scrollbar.new(root, {
        orientation: "vertical",
        dx:5
        }),
        horizontalScrollbar: am5.Scrollbar.new(root, {
        orientation: "horizontal",
        dx:5
        })
       }))

       chart.yAxesAndPlotContainer.set("height", 8000);
       chart.yAxesAndPlotContainer.set("paddingBottom", 10)
       scrollableContainer.children.push(chart.yAxesAndPlotContainer);
        //PARTE A SECCIONAR0
        console.log(this.cantidades);
        this.datosGrafica = this.cantidades;
        data = this.datosGrafica;
        this.colors(data);
        //console.log(this.movimiento.state);
        //console.log("Ante del filtro",data);
        data = data.filter((cantidad) => cantidad.Movimiento === this.movimiento.state )
        console.log(data);
        series.data.setAll(data);
        ejey = [];
        ejex = [];
        yAxis.data.setAll({});
        xAxis.data.setAll({});
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
                //console.log(auxiliarGrupo);
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
                       dx: -250,
                       dy:0,
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
        let auxiliarGrupo2= {};
        for (let i = 0; i < grupo_conceptos.length; i++) {
            const elemento = grupo_conceptos[i];
            //console.log(elemento);
            ejex.push({ category: elemento.nombre, concepto:elemento.concepto});
            //Agrupacion 
            if(this.filtros.grupoType2)
            {
               if(auxiliarGrupo2.nombre  == null) //si esl auxiliar.nombre es nulo guardamos el nombre del grupoconcepto
               {
                 auxiliarGrupo2 = elemento; //le almacenamos el elemento completo para el agrupamiento
               } 
               else
              {
                if(auxiliarGrupo2.grupoConcepto != elemento.grupoConcepto) //comparamos si ya existe elgrupoConcepto
                {
                    var range = xAxis.makeDataItem({ //definimos una variable con los rangos
                                "category": auxiliarGrupo2.nombre,
                                "endCategory": auxiliarGrupo2.nombre,
                     });
                     xAxis.createAxisRange(range); //le  asignamos al axis el rango
                    
                     var label = range.get("label"); //definimos un label que se asignrara el nombre del rango

                     label.setAll({
                       text: auxiliarGrupo2.grupoConcepto, //definimos el texto que se mostrara
                       dx: -100,
                       dy:-20,
                       fontWeight: "bold",
                       tooltipText: auxiliarGrupo2.grupoConcepto,
                       rotation:0  });
                     
                     var tick = range.get("tick");
                     tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });
                     
                    var grid = range.get("grid");
                    grid.setAll({ strokeOpacity: 1 });
                    //auxiliarGrupo = element;
                }
              }
            }
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
           //CLICK DE PANTALLA PRINCIPAL
           //console.log(this.filtros);
           let nuevosValores = null;
           //preguntamos si estan agrupados por clientes, o por grupoConceptos
           if(this.filtros.grupoType || this.filtros.grupoType2) 
           {
              if(this.filtros.grupoType) //Preguntamos si estan agrupados por clientes
              {
                 console.log("agrupamiento por clientes");
                 nuevosValores = ev.target._dataItem.dataContext; //recuperamos x y anteriores
                 //console.log(nuevosValores);
                 let grupoConcepto_send = nuevosValores.grupoConcepto_id; //almacenamos el id del grupoConcepto
                 let ceco_id_send = nuevosValores.ceco_id;
                 axios.get('api/ceco_grupo_concepto/'+ceco_id_send+'/'+grupoConcepto_send,{ob: ceco_id_send},{ob1: grupoConcepto_send}) //enviamos el dato a la ruta de la api
                 .then((resp)=>
                  {
                     let datos = resp.data[0];
                     //console.log(datos);
                     let cecos = resp.data[1];//la respuesta que obtenemos de BD es la que almacenamos
                     //console.log(cecos);
                     let conceptos = resp.data[2];
                     let ejey=[]; //vaciamos el ejex
                     let ejex=[];
                     for (let index = 0; index < cecos.length; index++) //recorremos cecos
                      {
                        let ceco = cecos[index]; //guardamos en variables los cecos
                        //console.log(nombreCeco);
                        ejey.push({ category: ceco.nombre});
                        yRenderer.labels.template.setAll({ text: ceco.nombre }) //enmascara
                        //console.log(ejey)
                      }
                      
                      for (let i = 0; i < conceptos.length; i++) {
                        const concepto = conceptos[i];
                        ejex.push({ category: concepto.nombre});
                      }
              
                      this.datosGrafica = datos;
                      this.colors(datos);
                      yAxis.data.setAll(ejey);
                      xAxis.data.setAll(ejex);
                      this.cambiar(this.movimiento.state);
                      series.columns.template.events.on("click", (ev) => {
                         if (this.zoom)
                         {
                          let nuevosValores = ev.target._dataItem.dataContext; 
                          //console.log(nuevosValores);
                          this.cliente= nuevosValores.Cliente;
                          this.grupo_concepto= nuevosValores.GrupoConcepto;
                          this.SalidaMovimiento = true; //funcion para el modal
                        }
                     });        
                  })
                  .catch(function (error)
                  {
                    console.log(error);
                  }); 
                  }
                  else
                  {
                    //console.log("agrupamiento por grupoConceptos");
                    nuevosValores = ev.target._dataItem.dataContext; //recuperamos x y anteriores
                    console.log(nuevosValores);
                    let clientes_id = nuevosValores.clientes_id;
                    let concepto_id = nuevosValores.concepto_id;
                    axios.get('api/concepto_clientes/'+concepto_id+'/'+clientes_id,{ob: concepto_id},{ob1: clientes_id}) //enviamos el dato a la ruta de la api
                    .then((resp)=>
                     {
                        console.log(resp.data);
                        let uniqueConcepto= resp.data[2];
                        let cecos = resp.data[1];
                        let datos = resp.data[0];     
                        let ejey=[]; //vaciamos el ejex
                        let ejex=[];    

                        for (let i = 0; i < uniqueConcepto.length; i++) {
                          const concepto = uniqueConcepto[i];
                          ejex.push({ category: concepto.nombre});
                          xRenderer.labels.template.setAll({ text: concepto.nombre }) //enmascara
                        }

                        for (let index = 0; index < cecos.length; index++) 
                        {
                           const ceco = cecos[index];    
                           ejey.push({ category: ceco.nombre});
                           //yRenderer.labels.template.setAll({ text: ceco.nombre }) //enmascara
                        }            
                          this.datosGrafica = datos;
                          this.colors(datos);
                          yAxis.data.setAll(ejey);
                          xAxis.data.setAll(ejex);
                          this.cambiar(this.movimiento.state);
                          series.columns.template.events.on("click", (ev) => {
                             if (this.zoom)
                             {
                              let nuevosValores = ev.target._dataItem.dataContext; 
                              //console.log(nuevosValores);
                              this.cliente= nuevosValores.Cliente;
                              this.grupo_concepto= nuevosValores.GrupoConcepto;
                              this.SalidaMovimiento = true; //funcion para el modal
                            }
                         });        
                      })
                     .catch(function (error)
                      {
                        console.log(error);
                       }); 
                  } 
           }
           else
           {
              nuevosValores = ev.target._dataItem.dataContext; //recuperamos x y anteriores
              console.log(nuevosValores);
              //tiene que almacenar el idcliente y idgrupoConcepto para la peticion axios
              let GrupoConcepto_id = nuevosValores.grupoConcepto_id;
              let Cliente_id = nuevosValores.clientes_id;
              axios.get('api/ceco_concepto/'+GrupoConcepto_id+'/'+Cliente_id,{ob: GrupoConcepto_id},{ob1: Cliente_id}) //enviamos el dato a la ruta de la api
              .then((resp)=>{
                 let datos = resp.data[0];//la respuesta que obtenemos de BD es la que almacenamos
                 console.log(datos); //imprimimos la respuesta accediendo a la datay trae el tipo de mv
                 data = []; //vaciamos el arreglo data
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
                     ejey.push({ category: nombreConcepto});
          
                 }
                 series.columns.template.events.on("click", (ev) => {
                     if (this.zoom)
                     {
                       let nuevosValores = ev.target._dataItem.dataContext; 
                       console.log(nuevosValores);
                       this.cliente= nuevosValores.Cliente;
                       this.grupo_concepto= nuevosValores.GrupoConcepto;
                       this.SalidaMovimiento = true; //funcion para el modal
                   }
                 }); 
     
                 yAxis.data.setAll(ejex);
                 xAxis.data.setAll(ejey);
                 //console.log(datos);
                 //console.log("Datos Response:", datos);
                 this.datosGrafica =datos;
                 this.colors (this.datosGrafica);
                 this.cambiar(this.movimiento.state);
             })
             .catch(function (error)
             {
             console.log(error);
             }); 
           }   
           
        },

        cambiar: function (movimiento) {
            this.movimiento.state = movimiento; //reemplazamos la variable global por la que traemos del boton
            let data = this.datosGrafica ; //trae los datos de la grafica
            console.log(data);
            //listada de data;
            //console.log(movimiento);
            let auxData = {...data[0]};  
            auxData.movimientos = {
              "PRESUPUESTO": 0,
              "SUPLEMENTO": 0,
              "GASTO": 0,
            };
            let arrayElementos = [];
            switch (movimiento) 
            {
              case "DISPONIBLE":
              case "TOTAL":
                    data.forEach(salida =>
                   {
                    if(auxData.Cliente === salida.Cliente && auxData.GrupoConcepto === salida.GrupoConcepto){
                        auxData.movimientos[salida.Movimiento] = salida.Cantidad
                    }else
                    {
                        auxData.Cantidad = auxData.movimientos['PRESUPUESTO']+
                        auxData.movimientos['SUPLEMENTO']; 
                      
                      if(movimiento === 'DISPONIBLE'){
                        auxData.Cantidad =   auxData.Cantidad- 
                        (auxData.movimientos['GASTO'])     
                      }
                      arrayElementos.push(auxData);
                      auxData = salida;
                      auxData.movimientos = {
                        "PRESUPUESTO": 0,
                        "SUPLEMENTO": 0,
                        "GASTO": 0,
                      };
                      auxData.movimientos[salida.Movimiento] = salida.Cantidad
                    }
                  });
                    
                  auxData.Cantidad = auxData.movimientos['PRESUPUESTO']+
                        auxData.movimientos['SUPLEMENTO']; 
                      
                      if(movimiento === 'DISPONIBLE'){
                        auxData.Cantidad =   auxData.Cantidad- 
                        (auxData.movimientos['GASTO'])     
                      }
                      arrayElementos.push(auxData);
                      console.log(arrayElementos);
                      data=arrayElementos;
         
                break;
             
            
              default:
                  data = data.filter((cantidad) => cantidad.Movimiento === this.movimiento.state);
                break;
    
            }
            series.data.setAll(data);
        } ,

        colors: function(data)
        {
         //DECLARACION DE COLORES PARA ASIGNARA conforme el gasto entre, sacar porcentaje
         var colors = {
             critical: am5.color(13238529), //-20%
             bad: am5.color(14776877), //-30%
             medium: am5.color(14801197), //-40%
             good: am5.color(6143524), //-60%
             verygood: am5.color(752899) //+80%
           };
           //Tomamos el primer elemento del array para setearle los tipos de movimientos a comparar
           let auxData = {...data[0]};  
            auxData.movimientos = {
              "PRESUPUESTO": 0,
              "SUPLEMENTO": 0,
              "GASTO": 0,
            };

            let arrayElementos = [];
            data.forEach(salida => //recorremos el array
                   {
                    if(auxData.Cliente === salida.Cliente && auxData.GrupoConcepto === salida.GrupoConcepto)
                    {
                        auxData.movimientos[salida.Movimiento] = salida.Cantidad;
                        
                        let porcentaje = 0;
                        if(auxData.movimientos["GASTO"] == 0)
                        {
                          porcentaje = (auxData.movimientos["PRESUPUESTO"]/auxData.movimientos["PRESUPUESTO"])*100 ;
                        }
                        else
                        {
                          porcentaje = (auxData.movimientos["GASTO"]/auxData.movimientos["PRESUPUESTO"])*100
                        }

                        if(porcentaje < 20)
                        {
                          salida.columnSettings = {fill: colors.critical};
                        }
                        if(porcentaje >=20 && porcentaje < 30)
                        {
                          salida.columnSettings = {fill: colors.bad};
                        }
                        if(porcentaje>=30 && porcentaje<60)
                        {
                          salida.columnSettings = {fill: colors.medium};
                        }
                        if(porcentaje>=60 && porcentaje<80)
                        {
                          salida.columnSettings = {fill: colors.good};
                        }
                        if(porcentaje>=80)
                        {
                          salida.columnSettings = {fill: colors.verygood};
                        }
                    }
                    else
                    {
                        //Tenemos el total
                        auxData.Cantidad = auxData.movimientos['PRESUPUESTO']; 
                        let porcentaje = 0; 
                        if(auxData.movimientos['GASTO']==0)
                        {
                          porcentaje = (auxData.movimientos["PRESUPUESTO"]/auxData.movimientos["PRESUPUESTO"])*100 ;
                        }
                        else
                        {
                         porcentaje =(auxData.movimientos['GASTO']/auxData.Cantidad)*100;
                        }


                        if(porcentaje < 20)
                        {
                          salida.columnSettings = {fill: colors.critical};
                        }
                        if(porcentaje >=20 && porcentaje < 30)
                        {
                          salida.columnSettings = {fill: colors.bad};
                        }
                        if(porcentaje>=30 && porcentaje<60)
                        {
                          salida.columnSettings = {fill: colors.medium};
                        }
                        if(porcentaje>=60 && porcentaje<80)
                        {
                          salida.columnSettings = {fill: colors.good};
                        }
                        if(porcentaje>=80)
                        {
                          salida.columnSettings = {fill: colors.verygood};
                        }
                      //console.log(auxData)//muestra los objetos que llevamos
                      arrayElementos.push(auxData);//hacemos el push al array para guardar los objetos
                    
                      auxData = salida;
                      console.log(auxData);
                      auxData.movimientos = 
                      {
                        "PRESUPUESTO": 0,
                        "SUPLEMENTO": 0,
                        "GASTO": 0,
                      };
                      auxData.movimientos[salida.Movimiento] = salida.Cantidad
                    }
                  });   
        },

        closeModalSalida:function()
        {
            this.SalidaMovimiento = false;
        },
    },
    components: { ModalSalidaMovimiento, ButtonPres, Link, ButtonReturn }
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
          <Link :href="route('clientes.index')" :only="['cantidades','grupo_conceptos','filtros']" preserveScroll :data="{grupoType2: 'grupo_conceptos'}" >
            <ButtonPres class="buttonCON" style="background-color:#111F2E">
                CON.
            </ButtonPres> 
          </Link>

           <div class="dropdown" >
                  <button onclick="myFunction()" class="dropbtn"><p>$</p></button>
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

  <ButtonReturn class="buttonReturn" v-if="zoom">
     <a   :href="route('clientes.index')">  
        Regresar
     </a >
  </ButtonReturn>

  <div class="graph" ref="chartdiv">  </div>
</template>