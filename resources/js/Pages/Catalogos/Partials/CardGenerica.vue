<script setup>
import { ref } from 'vue';
import ItemObjectShow from "@/Components/ItemObjectShow.vue";
import InputSearch from "@/Components/InputSearch.vue";
import Input from '@/Components/Input.vue';
import Card from '@/Components/Card.vue';
import ButtonAdd from '@/Components/ButtonAdd.vue';
import SkeletonLoader from '@/Components/SkeletonLoader.vue';
import ListObjModal from './ListObjModal.vue';

defineEmits(['reload'])

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    routeName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
const showingList = ref(false);

const showSubCatalogo = (obj) => {

}


</script>

<template>
    <Card>
        <div class="px-4 text-white">

            <div class="flex justify-around gap-1">
                <h2 class="text-xl font-bold leading-tight text-white">
                    {{ title }}
                </h2>
                <ButtonAdd class="h-7" @click="showingList = true" />
            </div>
            <div class="flex justify-around my-2">
                <slot name="search" />
            </div>
            <div class="w-full">
                <div class="-mx-2 overflow-hidden overflow-y-auto" style="max-height: 85vh;">
                    <SkeletonLoader v-if="data.current_page === undefined" style="height: 85vh;" />
                    <div v-else>
                        <ItemObjectShow v-for="obj in data.data" :key="obj.id" :data="obj"
                            @onShow="showSubCatalogo($event)">
                            #{{ obj.nombre }}
                        </ItemObjectShow>
                    </div>
                </div>
            </div>
            <div>
                <slot name="pagination" />
            </div>
            <!--Modals -->
            <ListObjModal :title="props.title" :routeName="props.routeName" :show="showingList" :listObj="data.data"
                @add="$emit('reload')" @close="showingList = false" />
            <!--Ends Modals-->
        </div>
    </Card>
</template>
<style lang="scss" scoped>
</style>
