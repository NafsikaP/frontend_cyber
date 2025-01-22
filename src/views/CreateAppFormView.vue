<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
const backendEnvVar = import.meta.env.VITE_BACKEND;
const formDataRef = ref({
    "aimodotis":{
        "fname": "",
        "lname": "",
        "email": "",
        "phone": "",
        "sex": "",
        "last_donation": "",
        "age": "",
        "location": "",
        "amka": ""
    },
    "bloodTest":{
        "date": "",
        "details": "",
        "bloodtype": ""
    }
});

const urlRef = ref(backendEnvVar+'/api/appform/new');
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

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

const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];

const isValidBloodType = (bloodType) => {
    return validBloodTypes.includes(bloodType.toUpperCase());
};
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
};

const onSubmit = async() => {
    if (formDataRef.value.aimodotis.phone && !isValidPhoneNumber(formDataRef.value.aimodotis.phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    if (formDataRef.value.aimodotis.amka && !isValidAMKA(formDataRef.value.aimodotis.amka)) {
        alert('Please enter a valid 11-digit SSN.');
        return;
    }
    if (formDataRef.value.aimodotis.age && !isValidAge(formDataRef.value.aimodotis.age)) {
        alert('You should be above 18 and below 65 to become a Blood Donor!');
        return;
    }
    if (formDataRef.value.aimodotis.sex && !isValidSex(formDataRef.value.aimodotis.sex)) {
        alert('Enter either M for Male or F for Female!');
        return;
    }
    if (formDataRef.value.aimodotis.location && !isValidText(formDataRef.value.aimodotis.location)) {
        alert('Location should not contain numbers!');
        return;
    }
    if (formDataRef.value.aimodotis.fname && !isValidText(formDataRef.value.aimodotis.fname)) {
        alert('First name should not contain numbers!');
        return;
    }
    if (formDataRef.value.aimodotis.lname && !isValidText(formDataRef.value.aimodotis.lname)) {
        alert('Last name should not contain numbers!');
        return;
    }
    if (formDataRef.value.bloodTest.bloodtype && !isValidBloodType(formDataRef.value.bloodTest.bloodtype)) {
        alert('Valid blood types: A+, A-, B+, B-, AB+, AB-, 0+, 0-');
        return;
    }
    if (formDataRef.value.aimodotis.email && !isValidEmail(formDataRef.value.aimodotis.email)) {
        alert('Provide a valid email!');
        return;
    }
    await performRequest();
};
</script>

<template>
    <div class="container mb-4">
        <h1>New Aimodotis</h1>
    </div>
    <!--    <div>-->
    <!--        <pre>{{ data }}</pre>-->
    <!--    </div>-->
    <div>
        <div v-if="data && data.success" class="alert alert-success">
            App Form Submitted Successfully!
        </div>
        <div v-else-if="data && data.error" class="alert alert-danger">
            User's email doesnt match with the App Form or aimodotis already exists.
        </div>
    </div>
    <div class="container mb-4">
        <div class="mb-2" :class="{ 'has-error': formDataRef.aimodotis.fname && !isValidText(formDataRef.aimodotis.fname) }">
            <label for="fname">First Name</label>
            <input class="form-control" id="fname" v-model="formDataRef.aimodotis.fname" type="text" />
        </div>
        <div class="mb-2" :class="{ 'has-error': formDataRef.aimodotis.lname && !isValidText(formDataRef.aimodotis.lname) }">
            <label for="lname">Last Name</label>
            <input class="form-control" id="lname" v-model="formDataRef.aimodotis.lname" type="text" />
        </div>
        <div class="mb-2" :class="{ 'has-error2': formDataRef.aimodotis.email && !isValidEmail(formDataRef.aimodotis.email) }">
            <label for="email">Email</label>
            <input class="form-control" id="email" v-model="formDataRef.aimodotis.email" type="email" />
        </div>
        <div class="mb-2" :class="{ 'has-error': formDataRef.aimodotis.phone && !isValidPhoneNumber(formDataRef.aimodotis.phone) }">
            <label for="phone">Phone</label>
            <input class="form-control" id="phone" v-model="formDataRef.aimodotis.phone" type="text" />
        </div>
        <div class="mb-2" :class="{ 'has-error': formDataRef.aimodotis.sex && !isValidSex(formDataRef.aimodotis.sex) }">
            <label for="sex">Sex</label>
            <input class="form-control" id="sex" v-model="formDataRef.aimodotis.sex" type="text" />
        </div>
        <div class="mb-2" :class="{ 'has-error': formDataRef.aimodotis.location && !isValidText(formDataRef.aimodotis.location) }">
            <label for="location">Location</label>
            <input class="form-control" id="location" v-model="formDataRef.aimodotis.location" type="text" />
        </div>
        <div class="mb-2">
            <label for="lastdonation">Last Donation </label>
            <input class="form-control" id="lastdonation" v-model="formDataRef.aimodotis.last_donation" type="date" />
        </div>
        <div class="mb-2" :class="{ 'has-error1': formDataRef.aimodotis.age && !isValidAge(formDataRef.aimodotis.age) }">
            <label for="age">Age</label>
            <input class="form-control" id="age" v-model="formDataRef.aimodotis.age" type="number" />
        </div>
        <div class="mb-2" :class="{ 'has-error': formDataRef.aimodotis.amka && !isValidAMKA(formDataRef.aimodotis.amka) }">
            <label for="amka">SSN</label>
            <input class="form-control" id="amka" v-model="formDataRef.aimodotis.amka" type="text" />
        </div>
        <div class="mb-2">
            <label for="date">Blood Test Date</label>
            <input class="form-control" id="date" v-model="formDataRef.bloodTest.date" type="date" />
        </div>
        <div class="mb-2">
            <label for="details">Blood Test Details</label>
            <input class="form-control" id="details" v-model="formDataRef.bloodTest.details" type="text" />
        </div>
        <div class="mb-2" :class="{ 'has-error': formDataRef.bloodTest.bloodtype && !isValidBloodType(formDataRef.bloodTest.bloodtype) }">
            <label class="mb-1" for="bloodType">Blood Type: </label>
            <input type="text" class="form-control" id="bloodType" v-model="formDataRef.bloodTest.bloodtype"/>
        </div>
        <div class="">
            <button class="btn btn-primary" @click="onSubmit" type="button">Submit Form</button>
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
.has-error2 input[type="email"] {
    border-color: red;
}
</style>