<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useIdleRedirect } from '@/composables/useIdleRedirect';
const { loadUserData } = useApplicationStore();

useIdleRedirect(60000);

onBeforeMount(() => {
    loadUserData();
});
</script>

<template>
    <AppHeader />
    <RouterView />
    <AppFooter />
</template>