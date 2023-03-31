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
 import am4themes_animated from "@amcharts/amcharts4/themes/animated";
 import moment from 'moment';
 const props = defineProps({
        show: {
            type: Boolean,
            default: false,
           },
        ejex:String,
        ejey:String,
        data:{
          type:Array,
          required:true
        }

    });

 const emit = defineEmits(["close"]);
 const close = () => {
        emit('close');
    };
  
let tipoMovimientos = ref(["PRESUPUESTO", "SUPLEMENTO", "GASTO"])
onUpdated(() => 
 {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv2", am4charts.XYChart);

    //console.log(data);
    var data = props.data
    /*[
       {
         date: new Date(),
         presupuesto:20,
         suplemento:50,
         gasto:70
       },

       {
         date: new Date(),
         presupuesto:50,
         suplemento:60,
         gasto:90
       }
    ];
    */

    chart.data = data;
    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    
    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();
    chart.legend = new am4charts.Legend();

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.name = "PRESUPUESTO";
    series2.dataFields.valueY = "presupuesto";
    series2.dataFields.dateX = "date";
    series2.sequencedInterpolation = true;

    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.name = "SUPLEMENTO";
    series3.dataFields.valueY = "suplemento";
    series3.dataFields.dateX = "date";
    series3.sequencedInterpolation = true;
    series3.stacked = true;

    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "gasto";
    series.dataFields.dateX = "date";
    series.name = "GASTO";
    series.tooltipText = "{value}"
    series.stroke = am4core.color("#EEDD06");
    series.strokeWidth = 3;
    var circleBullet = series.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.stroke = am4core.color("#EEDD06");
    circleBullet.stroke = am4core.color("#EEDD06");
    
    series.tooltip.pointerOrientation = "horizontal";
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

 });
</script>
<template>
 <DialogModal :show="show" @close="close()">
            <template #title>
              <div class="flex text-fuente-500 gap-4 items-center justify-between px-8 mb-8 py-2 max-w-[69rem]">
                 <div class="flex items-center gap-4 pl-8">
                     <div class="">
                         <span class="block text-3xl font-bold text-start">
                             Comportamiento en intersección {{ ejex }} y {{ ejey }}
                         </span>
                     </div>
                 </div>
              </div>
            </template>
            <template #content>
              {{ data }}
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