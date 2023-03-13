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
    onMounted, onUpdated, onUnmounted, reactive,
} from 'vue';
import { mapActions } from 'vuex';

const methods = mapActions(['getDonationTrans']);

const setup = () => {
    const formState = reactive({
        id: '',
        consumerName: '',
        productName: '',
    });
    onMounted(() => { // 使用的方式改為函數式的方式來使用
        console.log('mounted!');
    });
    onUpdated(() => {
        console.log('updated!');
    });
    onUnmounted(() => {
        console.log('unmounted!');
    });
    return {
        formState,
    };
};

export default {
    name: 'SearchBar',
    setup,
    methods,
    // props: {
    //     msg: String,
    //     text: String,
    // },

};
</script>
<style lang="scss" scoped>

</style>

