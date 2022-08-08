<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import UsersTable from './Partials/UsersTable.vue';
import Pagination from '../../Components/Pagination.vue';
import { ref } from 'vue';
import UserModal from './Modals/UserModal.vue';

defineProps({
    users: {
        type: Object,
        required: true,
    },
    // roles: {
    //     type: Array,
    //     required: true,
    // },
    filters: {
        require: true
    },
});

const userSelect = ref({ id: -1 });
const typeForm = ref('create');
const showingModalUser = ref(false);
const messageError = ref('')

const showError = (message) => {
    if (message) {
        messageError.value = message;
        showingModalError.value = true
    } else {
        messageError.value = '';
        showingModalError.value = false
    }
}
const closeModalUser = () => {
    showingModalUser.value = false;
}

const createUser = () => {
    typeForm.value = 'create';
    userSelect.value = { id: -1 }
    showingModalUser.value = true;
}


const editUser = (user) => {
    typeForm.value = 'update';
    userSelect.value = user;
    showingModalUser.value = true;
}

</script>

<template>
    <AppLayout title="Users">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Usuarios
            </h2>
        </template>

        <div class="py-3">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="px-1 py-4 overflow-hidden shadow-xl white-transparent sm:rounded-lg">

                </div>
            </div>
        </div>
        <UserModal :show="showingModalUser" :user="userSelect" :roles="laravelRoles" :type-form="typeForm"
            @close="closeModalUser" />
    </AppLayout>
</template>
