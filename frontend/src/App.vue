<template>
    <div class="rootMain">
        <a-menu
            id="dddddd"
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 256px"
            mode="inline"
            @click="handleClick"
        >
            <a-menu-item key="/home" @titleClick="titleClick">
                <MailOutlined />
                    扣款管理
            </a-menu-item>
        </a-menu>
        <div class="article">
            <RouterView />
        </div>
    </div>
</template>
<script lang="js">
import { defineComponent, ref, watch } from 'vue';
import {
    MailOutlined, QqOutlined, AppstoreOutlined, SettingOutlined,
} from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

export default defineComponent({
    components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined,
    RouterLink,
    RouterView
},
    setup() {
        const selectedKeys = ref(['1']);
        const openKeys = ref(['sub1']);
        const handleClick = (e) => {
            console.log('click', e);
        };
        const titleClick = (e) => {
            console.log('titleClick', e);
            useRouter().push(e.key);
        };
        watch(
            () => openKeys,
            (val) => {
                console.log('openKeys', val);
            },
        );
        return {
            selectedKeys,
            openKeys,
            handleClick,
            titleClick,
        };
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
    width: 100vw;
    height: 100vh;
    position: relative;
}
.rootMain {
    display: flex;
    width: inherit;
    height: inherit;
    .article {
        flex: 1;
    }
}
</style>
