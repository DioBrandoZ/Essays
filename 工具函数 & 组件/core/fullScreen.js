import React, { useEffect, useState } from "react"

/**
 * 
 * @param {string} videoUrl // 对局id
 * @param {string} btnClassName // 按钮样式
 * @param {object} btnStyle // 按钮行内样式
 */
const TeachVideoBtn = ({
  videoUrl,
  btnClassName,
  btnStyle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  // 检测是否是全屏
  const checkIsFullScreen = () => {
    const isFullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
    return isFullScreen === undefined ? false : isFullScreen;
  }

  // 退出全屏时暂停播放
  const fullScreenChangeCallback = () => {
    if (!checkIsFullScreen()) {
      const video = document.getElementById('teach_video')
      video.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const listenerList = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'];
    listenerList.forEach(item => {
      window.addEventListener(item, fullScreenChangeCallback);
    });

    return () =>
      listenerList.forEach(item => {
        window.removeEventListener(item, fullScreenChangeCallback);
      });
  }, [fullScreenChangeCallback])

  // 进入全屏
  const launchFullscreen = (element) => {
    // 此方法不可以在異步任務中執行，否則火狐無法全屏
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.oRequestFullscreen) {
      element.oRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
  }

  const handleClick = () => {
    const video = document.getElementById('teach_video')
    video.src = videoUrl
    launchFullscreen(video)
    video.play()
    setIsPlaying(true)
  }

  return <div
    className={`${s.btn} ${btnClassName} hover-zoom-out`}
    onClick={handleClick}
    style={btnStyle}
  >
    <div className={s.free} />
    <video
      id="teach_video"
      className={`${s.video} ${!isPlaying && s.hidden}`}
      controls
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
    />
  </div>
}

export default TeachVideoBtn

// .video::-webkit-media-controls-mute-button {
//   display: none !important;
// }


// .video::-webkit-media-controls-current-time-display {
//   display: none !important;
// }

// .video::-webkit-media-controls-time-remaining-display {
//   display: none !important;
// }

// .video::-webkit-media-controls-fullscreen-button {
//   display: none !important;
// }
