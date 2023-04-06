<script setup>
  var props = defineProps({
     lineas_negocio:Object
  });
</script>
<template>
   <select>
       <option selected disabled>
         Selecciona una linea de negocio.
       </option>
       <option v-for="linea in lineas_negocio" :key="linea.id" :value="linea.id">
          {{ linea.name }}
       </option>
   </select>
</template>