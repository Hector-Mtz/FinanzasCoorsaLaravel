<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


export default {
  
props: {
   clientes:Object,
   grupo_conceptos:Object
  },

name: 'Graph',

mounted() {

    let vm=this;
        
    console.log(vm.clientes); //comprobamos si imprime todos los los clientes
 
    let clients = vm.clientes; //guardamos en una varibale los cliente spara iterarlos

    let grupo_conceptos = vm.grupo_conceptos;

    console.log(grupo_conceptos);
    
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
         panX: false,
         panY: false,
         wheelX: "none",
         wheelY: "none",
         layout: root.verticalLayout
      })
    );


 // Create axes and their renderers
var yRenderer = am5xy.AxisRendererY.new(root, {
  visible: false,
  minGridDistance: 20,
  inversed: true
});

yRenderer.grid.template.set("visible", false);

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: yRenderer,
    categoryField: "category"
  })
);

var xRenderer = am5xy.AxisRendererX.new(root, {
  visible: false,
  minGridDistance: 30,
  inversed: false,
  opposite:true
});

xRenderer.grid.template.set("visible", false, );

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: xRenderer,
    categoryField: "category",

  })
);


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    calculateAggregates: true,
    stroke: am5.color(0xffffff),
    clustered: false,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryXField: "x",
    categoryYField: "y",
    valueField: "value",
  
  })
);

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
      fill: am5.color(0xffffff),
      populateText: true,
      centerX: am5.p50,
      centerY: am5.p50,
      fontSize: 10,
      text: "{value}"
    })
  });
});

var colors = {
  critical: am5.color(0xca0101),
  bad: am5.color(0xe17a2d),
  medium: am5.color(0xe1d92d),
  good: am5.color(0x5dbe24),
  verygood: am5.color(0x0b7d03)
};

// Set data
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
var data = [

   {
    y: "UNILEVER",
    x: "1000",
    columnSettings: {
      fill: colors.good
    },
    value: 50
  },
  {
    y: "WALMART",
    x: "1000",
    columnSettings: {
      fill: colors.good
    },
    value: 50
  },
  {
    y: "PURINA",
    x: "1000",
    columnSettings: {
      fill: colors.good
    },
    value: 50
  },
  {
    y: "COLGATE",
    x: "1000",
    columnSettings: {
      fill: colors.good
    },
    value: 50
  },

];

series.data.setAll(data);

//Siteamos los datos que aparecen en el eje y
let ejey = []

for (let index = 0; index < clients.length; index++) {
    const element = clients[index];

    console.log(element.nombre);
    ejey.push({category: element.nombre});

}

yAxis.data.setAll(ejey);

//Siteamos los datos que aparecen en el eje x
let ejex = [];
for (let i = 0; i < grupo_conceptos.length; i++) {
    const e = grupo_conceptos[i];
    console.log(e.nombre);
    ejex.push({category: e.nombre});
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

}}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  width: 100%;
  height: 500px;
}
</style>


<template>
  <div class="graph" ref="chartdiv">  </div>

</template>