<script setup>
import { ref, onMounted, watch } from 'vue'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

var props = defineProps({
    arregloValores:Object,
});

let chart = null;

watch(() => props.arregloValores,(nuevosValores) => { //el whatcher observa el cambio de la data
       //console.log(nuevosValores);  //lo imprime
        chart.data = nuevosValores  
     });

let click1 = ref(0);
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
   
   var series = chart.series.push(new am4charts.ColumnSeries());
   series.dataFields.categoryX = "x";
   series.dataFields.categoryY = "y";
   series.dataFields.value = "valor";
   series.sequencedInterpolation = true;
   series.defaultState.transitionDuration = 3000;
   
   // Set up column appearance
   var column = series.columns.template;
   column.strokeWidth = 2;
   column.strokeOpacity = 1;
   column.stroke = am4core.color("#ffffff");
   column.tooltipText = "{x}, {y}: {value.workingValue.formatNumber('#.')}";
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
   bullet2.fontSize = 11;
   bullet2.interactionsEnabled = false;
   
   // define colors
   var colors = {
       "critical": "#ca0101",
       "bad": "#e17a2d",
       "medium": "#e1d92d",
       "good": "#5dbe24",
       "verygood": "#0b7d03"
   };
   
   chart.data = props.arregloValores /*[{
       "y": "Critical",
       "x": "Very good",
       "color": colors.medium,
       "value": 20
   }, {
       "y": "Bad",
       "x": "Very good",
       "color": colors.good,
       "value": 15
   }, {
       "y": "Medium",
       "x": "Very good",
       "color": colors.verygood,
       "value": 25
   }, {
       "y": "Good",
       "x": "Very good",
       "color": colors.verygood,
       "value": 15
   }, {
       "y": "Very good",
       "x": "Very good",
       "color": colors.verygood,
       "value": 12
   },
   
   {
       "y": "Critical",
       "x": "Good",
       "color": colors.bad,
       "value": 30
   }, {
       "y": "Bad",
       "x": "Good",
       "color": colors.medium,
       "value": 24
   }, {
       "y": "Medium",
       "x": "Good",
       "color": colors.good,
       "value": 25
   }, {
       "y": "Good",
       "x": "Good",
       "color": colors.verygood,
       "value": 15
   }, {
       "y": "Very good",
       "x": "Good",
       "color": colors.verygood,
       "value": 25
   },
   
   {
       "y": "Critical",
       "x": "Medium",
       "color": colors.bad,
       "value": 33
   }, {
       "y": "Bad",
       "x": "Medium",
       "color": colors.bad,
       "value": 14
   }, {
       "y": "Medium",
       "x": "Medium",
       "color": colors.medium,
       "value": 20
   }, {
       "y": "Good",
       "x": "Medium",
       "color": colors.good,
       "value": 19
   }, {
       "y": "Very good",
       "x": "Medium",
       "color": colors.good,
       "value": 25
   },
   
   {
       "y": "Critical",
       "x": "Bad",
       "color": colors.critical,
       "value": 31
   }, {
       "y": "Bad",
       "x": "Bad",
       "color": colors.critical,
       "value": 24
   }, {
       "y": "Medium",
       "x": "Bad",
       "color": colors.bad,
       "value": 25
   }, {
       "y": "Good",
       "x": "Bad",
       "color": colors.medium,
       "value": 15
   }, {
       "y": "Very good",
       "x": "Bad",
       "color": colors.good,
       "value": 15
   },
   
   {
       "y": "Critical",
       "x": "Critical",
       "color": colors.critical,
       "value": 12
   }, {
       "y": "Bad",
       "x": "Critical",
       "color": colors.critical,
       "value": 14
   }, {
       "y": "Medium",
       "x": "Critical",
       "color": colors.critical,
       "value": 15
   }, {
       "y": "Good",
       "x": "Critical",
       "color": colors.bad,
       "value": 25
   }, {
       "y": "Very good",
       "x": "Critical",
       "color": colors.medium,
       "value": 19
   }
   ];*/
   
    series.columns.template.events.on("hit", function(ev)  //primer click para zoom
    {
       click1.value = 1;
       //hay que recuperar los nombres de ejex y ejey
       console.log(ev.target.dataItem.categories); //tenemos ambas categorias
       
     
    }, this);
   
   var baseWidth = Math.min(chart.plotContainer.maxWidth, chart.plotContainer.maxHeight);
   var maxRadius = baseWidth / Math.sqrt(chart.data.length) / 2 - 2; // 2 is jast a margin
   series.heatRules.push({ min: 10, max: maxRadius, property: "radius", target: bullet1.circle });
   
   
   chart.plotContainer.events.on("maxsizechanged", function() {
       var side = Math.min(chart.plotContainer.maxWidth, chart.plotContainer.maxHeight);
       bullet1.circle.clones.each(function(clone) {
           clone.scale = side / baseWidth;
       })
   });

});
</script>
<template>
    {{ click1 }}
    <div class="hello" ref="chartdiv" id="chartdiv">
    </div>
</template>
<style>
#chartdiv {
  width: 100%;
  height: 600px;
}

</style>