<script setup>
import { ref } from "vue";
import ItemObjectShow from "@/Components/ItemObjectShow.vue";
import InputSearch from "@/Components/InputSearch.vue";
import Input from "@/Components/Input.vue";
import Card from "@/Components/Card.vue";
import ButtonAdd from "@/Components/ButtonAdd.vue";
import SkeletonLoader from "@/Components/SkeletonLoader.vue";
import ListObjModal from "./ListObjModal.vue";
import SubcatalogoModal from "./SubcatalogoModal.vue";

const emits = defineEmits(["reload", "showSubCatalogo"]);

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    routeName: {
        type: String,
        required: true,
    },
    subRoute: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
});
const showingList = ref(false);
const showingSubCatalogo = ref(false);
const object = ref({});

const showSubCatalogo = (obj) => {
    if (!!props.subRoute) {
        object.value = obj;
        showingSubCatalogo.value = true;
    } else {
        emits("showSubCatalogo", obj);
    }
};
</script>

<template>
    <Card>
        <div class="px-4 text-fuente-500">
            <div class="flex justify-around items-center gap-1">
                <h2
                    class="text-[22px] font-semibold leading-tight text-fuente-500"
                >
                    {{ title }}
                </h2>
                <ButtonAdd
                    class="h-[25px] w-[35px]"
                    @click="showingList = true"
                />
            </div>
            <div class="flex justify-around my-2">
                <slot name="search" />
            </div>
            <div class="w-full">
                <div
                    class="-mx-2 overflow-hidden overflow-y-auto"
                    style="max-height: 85vh"
                >
                    <SkeletonLoader
                        v-if="data.current_page === undefined"
                        style="height: 85vh"
                    />
                    <div v-else>
                        <ItemObjectShow
                            v-for="obj in data.data"
                            :key="obj.id"
                            :data="obj"
                            @onShow="showSubCatalogo($event)"
                        >
                            #{{ obj.nombre }}
                        </ItemObjectShow>
                    </div>
                </div>
            </div>
            <div>
                <slot name="pagination" />
            </div>
            <!--Modals -->
            <ListObjModal
                :title="props.title"
                :routeName="props.routeName"
                :show="showingList"
                :listObj="data.data"
                @add="$emit('reload')"
                @close="showingList = false"
            />

            <SubcatalogoModal
                v-if="!!subRoute"
                :title="subRoute === 'montos' ? 'Precios' : subRoute"
                :routeName="subRoute"
                :object="object"
                :show="showingSubCatalogo"
                @close="showingSubCatalogo = false"
            />
            <slot name="modals" />
            <!--Ends Modals-->
        </div>
    </Card>
</template>
<style lang="scss" scoped></style>
