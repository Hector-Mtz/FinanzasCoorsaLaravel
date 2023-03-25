<script setup>

const emit = defineEmits(['seleccion','setFor'])

const cambiar = (movimiento) =>
{
  emit('seleccion', movimiento);
}

const setForCeco = () =>
{
   let ceco = 'CECO';
   emit('setFor', ceco);
}

const setForConcepto = () => 
{
   let concepto = "CONCEPTO"
   emit('setFor', concepto);
}

</script>
<template>
  <div class="flex flex-row">
     <div class="pt-10 -rotate-90">
        <button @click="setForCeco" class=" bg-[#0A0F2C] pl-5 pr-5 pt-2 pb-2 rounded-t-lg border-2 border-[#26458D]">
           <span class="text-white uppercase">Ceco</span>
        </button>
     </div>
     <div class="flex flex-col ">
        <button @click="setForConcepto" class="bg-[#0A0F2C] mb-2 p-2  rounded-tr-lg rounded-bl-lg border-2 border-[#26458D]">
            <span class="text-white uppercase">Con</span>
        </button>
        <div class="dropdown">
            <button onclick="myFunction()" class=" bg-[#0A0F2C] p-2 rounded-tl-lg rounded-br-lg border-2 border-[#26458D] w-full">
              <span class="text-white uppercase">$</span>
            </button>
            <div id="myDropdown" class="dropdown-content">
                      <button id="PRESUPUESTO" @click="cambiar('PRESUPUESTO')">Presupuesto</button>
                      <button id="SUPLEMENTO" @click="cambiar('SUPLEMENTO')">Suplemento</button>
                      <button id="TOTAL" @click="cambiar('TOTAL')">Total</button>
                      <button id="GASTO" @click="cambiar('GASTO')">Gasto</button>
                      <button id="DISPONIBLE" @click="cambiar('DISPONIBLE')">Disponible</button>     
            </div>
        </div>
     </div>
  </div>
</template>