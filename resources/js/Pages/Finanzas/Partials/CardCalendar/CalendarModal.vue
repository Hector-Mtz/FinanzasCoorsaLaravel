<script setup>
import { computed, ref } from "vue";
import { Inertia } from "@inertiajs/inertia";

import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";

const emit = defineEmits(["close", "addOc"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    dataCalendar: {
        type: Object,
        required: true,
    },
});

const headerTable = computed(() => {
    if (props.dataCalendar.data.lenght == 0) {
        return ["", "Cantidad"];
    }
    let keyData;
    const auxHeader = [];
    for (keyData in props.dataCalendar.data[0]) {
        switch (keyData) {
            case "id":
            case "day":
                break;
            default:
                auxHeader.push(keyData);
                break;
        }
    }
    return auxHeader;
});

const close = () => {
    emit("close");
};
</script>
<template>
    <DialogModal :show="show" @close="close()">
        <template #title>
            <div class="flex flex-row">
                <div class="px-4 py-1">
                    <span
                        class="block font-bold text-center text-fuente-500 text-[22px] uppercase"
                    >
                        {{ dataCalendar.serie }}
                    </span>
                </div>
                <div class="px-4 py-1 border-gray-600">
                    <span
                        class="block font-bold text-center text-fuente-500 border-2 border-aqua-500 rounded-3xl text-xl px-4"
                    >
                        {{ dataCalendar.date }}
                    </span>
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="uppercase">
                        <th class="flex justify-center">

                        </th>
                        <th v-if="dataCalendar.serie == 'ventas'" v-for="(header, index) in headerTable" :key="header">
                            <template v-if="header != 'revisado' && index >4">
                                {{ header }}
                            </template>
                        </th>
                        <th v-if="dataCalendar.serie == 'pp'" v-for="(header, index) in headerTable" :key="header">
                            <template v-if="header != 'revisado' && index < 2">
                                {{ header }}
                            </template>
                        </th>
                        <th v-if="dataCalendar.serie == 'c'" v-for="(header, index) in headerTable" :key="header">
                            <template v-if="header != 'revisado' && index <2">
                                {{ header }}
                            </template>
                        </th>
                        <th v-if="dataCalendar.serie == 'pc'" v-for="(header, index) in headerTable" :key="header">
                            <template v-if="header != 'revisado' && index <2">
                                {{ header }}
                            </template>
                        </th>
                    </tr>
                </template>
                <template #tbody>
                    <tr v-if="dataCalendar.serie == 'ventas'" v-for="(obj, index) in dataCalendar.data" :key="index">
                        <td class="flex justify-center" >
                            <div class="tooltip">
                                <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                	 viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999; width: 2rem;" xml:space="preserve">
                                <g>
                                	<g>
                                		<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                			c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                			C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                			c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                			C447.361,287.923,358.746,385.406,255.997,385.406z"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                			s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                			s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
                                	</g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                                <div class="tooltiptext">
                                    <table class="w-full">
                                        <tr>
                                            <th>OC</th>
                                            <th>OC Cantidad</th>
                                            <th>Factura</th>
                                            <th>Factura Cantidad</th>
                                        </tr>
                                        <tr>
                                           <td> {{ obj.ocs_name }}</td>
                                           <td>{{ obj.ocs_cantidad }}</td>
                                           <td>{{ obj.factura_ref }}</td>
                                           <td>{{ obj.facturas_cantidad }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </td>
                        <td
                            v-for="(header, index2) in headerTable"
                            :key="header + index"
                            :class="{ 'bg-blue-500': obj.revisado }"
                        > 
                           <div class="pb-16 mt-2">
                              <template v-if="header != 'revisado' &&index2 >4">
                                  {{ obj[header] }}
                              </template>
                           </div>
                        </td>
                    </tr>
                    <tr v-if="dataCalendar.serie == 'pp'" v-for="(obj, index) in dataCalendar.data" :key="index">
                       <td class="flex justify-center" >
                            <div class="tooltip">
                                <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                	 viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999; width: 2rem;" xml:space="preserve">
                                <g>
                                	<g>
                                		<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                			c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                			C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                			c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                			C447.361,287.923,358.746,385.406,255.997,385.406z"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                			s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                			s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
                                	</g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                                <div class="tooltiptext">
                                    <table class="w-full">
                                        <tr>
                                            <th>OC</th>
                                            <th>OC Cantidad</th>
                                            <th>Venta</th>
                                            <th>Venta Cantidad</th>
                                        </tr>
                                        <tr>
                                           <td> {{ obj.ocs_name }}</td>
                                           <td>{{ obj.ocs_cantidad }}</td>
                                           <td>{{ obj.ventas_nombre }}</td>
                                           <td>{{ obj.venta_cantidad }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                       </td> 
                        <td
                            v-for="(header, index2) in headerTable"
                            :key="header + index"
                            :class="{ 'bg-blue-500': obj.revisado }"
                        > 
                           <div class="pb-16 mt-2">
                              <template v-if="header != 'revisado' &&index2  < 2">
                                  {{ obj[header] }}
                              </template>
                           </div>
                        </td>
                    </tr>
                    <tr v-if="dataCalendar.serie == 'c'" v-for="(obj, index) in dataCalendar.data" :key="index"> 
                        <td class="flex justify-center">
                            <div class="tooltip">
                                <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                	 viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999; width: 2rem;" xml:space="preserve">
                                <g>
                                	<g>
                                		<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                			c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                			C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                			c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                			C447.361,287.923,358.746,385.406,255.997,385.406z"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                			s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                			s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
                                	</g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                                <div class="tooltiptext">
                                    <table class="w-full">
                                        <tr>
                                            <th>Factura</th>
                                            <th>Factura Cantidad</th>
                                            <th>Venta</th>
                                            <th>Venta Cantidad</th>
                                            <th>OC</th>
                                            <th>OC Cantidad</th>
                                        </tr>
                                        <tr>
                                           <td> {{ obj.factura_referencia }}</td>
                                           <td>{{ obj.factura_cantidad }}</td>
                                           <td>{{ obj.venta_name }}</td>
                                           <td>{{ obj.venta_cantidad }}</td>
                                           <td>{{ obj.oc_name }}</td>
                                           <td>{{ obj.oc_cantidad }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </td>
                        <td
                            v-for="(header, index2) in headerTable"
                            :key="header + index"
                            :class="{ 'bg-blue-500': obj.revisado }"
                        > 
                           <div class="pb-16 mt-2">
                              <template v-if="header != 'revisado' &&index2  < 2">
                                  {{ obj[header] }}
                              </template>
                           </div>
                        </td>
                    </tr>
                    <tr v-if="dataCalendar.serie == 'pc'" v-for="(obj, index) in dataCalendar.data" :key="index">
                        <td class="flex justify-center" >
                            <div class="tooltip">
                                <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                	 viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999; width: 2rem;" xml:space="preserve">
                                <g>
                                	<g>
                                		<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                			c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                			C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                			c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                			C447.361,287.923,358.746,385.406,255.997,385.406z"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                			s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                			s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
                                	</g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                                <div class="tooltiptext">
                                    <table class="w-full">
                                        <tr>
                                            <th>Venta</th>
                                            <th>Venta Cantidad</th>
                                            <th>Factura</th>
                                            <th>Factura Cantidad</th>
                                            <th>Ingreso</th>
                                            <th>Ingreso Cantidad</th>
                                        </tr>
                                        <tr>
                                           <td> {{ obj.ventas_nombre }}</td>
                                           <td>{{ obj.ventas_cantidad }}</td>
                                           <td>{{ obj.factura_referencia }}</td>
                                           <td>{{ obj.factura_cantidad }}</td>
                                           <td>{{ obj.ingreso_nombre }}</td>
                                           <td>{{ obj.ingreso_cantidad }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                       </td> 
                        <td
                            v-for="(header, index2) in headerTable"
                            :key="header + index"
                            :class="{ 'bg-blue-500': obj.revisado }"
                        > 
                           <div class="pb-16 mt-2">
                              <template v-if="header != 'revisado' &&index2  < 2">
                                  {{ obj[header] }}
                              </template>
                           </div>
                        </td>
                    </tr>
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
<style>
.tooltip {
  display: block;
  padding-bottom: 4rem;
  align-items: center;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: auto;
  background-color: #0A0F2C;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>