<script setup>
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { onMounted, reactive, ref, watch, computed } from "vue";

var props = defineProps({
     cantidades:Object,
     tipoMovimientos:Object
  });

let arrayAux = [];
for (let index = 0; index < props.tipoMovimientos.length; index++) 
{
    const movimiento = props.tipoMovimientos[index];
    console.log(movimiento);    
    let newObj ={};
}

const movimientosCantidades = computed(() => 
{
  
});

</script>
<template>
    <div class="grid grid-cols-3 grid-rows-2">
        <div class="w-full m-2 border-2 rounded-xl">
            <h1 class="text-center uppercase">Presupuesto</h1>
        </div>
        <div class="w-full m-2 border-2 rounded-xl">
            <h1 class="text-center uppercase">Gasto</h1>
        </div>
        <div class="w-full m-2 border-2 rounded-xl">
            <h1 class="text-center uppercase">Suplemento</h1>
        </div>
        <div class="w-full m-2 border-2 rounded-xl">
            <h1 class="text-center uppercase">Total</h1>
        </div>
        <div class="w-full m-2 border-2 rounded-xl">
            <h1 class="text-center uppercase">Disponible</h1>
        </div>
    </div>
</template>