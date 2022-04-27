const message = {} as any

// 校验文件格式
export const checkType = ({ acceptTypes = [] as string[], file = {} as File, label = '' }) =>
  new Promise((res, rej) => {
    if (acceptTypes.includes(file.type)) {
      res(file)
    } else {
      message.warning(`请上传 ${acceptTypes.join('、')} 格式${label}`)
      rej()
    }
  })

//checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject阻止图片上传
export const checkImageWH = ({ label = '', file = {} as File, width = 1, height = 1 }) =>
  new Promise((resolve, reject) => {
    const filereader = new FileReader()
    filereader.onload = (e) => {
      const src = e?.target?.result as string
      const image = new Image()
      image.onload = () => {
        if (width && image.width / image.height !== width / height) {
          message.warning(`${label} 比例不是 ${width} : ${height}`)
          reject()
        } else {
          resolve(file)
        }
      }
      image.onerror = reject
      image.src = src
    }
    filereader.readAsDataURL(file)
  })

// 处理视频上传宽高
export const checkVideoWH = ({ file = {} as File, width = 1, height = 1, label = '' }) =>
  new Promise(function (resolve, reject) {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.onloadedmetadata = () => {
      // Revoke when you don't need the url any more to release any reference
      URL.revokeObjectURL(url)
      if (width && video.videoWidth / video.videoHeight !== width / height) {
        message.warning(`${label} 比例不是 ${width} : ${height}`)
        reject()
      } else {
        resolve(file)
      }
    }
    video.src = url
    video.load() // fetches metadata
  })

export const checkFileSize = ({ label = '', file = {} as File, limitSize = 1 }) =>
  new Promise((resolve, reject) => {
    const isValidVolume = file.size / 1024 / 1024 < limitSize
    if (!isValidVolume) {
      message.error(`${label} 大小不能超过${limitSize}MB`)
      reject()
    }
    resolve(file)
  })
