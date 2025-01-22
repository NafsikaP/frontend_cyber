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

const formDataRef = ref({
    "fname": "",
    "lname": "",
    "email": "",
    "phone": "",
    "sex": "",
    "last_donation": "",
    "age": "",
    "location": "",
    "amka": ""
});
const urlRef2 = ref(null);
const authRef2 = ref(true);
const urlRef = ref(backendEnvVar+'/api/aimodotis');
const methodRef2 = ref('POST');

const authRef = ref(true);
const {data, loading, performRequest} = useRemoteData(urlRef, authRef);
const updateAimodotisRemoteData = useRemoteData(urlRef2,authRef2,methodRef2, formDataRef);


onMounted(() => {
    performRequest();
});

const isValidPhoneNumber = (phoneNumber) => {
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
    return numericPhoneNumber.length === 10 && /^\d+$/.test(numericPhoneNumber);
};
const isValidAMKA = (amka) => {
    return amka.length === 11 && /^\d+$/.test(amka);
};
const isValidAge = (age) => {
    return age >= 18 && age <= 65;
};
const isValidSex = (sex) => {
    return sex === 'F' || sex === 'M';
};
const isValidText = (text) => {
    // Regular expression to match only text with spaces and no numbers
    return /^[A-Za-z\s]*$/.test(text);
};
const submitForm = () =>{
    if (formDataRef.value.phone && !isValidPhoneNumber(formDataRef.value.phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    if (formDataRef.value.amka && !isValidAMKA(formDataRef.value.amka)) {
        alert('Please enter a valid 11-digit AMKA.');
        return;
    }
    if (formDataRef.value.age && !isValidAge(formDataRef.value.age)) {
        alert('You should be above 18 and below 65 to become a Blood Donor!');
        return;
    }
    if (formDataRef.value.sex && !isValidSex(formDataRef.value.sex)) {
        alert('Enter either M for Male or F for Female!');
        return;
    }
    if (formDataRef.value.location && !isValidText(formDataRef.value.location)) {
        alert('Location should not contain numbers!');
        return;
    }
    if (formDataRef.value.fname && !isValidText(formDataRef.value.fname)) {
        alert('First name should not contain numbers!');
        return;
    }
    if (formDataRef.value.lname && !isValidText(formDataRef.value.lname)) {
        alert('Last name should not contain numbers!');
        return;
    }
    urlRef2.value = backendEnvVar+'/api/aimodotis/update/' + aimodotisIdRef.value;
    updateAimodotisRemoteData.performRequest();
    alert('Your profile was updated successfully!');

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
                        >Home</RouterLink
                        >
                        <h1 class="fs-3">Blood Donor #{{ aimodotisIdRef }}</h1>
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
                                    <td>{{updateAimodotisId(aimodotis.id)}}</td>
                                </template>
                            </tr>
                            </tbody>
                        </table>
                        <div>
                            <p>You can update any field</p>
                            <div class="mb-2" :class="{ 'has-error': formDataRef.fname && !isValidText(formDataRef.fname) }">
                                <label class="mb-1" for="fname">First Name: </label>
                                <input type="text" class="form-control" id="fname" v-model="formDataRef.fname"/>
                            </div>
                            <div class="mb-2" :class="{ 'has-error': formDataRef.lname && !isValidText(formDataRef.lname) }">
                                <label class="mb-1" for="lname">Last Name: </label>
                                <input type="text" class="form-control" id="lname" v-model="formDataRef.lname"/>
                            </div>
                            <div class="mb-2" :class="{ 'has-error': formDataRef.phone && !isValidPhoneNumber(formDataRef.phone) }">
                                <label class="mb-1" for="phone">Phone: </label>
                                <input type="text" class="form-control" id="phone" v-model="formDataRef.phone"/>
                            </div>
                            <div class="mb-2" :class="{ 'has-error': formDataRef.amka && !isValidAMKA(formDataRef.amka) }">
                                <label class="mb-1" for="amka">AMKA: </label>
                                <input type="text" class="form-control" id="amka" v-model="formDataRef.amka"/>
                            </div>
                            <div class="mb-2" :class="{ 'has-error': formDataRef.sex && !isValidSex(formDataRef.sex) }">
                                <label class="mb-1" for="sex">Sex: </label>
                                <input type="text" class="form-control" id="sex" v-model="formDataRef.sex"/>
                            </div>
                            <div class="mb-2" :class="{ 'has-error1': formDataRef.age && !isValidAge(formDataRef.age) }">
                                <label class="mb-1" for="age">Age: </label>
                                <input type="number" class="form-control" id="age" v-model="formDataRef.age"/>
                            </div>
                            <div class="mb-2" :class="{ 'has-error': formDataRef.location && !isValidText(formDataRef.location) }">
                                <label class="mb-1" for="location">Location: </label>
                                <input type="text" class="form-control" id="location" v-model="formDataRef.location"/>
                            </div>
                            <button @click="submitForm" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.has-error input[type="text"] {
    border-color: red;
}
.has-error1 input[type="number"] {
    border-color: red;
}
</style>
