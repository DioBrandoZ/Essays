// columns={
[
    {
      title: '学生手机号',
      dataIndex: 'phone',
      fieldProps: {
        placeholder: '请输入手机号',
        onChange: () => {
          formRef.current?.validateFields()
        },
      },
      formItemProps: {
        rules: [
          {
            validator: () => {
              const { phone, userId } = formRef.current?.getFieldsValue() || {}
              if (phone || userId) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('手机号和学生id至少输入一个'))
            },
          },
          {
            validator: (_, val) => {
              if (/^[1]([3-9])[0-9]{9}$/.test(val) || !val) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('手机号格式错误'))
            },
          },
        ],
        validateTrigger: 'onBlur',
      },
      hideInTable: true,
    },
    {
      title: '学生ID',
      dataIndex: 'userId',
      fieldProps: {
        placeholder: '请输入学生id',
        onChange: () => {
          formRef.current?.validateFields()
        },
      },
      formItemProps: {
        rules: [
          {
            validator: () => {
              const { phone, userId } = formRef.current?.getFieldsValue() || {}
              if (phone || userId) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('手机号和学生id至少输入一个'))
            },
          },
        ],
        validateTrigger: 'onBlur',
      },
    },
]