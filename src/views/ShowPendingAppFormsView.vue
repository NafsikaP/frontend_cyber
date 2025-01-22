<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const urlRef = ref(backendEnvVar+'/api/secretary/appforms/pending');
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Pending Appforms</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Application Date</th>
                                <th>SSN</th>
                            </tr>
                            </thead>
                            <tbody v-if="loading">
                            <tr>
                                <td colspan="5">Loading...</td>
                            </tr>
                            </tbody>
                            <tbody v-if="data">
                            <tr v-for="appform in data">
                                <td>{{ appform.id }}</td>
                                <td>{{ appform.status }}</td>
                                <td>{{ appform.appDate }}</td>
                                <td>{{ appform.aimodotis.amka }}</td>
                                <td>
                                    <RouterLink
                                        :to="{
                                            name: 'appform-pending',
                                            params: { id: appform.id }
                                        }"
                                    >Display</RouterLink
                                    >
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>