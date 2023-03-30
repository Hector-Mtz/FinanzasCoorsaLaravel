<script setup>
 import { ref, watch, reactive, onMounted, onUpdated } from 'vue';
 import ButtonAdd from '@/Components/ButtonAdd.vue';
 import DialogModal from '@/Components/DialogModal.vue';
 import SecondaryButton from '@/Jetstream/SecondaryButton.vue';
 import Input1 from '@/Jetstream/Input.vue';
 import Label from '@/Jetstream/Label.vue';
 import Checkbox from '@/Components/Checkbox.vue';
 import * as am4core from "@amcharts/amcharts4/core";
 import * as am4charts from "@amcharts/amcharts4/charts";
 import am4themes_animated from "@amcharts/amcharts4/themes/animated"
 const props = defineProps({
        show: {
            type: Boolean,
            default: false,
           }
    });

 const emit = defineEmits(["close"]);
 const close = () => {
        emit('close');
    };

onUpdated(() => 
 {
    am4core.useTheme(am4themes_animated);
    
    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    
    var data = [];
    var value = 50;
    for(var i = 0; i < 300; i++){
      var date = new Date();
      date.setHours(0,0,0,0);
      date.setDate(i);
      value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({date:date, value: value});
    }
    
    chart.data = data;
    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    
    series.tooltip.pointerOrientation = "vertical";
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;
    
    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();

 });
</script>
<template>
 <DialogModal :show="show" @close="close()">
            <template #title>
              <div class="flex text-fuente-500 gap-4 items-center justify-between px-8 mb-8 py-2 max-w-[69rem]">
                 <div class="flex items-center gap-4 pl-8">
                     <div class="">
                         <span class="block text-3xl font-bold text-start">
                             Comportamiento
                         </span>
                     </div>
                 </div>
              </div>
            </template>
            <template #content>
                <div id="chartdiv2"></div>
            </template>
 </DialogModal>
</template>
<style>
  #chartdiv2 {
    width: 100%;
    height: 300px;
  }
</style>