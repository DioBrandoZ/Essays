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
    left: div!.getBoundingClientRect().left + scrollLeft,
    top: div!.getBoundingClientRect().top + scrollTop
  }
}


/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
export function debounce(func, wait, immediate) {
  let timer;

  return function () {
      let context = this;
      let args = arguments;

      if (timer) clearTimeout(timer);
      if (immediate) {
          var callNow = !timer;
          timer = setTimeout(() => {
              timer = null;
          }, wait)
          if (callNow) func.apply(context, args)
      } else {
          timer = setTimeout(() => {
              func.apply(context, args)
          }, wait);
      }
  }
}

export const sleep = (time = 50) => { return new Promise((resolve) => { setTimeout(() => resolve(1), time) }) }