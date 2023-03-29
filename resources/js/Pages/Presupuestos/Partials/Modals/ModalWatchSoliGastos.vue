<script setup>
 import { ref, watch, reactive } from 'vue';
 import ButtonAdd from '@/Components/ButtonAdd.vue';
 import DangerButton from '@/Components/DangerButton.vue';
 import DialogModal from '@/Components/DialogModal.vue';
 import SecondaryButton from '@/Jetstream/SecondaryButton.vue';
 import Input1 from '@/Jetstream/Input.vue';
 import Label from '@/Jetstream/Label.vue';
 import Checkbox from '@/Components/Checkbox.vue';
 import ModalShowProducs from './ModalShowProducs.vue';

 const props = defineProps({
        show: {
            type: Boolean,
            default: false,
           },
        ceco:{
            require:true,
            type:String
        },
        concepto:{
            require:true,
            type:String
        },
        solicitudes:{
          require:true,
          type:Array
        }
    });

 const emit = defineEmits(["close"]);
 const close = () => {
        
        emit('close');
    };

const modalProducts = ref(false);
const solicitud = ref(null);
const productos = ref([]);
const openModalProducts = (solici) => 
{
  solicitud.value = solici.nombre;
  productos.value = solici.productos;
  modalProducts.value = true;
}

const closeModalProducts = () => 
{
  modalProducts.value = false;
}
</script>
<template>
 <DialogModal :show="show" @close="close()">
            <template #title>
                <span class="block font-bold text-center ">
                  Solicitudes de gatos
                </span>
            </template>
            <template #content>
               <table class="w-full">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr class="border-b">
                        <td class="text-center border-r">{{ceco}}</td>
                        <td class="text-center">{{concepto}}</td>
                    </tr>
                  </tbody>
               </table>
               <table class="w-full">
                  <thead>
                     <tr>
                        <th>Solicitud</th>
                        <th>Presupuesto</th>
                        <th>Gasto</th>
                        <th>Suplemento</th>
                     </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(solicitud, index) in solicitudes" :key="index">
                        <td class="text-center">
                          <DangerButton @click="openModalProducts(solicitud)">
                             {{ solicitud.nombre }}
                          </DangerButton>
                        </td>
                        <td class="text-center">
                           <div v-if="solicitud.tipo_movimiento_id == 3">
                              {{ solicitud.cantidad }}
                           </div>
                        </td>
                        <td class="text-center">
                           <div v-if="solicitud.tipo_movimiento_id == 1">
                              {{ solicitud.cantidad }}
                           </div>
                        </td>
                        <td class="text-center">
                           <div v-if="solicitud.tipo_movimiento_id == 2">
                              {{ solicitud.cantidad }}
                           </div>
                        </td>
                    </tr>
                  </tbody>
               </table>
               <ModalShowProducs :solicitud="solicitud" :productos = "productos"  :show="modalProducts" @close="closeModalProducts" />
            </template>
 </DialogModal>
</template>