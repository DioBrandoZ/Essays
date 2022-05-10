import { useEffect } from 'react';

/**
 * 设置自适应弹性布局
 * @returns {recalc: function}
 */
export default function useFlexible() {
  const recalc = () => {
    const docEl = document.documentElement;
    const { clientWidth, clientHeight } = docEl;
    if (!clientWidth || !clientHeight) return;
    const fs = Math.min(100 * (clientWidth / 1334), 100 * (clientHeight / 750))
    docEl.style.fontSize = `${fs}px`;
    document.querySelector('#root').style.display = 'block'
  };

  useEffect(() => {
    recalc();
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);

    return () => {
      window.removeEventListener(resizeEvt, recalc, false);
      document.removeEventListener('DOMContentLoaded', recalc, false);
    };
  }, []);

  return {
    recalc
  };
}
