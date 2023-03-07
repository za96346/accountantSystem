<template>
    <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
        <a-form-item
            label="商店訂單編號"
            name="productNum"
        >
            <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 20, span: 16 }">
            <a-button type="primary" html-type="submit">搜尋</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { reactive } from 'vue';
import { mapGetters } from 'vuex';
import store from '@/vueX/store';

const computed = {
    ...mapGetters([
        'isLoading',
        'donationTrans',
    ]),
};

const setup = () => {
    const formState = reactive({
        username: '',
        password: '',
        remember: true,
    });
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values) => {
        store.commit('setDonationTrans', values);
        console.log('Success:', computed.donationTrans);
    };

    return {
        formState,
        onFinish,
        onFinishFailed,
    };
};

export default {
    name: 'SearchBar',
    setup,
    computed,
    // props: {
    //     msg: String,
    //     text: String,
    // },

};
</script>
<style lang="scss" scoped>
</style>
