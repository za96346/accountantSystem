<template>
    <div>
        <a-modal v-model:visible="open" width="1000px" title="Basic Modal" @ok="a => createDonationTrans(formState)">
            <a-form
                :model="formState"
                name="扣款編輯"
                class="row w-100"
                autocomplete="off"
                @finish="createDonationTrans"
            >
                <a-form-item :required="true" class="col-lg-4 col-md-6" label="訂單編號" name="id">
                    <a-input v-model:value="formState.id" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="委託金額" name="amount">
                    <a-input v-model:value="formState.amount" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="週期" name="cycle">
                    <a-select
                        ref="select"
                        :options="cycleOption"
                        @change="handleChange"
                    />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="週期授權期間" name="cyclePeriod">
                    <a-input v-model:value="formState.cyclePeriod" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="授權期數" name="authPeriod">
                    <a-input v-model:value="formState.authPeriod" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="信用卡卡號" name="creditNumber">
                    <a-input v-model:value="formState.creditNumber" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="信用卡到期日" name="creditMaturity">
                    <a-input v-model:value="formState.creditMaturity" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="商品名稱" name="productName">
                    <a-input v-model:value="formState.productName" />
                </a-form-item>
                <a-divider>付款人</a-divider>
                <a-form-item class="col-lg-4 col-md-6" label="付款人姓名" name="consumerName">
                    <a-input v-model:value="formState.consumerName" />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人電話" name="consumerTel">
                    <a-input v-model:value="formState.consumerTel" />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人地址" name="consumerAddr">
                    <a-input v-model:value="formState.consumerAddr" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="付款人 Email" name="consumerEmail">
                    <a-input v-model:value="formState.consumerEmail" />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人發票抬頭" name="consumerInvoiceTitle">
                    <a-input v-model:value="formState.consumerInvoiceTitle" />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人發票統編" name="consumerInvoiceNumver">
                    <a-input v-model:value="formState.consumerInvoiceNumver" />
                </a-form-item>
                <a-divider>收件人</a-divider>
                <a-form-item class="col-lg-4 col-md-6" label="收件人姓名" name="recipientName">
                    <a-input v-model:value="formState.recipientName" />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="收件人電話" name="recipientTel">
                    <a-input v-model:value="formState.recipientTel" />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="收件人地址" name="recipientAddr">
                    <a-input v-model:value="formState.recipientAddr" />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="收件人 Email" name="recipientEmail">
                    <a-input v-model:value="formState.recipientEmail" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="js">
import { defineComponent, reactive, watchEffect, toRefs } from 'vue';
import { donationTransValue, cycleOption } from '@/static';
import { mapActions } from 'vuex';

export default defineComponent({
    name: 'ModalEdit',
    props: ['open', 'onClose', 'onSave'],
    setup(props) {
        const state = reactive({
            open: false,
            onClose: () => {},
        })
        const formState = reactive(donationTransValue)
        const handleOk = (e) => {
            console.log(e);
            props.onClose();
            props.onSave()
        };
        watchEffect(() => {
            Object.assign(state, props)
        });
        return {
            handleOk,
            ...toRefs(state),
            formState,
            cycleOption
        };
    },
    methods: {
        getDonationTrans: () => {},
        ...mapActions(['createDonationTrans']),
    }
});
</script>
