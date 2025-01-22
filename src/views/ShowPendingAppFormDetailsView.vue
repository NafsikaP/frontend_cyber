<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const route = useRoute();

const appFormIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar+'/api/secretary/appform/' + appFormIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    appFormIdRef.value = route.params.id;
    performRequest();
});
</script>

<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th>Field Name</th>
                <th>Field Value</th>
            </tr>
            </thead>
            <tbody v-if="loading">
            <tr>
                <td colspan="2">Loading...</td>
            </tr>
            </tbody>
            <tbody v-if="data">
            <tr>
                <th>First Name</th>
                <td>{{ data.aimodotis.fname }}</td>
            </tr>
            <tr>
                <th>Last Name</th>
                <td>{{ data.aimodotis.lname }}</td>
            </tr>
            <tr>
                <th>SSN</th>
                <td>{{ data.aimodotis.amka }}</td>
            </tr>
            <tr>
                <th>Blood Type</th>
                <td>{{ data.bloodTest.bloodtype }}</td>
            </tr>
            <tr>
                <th>Blood Test Date</th>
                <td>{{ data.bloodTest.date }}</td>
            </tr>
            <tr>
                <th>Blood Test Details</th>
                <td>{{ data.bloodTest.details }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>