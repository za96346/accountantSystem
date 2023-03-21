<template>
    <div class="login">
        <a-form
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="login"
        >
            <div>
                <a-form-item
                    label="帳號"
                    name="account"
                >
                    <a-input v-model:value="formState.account" />
                </a-form-item>
                <a-form-item
                    label="密碼"
                    name="password"
                >
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
            </div>
            <a-form-item :wrapper-col="{ offset: 20, span: 16 }">
                <a-button type="primary" html-type="submit">搜尋</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { reactive } from 'vue';
import api from '@/method/api';

const setup = () => {
    const formState = reactive({
        account: '',
        password: '',
    });
    return {
        formState,
        login: (v) => {
            api.login(v);
        },
    };
};
export default {
    name: 'LoginPage',
    setup,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
.login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('../../assets/login.jpg');
    background-size: cover;
    >form{
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0px 0px 30px white;
        border-radius: 15px;
        height: 300px;
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        >div {
            width: 100%;
        }
    }
}
</style>
