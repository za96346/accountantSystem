import axios from 'axios'
import FullMessage from './notice';

const clearAll = () => {};

class ApiControl {
    constructor () {
        this.baseUrl = 'http://127.0.0.1:4500'
        this.route = {
            donationTrans: 'donationTrans/data',
        };
    }

    async GET ({
        url,
        params = {},
        successShow = true,
        FailShow = true
    }) {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${this.baseUrl}/${url}`, { params: { ...params, token } })
            if (successShow) {
                void FullMessage.success(res.data.message)
            }
            return {
                ...res.data,
                status: true
            }
        } catch (e) {
            if (e.response.status >= 510) {
                clearAll()
            }
            if (FailShow) {
                void FullMessage.error(e.response.data.message)
            }
            return {
                ...e.response.data,
                status: false
            }
        }
    }

    async POST ({
        url,
        body,
        params = {},
        successShow = true,
        FailShow = true
    }) {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(`${this.baseUrl}/${url}`, body, {
                headers: {
                    token
                },
                params: { ...params }
            })
            if (successShow) {
                void FullMessage.success(res.data.message)
            }
            return {
                ...res.data,
                status: true
            }
        } catch (e) {
            if (e.response?.status >= 510) {
                clearAll()
            }
            if (FailShow) {
                void FullMessage.error(e.response?.data?.message)
            }
            return {
                ...e.response?.data,
                status: false
            }
        }
    }

    async PUT ({
        url,
        body,
        params = {},
        successShow = true,
        FailShow = true
    }) {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(`${this.baseUrl}/${url}`, body, {
                headers: {
                    token
                },
                params: { ...params }
            })
            if (successShow) {
                void FullMessage.success(res.data.message)
            }
            return {
                ...res.data,
                status: true
            }
        } catch (e) {
            if (e.response.status >= 510) {
                clearAll()
            }
            if (FailShow) {
                void FullMessage.error(e.response.data.message)
            }
            return {
                ...e.response.data,
                status: false
            }
        }
    }

    async DELETE ({
        url,
        params = {},
        successShow = true,
        FailShow = true
    }) {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete(`${this.baseUrl}/${url}`, {
                headers: {
                    token
                },
                params: { ...params }
            })
            if (successShow) {
                void FullMessage.success(res.data.message)
            }
            return {
                ...res.data,
                status: true
            }
        } catch (e) {
            if (e.response.status >= 510) {
                clearAll()
            }
            if (FailShow) {
                void FullMessage.error(e.response.data.message)
            }
            return {
                ...e.response.data,
                status: false
            }
        }
    }

    // 扣款管理
    async getDonationTrans (data) {
        return this.GET({
            url: this.route.donationTrans,
            params: data
        })
    }
    async updateDonationTrans (data) {
        return this.POST({
            url: this.route.donationTrans,
            body: data
        })
    }
    async createDonationTrans (data) {
        return this.PUT({
            url: this.route.donationTrans,
            body: data
        })
    }
    async deleteDonationTrans (data) {
        return this.DELETE({
            url: this.route.donationTrans,
            params: data
        })
    }
}
export default new ApiControl()
