/* eslint-disable import/no-extraneous-dependencies */
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './page/Login/Index.vue';
import HomePage from './page/Home/Index.vue';
import DonationTransPage from './page/DonationTrans/Index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', name: 'login', component: LoginPage },
        { path: '/home', name: 'home', component: HomePage },
        { path: '/donationTransManage', name: 'donationTransManage', component: DonationTransPage },
    ],
});

export default router;
