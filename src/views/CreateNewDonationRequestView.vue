<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const formDataRef = ref({
    "date": "",
    "location": ""
});

const urlRef = ref(null);
const authRef = ref(true);
const methodRef = ref('POST');
const store = useApplicationStore();


const userIdRef = ref(null);

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const isValidText = (text) => {
    // Regular expression to match only text with spaces and no numbers-->
    return /^[A-Za-z\s]*$/.test(text);
};

onMounted(() => {
    userIdRef.value = store.userData.id;
    urlRef.value = backendEnvVar+'/api/donationrequest/' + userIdRef.value + '/new';
});


const submitForm = async () =>{
    if (formDataRef.value.location && !isValidText(formDataRef.value.location)) {
        alert('Provide a valid email!');
        return;
    }
    await performRequest();

};
</script>


<template>
    <div class="mb-4">
        <tbody v-if="loading">
        <tr>
            <td colspan="5">Loading...</td>
        </tr>
        </tbody>
    </div>
    <div>
        <div v-if="data && data.success" class="alert alert-success">
            Donation Request Created!
        </div>
        <div v-else-if="data && data.error" class="alert alert-danger">
            Creating new Donation Request Failed. Please try again.
        </div>
    </div>
    <div>
        <div class="mb-2">
            <label for="date">Date: </label>
            <input class="form-control" type="date" id="date" v-model="formDataRef.date"/>
        </div>
        <div class="mb-2" :class="{ 'has-error': formDataRef.location && !isValidText(formDataRef.location)}">
            <label for="location">Location: </label>
            <input class="form-control" id="location" v-model="formDataRef.location" type="text" />
        </div>
        <button @click="submitForm" type="submit">Submit</button>
    </div>
</template>

<style>
.has-error input[type="text"] {
    border-color: red;
}
</style>