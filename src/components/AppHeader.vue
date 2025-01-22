<script setup>
import { RouterLink } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
const applicationStore = useApplicationStore();
</script>

<template>
    <header class="text-bg-dark-red">
        <div class="container">
            <div class="d-flex flex-wrap justify-content-center py-2 px-3">
                <a
                    href="/"
                    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                >
                    <span class="fs-5 fw-bolder text-white">Blood Donation Online</span>
                </a>
                <ul class="nav nav-pills">
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
                        <router-link :to="{ name: 'home' }" class="nav-link text-white"
                        >Home</router-link
                        >
                    </li>
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true" >
                        <div class="nav-item dropdown" v-if="!(applicationStore.userRole.includes('aimodotis') && applicationStore.userRole.includes('user'))">
                            <a
                                class="nav-link dropdown-toggle text-white"
                                href="#"
                                id="aimodotisDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Blood Donors
                            </a>
                            <div class="dropdown-menu" aria-labelledby="aimodotisDropdown">
                                <div v-if="applicationStore.userRole.includes('admin') || applicationStore.userRole.includes('secretary')">
                                    <router-link :to="{name:'aimodotes'}" class="dropdown-item">
                                        Show Blood Donors
                                    </router-link>
                                </div>
                                <div v-if="!applicationStore.userRole.includes('admin') && !applicationStore.userRole.includes('secretary') && !applicationStore.userRole.includes('aimodotis')">
                                    <router-link :to="{name:'confirm-contact-info'}" class="dropdown-item">
                                        Confirm Contact Info
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && !(applicationStore.userRole.includes('aimodotis') && applicationStore.userRole.includes('user')  || applicationStore.userRole.includes('admin'))">
                        <div class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle text-white"
                                href="#"
                                id="appformDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Application Form
                            </a>
                            <div class="dropdown-menu" aria-labelledby="appformDropdown">
                                <div v-if="!applicationStore.userRole.includes('admin') && !applicationStore.userRole.includes('secretary') && !applicationStore.userRole.includes('aimodotis')">
                                    <router-link :to="{name:'appform-new'}" class="dropdown-item">
                                        Become a blood donor!
                                    </router-link>
                                </div>
                                <div v-if="applicationStore.userRole.includes('secretary')">
                                    <router-link :to="{name:'appforms-pending'}" class="dropdown-item">
                                        Pending Applications
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userRole.includes('secretary') || applicationStore.userRole.includes('aimodotis')">
                        <div class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle text-white"
                                href="#"
                                id="donationrequestDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Donation Requests
                            </a>
                            <div class="dropdown-menu" aria-labelledby="donationrequestDropdown">
                                <div v-if="applicationStore.userRole.includes('aimodotis')">
                                    <router-link :to="{name:'available-donation-request'}" class="dropdown-item">
                                        Available Donations
                                    </router-link>
                                </div>
                                <div v-if="applicationStore.userRole.includes('secretary')">
                                    <router-link :to="{name:'show-donation-requests'}" class="dropdown-item" >
                                        Show/Add Donation Requests
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userRole.includes('admin')">
                        <div class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle text-white"
                                href="#"
                                id="adminDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Admin
                            </a>
                            <div class="dropdown-menu" aria-labelledby="adminDropdown">
                                <router-link :to="{name:'admin-users'}" class="dropdown-item">
                                    Edit Users
                                </router-link>
                                <router-link :to="{name:'admin-newuser'}" class="dropdown-item">
                                    New User
                                </router-link>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true" >
                        <div class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle text-white"
                                href="#"
                                id="profileDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                My Profile <span style="font-size: 10px"
                            >({{ applicationStore.userData?.username }})</span
                            >
                            </a>
                            <div class="dropdown-menu" aria-labelledby="profileDropdown">
                                <div>
                                    <router-link :to="{ name: 'profile' }" class="dropdown-item"
                                    >Profile
                                    </router-link>
                                </div>
                                <div v-if="applicationStore.userRole.includes('aimodotis')">
                                    <router-link :to="{name:'edit-aimodotis-profile'}" class="dropdown-item">
                                        Edit Profile
                                    </router-link>
                                </div>
                                <div v-if="applicationStore.userRole.includes('aimodotis')">
                                    <router-link :to="{name:'aimodotis-mydonations'}" class="dropdown-item">
                                        My Donations
                                    </router-link>
                                </div>
                                <div v-if="applicationStore.userRole.includes('aimodotis')">
                                    <router-link :to="{name:'aimodotis-bloodtest'}" class="dropdown-item">
                                        Update Blood Test
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
                        <router-link :to="{ name: 'login' }" class="nav-link text-white"
                        >Login</router-link
                        >
                    </li>
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
                        <router-link :to="{ name: 'logout' }" class="nav-link text-white"
                        >Logout</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style scoped>
.text-bg-dark-red {
    background-color: darkred;
    color: white;
}
</style>