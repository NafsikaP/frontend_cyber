<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const urlRef = ref(backendEnvVar+'/api/donationrequest');
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
                        <h1 class="fs-3">Donation Requests</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Location</th>
                            </tr>
                            </thead>
                            <tbody v-if="loading">
                            <tr>
                                <td colspan="5">Loading...</td>
                            </tr>
                            </tbody>
                            <tbody v-if="data">
                            <tr v-for="donationrequest in data">
                                <td>{{ donationrequest.id }}</td>
                                <td>{{ donationrequest.date }}</td>
                                <td>{{ donationrequest.location }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <router-link :to="{
                                            name: 'create-donation-request'
                                        }">
                            <b-button class="btn-success"> Create new donation request</b-button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>