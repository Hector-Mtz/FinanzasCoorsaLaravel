<script setup>
import { computed, ref, watch } from "vue";
import DialogModal from "@/Components/DialogModal.vue";
import TableComponent from "@/Components/Table.vue";

const emit = defineEmits(["close", "addOc"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    ruta: {
        type: String,
        required: true,
    }
});

const dataModal = ref([])

const getData = async () => {
    try {
        const resp = await axios.get(props.ruta);
        dataModal.value = resp.data;
    } catch (error) {
        let message = "ERROR GET SUB MODAL: " + props.ruta
        console.log(error)
        if (error.response.data.hasOwnProperty("message")) {
            message = error.response.data.message;
        }
        alert(message);
    }

}

const headerTable = computed(() => {
    if (dataModal.value.length === 0) {
        return ["", "Sin Información"];
    }
    let keyData;
    const auxHeader = [];
    for (keyData in dataModal.value[0]) {
        switch (keyData) {
            case "id":
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

watch(props, () => {
    if (props.show) {
        getData();
    }
});

</script>
<template>
    <DialogModal :show="show" @close="close()" maxWidth="2xl">
        <template #title>
        </template>
        <template #content>
            <TableComponent>
                <template #thead>
                    <tr class="font-semibold uppercase border-b-2 border-aqua-500">
                        <th v-for="(header, index) in headerTable" :key="header" class="pb-4">
                            {{ header }}
                        </th>
                    </tr>
                </template>
                <template #tbody>
                    <tr v-for="(obj, index) in dataModal" :key="index" class="font-light">
                        <td v-for="(header) in headerTable" :key="header + index">
                            {{ obj[header] }}
                        </td>
                    </tr>
                </template>
            </TableComponent>
        </template>
    </DialogModal>
</template>
