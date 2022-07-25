<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { watch } from '@vue/runtime-core';
import ButtonPres from './ButtonPres.vue';

let data =[];
let nuevoArreglo=[];
let series =[];

export default {
    props: {
        clientes: Object,
        grupo_conceptos: Object,
        cantidades: Object,
    },
    components: {
        ButtonPres,
    },
    data() {
        return {
            movimiento: { state: "PRESUPUESTO" }
        };
    },
    mounted() {
        // console.log(vm.clientes); //comprobamos si imprime todos los los clientes
        let clients = this.clientes; //guardamos en una varibale los cliente spara iterarlos
        console.log(clients);
        let grupo_conceptos = this.grupo_conceptos;
        console.log(grupo_conceptos);
        let datos = this.cantidades;
        let root = am5.Root.new(this.$refs.chartdiv);
        root.setThemes([am5themes_Animated.new(root)]);
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            layout: root.verticalLayout
        }));
        // Create axes and their renderers
        var yRenderer = am5xy.AxisRendererY.new(root, {
            visible: false,
            minGridDistance: 20,
            inversed: true
        });
        yRenderer.grid.template.set("visible", false);
        var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            renderer: yRenderer,
            categoryField: "category"
        }));
        var xRenderer = am5xy.AxisRendererX.new(root, {
            visible: false,
            minGridDistance: 30,
            inversed: false,
            opposite: true,
        });
        xRenderer.grid.template.set("visible", false);
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
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
        data = []; //declaramos la data principal vacia
        let a = {}; //declaramos el array temporal
        nuevoArreglo = []; //declaramos el array donde guardara todo
        for (let c = 0; c < datos.length; c++) { //recorremos los datos
            var ele = datos[c]; //almacenamos en una variable el elemento actual
            let i = 0; //declara la bandera en 0 para ver si existe mas adelante
            let r = 0;
            if (ele === datos[0]) {
                a = {
                    x: ele.Cliente,
                    y: ele.GrupoConcepto,
                    movimientos: [{
                            tipo: ele.Movimiento,
                            cantidad: parseInt(ele.Cantidad)
                        }]
                };
                nuevoArreglo.push(a);
                //console.log(nuevoArreglo);
            }
            else {
                let xy = ele.Cliente + ele.GrupoConcepto;
                while (i < nuevoArreglo.length) {
                    var x = nuevoArreglo[i];
                    let y = x.x + x.y;
                    if (xy === y) {
                        let e = 0;
                        let k = 0;
                        while (e < x.movimientos.length) {
                            let z = x.movimientos[e];
                            let j = z.tipo;
                            let h = ele.Movimiento;
                            if (j === h) {
                                z.cantidad = parseInt(z.cantidad) + parseInt(ele.Cantidad);
                                let k = 1;
                                break;
                            }
                            e++;
                        }
                        if (k === 0) {
                            a = {
                                tipo: ele.Movimiento,
                                cantidad: parseInt(ele.Cantidad)
                            };
                            x.movimientos.push(a);
                        }
                        r = 1;
                        break;
                    }
                    i++;
                }
                ;
                if (r === 0) {
                    a = {
                        x: ele.Cliente,
                        y: ele.GrupoConcepto,
                        movimientos: [{
                                tipo: ele.Movimiento,
                                cantidad: parseInt(ele.Cantidad)
                            }]
                    };
                    nuevoArreglo.push(a);
                }
            }
            //console.log(nuevoArreglo);
        }
        let i = 0;
        let total = 0;
        let disponible = 0;
        let porcentaje = 0;
        //console.log(nuevoArreglo.length);
        while (i < nuevoArreglo.length) {
            let h = nuevoArreglo[i];
            let a = {
                "tipo": "TOTAL",
                "cantidad": total
            };
            let b = {
                "tipo": "PORCENTAJE",
                "cantidad": porcentaje
            };
            let c = {
                "tipo": "DISPONIBLE",
                "cantidad": disponible
            };
            h.movimientos.push(a, b, c);
            //console.log(total);
            let j = 0;
            while (j < h.movimientos.length) {
                let k = h.movimientos[j];
                //console.log(k.tipo);
                if (k.tipo === "PRESUPUESTO") {
                    //console.log("llegue aqui");
                    let l = 0;
                    while (l < h.movimientos.length) {
                        let g = h.movimientos[l];
                        if (g.tipo === "TOTAL") {
                            g.cantidad = g.cantidad + k.cantidad;
                        }
                        l++;
                    }
                }
                else if (k.tipo === "SUPLEMENTO") {
                    //console.log("hola");
                    let l = 0;
                    while (l < h.movimientos.length) {
                        let g = h.movimientos[l];
                        if (g.tipo === "TOTAL") {
                            g.cantidad = g.cantidad + k.cantidad;
                        }
                        l++;
                    }
                }
                else if (k.tipo === "GASTO") {
                    //console.log("hola");
                    let l = 0;
                    while (l < h.movimientos.length) {
                        let g = h.movimientos[l];
                        if (g.tipo === "PORCENTAJE") {
                            g.cantidad = g.cantidad + (-1 * k.cantidad);
                        }
                        else if (g.tipo === "DISPONIBLE") {
                            g.cantidad = g.cantidad + k.cantidad;
                        }
                        l++;
                    }
                }
                else if (k.tipo === "TOTAL") {
                    //console.log("hola");
                    let l = 0;
                    while (l < h.movimientos.length) {
                        let g = h.movimientos[l];
                        if (g.tipo === "PORCENTAJE") {
                            g.cantidad = Math.round(100 * (g.cantidad / k.cantidad));
                        }
                        else if (g.tipo === "DISPONIBLE") {
                            g.cantidad = g.cantidad + k.cantidad;
                        }
                        l++;
                    }
                }
                j++;
            }
            i++;
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
        console.log(this.movimiento.state);
        TipoMov(this.movimiento.state);
        //console.log(data);
        series.data.setAll(data);
        //Siteamos los datos que aparecen en el eje y
        let ejey = [];
        for (let index = 0; index < clients.length; index++) {
            const element = clients[index];
            //console.log(element.nombre);
            ejey.push({ category: element.nombre });
        }
        yAxis.data.setAll(ejey);
        //Siteamos los datos que aparecen en el eje x
        let ejex = [];
        for (let i = 0; i < grupo_conceptos.length; i++) {
            const e = grupo_conceptos[i];
            // console.log(e.nombre);
            ejex.push({ category: e.nombre });
        }
        xAxis.data.setAll(ejex);
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
        cambiar: function (movimiento) {
            this.movimiento.state = movimiento;
            //console.log(this.movimiento.state);
            let e = movimiento;
            let i = 0;
            let v = 0;
            data = [];
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
                let x = {
                    "y": j.x,
                    "x": j.y,
                    "value": v
                };
                data.push(x);
                i++;
            }    
            series.data.setAll(data);
            //console.log(data);
        }
    },
    components: { ButtonPres }
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
    <ButtonPres class="buttonCECO" style="background-color:#111F2E">CECO</ButtonPres>
        <div class="group">
         <ButtonPres class="buttonCON" style="background-color:#111F2E">CON.</ButtonPres> 
            <div class="dropdown" style="margin:50px">
                <button onclick="myFunction()" class="dropbtn">$</button>
                <div id="myDropdown" class="dropdown-content">
                    <button id="PRESUPUESTO" @click="cambiar('PRESUPUESTO')">Presupuesto</button>
                    <button id="SUPLEMENTO" @click="cambiar('SUPLEMENTO')">Suplemento</button><br>
                    <button id="TOTAL" @click="cambiar('TOTAL')">Total</button><br>
                    <button id="GASTO" @click="cambiar('GASTO')">Gasto</button><br>
                    <button id="DISPONIBLE" @click="cambiar('DISPONIBLE')">Disponible</button>     
                </div>
            </div>
        </div>
  <div class="graph" ref="chartdiv">  </div>
</template>
