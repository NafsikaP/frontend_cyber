<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const userIdRef = ref(null);

onMounted(() => {
    userIdRef.value = route.params.id;
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'admin-users' }">
                            Back to Users
                        </RouterLink>
                        <h1 class="fs-3">User #{{ userIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <RouterLink
                            class="nav-link"
                            :to="{ name: 'admin-user', params: { id: userIdRef } }"
                        ></RouterLink>
                        <RouterLink
                            class="nav-link"
                            :to="{ name: 'user-edit', params: { id: userIdRef } }"
                        ></RouterLink>
                    </div>

                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>