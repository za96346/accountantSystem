<template>
    <div class="searchBar">
        <SearchBar />
    </div>
    <a-table :dataSource="dataSource" :columns="columns" />
</template>

<script>
import { reactive } from 'vue';
import SearchBar from './component/SearchBar.vue';

const setup = () => {
    const formState = reactive({
        username: '',
        password: '',
        remember: true,
    });
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return {
        formState,
        onFinish,
        onFinishFailed,
    };
};
export default {
    name: 'DonationTransPage',
    setup,
    components: { SearchBar },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.searchBar {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 10px;
}
</style>
