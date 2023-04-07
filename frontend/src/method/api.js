import axios from 'axios';
import store from '@/vueX/store';
import FullMessage from './notice';

const clearAll = () => {
    setTimeout(() => {
        window.location.href = '/login';
        localStorage.removeItem('token');
    }, 1000);
};

class ApiControl {
    constructor() {
        console.log(process.env.VUE_APP_API);
        this.baseUrl = process.env.VUE_APP_API;
        this.route = {
            donationTrans: 'donationTrans/data',
            dwnTrans: 'donationTrans/csv',
            login: 'entry/login',
        };
        this.getDonationTrans = this.getDonationTrans.bind(this);
        this.updateDonationTrans = this.updateDonationTrans.bind(this);
        this.createDonationTrans = this.createDonationTrans.bind(this);
        this.deleteDonationTrans = this.deleteDonationTrans.bind(this);
        this.downloadDonationTransCSV = this.downloadDonationTransCSV.bind(this);
    }

    async GET({
        url,
        params = {},
        successShow = true,
        FailShow = true,
    }) {
        store.commit('Loaded', true);
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${this.baseUrl}/${url}`, { params: { ...params, token } });
            if (successShow) {
                FullMessage.success(res.data.message);
            }
            store.commit('Loaded', false);
            return {
                ...res.data,
                status: true,
            };
        } catch (e) {
            if (e.response.status === 401) {
                clearAll();
            }
            if (FailShow) {
                FullMessage.error(e.response.data.message);
            }
            store.commit('Loaded', false);
            return {
                ...e.response.data,
                status: false,
            };
        }
    }

    async POST({
        url,
        body,
        params = {},
        successShow = true,
        FailShow = true,
    }) {
        store.commit('Loaded', true);
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(`${this.baseUrl}/${url}`, body, {
                headers: {
                    token,
                },
                params: { ...params },
            });
            if (successShow) {
                FullMessage.success(res.data.message);
            }
            store.commit('Loaded', false);
            return {
                ...res.data,
                status: true,
            };
        } catch (e) {
            if (e.response.status === 401) {
                clearAll();
            }
            if (FailShow) {
                FullMessage.error(e.response?.data?.message);
            }
            store.commit('Loaded', false);
            return {
                ...e.response?.data,
                status: false,
            };
        }
    }

    async PUT({
        url,
        body,
        params = {},
        successShow = true,
        FailShow = true,
    }) {
        store.commit('Loaded', true);
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(`${this.baseUrl}/${url}`, body, {
                headers: {
                    token,
                },
                params: { ...params },
            });
            if (successShow) {
                FullMessage.success(res.data.message);
            }
            store.commit('Loaded', false);
            return {
                ...res.data,
                status: true,
            };
        } catch (e) {
            if (e.response.status === 401) {
                clearAll();
            }
            if (FailShow) {
                FullMessage.error(e.response.data.message);
            }
            store.commit('Loaded', false);
            return {
                ...e.response.data,
                status: false,
            };
        }
    }

    async DELETE({
        url,
        params = {},
        successShow = true,
        FailShow = true,
    }) {
        store.commit('Loaded', true);
        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete(`${this.baseUrl}/${url}`, {
                headers: {
                    token,
                },
                params: { ...params },
            });
            if (successShow) {
                FullMessage.success(res.data.message);
            }
            store.commit('Loaded', false);
            return {
                ...res.data,
                status: true,
            };
        } catch (e) {
            if (e.response.status === 401) {
                clearAll();
            }
            if (FailShow) {
                FullMessage.error(e.response.data.message);
            }
            store.commit('Loaded', false);
            return {
                ...e.response.data,
                status: false,
            };
        }
    }

    // 扣款管理
    async getDonationTrans() {
        const params = { ...store.state.donationSearchBar };
        const res = await this.GET({
            url: this.route.donationTrans,
            params,
            successShow: false,
        });
        if (res.status) {
            store.commit('updateDonationTrans', res.data);
        }
    }

    async updateDonationTrans(data) {
        const res = await this.POST({
            url: this.route.donationTrans,
            body: data,
        });
        return res.status;
    }

    async createDonationTrans(data) {
        const res = await this.PUT({
            url: this.route.donationTrans,
            body: data,
        });
        return res.status;
    }

    async deleteDonationTrans(data) {
        const res = await this.DELETE({
            url: this.route.donationTrans,
            params: data,
        });
        return res.status;
    }

    // 下載 扣款管理
    async downloadDonationTransCSV() {
        // 戴上 crypto key iv
        const cryptKey = localStorage.getItem('cryptKey');
        const cryptIV = localStorage.getItem('cryptIV');
        const params = {
            ...store.state.donationSearchBar,
            cryptIV,
            cryptKey,
        };
        const res = await this.GET({
            url: this.route.dwnTrans,
            params,
        });

        const link = document.createElement('a');
        link.href = res.data;
        link.download = 'customers.csv';
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 0);
        return res;
    }

    // 登入
    async login(data) {
        const res = await this.POST({
            url: this.route.login,
            body: data,
        });
        localStorage.setItem('token', res?.token);
        if (res.status) {
            store.commit('setUser', res.selfInfo);
            window.location.href = '/home';
        }
        return res;
    }
}
export default new ApiControl();
