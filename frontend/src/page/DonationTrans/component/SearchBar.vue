<template>
    <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="getDonationTrans"
    >
        <a-form-item
            label="商店訂單編號"
            name="productNum"
        >
            <a-input v-model:value="formState.productNum" />
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

const setup = (props) => {
    const formState = reactive({
        productNum: '',
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
    methods: {
        ...mapActions(['getDonationTrans'])
    }
    // props: {
    //     msg: String,
    //     text: String,
    // },

};
</script>
<style lang="scss" scoped>
</style>
