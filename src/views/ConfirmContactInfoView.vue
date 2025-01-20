<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const route = useRoute();
const store = useApplicationStore();
const aimodotisIdRef = ref(null);

// const urlRef = computed(()=> {
//     return 'http://localhost:9090/aimodotis/' + aimodotisIdRef.value;
// });
const urlRef = ref(backendEnvVar+'/api/aimodotis');

const authRef = ref(true);
const {data, loading, performRequest} = useRemoteData(urlRef, authRef);


onMounted(() => {
    aimodotisIdRef.value = route.params.id;
    performRequest();
});

const token = store.userData.accessToken;

const confirmInfo = async () => {
    try {
        const response = await fetch(`${backendEnvVar}/api/aimodotis/confirmcontactinfo/${aimodotisIdRef.value}`, {
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
            alert('Contact Info Confirmed! You are now a blood Donor');
        } else {
            const errordata = await response.text();
            // Handle error
            console.error('Error confirming contact info', errordata);
            alert('Error! Your application form is not accepted yet or might not exist!');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
};

const updateAimodotisId = (id) => {
    aimodotisIdRef.value = id;
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'home' }"
                        >Home
                        </RouterLink
                        >
                        <h1 class="fs-3">Aimodotis #{{ aimodotisIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Sex</th>
                                <th>Last Donation</th>
                                <th>Age</th>
                                <th>Location</th>
                                <th>AMKA</th>
                            </tr>
                            </thead>
                            <tbody v-if="loading">
                            <tr>
                                <td colspan="5">Loading...</td>
                            </tr>
                            </tbody>
                            <tbody v-if="data">
                            <tr v-for="aimodotis in data">
                                <template v-if="aimodotis.email===store.userData.email">
                                    <td>{{ aimodotis.id }}</td>
                                    <td>{{ aimodotis.fname }}</td>
                                    <td>{{ aimodotis.lname }}</td>
                                    <td>{{ aimodotis.email }}</td>
                                    <td>{{ aimodotis.phone }}</td>
                                    <td>{{ aimodotis.sex }}</td>
                                    <td>{{ aimodotis.last_donation }}</td>
                                    <td>{{ aimodotis.age }}</td>
                                    <td>{{ aimodotis.location }}</td>
                                    <td>{{ aimodotis.amka }}</td>
                                    <td>{{ updateAimodotisId(aimodotis.id) }}</td>
                                </template>
                            </tr>
                            </tbody>
                        </table>
                        <b-button @click="confirmInfo" class="btn btn-success">
                            Confirm Info
                        </b-button>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
