<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
  var props = defineProps({
     lineas_negocio:Object
  });

  const emit = defineEmits(['setLineaNegocio'])

  let lineaReactiva = ref("LINEA DE NEGOCIO");

  const emitirLinea = () =>
  {
     emit("setLineaNegocio", lineaReactiva.value);
  }
</script>
<template>
   <select class="w-full uppercase bg-transparent border-blue-400 rounded-2xl" v-model="lineaReactiva" @change="emitirLinea">
      <option selected disabled>
         LINEA DE NEGOCIO
      </option>
       <option v-for="linea in lineas_negocio" :key="linea.id" :value="linea.id">
          {{ linea.name }}
       </option>
   </select>
</template>