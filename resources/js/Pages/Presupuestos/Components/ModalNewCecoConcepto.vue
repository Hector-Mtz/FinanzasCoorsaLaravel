<script setup>
    import { ref, watch, reactive } from 'vue';
    import ButtonAdd from '@/Components/ButtonAdd.vue';
    import DialogModal from '@/Components/DialogModal.vue';
    import SecondaryButton from '@/Jetstream/SecondaryButton.vue';
    import Input1 from '@/Jetstream/Input.vue';
    import Label from '@/Jetstream/Label.vue';
    import Checkbox from '@/Components/Checkbox.vue';
    import SelectCECOConcepto from './SelectCECOConcepto.vue'; 
    import moment from 'moment';
    import { Inertia } from '@inertiajs/inertia';  
    import { useForm } from '@inertiajs/inertia-vue3'

 
    const emit = defineEmits(["close"])
    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
           } ,
        cecos:Object,
        conceptos:Object,
        movimiento: String,
        idmovimiento:Number
    });
  
   const formSolicitud = useForm({
          nombre: "",
          tipo_movimiento_id:-1,
          ceco_concepto_id:-1,
          productos:[],
          autorizacion_id:1,
          created_at:"",
          updated_at:""
          })
    
    const filas = ref([]);
    let ceco = ref(-1);
    let concepto = ref(-1);

    // Funciones
    const addRow =  function ()
    {
        if(filas.value)
        {
            filas.value.push({
                  id:0,
                  nombreProducto:'',
                  cantidad:0,
                  costo:0,
                  iva:'',
                  total: 0
             });
        }
        for (let index = 0; index < filas.value.length; index++) 
        {
           filas.value[index].id = index;
        }
        //console.log(filas.value); 
    }

    const removeRow = function(id)
        {
            //console.log(id);
            filas.value.splice(id,1);
        }

    const enviarFormSolicitud = async function()
        {
          formSolicitud.tipo_movimiento_id = props.idmovimiento;
          formSolicitud.productos = filas.value;
          // obtener el nombre del mes, día del mes, año, hora
          var now = moment().format("YYYY-MM-DD HH:mm:ss");
          formSolicitud.created_at = now;
          formSolicitud.updated_at = now;
          await axios.get('api/consulta_ceco_concepto/'+ceco.value+'/'+concepto.value,{ob:ceco.value},{ob1:concepto.value}) //enviamos los dato a la ruta de la api
           .then((resp)=>
             {
               console.log(resp.data); // tenemos el id del ceco_concepto a insertar
               formSolicitud.ceco_concepto_id = resp.data[0].id;
               console.log(formSolicitud);
               
               formSolicitud.post('/soliMovimientos');
               close();
               formSolicitud.reset();
             })
            .catch(function (error)
           {
            console.log(error);
           });
          console.log(formSolicitud);
        }

    const close = () => {
        
        emit('close');
    };
    
    </script>
    <template>
        <DialogModal :show="show" @close="close()">
            <template #title>
                <span class="block font-bold text-center text-white">
                  Nueva solicitud
                </span>
            </template>
            <template #content>
                <form class="formNewGastos" v-on:submit.prevent="enviarFormSolicitud()">
                  <div style="margin-left:3rem;">
                    <label class ="labelForm">Nombre de solicitud: </label>
                    <Input1 v-model="formSolicitud.nombre" type="text" required></Input1>
                  </div>
                  <div>
                       <label class ="labelForm" >TIPO DE MOVIMIENTO:</label>
                       <Input1 type="text" disabled :value="movimiento" required ></Input1>
                   </div>
                   <div>
                     <label class ="labelForm" >CECO:</label>
                     <SelectCECOConcepto  required v-model="ceco">
                        <option value=""  disabled selected> Seleciona un CECO</option>
                        <option v-for="ceco in cecos" :key="ceco.id" :value="ceco.id"> {{ceco.nombre}}</option>
                     </SelectCECOConcepto>
                   </div>
                   <div>
                    <label class ="labelForm" >Concepto:</label>
                    <SelectCECOConcepto  required v-model="concepto"> 
                        <option value=""  disabled selected > Seleciona un Concepto</option>
                        <option v-for="concepto in conceptos"  :value="concepto.id" :key="concepto.id">
                             {{concepto.nombre}}
                        </option>
                     </SelectCECOConcepto>
                   </div>
                    <table id="tabla" style="margin-top:5px; grid-column: 1/3;">
                       <thead>
                         <tr>
                           <th>#</th>
                           <th>Nombre de producto</th>
                           <th>Cantidad</th>
                           <th>$</th>
                           <th>IVA</th>
                           <th>Total</th>
                           <th>Eliminar</th>
                         </tr>
                       </thead>
                       <tbody >
                          <tr v-for="item in filas" :key="item.id">
                            <td>{{item.id}}</td>
                             <td>
                                 <Input1 name="nombreProducto" type="text" v-model="item.nombreProducto" style="color: black;" required ></Input1>
                             </td>
                             <td>
                                 <Input1 type="number" min="1" pattern="^[0-9]+" v-model="item.cantidad" style="width: 70px;color: black;" required></Input1>
                             </td>
                             <td>
                                 <Input1 type="number" min="1" pattern="^[0-9]+" v-model="item.costo" style="width: 70px;color: black;" required></Input1>
                             </td>
                             <td>
                                 <Checkbox v-model="item.iva"></Checkbox>
                             </td>
                             <td>
                                 <p style="display:none" v-if="item.iva==false">{{item.total = (item.cantidad)*(item.costo)}}</p>
                                 <p style="display:none" v-if="item.iva==true">{{item.total = ((item.cantidad)*(item.costo))*1.16}}</p>
                                 <Input1 type="number" min="1" pattern="^[0-9]+" v-model="item.total" disabled style="width: 100px;color: black;"></Input1>     
                             </td>
                             <td>
                                <SecondaryButton class="buttonRemove" @click="removeRow(item.id)">-</SecondaryButton>
                             </td>
                          </tr>
                       </tbody>
                   </table>
                   <br>
                   <div class="buttonModalAdd1">
                     <SecondaryButton class="buttonAdd" @click="addRow()">+</SecondaryButton>
                  </div>
                   <SecondaryButton class="mb-3 btn btn-primary sentButtonModal1" type="submit">Enviar</SecondaryButton>
                   <br>
               </form>
               <SecondaryButton  @click="close()" class="closeModal1" style="float:right; margin:1rem;">
                      Cerrar
              </SecondaryButton>
            </template>
        </DialogModal>
    </template>
    