<template>
    <div>
        <a-modal v-model:visible="state.open" width="1000px" title="Basic Modal" @ok="handleOk">
            <a-form
                :model="formState"
                name="扣款編輯"
                class="row w-100"
                autocomplete="off"
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
                        v-model:value="formState.cycle"
                        @change="handleChange"
                    />
                </a-form-item>
                <a-form-item v-if="formState.cycle === 'Y'" :required="true"  class="col-lg-4 col-md-6" label="週期授權期間(月份)" name="cyclePeriodMonth">
                    <a-select
                        ref="select"
                        :options="cyclePeriodMonthOption"
                        v-model:value="formState.cyclePeriodMonth"
                    />
                </a-form-item>
                <a-form-item v-if="formState.cycle === 'Y'" :required="true"  class="col-lg-4 col-md-6" label="週期授權期間(日期)" name="cyclePeriodDay">
                    <a-select
                        ref="select"
                        :options="cyclePeriodDayOption(formState.cyclePeriodMonth)"
                        v-model:value="formState.cyclePeriodDay"
                    />
                </a-form-item>
                <!-- 週期授權期間 -->
                <a-form-item v-if="formState.cycle !== 'Y'" :required="true"  class="col-lg-4 col-md-6" label="週期授權期間" name="cyclePeriod">
                    <a-select
                        ref="select"
                        :options="cyclePeriodOption[formState.cycle]"
                        v-model:value="formState.cyclePeriod"
                    />
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
import { defineComponent, reactive, watchEffect, watch } from 'vue';
import { donationTransValue, cycleOption, cyclePeriodOption, cyclePeriodMonthOption, cyclePeriodDayOption } from '@/static';
import { mapActions } from 'vuex';

export default defineComponent({
    name: 'ModalEdit',
    props: ['open', 'onClose', 'onSave', 'donationValue'],
    setup(props) {
        const state = reactive({
            open: false,
        })
        const formState = reactive({ ...donationTransValue })
        const handleOk = (e) => {
            console.log(formState)
            props.onSave(formState)
        };
        watchEffect(() => {
            Object.assign(state, {
                open: props.open,
                onClose: props.onClose
            })
            Object.assign(formState, props.donationValue)
        });
        // watch(formState, (old, newd, one) => {
        //     console.log(old.cyclePeriodMonth, newd.cyclePeriodMonth, one)
        // })
        return {
            handleOk,
            state,
            cycleOption,
            cyclePeriodOption,
            formState,
            cyclePeriodMonthOption,
            cyclePeriodDayOption,
        };
    },
    methods: {
        getDonationTrans: () => {},
        ...mapActions(['createDonationTrans']),
    },
});
</script>
