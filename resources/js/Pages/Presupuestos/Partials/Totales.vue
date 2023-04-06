<script setup>
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { onMounted, reactive, ref, watch, computed } from "vue";
import { formatoMoney } from "../../../utils/conversiones.js";

var props = defineProps({
     cantidades:Object,
     tipoMovimientos:Object
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
                
              if(clave == "TOTAL")//valores calculados
              {
                 
              } 
           }
        }
    }

    return movimientos;
});

</script>
<template>
    <div class="grid grid-cols-3 grid-rows-2">
        <div class="w-full m-2 border-2 rounded-xl" v-for="(cantidad,index) in movimientosCantidades" :key="index">
            <h1 class="text-center uppercase">{{cantidad.movimiento}}:
                <br>
                <span>
                  $ {{ formatoMoney(cantidad.valor.toFixed(2)) }}
               </span>
           </h1>
        </div>
    </div>
</template>