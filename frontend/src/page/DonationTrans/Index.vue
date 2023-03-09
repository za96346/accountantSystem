<template>
    <div class="searchBar">
        <SearchBar />
    </div>
    <a-table :dataSource="donationTrans" :columns="columns" />
</template>

<script lang="js">
// import { reactive } from 'vue';
import { mapState } from 'vuex';
import SearchBar from './component/SearchBar.vue';
import { indexColumns } from './method/columns';

const computed = mapState([
    'isLoading',
    'donationTrans',
]);

const setup = () => ({
    columns: indexColumns,
});
export default {
    name: 'DonationTransPage',
    setup,
    components: { SearchBar },
    computed,
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
