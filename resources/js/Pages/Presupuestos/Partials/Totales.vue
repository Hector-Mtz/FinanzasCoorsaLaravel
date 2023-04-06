<script setup>
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { onMounted, reactive, ref, watch, computed } from "vue";
import { formatoMoney } from "../../../utils/conversiones.js";

var props = defineProps({
     cantidades:Object,
     tipoMovimientos:Object
  });

let colors = ref({
   presupuesto: "#FFAE3F",
   suplemento:"#F176C4",
   gasto:"#00B187",
   total:"#26CAD3",
   disponible:"#7D57C6"
});

const movimientosCantidades = computed(() => 
{
    let movimientos = [];
    for (let index = 0; index < props.tipoMovimientos.length; index++) 
    {
        const movimiento = props.tipoMovimientos[index];
        //console.log(movimiento);    
        let newObj ={};
        newObj[movimiento] = 0;
        newObj.movimiento = movimiento;
        newObj.valor = 0;
        movimientos.push(newObj);
        newObj.color = "";
    }
    
    for (let index2 = 0; index2 < movimientos.length; index2++) 
    {
        const movimiento = movimientos[index2];
        for (let clave in movimiento) 
        {
           let mov = movimiento[clave];
           for (let index3 = 0; index3 < props.cantidades.length; index3++) 
           {
              let cantidad = props.cantidades[index3];
              if(cantidad.tipo_mov_name == clave) //solo es para los valores de la bd
              {
                movimiento[clave] += cantidad.cantidad;
                movimiento.valor += cantidad.cantidad;
              }
           }
        }
    }


    for (let index3 = 0; index3 < movimientos.length; index3++) 
    {
        const movimiento = movimientos[index3];
        for(let clave2 in movimiento)
        {
            let presupuesto = 0;
            let suplemento = 0;
            let gasto = 0;
            if(clave2 == "PRESUPUESTO")
            {
               //console.log(movimiento[clave2]);
               presupuesto = movimiento[clave2];
               movimiento.color = colors.value.presupuesto
            }
            if(clave2 == "GASTO")
            {
               //console.log(movimiento[clave2]);
               gasto = movimiento[clave2];
               movimiento.color = colors.value.gasto;
            }
            if(clave2 == "SUPLEMENTO")
            {
               //console.log(movimiento[clave2]);
               suplemento = movimiento[clave2];
               movimiento.color = colors.value.suplemento;
            }

            //QUEDAN PENDIENTES Y HAY QUE CALCULARLOS
            if(clave2 == "TOTAL")
            {
               //console.log(movimiento[clave2]);
              let total = presupuesto + suplemento;
              movimiento.color = colors.value.total
            }

            if(clave2 == "DISPONIBLE")
            {
               //console.log(movimiento[clave2]);
              let total = presupuesto + suplemento;
              movimiento.color = colors.value.disponible
            }
        }
    }

    return movimientos;
});

</script>
<template>
    <div class="grid grid-cols-3 grid-rows-2">
        <div  class="w-full m-2 text-white border-2 rounded-xl drop-shadow-2xl" 
        v-for="(cantidad,index) in movimientosCantidades" :key="index"
        :style="{ backgroundColor: cantidad.color}">
            <h1 class="text-center uppercase">{{cantidad.movimiento}}:
                <br>
                <span class="font-semibold">
                  $ {{ formatoMoney(cantidad.valor.toFixed(2)) }}
               </span>
           </h1>
        </div>
    </div>
</template>