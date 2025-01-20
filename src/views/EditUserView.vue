<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const formDataRef = ref({
    "username": "",
    "email": ""
});

const urlRef = ref(null);
const authRef = ref(true);
const methodRef = ref('POST');
const store = useApplicationStore();
const router = useRouter();
const route = useRoute();
const urlRef2 = ref(null);
const authRef2 = ref(true);


const userIdRef = ref(null);

const updateUserRemoteData = useRemoteData(urlRef, authRef, methodRef, formDataRef);
const { data, loading, performRequest } = useRemoteData(urlRef2, authRef2);


onMounted(() => {
    userIdRef.value = route.params.id;
    urlRef.value = backendEnvVar+'/api/admin/user/update/' + userIdRef.value;
    urlRef2.value = backendEnvVar+'/api/admin/users/' + userIdRef.value;
    performRequest();
});

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
};

const submitForm = () => {
    if (formDataRef.value.email && !isValidEmail(formDataRef.value.email)) {
        alert('Provide a valid email!');
        return;
    }
    updateUserRemoteData.performRequest();
    alert('User updated successfully!');

};
</script>


<template>
    <div class="mb-4">
        <h>These are the user's details</h>
        <tbody v-if="loading">
        <tr>
            <td colspan="5">Loading...</td>
        </tr>
        </tbody>
        <tbody v-if="data">
        <p><b>Username:</b> {{ data.username }} <b>Email:</b> {{ data.email }}</p>
        </tbody>
    </div>
    <div>
        <p>You can update any field</p>
        <div class="mb-2">
            <label for="username">Username: </label>
            <input class="form-control" type="text" id="username" v-model="formDataRef.username" />
        </div>
        <div class="mb-2" :class="{ 'has-error2': formDataRef.email && !isValidEmail(formDataRef.email)}">
            <label for="email">Email: </label>
            <input class="form-control" id="email" v-model="formDataRef.email" type="email" />
        </div>
        <button @click="submitForm" type="submit">Submit</button>
    </div>
</template>

<style>
.has-error2 input[type="email"] {
    border-color: red;
}
</style>