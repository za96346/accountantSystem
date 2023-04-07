/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import { Decrypt } from '@/method/aes';
import FullMessage from '@/method/notice';

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
        Loaded(state, payload) {
            state.isLoading = payload;
        },

        // 要設定 金鑰
        updateDonationTrans(state, payload) {
            const key = localStorage.getItem('cryptKey');
            const iv = localStorage.getItem('cryptIV');
            // state.donationTrans = payload;
            state.donationTrans = payload?.map((item) => {
                let decode;
                try {
                    decode = Decrypt(item?.creditNumber, key, iv);
                } catch {
                    FullMessage.error('金鑰驗證錯誤，請回到主頁去認是否正確');
                    return;
                }
                return {
                    ...item,
                    creditNumber: decode,
                };
            });
        },
        // 清除
        clearDonationTrans(state, payload) {
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

        // 清除
        clearDonationTrans: (context) => {
            context.commit('clearDonationTrans', []);
        },
    },
    getters: {
        user: () => {},
    },
});
export default store;
