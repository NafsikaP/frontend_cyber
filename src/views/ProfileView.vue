<script setup>
import { useApplicationStore } from '@/stores/application.js';
const { userData } = useApplicationStore();
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Profile</h1>
                    </div>
                    <div>
                        <table class="table">
                            <tbody v-if="loading">
                            <tr>
                                <td colspan="2">Loading...</td>
                            </tr>
                            </tbody>
                            <tbody v-if="userData">
                            <tr>
                                <th>ID</th>
                                <td>{{ userData.id }}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{{ userData.username }}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{{ userData.email }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>