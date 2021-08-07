// 数组去重
export const unique = (arr: any) => Array.from(new Set(arr));

// 取得 url 中的参数值
export const getQuery = (key: string, sUrl?: string) => {
    const url = decodeURIComponent(sUrl || window.location.href);
    // 选取数组中的最后一项，是因为锚点永远会被添加在最后，这样不受自动添加的参数的影响（如微信分享自动添加参数）
    const pathArr = url.split('?');
    const searchString = pathArr[pathArr.length - 1];
    // 额外匹配 '#'，是因为历史遗留存在无路由的链接，访问时会被自动添加锚点，导致无法取到正确的值
    const regexp = new RegExp(`(^|&)${key}=([^&#]*)(&|#|$)`, 'i');
    const r = searchString.match(regexp);
  
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return '';
  };

// crypto加密
const CryptoJS = {} as any // import CryptoJS from 'crypto-js';
export const CRYPTO_KEY = 'xxx';
export const encrypt = (text: string) => {
  const res = CryptoJS.AES.encrypt(text, CRYPTO_KEY).toString().replace(/\//g, '-');
  return res;
};