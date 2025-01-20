<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const store = useApplicationStore();
const aimodotisIdRef = ref(null);


const urlRef = ref(backendEnvVar+'/api/aimodotis');


const authRef = ref(true);
const {data, loading, performRequest} = useRemoteData(urlRef, authRef);


onMounted(() => {
    performRequest();
});



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
                        >Home</RouterLink
                        >
                        <h1 class="fs-3">My Donations </h1>
                    </div>
                    <div class="mb-4">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Donation Date</th>
                                <th>Location</th>
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
                                    <td>{{ aimodotis.last_donation }}</td>
                                    <td>{{ aimodotis.location }}</td>
                                    <td>{{updateAimodotisId(aimodotis.id)}}</td>
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


