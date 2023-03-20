import { notification } from 'ant-design-vue';

const style = {
    height: '80px',
};

const FullMessage = {
    success: (v) => notification.success({
        key: 1,
        message: v,
        duration: 2,
        style,
    }),
    error: (v) => notification.error({
        key: 1,
        message: v,
        duration: 2,
        style,
    }),
};
export default FullMessage;
