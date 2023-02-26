<template>
    <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
        @click="handleClick"
    >
        <a-sub-menu key="sub1" @titleClick="titleClick">
            <template #title #icon>
                <MailOutlined />
                扣款管理
            </template>
        </a-sub-menu>
    </a-menu>
</template>
<script lang="js">
import { defineComponent, ref, watch } from 'vue';
import {
    MailOutlined, QqOutlined, AppstoreOutlined, SettingOutlined,
} from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';

export default defineComponent({
    components: {
        MailOutlined,
        QqOutlined,
        AppstoreOutlined,
        SettingOutlined,
    },
    setup() {
        const selectedKeys = ref(['1']);
        const openKeys = ref(['sub1']);
        const handleClick = (e) => {
            console.log('click', e);
        };
        const titleClick = (e) => {
            console.log('titleClick', e);
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
    margin-top: 60px;
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
        position: absolute;
    }
}
</style>
