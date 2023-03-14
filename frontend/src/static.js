// 產生天數
const gernerateDay = (amount) => new Array(amount).fill('').map((item, index) => {
    const idx = index + 1;
    return {
        value: idx < 10 ? `0${idx}` : `${idx}`,
        label: idx < 10 ? `0${idx}號` : `${idx}號`,
    };
});
export const donationTransValue = {
    id: '',
    amount: '',
    cycle: '',
    cyclePeriod: '',
    authPeriod: '',
    creditNumber: '',
    creditMaturity: '',
    productName: '',
    consumerName: '',
    consumerTel: '',
    consumerAddr: '',
    consumerEmail: '',
    consumerInvoiceTitle: '',
    consumerInvoiceNumver: '',
    recipientName: '',
    recipientTel: '',
    recipientAddr: '',
    recipientEmail: '',
    notifyUrl: '',
    lastUserEdit: '',
};

export const cycleOption = [
    { value: 'W', label: '每週' },
    { value: 'M', label: '每月' },
    { value: 'Y', label: '每年' },
    { value: 'D', label: '固定天期制' },
];

export const cyclePeriodOption = {
    W: [
        { value: '1', label: '週一' },
        { value: '2', label: '週二' },
        { value: '3', label: '週三' },
        { value: '4', label: '週四' },
        { value: '5', label: '週五' },
        { value: '6', label: '週六' },
        { value: '7', label: '週日' },
    ],
    M: gernerateDay(30),
    Y: [],
    D: new Array(365).fill('').map((item, index) => ({
        value: `${index + 1}`,
        label: `每隔 ${index + 1} 天`,
    })),
};

export const cyclePeriodMonthOption = [
    { value: '01', label: '一月' },
    { value: '02', label: '二月' },
    { value: '03', label: '三月' },
    { value: '04', label: '四月' },
    { value: '05', label: '五月' },
    { value: '06', label: '六月' },
    { value: '07', label: '七月' },
    { value: '08', label: '八月' },
    { value: '09', label: '九月' },
    { value: '10', label: '十月' },
    { value: '11', label: '十一月' },
    { value: '12', label: '十二月' },
];

export const cyclePeriodDayOption = (month) => {
    const bigMonth = ['01', '03', '05', '07', '08', '10', '12'];
    if (bigMonth.includes(month)) {
        return gernerateDay(31);
    } if (month === '02') {
        return gernerateDay(29);
    }
    return gernerateDay(30);
};
