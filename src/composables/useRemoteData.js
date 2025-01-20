import { ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js';

const store = useApplicationStore();

export function useRemoteData(urlRef, authRef, methodRef = ref("GET"), bodyRef = ref(null),) {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const performRequest = () => {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (authRef.value === true) {
            headers['Authorization'] = 'Bearer ' + store.userData.accessToken;
        }
        const config = {
            method: methodRef.value,
            headers: headers,
        };

        if (bodyRef.value !== null) {
            config.body = JSON.stringify(bodyRef.value);
        }

        fetch(urlRef.value, config)
            .then((response) => {
                if (response.ok) {
                    // Check if the response is JSON
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        return response.json().then((responseData) => {
                            data.value = responseData;
                        });
                    } else {
                        // If the response is not JSON, treat it as plain text
                        return response.text().then((text) => {
                            data.value = { success: true, message: text };
                        });
                    }

                } else if (response.status === 401) {
                    // Handle unauthorized response
                    return response.json().then((errorData) => {
                        console.error("Error:", errorData.message); // Log error for debugging
                        if (errorData.redirect) {
                            window.location.href = errorData.redirect; // Redirect to login
                        } else {
                            window.location.href = '/login'; // Default to login page
                        }
                    });
                } else {
                    return response.text().then((text) => {
                        data.value = { error: true, message: text };
                    });
                    // throw new Error('Network response was not ok');
                }
            })
            .catch((err) => {
                error.value = err;
            })
            .finally(() => {
                loading.value = false;
            });
    };

    return { data, error, loading, performRequest };
}