<script setup>
import { ref, onMounted, watch } from 'vue'
import { pickBy, throttle } from "lodash";
import SpinProgress from "./SpinProgress.vue";
import SimplePagination from './SimplePagination.vue';

const emit = defineEmits(["onShow"]);

const props = defineProps({
    ruta: {
        type: String,
        required: true,
    },
    filters: {
        type: Object,
        default: {}
    }
});
const dataObj = ref({ data: [] });
const loading = ref(false);
/**
 * Get paginated ventas
 * @param {string} page 
 */
const searchDataObj = async (page) => {
    const params = pickBy({ ...props.filters, page })
    loading.value = true;
    try {
        const response = await axios.get(props.ruta, {
            params
        });
        dataObj.value = response.data;
    } catch (error) {
        if (error.response) {
            let messageError = '';
            const messageServer = error.response.data.message
            if (error.response.status != 500) {
                messageError = messageServer;
            } else {
                messageError = 'Internal Server Error';
            }
            alert(messageError)
        }
    }
    loading.value = false;
};

onMounted(() => {
    searchDataObj()
});

watch(props, throttle(function () {
    searchDataObj();
}, 100))

</script>
<template>
    <div>
        <SpinProgress :inprogress="loading" />
        <slot :data="dataObj.data" />
        <SimplePagination :pagination="dataObj" @loadPage="searchDataObj($event)" />
    </div>
</template>
