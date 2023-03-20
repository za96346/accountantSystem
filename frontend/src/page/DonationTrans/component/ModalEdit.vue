<template>
    <div>
        <a-modal
            :visible="open"
            width="1000px"
            title="扣款編輯"
            @cancel="handleCancel"
            @ok="handleOk"
            okText="儲存"
            cancelText="取消"
        >
            <!-- 描述區 -->
            <template v-if="props.type === 'edit'">
                <a-descriptions title="">
                    <a-descriptions-item label="訂單編號">{{ formState?.id || '' }}</a-descriptions-item>
                    <a-descriptions-item label="最後編輯人">{{ formState?.lastUserEdit || '' }}</a-descriptions-item>
                    <a-descriptions-item label="通知位置">{{ formState?.notifyUrl }}</a-descriptions-item>
                    <a-descriptions-item label="創建時間">{{ new Date(formState?.createdAt)?.toLocaleString() || '' }}</a-descriptions-item>
                    <a-descriptions-item label="更新時間">{{ new Date(formState?.updatedAt)?.toLocaleString() || '' }}</a-descriptions-item>
                </a-descriptions>
                <a-divider />
            </template>

            <!-- 表單區 -->
            <a-form
                :model="formState"
                name="form"
                class="row w-100"
                autocomplete="off"
            >
                <a-form-item v-if="props.type === 'create'" :required="true" class="col-lg-4 col-md-6" label="訂單編號" name="id">
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
                
                <!-- 週期 是 年份 -->
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

                <!-- 週期 不是 年份 -->
                <a-form-item v-if="formState.cycle !== 'Y'" :required="true"  class="col-lg-4 col-md-6" label="週期授權期間" name="cyclePeriod">
                    <a-select
                        ref="select"
                        :options="cyclePeriodOption[formState.cycle]"
                        v-model:value="formState.cyclePeriod"
                    />
                </a-form-item>


                <a-form-item :required="true"  class="col-lg-4 col-md-6" :extra="[
                    '0 表示總授權期數無限制',
                    '\n',
                    '若授權期數大於信用卡到期日，則系統自動以信用卡到期日為最 終期數。'
                ]" label="授權期數" name="authPeriod">
                    <a-input-number v-model:value="formState.authPeriod" :min="0" class="w-100" />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="信用卡卡號" name="creditNumber">
                    <a-input v-model:value="formState.creditNumber" maxlength='19' />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="信用卡到期日" name="creditMaturity">
                    <a-input v-model:value="formState.creditMaturity" maxlength='5' />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="商品名稱" name="productName">
                    <a-input v-model:value="formState.productName" maxlength='100' />
                </a-form-item>

                <!-- 付款人的資料 -->
                <a-divider>付款人</a-divider>
                <a-form-item class="col-lg-4 col-md-6" label="付款人姓名" name="consumerName">
                    <a-input v-model:value="formState.consumerName" maxlength='30' />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人電話" name="consumerTel">
                    <a-input v-model:value="formState.consumerTel" maxlength='20' />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人地址" name="consumerAddr">
                    <a-input v-model:value="formState.consumerAddr" maxlength='200' />
                </a-form-item>
                <a-form-item :required="true"  class="col-lg-4 col-md-6" label="付款人 Email" name="consumerEmail">
                    <a-input v-model:value="formState.consumerEmail" maxlength='100' />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人發票抬頭" name="consumerInvoiceTitle">
                    <a-input v-model:value="formState.consumerInvoiceTitle" maxlength='200' />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="付款人發票統編" name="consumerInvoiceNumver">
                    <a-input-number v-model:value="formState.consumerInvoiceNumver" maxlength='8' class="w-100" />
                </a-form-item>

                <!-- 收件人的資料 -->
                <a-divider>收件人</a-divider>
                <a-form-item class="col-lg-4 col-md-6" label="收件人姓名" name="recipientName">
                    <a-input v-model:value="formState.recipientName" maxlength='200' />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="收件人電話" name="recipientTel">
                    <a-input v-model:value="formState.recipientTel" maxlength='20' />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="收件人地址" name="recipientAddr">
                    <a-input v-model:value="formState.recipientAddr" maxlength='200' />
                </a-form-item>
                <a-form-item class="col-lg-4 col-md-6" label="收件人 Email" name="recipientEmail">
                    <a-input v-model:value="formState.recipientEmail" maxlength='100' />
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
    props: ['open', 'onClose', 'onSave', 'donationValue', 'type'],
    setup(props) {
        const formState = reactive({ ...donationTransValue })
        const handleOk = (e) => {
            props.onSave({
                ...formState,
                creditNumber: formState.creditNumber.replaceAll(' ', ''),
                creditMaturity: formState.creditMaturity.replaceAll(' ', '/')
            })
        };
        const handleCancel = () => {
            props.onClose()
        }

        // 掛載 props 初始直
        watchEffect(() => {
            Object.assign(formState, props.donationValue)
        });

        // 監聽當 週期改變成 每年時
        watchEffect(() => {
            if (formState.cycle === 'Y') {
                Object.assign(formState, {
                    cyclePeriod: `${formState?.cyclePeriodMonth || ''}${formState?.cyclePeriodDay || ''}`
                })
            }
        });

        // 監聽當 週期更改 變 清空 週期授權
        watch(() => formState.cycle, () => {
            Object.assign(formState, {
                cyclePeriod: ''
            })
        })

        // 監聽當 信用卡 改變時 加入 空白符
        watch(() => formState.creditNumber, (v) => {
            const value = v
                .replace(/\s/g, '')
                .replace(/(.{4})/g, '$1 ')
                .replace(/(\s*$)/g,"");
            Object.assign(formState, {
                creditNumber: value
            })
        })

        // 監聽當 信用卡 到期日 改變時 加入 slash
        watch(() => formState.creditMaturity, (v) => {
            const value = v
                .replace('/', '')
                .replace(/\s/g, '')
                .replace(/(.{2})/g, '$1 ')
                .replace(/(\s*$)/g,"");
            Object.assign(formState, {
                creditMaturity: value
            })
        })
        return {
            handleOk,
            handleCancel,
            cycleOption,
            cyclePeriodOption,
            formState,
            cyclePeriodMonthOption,
            cyclePeriodDayOption,
            props
        };
    },
    methods: {
        getDonationTrans: () => {},
        ...mapActions(['createDonationTrans']),
    },
});
</script>


