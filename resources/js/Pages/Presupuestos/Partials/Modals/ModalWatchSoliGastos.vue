<script setup>
 import { ref, watch, reactive } from 'vue';
 import ButtonAdd from '@/Components/ButtonAdd.vue';
 import DialogModal from '@/Components/DialogModal.vue';
 import SecondaryButton from '@/Jetstream/SecondaryButton.vue';
 import Input1 from '@/Jetstream/Input.vue';
 import Label from '@/Jetstream/Label.vue';
 import Checkbox from '@/Components/Checkbox.vue';

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
        }
    });

 const emit = defineEmits(["close"]);
 const close = () => {
        
        emit('close');
    };
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
                    <tr>
                        <td class="text-center">{{ceco}}</td>
                        <td class="text-center">{{concepto}}</td>
                    </tr>
                  </tbody>
               </table>
            </template>
 </DialogModal>
</template>