<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
const backendEnvVar = import.meta.env.VITE_BACKEND;
const formDataRef = ref({
    "username":"",
    "email":"",
    "password": ""
});

const urlRef = ref(backendEnvVar+'/api/admin/user/new');
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
};
const onSubmit = async () => {
    if (formDataRef.value.email && !isValidEmail(formDataRef.value.email)) {
        alert('Provide a valid email!');
        return;
    }
    await performRequest();
};
</script>

<template>
    <div class="container mb-4">
        <h1>New User</h1>
    </div>
    <!--    <div>-->
    <!--        <pre>{{ data }}</pre>-->
    <!--    </div>-->
    <div>
        <div v-if="data && data.success" class="alert alert-success">
            Form submitted successfully!
        </div>
        <div v-else-if="data && data.error" class="alert alert-danger">
            Form submission failed. Please try again.
        </div>
    </div>
    <div class="container mb-4">
        <div class="mb-2">
            <label for="username">Username</label>
            <input class="form-control" id="username" v-model="formDataRef.username" type="text" />
        </div>
        <div class="mb-2" :class="{ 'has-error2': formDataRef.email && !isValidEmail(formDataRef.email)}">
            <label for="email">Email: </label>
            <input class="form-control" id="email" v-model="formDataRef.email" type="email" />
        </div>
        <div class="mb-2">
            <label for="password">Password</label>
            <input class="form-control" id="password" v-model="formDataRef.password" type="text" />
        </div>
        <div class="">
            <button class="btn btn-primary" @click="onSubmit" type="button">Submit Form</button>
        </div>
    </div>
</template>


<style>
.has-error2 input[type="email"] {
    border-color: red;
}
</style>