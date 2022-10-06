<script setup>
    import { ref, watch } from 'vue';
    import ButtonAdd from '@/Components/ButtonAdd.vue';
    import DialogModal from '@/Components/DialogModal.vue';
    import TableComponent from '@/Components/Table.vue';
    import ModalNewProducto from './ModalNewProducto.vue';
    import SecondaryButton from '@/Jetstream/SecondaryButton.vue';
import ModalWatchProducts from './ModalWatchProducts.vue';
   
    const emit = defineEmits(["close", "addFactura", "addOc"])
    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        ceco: {
            type: Object,
            required: true,
        },
        concepto: {
            type: Object,
            required: true,
        },
    });
    const NewProducto = ref(false);
    const WatchProductos =ref(false);
    const idSolicitudGasto = ref(-1); //si esta mal truena la bd por el -1
    const idMovimientoForm = ref(0);
    const nombreMovimiento = ref ("");
    const movimientos = ref({});
    const salidas = ref([]);
    const totales = ref({
        totalGasto:0,
        totalSuplemento:0,
        totalPresupuesto:0
    });
    
    
// EN MODALS FUNCTION
    const newSalidas = async function(idMovimiento) //funcion para peticion axios y abrir modal
         {
            axios.get('/api/consultaMovimiento/'+idMovimiento,{ob: idMovimiento}) //enviamos el dato a la ruta de la api
           .then((resp)=>
             {
               NewProducto.value = true;
               idMovimientoForm.value = idMovimiento;
               nombreMovimiento.value = resp.data[0].nombre;            
             })
            .catch(function (error)
           {
            console.log(error);
           });

         }

    const getSalidas = async function(ev)
        {
           console.log(props);
           axios.get('api/cliente_concepto/'+props.concepto+'/'+props.ceco,{ob: props.concepto},{ob1: props.ceco}) //enviamos el dato a la ruta de la api
           .then((resp)=>
           {
             let button;
           
             salidas.value = resp.data.salidas;
             //console.log(salidas.value);
             let newData = salidas.value; //almacenamos lo que viene de la bd en una variable
             movimientos.value = resp.data.tiposMovimiento;
             let tipoMovimientos = movimientos.value;
             //console.log(tipoMovimientos);
             let nuevoArregloMovimientos = [];
                for (let index = 0; index < tipoMovimientos.length; index++) //for para agrupar
             {
                let element = tipoMovimientos[index];
                //console.log(element);
                if(element == tipoMovimientos[0])
                {
                  nuevoArregloMovimientos.push(
                    {
                        movimiento:element.nombre
                    }
                  );
                } 
                else {
                    let nombreTipo = element.nombre;
                    //console.log(nombreTipo); //imprime los diferentes a indice 0
                    let nuevoObj;
                    //console.log(nuevoArregloMovimientos.length); //marca cuantos elementos hay en el arreglo
                    for (let i = 0; i < nuevoArregloMovimientos.length; i++) 
                    {
                        let element = nuevoArregloMovimientos[i]; //almacenamos en variable el elemento que fue guardado en la primera vuelta
                        if(element !== nombreTipo) //comparamos si el elemento que fue agregado en la primer vuelta es igual al que recorremos
                        {
                            nuevoObj = //por cada elemento nuevo creamos un objeto
                           {
                             movimiento:nombreTipo
                           }
                        } 
                       
                    }
                     nuevoArregloMovimientos.push(nuevoObj); //hacemos push al array principal
                }  
                   
                } 
                let elementoPrincipal;
                for (let index = 0; index < newData.length; index++) //recorremos la newData
                {
                    elementoPrincipal = newData[index];
                    //console.log(elementoPrincipal);
                    let elementoMovimiento = newData[index].movimiento;
                    
                    //console.log(elementoMovimiento) //imprime los elementos del array de la bd

                    for (let i = 0; i < nuevoArregloMovimientos.length; i++)  //recorremos los movimientos
                    {
                         let  eleMovimiento = nuevoArregloMovimientos[i].movimiento;
                             if ( elementoMovimiento == eleMovimiento)
                              {
                                //console.log(elementosArray.movimiento , x.movimiento) // imprime del principal el movimiento y de los movimientos
                                  parseInt(i);
                                 // console.log(y) //imprime
                                  elementoPrincipal.indice = i
                              }
                    }
                }  
                //RECORRIDO PARA HACER LOS TDs
                //console.log(newData);
                for (let x = 0; x < newData.length; x++) //recorremos dependiendo el numero de elementos de la tabla
                 {
                    let tds = [];                    
                    let indice = newData[x].indice; //seleccionamos el indice del elemento actual
                    //console.log(newData);
                    //let longitud = elementosArray.length; //rescatamos la longitud
                    switch (indice) //evaluamos el indice para hacer la suma por columna
                          {
                            case 0: //Gasto
                                totales.value.totalGasto += newData[x].cantidad; //corregir, suma
                                break;
                            case 1://Suplemento
                                totales.value.totalSuplemento += newData[x].cantidad ;
                             break;
                             case 2://Presupuesto
                                totales.value.totalPresupuesto += newData[x].cantidad ;
                                break;
                            default:
                                break;
                          }
                    for ( let k = 0; k < nuevoArregloMovimientos.length; k++) 
                    {
                        //console.log(k)
                        let  indiceMovimiento = k; //recuperamos indice actual
                        ///console.log(newData[x].cantidad);
                        if(indiceMovimiento === indice)
                        {
                          
                          let td = '<td>'+newData[x].cantidad+'</td>' ; 
                          
                          tds.push(td)
                        }
                        else{
                            let td = `<td></td>` ;
                            tds.push(td)
                          //console.log(td);
                          //console.log("llegue aqui" + k)
                          //document.getElementById(x).innerHTML=td; // obtengo el id y sustituyo por el actual     
                        }

                    }
                    
                    let stringTds = tds.toString();
                    //console.log(newData);
                    let stringTdsSinComas = stringTds.replace(",", " ");  
                    let stringTdsSinComas2 = stringTdsSinComas.replace(",", " ");  
                    stringTdsSinComas2 += `<td>
                        </td>
                                           <td>${newData[x].fecha}</td>`;
                    stringTdsSinComas2+= `
                    <td>
                      <Button id="watch${newData[x].id}" class="watch">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 eye" viewBox="0 0 16 16" >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                        </svg>
                      </Button>
                    </td>`;
        
                    let tr = `<tr>
                                <td>
                                  <a>${newData[x].nombre}</a>
                                </td>
                                ${stringTdsSinComas2}
                              </tr>`


                    let tabla = document.getElementById('tabla');
                    
                    function insertRow (table, tr)
                    {
                       var table = document.getElementById("tabla"); //seleccionamos la tabla por ID
                       var row = table.insertRow(1);//insertamos los datos despues de la fila 1
                       row.innerHTML = tr; //insertamos
                    }

                    insertRow(tabla,tr); //insertamos en la tabla los datos anteriores

                    button = document.getElementById(`watch${newData[x].id}`); //seleccionamos el boton que hara la funcion
                    
                    let idvar = newData[x].id;
                    //console.log(idvar)
                   
                    
                   //le asignamos un addevent al click y le pasamos la funcion vuejs

                    button.addEventListener('click',(e) =>  {
                        console.log(e)
                        idSolicitudGasto.value = idvar;
                        WatchProductos.value=true;
                    }); 
              }

             })
            .catch(function (error)
           {
            console.log(error);
           }); 

            //this.ModalMov = true;   //abrimos modal
        }

    const close = () => {
        emit('close');
    };
    const closeModalNewProducto = function ()
        {
            NewProducto.value = false;
            getSalidas();
        }

    const closeModalWatchProductos = function()
    {
        WatchProductos.value=false;
    }
    
    
    watch(props, () => {
        if (props.show) {
            getSalidas();
        }
    })
    
    </script>
    <template>
        <DialogModal :show="show" @close="close()">
            <template #title>
                <div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3">
                   <span class="block font-bold text-center text-white">
                    {{salidas.concepto}} 
                   </span>
               </div>
            </template>
            <template #content>
                <div class="flex flex-row modalPart1">
                <div class="px-4 py-1 border-r-4 borderModal basis-1/3">
                    <span class="block font-bold text-center text-white">
                        Concepto: {{concepto}}
                    </span>
                </div>
                <div class="flex-1 px-2 py-1">
                    <div class="flex justify-center">
                        <span class="block font-bold text-center text-white">
                            CECO: {{ceco}}
                        </span>
                    </div>
                </div>
             </div>
             <table id="tabla" style="margin-top:1rem">
                   <thead>
                     <tr>
                       <th>Nombre</th>
                       <th v-for="item in movimientos" :key="item.id">
                          {{item.nombre}} <!--Listamos nombre de movimietos-->
                       </th>
                       <th>Evidencia</th>
                       <th>Fecha de creación</th>
                       <th></th>
                     </tr>
                   </thead>
                   <tbody>
                      <tr></tr>
                      <tr>
                         <td></td>
                         <td v-for="item in movimientos" :key="item.id">
                           <ButtonAdd class="h-5" @click="newSalidas(item.id)" />
                         </td>
                         <td colspan="3"></td>
                      </tr>
                      <tr>
                          <td>TOTALES:</td>
                          <td>{{totales.totalGasto}}</td>
                          <td>{{totales.totalSuplemento}}</td>
                          <td>{{totales.totalPresupuesto}}</td>
                          <td colspan="3"></td> 
                           </tr>
                       <tr></tr>
                   </tbody>
               </table>
               <ModalNewProducto :show="NewProducto" 
               :idMovimientoForm="idMovimientoForm"
               :nombreMovimiento ="nombreMovimiento"
               :concepto=" concepto"
               :ceco="ceco"
               @close="closeModalNewProducto"
               ></ModalNewProducto>

               <ModalWatchProducts
               :show="WatchProductos"
               :idSolicitudGasto="idSolicitudGasto"
               @close="closeModalWatchProductos"
               ></ModalWatchProducts>
               <SecondaryButton  @click="close()" class="closeModal1">
                     Cerrar
                 </SecondaryButton>
            </template>
        </DialogModal>
    </template>
    