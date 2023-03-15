<template>
    <a-form
        :model="formState"
        name="basic"
        class="row w-100"
        autocomplete="off"

        @finish="getDonationTrans"
    >
        <a-form-item
            class="col-lg-4 col-md-6"
            label="訂單編號"
            name="id"
        >
            <a-input v-model:value="formState.id" />
        </a-form-item>
        <a-form-item
            class="col-lg-4 col-md-6"
            label="商品名稱"
            name="productName"
        >
            <a-input v-model:value="formState.productName" />
        </a-form-item>
        <a-form-item
            class="col-lg-4 col-md-6"
            label="付款人姓名"
            name="consumerName"
        >
            <a-input v-model:value="formState.consumerName" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 20, span: 16 }">
            <a-button type="primary" html-type="submit">搜尋</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import {
    reactive, watch, onMounted
} from 'vue';
import api from '@/method/api';
import store from '@/vueX/store';

const setup = () => {
    const formState = reactive({
        id: '',
        consumerName: '',
        productName: '',
    });
    onMounted(api.getDonationTrans)
    watch(formState, (val) => {
        store.dispatch('setDonationSearchBar', {...val}); // 儲存 收尋bar
    });
    return {
        formState,
    };
};

export default {
    name: 'SearchBar',
    setup,
    methods: {
        getDonationTrans: api.getDonationTrans,
    },
};
</script>
<style lang="scss" scoped>

</style>
