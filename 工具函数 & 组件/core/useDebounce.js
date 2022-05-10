import { useCallback, useRef } from 'react';

/**
 * 防抖hook、解决疯狂点击的问题
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间
 * @returns {Function} 返回一个包裹后的函数
 */
export default function useDebounce(fn, delay = 300) {
  const debounceRef = useRef();
  const debounceFn = useCallback(
    (...args) => new Promise((resolve, reject) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
          try {
            const result = fn.apply(this, args);
            debounceRef.current = null;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, delay);
      }),
    [fn, delay]
  );

  return debounceFn;
}
