/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

// 定義一個新的 Vue Store
const store = createStore({
    state: {
        isLoading: false,
        donationTrans: [],
    },
    mutations: {
        // 將state設定為參數
        Loaded(state) {
            state.getters.isLoading = !state.getters.isLoading;
        },
        setDonationTrans(state, payload) {
            state.getters.donationTrans = payload;
        },
    },
    getters: {

    },
    actions: {
        addToFavorites(context, payload) {
            const { donationTrans } = context.state;
            favorites.push(payload);
            context.commit('UPDATE_FAVORITES', favorites);
        },
    },
});
export default store;
