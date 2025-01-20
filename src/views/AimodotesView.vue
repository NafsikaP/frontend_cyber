<script setup>
// hi
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;
const urlRef = ref(backendEnvVar+'/api/aimodotis');
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
                        <h1 class="fs-3">Aimodotes</h1>
                    </div>
                    <div>
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
                                <!--                                <td>-->
                                <!--                                    <RouterLink-->
                                <!--                                        :to="{-->
                                <!--                                                name: 'bloodtest-details',-->
                                <!--                                                params: { id: aimodotis.id }-->
                                <!--                                            }"-->
                                <!--                                    >Display</RouterLink-->
                                <!--                                    >-->
                                <!--                                </td>-->
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>