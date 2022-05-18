// 判断浏览器是否全屏
export function getIsFullscreen() {
  const sysFullscreen = !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  );
  const eleFullscreen = !!(
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement
  );
  return sysFullscreen || eleFullscreen || false;
}

// 全屏
export const requestFullScreen = (ele) => {
  try {
    if (ele.requestFullScreen) {
      ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullscreen) {
      ele.webkitRequestFullscreen();
    } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen();
    }
  } catch (e) {
    console.error("全屏失败", e);
  }
};

// 退出全屏
export const exitFullScreen = () => {
  if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};
