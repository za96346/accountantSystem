<template>
    <!-- Modal -->
    <ModalEdit :type="type" :open="open" :onClose="onClose" :donationValue="value" :onSave="onSave" />

    <!-- searchBar -->
    <div class="searchBar">
        <div class="">
            <a-Button @click="onOpen">
                新增
            </a-Button>
            <a-Button @click="download">
                匯出CSV
            </a-Button>
        </div>
        <a-divider />
        <SearchBar />
    </div>

    <!-- table -->
    <a-table
        sticky
        :scroll="{ x: 1500 }"
        :dataSource="donationTrans"
        :columns="columns"
        :size="small"
        :pagination="{
            showSizeChanger: true
        }"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
                <span class="table-operation">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="(v) => { handleMenuClick(v, record)}">
                                <a-menu-item key="edit">編輯</a-menu-item>
                                <a-menu-item key="delete">刪除</a-menu-item>
                            </a-menu>
                        </template>
                        <a>
                            更多
                            <down-outlined />
                        </a>
                    </a-dropdown>
                </span>
            </template>
        </template>
    </a-table>
</template>

<script lang="js">
import { reactive, toRefs } from 'vue';
import { mapState } from 'vuex';
import SearchBar from './component/SearchBar.vue';
import { indexColumns } from './method/columns';
import ModalEdit from './component/ModalEdit.vue';
import { donationTransValue } from '@/static';
import api from '@/method/api';
import { Modal } from 'ant-design-vue';

export default {
    name: 'DonationTransPage',
    setup: () => {
        const state = reactive({
            open: false,
            type: '',
            value: donationTransValue // 預設值
        })
        const onClose = () => {
            Object.assign(state, {
                open: false,
                type: '',
                value: donationTransValue
            })
            api.getDonationTrans()
        }
        return {
            columns: indexColumns,
            onOpen: () => {
                Object.assign(state, {
                    open: true,
                    type: 'create',
                    value: donationTransValue
                })
            },
            onClose,
            onSave: async (v) => {
                if (state.type === 'edit') {
                    const res = await api.updateDonationTrans(v)
                    if (res) onClose();
                } else if (state.type === 'create') {
                    const res = await api.createDonationTrans(v)
                    if (res) onClose();
                }
            },
            handleMenuClick: (v, row) => {
                if (v.key === 'delete') {
                    Modal.confirm({
                        okText: "確認刪除",
                        cancelText: '取消',
                        content: `是否要刪除 訂單 ${row?.id}`,
                        onOk: () => {
                            api.deleteDonationTrans(row).then(() => {
                                api.getDonationTrans()
                            })
                        }
                    })
                } else {
                    Object.assign(state, {
                        open: true,
                        type: v.key,
                        value: { ...row }
                    })
                }
            },
            download: api.downloadDonationTransCSV,
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


