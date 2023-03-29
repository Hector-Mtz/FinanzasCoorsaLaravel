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
        solicitud:{
            type:String,
            require:true
        },
        productos:{
            type:Array,
            require:true
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
                   Productos de {{ solicitud }}
                </span>
            </template>
            <template #content>
                 <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <td class="text-center">Nombre</td>
                            <td class="text-center">$</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="producto in productos" :key="producto.id">
                            <td class="text-center">{{ producto.nombre }}</td>
                            <td class="text-center">{{ producto.cantidad }}</td>
                        </tr>
                    </tbody>
                 </table>
            </template>
 </DialogModal>
</template>