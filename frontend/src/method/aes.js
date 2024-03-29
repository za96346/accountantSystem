import CryptoJS from 'crypto-js/crypto-js';

/*
 * 默认的 KEY IV     如果在加密解密的时候没有传入KEY和IV,就会使用这里定义的
 *
 * 前后端交互时需要前后端密钥和初始向量保持一致
 */

/*
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(str, keyStr, ivStr) {
    let key;
    let iv;

    if (keyStr && ivStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    const srcs = CryptoJS.enc.Utf8.parse(str);
    const encrypt = CryptoJS.AES.encrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC, // 这里可以选择AES加密的模式
        padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Base64.stringify(encrypt.ciphertext);
}

/*
 * AES 解密 ：字符串 key iv  返回base64
 */
export function Decrypt(str, keyStr, ivStr) {
    let key;
    let iv;

    if (keyStr && ivStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    const base64 = CryptoJS.enc.Base64.parse(str);
    const src = CryptoJS.enc.Base64.stringify(base64);

    const decrypt = CryptoJS.AES.decrypt(src, key, {
        iv,
        mode: CryptoJS.mode.CBC, // 这里可以选择AES解密的模式
        padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
