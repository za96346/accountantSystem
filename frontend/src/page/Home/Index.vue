<template>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="設定金鑰匙">
            <EnterKey />
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import EnterKey from './component/EnterKey.vue';

export default {
    name: 'HomePage',
    setup: () => ({}),
    components: { EnterKey },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
