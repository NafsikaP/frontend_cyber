<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
//const urlRef = ref('http://localhost:9090/donationrequests/' + userId.value);
const donationRequestIdRef = ref(null);
const store = useApplicationStore();
const urlRef = computed(() => {
    return  backendEnvVar+'/api/aimodotis/donationrequests/' + userId.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const userId = ref(null);

onMounted(() => {
    userId.value = store.userData.id;
    performRequest();
});


const token = store.userData.accessToken;

const acceptDonationRequest = async () => {
    try {
        const response = await fetch(`${backendEnvVar}/api/aimodotis/donationrequests/${userId.value}/${donationRequestIdRef.value}/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log the response data if needed
            // Handle success, update UI or perform other actions
            alert('Donation Request Accepted !');
        } else {
            // Handle error
            console.error('Error accepting Donation Request');
            alert('Check your blood test date! It might be out of date...');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
};

const updateDonationRequestId = (id) => {
    donationRequestIdRef.value = id;
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Available Donation Requests</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                            <tr>
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
                                <td>{{ donationrequest.date }}</td>
                                <td>{{ donationrequest.location }}</td>
                                <td>{{ updateDonationRequestId(donationrequest.id) }}</td>
                                <b-button @click="acceptDonationRequest" class="btn btn-success">
                                    Accept
                                </b-button>
                            </tr>
                            </tbody>
                        </table>
                        <!--                        <router-link :to="{-->
                        <!--                                            name: 'create-donation-request'-->
                        <!--                                        }">-->
                        <!--                            <b-button class="btn-success"> Create new donation request</b-button>-->
                        <!--                        </router-link>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>