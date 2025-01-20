<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const route = useRoute();
const store = useApplicationStore();

const userIdRef = ref(null);
const urlRef = ref(backendEnvVar+'/api/admin/users');
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    userIdRef.value = route.params.id;
    performRequest();
});

const token = store.userData.accessToken;

const deleteUser = async (userid) => {
    try {
        const response = await fetch(`${backendEnvVar}/api/admin/user/delete/${userid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log the response data if needed
            // Handle success, update UI or perform other actions
            alert('User deleted successfully!');
        } else {
            const errordata = await response.text();
            // Handle error
            console.error('Error deleting user!', errordata);
            alert('Error deleting user!');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Users</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Edit User</th>
                                <th>Delete User</th>
                            </tr>
                            </thead>
                            <tbody v-if="loading">
                            <tr>
                                <td colspan="5">Loading...</td>
                            </tr>
                            </tbody>
                            <tbody v-if="data">
                            <tr v-for="user in data" :key="user.id">
                                <template v-if="user.id!==1">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <RouterLink :to="{

                                                name: 'user-details',
                                                params: { id: user.id }}">
                                            Edit Roles
                                        </RouterLink>
                                    </td>
                                    <td>
                                        <RouterLink :to="{
                                            path: '/edit',
                                                name: 'user-edit',
                                                params: { id: user.id }}">
                                            Edit User
                                        </RouterLink>
                                    </td>
                                    <td>
                                        <b-button @click="deleteUser(user.id)" class="btn btn-danger">
                                            Delete User
                                        </b-button>
                                    </td>
                                </template>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>