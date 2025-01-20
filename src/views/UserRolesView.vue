<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const route = useRoute();
const store = useApplicationStore();

const userIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar+'/api/admin/roles';
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    userIdRef.value = route.params.id;
    performRequest();
});

const token = store.userData.accessToken;
const addRole = async (roleid) => {
    try {
        const response = await fetch(`${backendEnvVar}/api/admin/addroles/${userIdRef.value}/${roleid}`, {
            method: 'POST',
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
            alert('Added role successfully!');
        } else {
            const errordata = await response.text();
            // Handle error
            console.error('Error adding role! Role might already exist for this user', errordata);
            alert('Error adding role! Role might already exist for this user');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
};

const deleteRole = async (roleid) => {
    try {
        const response = await fetch(`${backendEnvVar}/api/admin/deleteroles/${userIdRef.value}/${roleid}`, {
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
            alert('Deleted role successfully!');
        } else {
            const errordata = await response.text();
            // Handle error
            console.error('Error deleting role! Role might not exist for this user', errordata);
            alert('Error deleting role! Role might not exist for this user');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
};

</script>

<template>
    <div>
        <table>
            <tr v-for="role in data">
                <template v-if="role.id!==1">
                    <td>
                        <b-button @click="addRole(role.id)" class="btn btn-success">
                            Add Role {{ role.name }}
                        </b-button>
                    </td>
                    <td>
                        <b-button @click="deleteRole(role.id)" class="btn btn-danger">
                            Delete Role {{ role.name }}
                        </b-button>
                    </td>
                </template>
            </tr>
        </table>
    </div>
</template>