<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const route = useRoute();
const store = useApplicationStore();

const appFormIdRef = ref(null);


onMounted(() => {
    appFormIdRef.value = route.params.id;
});

const token = store.userData.accessToken;
const acceptAppForm = async () => {
    try {
        const response = await fetch(`${backendEnvVar}/api/secretary/appform/pending/${appFormIdRef.value}/accept`, {
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
            alert('Application Accepted !');
        } else {
            // Handle error
            console.error('Error accepting application');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
};

const declineAppForm = async () => {
    try {
        const response = await fetch(`${backendEnvVar}/api/secretary/appform/pending/${appFormIdRef.value}/decline`, {
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
            alert('Application Declined !');
        } else {
            const errordata = await response.text();
            // Handle error
            console.error('Error declining application', errordata);
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
                        <RouterLink class="small" :to="{ name: 'appforms-pending' }"
                        >Back to App Forms
                        </RouterLink
                        >
                        <h1 class="fs-3">App Form #{{ appFormIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'appform-pending-details', params: { id: appFormIdRef } }"
                                >Details
                                </RouterLink
                                >
                            </li>
                            <b-button @click="acceptAppForm" class="btn btn-success">
                                Accept
                            </b-button>
                            <b-button @click="declineAppForm" class="btn btn-danger">
                                Decline
                            </b-button>
                        </ul>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
