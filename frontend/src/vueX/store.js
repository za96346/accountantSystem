/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import api from '@/method/api';
import { donationTransValue } from '@/static';

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
        // donationTrans
        getDonationTrans: async (context, status) => {
            const res = await api.getDonationTrans(status);
            context.commit('updateDonationTrans', res.data);
        },
        createDonationTrans: async (context, status) => {
            console.log(status)
            const res = await api.createDonationTrans(status);
        }, 
    },
    getters: {
        user: () => {},
    },
});
export default store;
