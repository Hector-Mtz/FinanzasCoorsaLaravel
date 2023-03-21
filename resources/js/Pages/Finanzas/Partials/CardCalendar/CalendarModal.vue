<script setup>
import { computed, ref } from "vue";
import clos from "../../../../../img/elementos/cerrar.png";
import InputSearch from "@/Components/InputSearch.vue";
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

const searchText = ref("");

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
    <DialogModal :show="show" @close="close()" :maxWidth="'8xl'">
        <template #title>
            <div class="flex justify-between items-center mb-4 relative">
                <div class="flex">
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
                <div class="flex gap-16">
                    <InputSearch
                        v-model="searchText"
                        class="flex items-center"
                    />

                    <img
                        :src="clos"
                        alt=""
                        class="h-[17px] w-[17px] hover:cursor-pointer"
                        @click="close()"
                    />
                </div>
            </div>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr
                        class="uppercase border-b-2 border-aqua-500 text-[15px] font-semibold"
                    >
                        <template v-for="header in headerTable" :key="header">
                            <th
                                v-if="header != 'revisado'"
                                class="pb-2 text-center first:text-start"
                            >
                                {{ header }}
                            </th>
                        </template>
                    </tr>
                </template>
                <template #tbody>
                    <tr
                        v-for="(obj, index) in dataCalendar.data"
                        :key="index"
                        class="rounded-lg"
                    >
                        <template
                            v-for="header in headerTable"
                            :key="header + index"
                        >
                            <td
                                v-if="header != 'revisado'"
                                :class="{
                                    'bg-blue-500 border-y-[1px] border-y-white text-white':
                                        obj.revisado,
                                }"
                                class="text-center text-[18px] font-light py-1 first:text-start last:text-start px-2"
                            >
                                {{ obj[header] }}
                            </td>
                        </template>
                    </tr>
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
