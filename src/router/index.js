import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useApplicationStore } from '@/stores/application.js';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            // component: HomeView,
            component: () => import('../views/HomeView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/aimodotes',
            name: 'aimodotes',
            component: () => import('../views/AimodotesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/appforms/new',
            name: 'appform-new',
            component: () => import('../views/CreateAppFormView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/appforms/secretary/pending',
            name: 'appforms-pending',
            component: () => import('../views/ShowPendingAppFormsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/appforms/secretary/pending/:id',
            name: 'appform-pending',
            component: () => import('../views/ShowPendingAppFormView.vue'),
            meta: { requiresAuth: true },
            children:[
                {
                    path: '',
                    name: 'appform-pending-details',
                    component: () => import('../views/ShowPendingAppFormDetailsView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/confirmcontactinfo',
            name: 'confirm-contact-info',
            component: () => import('../views/ConfirmContactInfoView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin',
            name: 'admin-users',
            component: () => import('../views/UsersView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/users/:id',
            name: 'admin-user',
            component: () => import('../views/UserView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'user-details',
                    component: () => import('../views/UserRolesView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/admin/users/:id/edit',
                    name: 'user-edit',
                    component: () => import('../views/EditUserView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/admin/user/new',
            name: 'admin-newuser',
            component: () => import('../views/CreateNewUserView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/secretary/donationrequests',
            name: 'show-donation-requests',
            component: () => import('../views/ShowDonationRequestsView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/secretary/donationrequests/create',
            name: 'create-donation-request',
            component: () => import('../views/CreateNewDonationRequestView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/donationrequest/available',
            name: 'available-donation-request',
            component: () => import('../views/ShowAvailableDonationRequestView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/aimodotis/edit',
            name: 'edit-aimodotis-profile',
            component: () => import('../views/EditAimodotisProfile.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/aimodotis/mydonations',
            name: 'aimodotis-mydonations',
            component: () => import('../views/MyDonationsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/aimodotis/editbloodtest',
            name: 'aimodotis-bloodtest',
            component: () => import('../views/EditBloodTest.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/LogoutView.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        next('/login');
    } else {
        next();
    }
});

export default router;