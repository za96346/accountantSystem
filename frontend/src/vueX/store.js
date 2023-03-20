/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

// 定義一個新的 Vue Store
const store = createStore({
    state: {
        isLoading: false,
        donationTrans: [],
        donationSearchBar: {},
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
        setDonationSearchBar(state, payload) {
            state.donationSearchBar = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        setDonationSearchBar: (context, statue) => {
            context.commit('setDonationSearchBar', statue);
        },
        setUser: (context, statue) => {
            context.commit('setUser', statue);
        },
    },
    getters: {
        user: () => {},
    },
});
export default store;
