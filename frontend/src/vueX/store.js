/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import api from '@/method/api';

// 定義一個新的 Vue Store
const store = createStore({
    state: {
        isLoading: false,
        donationTrans: [],
        user: {
            token: '',
        },
    },
    mutations: {
        // 將state設定為參數
        Loaded(state) {
            state.getters.isLoading = !state.getters.isLoading;
        },
        updateDonationTrans(state, payload) {
            state.donationTrans = payload;
        },
    },
    actions: {
        getDonationTrans: async (context, status) => {
            const res = await api.getDonationTrans({});
            context.commit('updateDonationTrans', res.data);
        },
    },
    getters: {
        user: () => {},
    },
});
export default store;
