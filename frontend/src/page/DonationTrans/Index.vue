<template>
    <ModalEdit :open="open" :onClose="onClose" />
    <div class="searchBar">
        <a-Button @click="onOpen">
            新增
        </a-Button>
        <a-divider />
        <SearchBar />
    </div>
    <a-table :dataSource="donationTrans" :columns="columns" />
</template>

<script lang="js">
import { reactive, toRefs } from 'vue';
import { mapState } from 'vuex';
import SearchBar from './component/SearchBar.vue';
import { indexColumns } from './method/columns';
import ModalEdit from './component/ModalEdit.vue';

export default {
    name: 'DonationTransPage',
    setup: () => {
        const state = reactive({
            open: false
        })
        return {
            columns: indexColumns,
            onOpen: () => {
                Object.assign(state, {
                    open: true
                })
            },
            onClose: () => {
                Object.assign(state, {
                    open: false
                })
            },
            onSave: () => {
                
            },
            ...toRefs(state),
        }
    },
    components: { SearchBar, ModalEdit },
    computed: {
        ...mapState([
            'isLoading',
            'donationTrans',
        ]),
    },
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
