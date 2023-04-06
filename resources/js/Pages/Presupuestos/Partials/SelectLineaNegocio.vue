<script setup>
  var props = defineProps({
     lineas_negocio:Object
  });
</script>
<template>
   <select class="w-full bg-transparent border-blue-400 rounded-2xl">
       <option selected disabled>
         Linea de negocio
       </option>
       <option v-for="linea in lineas_negocio" :key="linea.id" :value="linea.id">
          {{ linea.name }}
       </option>
   </select>
</template>