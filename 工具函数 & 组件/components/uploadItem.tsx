import React, { useState } from 'react'
import { Form, Upload } from 'antd'
import qs from 'querystring'
import { UploadOutlined } from '@ant-design/icons'
import { ASSETS_UPLOAD_URL } from '@/util/constants'
import { checkType, checkImageWH, checkVideoWH, checkFileSize } from '@/util/util'

const UploadItem: React.FC<{
  name: string
  label: string
  initVal: { url: string }[]
  setLoading: (bool: boolean) => void
  clearFieldValue: (keys: string, val: any) => void
  disable?: boolean
  formItemLayout?: any
  isRequired?: boolean
  acceptTypes?: string[]
  limitScale?: number[]
  limitSize?: number
  showFileUrl?: boolean
}> = (props) => {
  const {
    name,
    label,
    initVal = [],
    disable = false,
    formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    },
    isRequired = false,
    clearFieldValue = () => {},
    acceptTypes = ['image/jpeg', 'image/jpg', 'image/png'],
    limitScale = [],
    setLoading = () => {},
    limitSize = 0,
    showFileUrl = false,
  } = props

  const data: Record<string, any> = {
    isUploadNos: true,
    needMin: true,
    _: `${Math.random() * 99999999}_${Date.now()}`,
  }
  const params = qs.stringify(data)

  const [fileList, setFileList] = useState(initVal as any)

  const normFile = (e: any) => {
    const isacceptTypes = acceptTypes.includes(e.file.type)
    if (e.file.status === 'done') {
      setFileList([{ url: e.file.response.url, uid: e.file.uid }])
      return [{ url: e.file.response.url, uid: e.file.uid }]
    }
    if (Array.isArray(e)) {
      setFileList(e)
      return e
    }
    if (isacceptTypes) {
      setFileList(e && e.fileList)
      return e && e.fileList
    }
    setFileList([])
    return []
  }

  const uploadBtn = () => (
    <>
      <UploadOutlined />
      点击上传
    </>
  )

  const beforeUpload = (file: File) => {
    const acceptVideo = acceptTypes.some((type) => type.indexOf('video') !== -1)
    const checkScaleParams = { label, file, width: limitScale[0], height: limitScale[1] }
    const promiseList = [checkType({ acceptTypes, file, label })]

    if (limitSize > 0) {
      promiseList.push(checkFileSize({ label, file, limitSize }))
    }

    if (limitScale.length === 2) {
      promiseList.push(acceptVideo ? checkVideoWH(checkScaleParams) : checkImageWH(checkScaleParams))
    }

    return Promise.all(promiseList).then((res) => {
      return res[0]
    }) as any
  }

  const onchange = ({ file = {} as any }) => {
    if (file.status === 'uploading') {
      setLoading(true)
    } else {
      setLoading(false)
    }
    switch (file.status) {
      case 'uploading':
        setLoading(true)
        break
      case 'done':
        setLoading(false)
        break
      default:
        clearFieldValue(name, [])
        setFileList([])
        setLoading(false)
        break
    }
  }

  return (
    <>
      <Form.Item
        name={name}
        label={label}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: isRequired, message: `请上传${label}` }]}
        {...formItemLayout}
      >
        <Upload
          fileList={fileList}
          name="file"
          action={`${EXEC_ENV === 'local' ? '/nos' : ASSETS_UPLOAD_URL}/uploadNos?${params}`}
          accept={acceptTypes.join(',')}
          listType="picture-card"
          maxCount={1}
          disabled={disable}
          beforeUpload={beforeUpload}
          onChange={onchange}
        >
          {fileList.length >= 1 ? null : uploadBtn()}
        </Upload>
      </Form.Item>
      {showFileUrl && (
        <span>
          视频地址：{fileList.map((file: any) => file.url).join('、')}
          <br />
        </span>
      )}
      <span>
        请上传{limitScale[0]} * {limitScale[1]} 的 {acceptTypes.join('、')} 格式{label}
      </span>
    </>
  )
}

export default UploadItem
