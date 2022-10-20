<script setup>
    import { ref, watch, reactive } from 'vue';
    import ButtonAdd from '@/Components/ButtonAdd.vue';
    import DialogModal from '@/Components/DialogModal.vue';
    import TableComponent from '@/Components/Table.vue';
    import SecondaryButton from '@/Jetstream/SecondaryButton.vue';
    import Input1 from '@/Jetstream/Input.vue';
    import Label from '@/Jetstream/Label.vue';
    import moment from 'moment';
    import { Inertia } from '@inertiajs/inertia';  
    import { useForm } from '@inertiajs/inertia-vue3' 
 
    const emit = defineEmits(["close"])
    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        idSolicitudGasto: {
            type: Number,
            required: true,
        },  
    });

    const productos = ref([]);
  
    const verProductos = async function()
        {
         //await permite dejar que haga la peticion para realizar la funcion
          productos.value = [];
          await axios.get('api/productos/'+props.idSolicitudGasto,{ob: props.idSolicitudGasto}) //enviamos el dato a la ruta de la api
           .then((resp)=>
             {
               //console.log(resp);
               productos.value=resp.data;
             })
            .catch(function (error)
           {
            console.log(error);
           }); 
        }

    const close = () => {
        
        emit('close');
    };
    
    watch(props, () => {
        if (props.show) {
            verProductos();
        }
    })
    </script>
    <template>
        <DialogModal :show="show" @close="close()">
        <template #title>
        <div class="modalPart1">
         <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
             <span class="block font-bold text-center text-white">
                 Productos de solicitud:  
             </span>
         </div>
        </div>
    </template>
    <template #content>
        <table id="tabla2">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
               <tr v-for="producto in productos" :key="producto.id">
                  <td>{{producto.nombre}}</td>
                  <td>{{producto.cantidad}}</td>
                </tr>
            </tbody>
        </table>

             <SecondaryButton  @click="close()" style="margin:1rem">
              Cerrar
             </SecondaryButton>
           </template>
        </DialogModal>
    </template>
    