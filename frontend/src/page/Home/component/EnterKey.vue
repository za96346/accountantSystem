<template>
    <a-form
        :model="formState"
        name="form"
        class="row w-100"
        autocomplete="off"
    >
        <a-form-item class="col-md-6" label="金鑰值" name="cryptKey">
            <a-input-password v-model:value="formState.cryptKey" />
        </a-form-item>
        <a-form-item class="col-md-6" label="向量值" name="cryptIV">
            <a-input-password v-model:value="formState.cryptIV" />
        </a-form-item>
    </a-form>
    <div class="d-flex w-100 justify-content-end">
        <a-button @click="onSave">儲存</a-button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import FullMessage from '@/method/notice';

export default {
    name: 'enterKey',
    setup: () => {
        const formState = reactive({
            cryptKey: localStorage.getItem('cryptKey'),
            cryptIV: localStorage.getItem('cryptIV'),
        });
        const onSave = () => {
            FullMessage.success('儲存成功');
            localStorage.setItem('cryptKey', formState.cryptKey);
            localStorage.setItem('cryptIV', formState.cryptIV);
        };
        return {
            formState,
            onSave,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
