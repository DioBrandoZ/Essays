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
  toastContainer.style.top = 'calc(50% - 1.9rem)';
  toastContainer.style.left = '50%';
  toastContainer.style.transform = 'translateX(-50%)';
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
