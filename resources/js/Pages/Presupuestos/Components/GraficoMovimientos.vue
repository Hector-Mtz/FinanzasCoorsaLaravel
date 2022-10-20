<script setup >
import AppLayout from '@/Layouts/AppLayout.vue';
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import ButtonPres from '@/Components/ButtonPres.vue';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

var props = defineProps
({
    datos:Object
});

console.log(props.datos);

onMounted(() => 
{
var container = am4core.create("container", am4core.Container);
container.width = am4core.percent(100);
container.height = am4core.percent(100);
container.layout = "horizontal";

// Create sub-containers
var buttonContainer = container.createChild(am4core.Container);
buttonContainer.layout = "vertical";
//buttonContainer.width = 100;
//buttonContainer.height = am4core.percent(20);
//buttonContainer.background.fill = am4core.color("#D2AB99");
//buttonContainer.background.fillOpacity = 0.3;

var chartContainer = container.createChild(am4core.Container);
chartContainer.layout = "vertical";
chartContainer.width = am4core.percent(20);
chartContainer.height = am4core.percent(100);
//chartContainer.background.fill = am4core.color("#8DB38B");
//chartContainer.background.fillOpacity = 0.3;

// Function that adds a button
function addButton(text) {
  var button = buttonContainer.createChild(am4core.Button);
  button.label.text = text;
  button.align = "center";
  button.marginTop = 15;
}

// Function that creates and adds a chart
function addChart(data) {
  
  // Create chart instance
  var chart = chartContainer.createChild(am4charts.XYChart);

  // Add data
  chart.data = data;

  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "category";
}

// Add buttons
addButton("Button #1");
addButton("Button #2");
addButton("Button #3");


// Add charts
addChart([{
  "category": "Research",
  "value": 450
}, {
  "category": "Marketing",
  "value": 1200
}, {
  "category": "Distribution",
  "value": 1850
}]);

})

</script>
<style scoped>

 #container {
  width:35rem;
  height: 20rem;

}
</style>
<template>
  <div id="container"></div>
</template>