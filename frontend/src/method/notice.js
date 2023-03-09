import { message } from 'ant-design-vue';

const FullMessage = {
    success: (v) => message.success({
        key: 1,
        content: v,
        duration: 2,
    }),
    error: (v) => message.error({
        key: 1,
        content: v,
        duration: 2,
    }),
};
export default FullMessage;
