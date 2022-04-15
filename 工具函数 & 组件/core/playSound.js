const ID = '_play_sound_'

const removeNode = (env) => {
  const node = document.getElementById(ID)
  if (node) {
    env.removeChild(node)
  }
}

/**
 * 
 * @param {*} src 需要播放的mp3链接
 * @param {*} parentId 挂载的父级, 直接挂载在全局会导致播放声音时退出当前页声音不会停止
 * @returns 
 */
const playSound = (src, parentId) => {
  if (typeof window === 'undefined') return null

  const env = document.getElementById(parentId) || window.document
  const oldNode = document.getElementById(ID)

  if (oldNode) {
    removeNode(env)
  }

  const audioNode = document.createElement('audio')
  audioNode.id = ID
  audioNode.style.display = 'hidden'
  audioNode.src = src
  audioNode.loop = false
  audioNode.autoplay = true

  env.appendChild(audioNode)
  return 1
}

export default playSound
