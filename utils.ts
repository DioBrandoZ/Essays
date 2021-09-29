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

const qs = {} as any // import qs from 'qs'
/**
 * 输入前缀和参数返回url
 * @param {string} url
 * @param {Object} params
 * @returns {string} 
 */
 export function urlGenerator(url: string, params = {}) {
  const linkArr = url.split('?');
  const linkQuery = qs.parse(linkArr[1] || '') || {};
  const queryStr = qs.stringify({
    ...linkQuery,
    ...params,
  });

  return `${linkArr[0]}?${queryStr}`;
}

/**
 * 复制到粘贴板
 * @param {string} str
 * @returns {Boolean}
 */
 export function copyString(str: string) {
  const oInput = document.createElement('input');
  oInput.value = str;
  document.body.appendChild(oInput);
  oInput.select();
  const successful = document.execCommand('copy');
  oInput.remove();
  return successful;
}


// toast

const ID = '__toast'
let TIMER = null

const removeNode = () => {
  const node = document.getElementById(ID)
  if (node) {
    document.body.removeChild(node)
  }
}

/**
 * 
 * @param {string} text 展示文案
 * @param {number} time 显示时间，默认2s
 */
export default function Toast(text, time = 2) {
  if (typeof window === 'undefined') return null

  // clear旧toast
  clearTimeout(TIMER)
  const toastOld = document.getElementById(ID)
  if (toastOld) {
    removeNode()
  }

  const toastContainer = document.createElement('div');
  toastContainer.id = ID

  // 样式
  toastContainer.style.fontSize = '0.3rem';
  toastContainer.style.lineHeight = '0.36rem';
  toastContainer.style.background = 'rgba(4, 8, 18, 0.8)';
  toastContainer.style.opacity = '0.97';
  toastContainer.style.color = 'white';
  toastContainer.style.position = 'fixed';
  toastContainer.style.padding = '0.24rem 0.4rem';
  toastContainer.style.borderRadius = '0.12rem';
  toastContainer.style.top = 'calc(50% - 1rem)';
  toastContainer.style.left = '50%';
  toastContainer.style.transform = 'translateX(-50%)';
  toastContainer.style.minWidth = '3.2rem';
  toastContainer.style.textAlign = 'center';
  toastContainer.style.zIndex = '1000'
  toastContainer.style.boxShadow = ' 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d';

  // 文案
  toastContainer.innerText = text;

  // 展示
  document.body.appendChild(toastContainer);
  const timer = setTimeout(() => {
    removeNode()
    clearTimeout(timer);
  }, time * 1000);
} 


// 获取 px/rem 比
export const getRem = () => {
  let rem = 0
  if (!rem) {
    rem = parseFloat(document.documentElement.style.fontSize)
  }
  return rem
}


// 封装 request 请求
// import qs from 'qs';

interface optionsType {
  url: string
  params?: any
  data?: any
  method?: string
  headers?: any
}

export const request = (options: optionsType) => {
  let {
    url, params = {}, data = {}, method = 'GET', headers = {},
  } = options;

  const paramsStr = qs.stringify(params);
  if (paramsStr) {
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += paramsStr;
  }

  // @ts-ignore
  const req = fetch(url, Object.assign({}, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    body: method === 'GET' ? null : JSON.stringify(data), // GET, DELETE方法不能有body字段
  }));

  return req;
}

/**
 * 获取元素相对浏览器的位置
 * @param {string} objId
 * @returns {Object}
 */
const getPosition = (objId: string) => {
  const div = document.getElementById(objId)  // 元素
  const { scrollLeft, scrollTop } = document.documentElement // 浏览器滚动条移动的位置

  return {
    left: div.getBoundingClientRect().left + scrollLeft,
    top: div.getBoundingClientRect().top + scrollTop
  }
}
