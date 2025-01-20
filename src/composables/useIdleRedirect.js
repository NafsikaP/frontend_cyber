import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

export function useIdleRedirect(idleTimeMs = 60000) { // Default to 5 minutes
    let timeoutId;
    const router = useRouter();
    const { clearUserData } = useApplicationStore();
    const resetTimer = () => {
        // Check if the current route is the login page
        const currentRoute = router.currentRoute.value;

        if (currentRoute.path === '/login') {
            return;
        }

        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Set a new timeout
        timeoutId = setTimeout(() => {
            // Alert the user
            alert('You have been idle for too long. Redirecting to login.');

            // Clear user data
            clearUserData();

            // Redirect to login
            router.push({ name: 'login' }).catch((err) => {
                console.error('Failed to redirect to login:', err);
            });
        }, idleTimeMs);
    };

    const setupListeners = () => {
        // Listen for user interactions
        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keydown', resetTimer);
        document.addEventListener('click', resetTimer);
        document.addEventListener('scroll', resetTimer);

        // Initialize the timer
        resetTimer();
    };

    const cleanupListeners = () => {
        // Remove event listeners
        document.removeEventListener('mousemove', resetTimer);
        document.removeEventListener('keydown', resetTimer);
        document.removeEventListener('click', resetTimer);
        document.removeEventListener('scroll', resetTimer);

        // Clear the timeout
        clearTimeout(timeoutId);
    };

    onMounted(setupListeners);
    onUnmounted(cleanupListeners);
}
