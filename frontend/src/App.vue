<template>
    <Loading :active="isLoading"
                 :can-cancel="false"
                 :is-full-page="true"/>
    <div class="rootMain">
        <a-menu
            v-if="router.currentRoute.value.fullPath !== '/login'"
            id="dddddd"
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            class="menu"
            @click="handleClick"
        >
            <a-menu-item key="/home" @titleClick="titleClick">
                <MailOutlined />
                    首頁
            </a-menu-item>
            <a-menu-item key="/donationTransManage" @titleClick="titleClick">
                <MailOutlined />
                    扣款管理
            </a-menu-item>
            <a-menu-item key="/login" @titleClick="titleClick">
                <MailOutlined />
                    登出
            </a-menu-item>
        </a-menu>
        <div class="article" v-if="router.currentRoute.value.fullPath !== '/login'">
            <RouterView />
        </div>
        <template v-else>
            <RouterView />
        </template>
    </div>
</template>
<script lang="js">
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
import {
    MailOutlined,
} from '@ant-design/icons-vue';
// import { MenuProps } from 'ant-design-vue';
import { RouterView, useRouter } from 'vue-router';
import Loading from 'vue-loading-overlay';

export default defineComponent({
    components: {
        MailOutlined,
        RouterView,
        Loading,
    },
    setup: () => {
        const router = useRouter();
        const selectedKeys = ref(['1']);
        const openKeys = ref(['sub1']);
        const handleClick = (e) => {
            router.push({ path: e.key, replace: false });
        };
        const titleClick = (e) => {
            // console.log('titleClick', e);
            if (e.key === '/login') {
                localStorage.removeItem('token');
            }
            useRouter().push(e.key);
        };
        return {
            selectedKeys,
            openKeys,
            handleClick,
            titleClick,
            router,
        };
    },
    computed: {
        ...mapState([
            'isLoading',
        ]),
    },
});
</script>

<style lang='scss'>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #e1e6eb;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    position: relative;
}
.rootMain {
    display: flex;
    width: inherit;
    height: inherit;
    margin: 0px;
    .menu{
        background-color: white;
        min-width: 256px;
        max-width: 256px;

    }
    .article {
        flex: 1;
        padding: 10px;
        box-shadow: inset 5px 5px 10px #2c3e50;
        width: 100%;
        max-width: 100%;

        min-height: 100%;
        max-height: 100vh;

        overflow-y: scroll;
        scroll-behavior: smooth;
    }
}
</style>
